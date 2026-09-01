/**
 * Optional post-build smoke test (not part of `npm run build`):
 *   npm run build && node scripts/smoke-hydration.mjs
 * Serves dist/ like Netlify would, loads key routes in headless Chromium,
 * and fails on hydration mismatches, console errors, or a broken
 * language-toggle pairing. Requires a Chromium binary; set
 * PLAYWRIGHT_CHROMIUM or have Playwright's default install available.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const DIST = '/home/user/main-site/dist';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.md': 'text/markdown' };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(DIST, urlPath);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) file = path.join(DIST, '404.html');
  res.writeHead(fs.existsSync(file) ? 200 : 404, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(4199, r));

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || '/opt/pw-browsers/chromium' });
const routes = ['/', '/en', '/en/tulum-land-for-sale', '/cenotes', '/legalidad-y-permisos', '/blog/como-comprar-terreno-en-tulum', '/en/blog/building-rules-tulum-cos-cus', '/en/faq'];
let failures = 0;

for (const route of routes) {
  const page = await browser.newPage();
  const problems = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`console.error: ${msg.text().slice(0, 200)}`);
  });
  page.on('pageerror', (err) => problems.push(`pageerror: ${String(err).slice(0, 200)}`));
  // Block third-party analytics so the test is hermetic.
  await page.route(/googletagmanager|facebook|clarity\.ms|posthog|youtube|gstatic|googleapis/, (r) => r.abort());
  await page.goto(`http://localhost:4199${route}`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(600);
  const h1 = await page.locator('h1').first().textContent();
  const hydrationErrors = problems.filter((p) => p.includes('[hydration]') || p.toLowerCase().includes('hydrat'));
  const otherErrors = problems.filter((p) => !hydrationErrors.includes(p) && !p.includes('net::ERR_FAILED') && !p.includes('Failed to load resource'));
  const status = hydrationErrors.length || otherErrors.length ? 'FAIL' : 'OK';
  if (status === 'FAIL') failures++;
  console.log(`${status} ${route} — h1: "${(h1 ?? '').trim().slice(0, 60)}"`);
  for (const p of [...hydrationErrors, ...otherErrors]) console.log(`   ${p}`);
  await page.close();
}

// Language toggle round-trip on a localized-slug page
{
  const page = await browser.newPage();
  await page.route(/googletagmanager|facebook|clarity\.ms|posthog|youtube|gstatic|googleapis/, (r) => r.abort());
  await page.goto('http://localhost:4199/en/tulum-land-for-sale', { waitUntil: 'domcontentloaded' });
  const esHref = await page.getByRole('link', { name: 'ES', exact: true }).first().getAttribute('href');
  console.log(esHref === '/lotes-en-venta-tulum' ? 'OK lang-toggle EN→ES pairs correctly' : `FAIL lang toggle: ${esHref}`);
  if (esHref !== '/lotes-en-venta-tulum') failures++;
  await page.close();
}

await browser.close();
server.close();
process.exit(failures ? 1 : 0);
