import type { Handler } from '@netlify/functions';

/**
 * Proxy endpoint for the main-site contact form.
 *
 * The React form used to POST directly to the GoHighLevel webhook, which
 * meant the webhook URL was public in the JS bundle and any bot could
 * hit it with curl. This function sits in front of GHL and:
 *
 *   1. Verifies a reCAPTCHA v3 token.
 *   2. Rejects submissions where the honeypot field is filled.
 *   3. Rejects known disposable email domains.
 *   4. Applies a light per-IP rate limit (per warm instance).
 *   5. Forwards the cleaned payload to GHL using an env-var URL.
 *
 * Env vars required (set in the Netlify dashboard):
 *   RECAPTCHA_SECRET_KEY  - Google reCAPTCHA v3 server secret
 *   GHL_WEBHOOK_URL       - The GoHighLevel webhook trigger URL
 */

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_SCORE = 0.5;
const EXPECTED_ACTION = 'main_site_lead';

// Common throwaway inbox providers. Not exhaustive — the goal is to knock
// out the obvious noise, not to be a comprehensive block list.
const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  'dispostable.com',
  'fakeinbox.com',
  'getnada.com',
  'guerrillamail.com',
  'maildrop.cc',
  'mailinator.com',
  'mailnesia.com',
  'mintemail.com',
  'moakt.com',
  'sharklasers.com',
  'temp-mail.org',
  'tempmail.com',
  'throwawaymail.com',
  'trashmail.com',
  'yopmail.com',
]);

// In-memory per-IP rate limit. Netlify Functions run in warm containers,
// so this survives across invocations within the same instance and works
// well enough as a first-line defence against bursts.
const rateLimit = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (rateLimit.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  rateLimit.set(ip, arr);
  return arr.length > RATE_MAX;
}

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  'error-codes'?: string[];
}

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'method_not_allowed' });
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!webhookUrl || !secret) {
    console.error('submit-lead: missing GHL_WEBHOOK_URL or RECAPTCHA_SECRET_KEY');
    return json(500, { error: 'server_misconfigured' });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot: silently accept (200) so a bot cannot A/B its way around it.
  const honeypot = payload._hp_website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    console.info('submit-lead: honeypot triggered');
    return json(200, { ok: true });
  }

  const token = typeof payload._recaptcha_token === 'string' ? payload._recaptcha_token : '';
  if (!token) {
    return json(400, { error: 'missing_token' });
  }

  const ip =
    (event.headers['x-nf-client-connection-ip'] as string | undefined) ||
    (event.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ||
    'unknown';

  if (isRateLimited(ip)) {
    console.warn('submit-lead: rate limited', { ip });
    return json(429, { error: 'rate_limited' });
  }

  // Verify reCAPTCHA v3 with Google.
  try {
    const params = new URLSearchParams({ secret, response: token, remoteip: ip });
    const verifyRes = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const verifyJson = (await verifyRes.json()) as RecaptchaVerifyResponse;
    if (!verifyJson.success) {
      console.warn('submit-lead: recaptcha rejected', {
        errors: verifyJson['error-codes'],
        ip,
      });
      return json(403, { error: 'captcha_failed' });
    }
    const score = verifyJson.score ?? 0;
    if (score < MIN_SCORE) {
      console.warn('submit-lead: low recaptcha score', {
        score,
        action: verifyJson.action,
        ip,
      });
      return json(403, { error: 'low_score' });
    }
    if (verifyJson.action && verifyJson.action !== EXPECTED_ACTION) {
      console.warn('submit-lead: unexpected action', { action: verifyJson.action });
      return json(403, { error: 'unexpected_action' });
    }
  } catch (err) {
    console.error('submit-lead: recaptcha verify error', err);
    return json(502, { error: 'captcha_verify_error' });
  }

  const email = typeof payload.email === 'string' ? payload.email.toLowerCase().trim() : '';
  const emailDomain = email.split('@')[1] || '';
  if (DISPOSABLE_DOMAINS.has(emailDomain)) {
    console.info('submit-lead: disposable email rejected', { emailDomain });
    return json(400, { error: 'disposable_email' });
  }

  // Strip fields that should not reach GHL.
  const { _recaptcha_token, _hp_website, ...clean } = payload;
  void _recaptcha_token;
  void _hp_website;

  try {
    const ghlRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clean),
    });
    if (!ghlRes.ok) {
      const text = await ghlRes.text().catch(() => '');
      console.error('submit-lead: GHL forward failed', ghlRes.status, text);
      return json(502, { error: 'downstream_error' });
    }
  } catch (err) {
    console.error('submit-lead: GHL forward error', err);
    return json(502, { error: 'downstream_error' });
  }

  return json(200, { ok: true });
};
