/**
 * Build gate — the LAST step of `npm run build`. Reads every prerendered
 * file as plain text (exactly what a non-JS AI crawler retrieves) and
 * asserts the SEO contract. Any failure exits non-zero and fails the
 * Netlify deploy, so a regression can never ship silently.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const app = await import(path.join(ROOT, 'dist-ssr', 'entry-server.js'));
const { ALL_PAGES, SITE_URL, translations } = app;

const errors = [];
const check = (cond, msg) => {
  if (!cond) errors.push(msg);
};

const absUrl = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`);
// Mirrors outFileFor() in prerender.mjs: `<path>.html`, never a directory
// index, so Netlify answers the slash-less canonical URL with a 200.
const fileFor = (p) =>
  p === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${p.replace(/^\//, '')}.html`);

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const htmlEsc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// React escapes text nodes; match either raw or entity-escaped forms of
// quotes/apostrophes so copy with ’ or — compares correctly.
const textPattern = (s) =>
  new RegExp(
    escRe(s)
      .replace(/'/g, "(?:'|&#x27;|&#39;)")
      .replace(/’/g, '(?:’|&#x2019;)')
      .replace(/"/g, '(?:"|&quot;)')
      .replace(/&/g, '(?:&|&amp;)'),
  );

// Every page in the sitemap must satisfy the full contract.
for (const meta of ALL_PAGES) {
  const file = fileFor(meta.path);
  if (!fs.existsSync(file)) {
    errors.push(`${meta.path}: prerendered file missing (${file})`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const where = meta.path;

  check(html.includes(`<html lang="${meta.lang}">`), `${where}: <html lang> should be "${meta.lang}"`);
  check(html.includes(`<title>${htmlEsc(meta.title)}</title>`), `${where}: <title> mismatch`);
  check(
    html.includes(`<meta name="description" content="${htmlEsc(meta.description)}"`),
    `${where}: meta description mismatch`,
  );
  check(
    html.includes(`<link rel="canonical" href="${absUrl(meta.path)}"`),
    `${where}: canonical mismatch`,
  );
  if (meta.altPath) {
    check(html.includes('hreflang="es"'), `${where}: missing hreflang=es`);
    check(html.includes('hreflang="en"'), `${where}: missing hreflang=en`);
    check(html.includes('hreflang="x-default"'), `${where}: missing hreflang=x-default`);
    check(
      html.includes(`href="${absUrl(meta.altPath)}"`),
      `${where}: hreflang does not reference paired URL ${meta.altPath}`,
    );
  }
  // Descriptions are truncated in SERPs past ~160 chars, and the static
  // registry is not covered by the content build's validator.
  check(
    meta.description.length <= 160,
    `${where}: meta description is ${meta.description.length} chars (max 160)`,
  );
  check(
    /[.!?…]$/.test(meta.description.trim()),
    `${where}: meta description must end in terminal punctuation`,
  );
  check(textPattern(meta.h1).test(html), `${where}: H1 text not found in body ("${meta.h1}")`);
  check(/<h1[\s>]/.test(html), `${where}: no <h1> tag in prerendered body`);
  check(html.includes('data-prerendered="true"'), `${where}: #root not marked prerendered`);
  check(
    /property="og:image" content="https:\/\//.test(html),
    `${where}: og:image is not an absolute URL`,
  );

  const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(ldMatches.length >= 1, `${where}: no JSON-LD block`);
  for (const m of ldMatches) {
    try {
      JSON.parse(m[1]);
    } catch {
      errors.push(`${where}: JSON-LD does not parse`);
    }
  }

  // The analytics stack must survive prerendering intact.
  for (const [name, fingerprint] of [
    ['GA4', 'G-7F35BWLHTZ'],
    ['Meta Pixel', "fbq('init'"],
    ['Clarity', 'clarity'],
    ['PostHog', 'posthog.init'],
  ]) {
    check(html.includes(fingerprint), `${where}: analytics missing (${name})`);
  }
}

// Homepage-specific: the money page must carry the FAQ text and the form.
for (const lang of ['es', 'en']) {
  const file = fileFor(lang === 'es' ? '/' : '/en');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  check(html.includes('id="contacto"'), `/${lang === 'en' ? 'en' : ''}: missing #contacto anchor`);
  for (const item of translations[lang].faq.items) {
    check(textPattern(item.q).test(html), `homepage ${lang}: FAQ question missing ("${item.q}")`);
  }
}

// Internal links must resolve. Content is written by hand across hundreds
// of cross-links (guides ↔ glossary ↔ pillars), so a typo'd slug would
// otherwise ship as a 404 on a live page.
{
  const known = new Set(ALL_PAGES.map((m) => m.path));
  known.add('/404');
  const seen = new Map(); // href → first page that used it
  for (const meta of ALL_PAGES) {
    const file = fileFor(meta.path);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const body = html.slice(html.indexOf('<div id="root"'));
    for (const m of body.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const href = m[1].replace(/\/$/, '') || '/';
      // Static assets and the Netlify function live outside the registry.
      if (/\.[a-z0-9]{2,5}$/i.test(href) || href.startsWith('/.netlify')) continue;
      if (!known.has(href) && !seen.has(href)) seen.set(href, meta.path);
    }
  }
  for (const [href, from] of seen) {
    errors.push(`broken internal link: ${href} (linked from ${from})`);
  }
}

// Structural invariants.
// No route may be emitted as a directory index: Netlify would then
// 301 the slash-less canonical URL to the trailing-slash form, putting a
// redirect behind every canonical, sitemap entry and internal link.
for (const meta of ALL_PAGES) {
  if (meta.path === '/') continue;
  const asDirIndex = path.join(DIST, meta.path.replace(/^\//, ''), 'index.html');
  check(
    !fs.existsSync(asDirIndex),
    `${meta.path}: emitted as a directory index — Netlify will 301 the canonical URL. Emit <path>.html instead.`,
  );
}

check(fs.existsSync(path.join(DIST, '404.html')), 'dist/404.html missing');
check(!fs.existsSync(path.join(DIST, 'agendar')), 'dist/agendar should not exist (301 in netlify.toml)');
check(fs.existsSync(path.join(DIST, 'sitemap.xml')), 'dist/sitemap.xml missing');
check(fs.existsSync(path.join(DIST, 'llms.txt')), 'dist/llms.txt missing');
check(fs.existsSync(path.join(DIST, 'pricing.md')), 'dist/pricing.md missing');
check(
  fs.existsSync(path.join(DIST, '_redirects')) === false,
  'dist/_redirects exists — public/_redirects must stay deleted (it would resurrect the 200 catch-all)',
);
{
  const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  check(!sitemap.includes('/agendar'), 'sitemap.xml still lists /agendar');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check(
    locs.length === ALL_PAGES.length,
    `sitemap has ${locs.length} URLs, registry has ${ALL_PAGES.length}`,
  );
}

// ── Images: honest intrinsic dimensions ──────────────────────────────────
// Every <img> pointing at a file we ship must declare width and height, and
// the declared aspect must match the real file. A missing pair causes layout
// shift (CLS, which Search Console reports); a wrong pair is worse, because
// the browser reserves the wrong box and shifts anyway. This is gate-checked
// because the crops are generated (withoutEnlargement means an output is
// often NOT the size the generator asked for) and the numbers drift.
{
  const sharp = (await import('sharp')).default;
  const dims = new Map();
  const realSize = async (src) => {
    if (dims.has(src)) return dims.get(src);
    const file = path.join(DIST, src.replace(/^\//, ''));
    let out = null;
    if (fs.existsSync(file)) {
      const m = await sharp(file).metadata();
      out = { width: m.width, height: m.height };
    }
    dims.set(src, out);
    return out;
  };

  const seen = new Set();
  for (const meta of ALL_PAGES) {
    const file = fileFor(meta.path);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = m[0];
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
      // Only our own raster files; data: URIs and remote hosts are exempt.
      if (!src || !/^\/[^/]/.test(src) || !/\.(?:webp|jpe?g|png)$/i.test(src)) continue;
      const w = Number(tag.match(/\bwidth="(\d+)"/)?.[1]);
      const h = Number(tag.match(/\bheight="(\d+)"/)?.[1]);
      if (!w || !h) {
        const key = `nodims:${src}`;
        if (!seen.has(key)) {
          seen.add(key);
          check(false, `${meta.path}: <img src="${src}"> declares no width/height (layout shift)`);
        }
        continue;
      }
      const real = await realSize(src);
      if (!real) {
        check(false, `${meta.path}: <img src="${src}"> points at a file missing from dist/`);
        continue;
      }
      const declared = w / h;
      const actual = real.width / real.height;
      // 1% covers rounding in a hand-written pair; anything looser is a
      // genuinely different aspect.
      if (Math.abs(declared - actual) / actual > 0.01) {
        const key = `aspect:${src}:${w}x${h}`;
        if (!seen.has(key)) {
          seen.add(key);
          check(
            false,
            `${meta.path}: <img src="${src}"> declares ${w}×${h} but the file is ` +
              `${real.width}×${real.height} — the reserved box has the wrong shape`,
          );
        }
      }
    }
  }
}

if (errors.length) {
  console.error(`\n[check-static] FAILED — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error();
  process.exit(1);
}
console.log(`[check-static] OK — ${ALL_PAGES.length} URLs satisfy the SEO contract`);
