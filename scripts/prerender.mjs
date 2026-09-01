/**
 * Prerender step — runs AFTER `vite build` (client) and `vite build --ssr`.
 *
 * For every route in the SEO registry it renders real HTML via React's
 * server renderer (dist-ssr/entry-server.js), injects the per-route <head>
 * between the template's <!-- seo:start --> / <!-- seo:end --> markers,
 * swaps <html lang>, marks #root as prerendered (main.tsx then hydrates
 * instead of mounting fresh), and writes dist/<path>/index.html.
 *
 * Also emits: dist/404.html, dist/sitemap.xml (lastmod + hreflang),
 * dist/llms.txt, dist/llms-full.txt, dist/pricing.md.
 *
 * Analytics never fire here: rendering happens in Node (effects don't
 * run), and the GA4/Pixel/Clarity/PostHog snippets are inert template
 * strings until a real browser parses them.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const app = await import(path.join(ROOT, 'dist-ssr', 'entry-server.js'));
const { ALL_PAGES, render, renderHeadTags, PRICING, ORG, SITE_URL, POSTS } = app;

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const SEO_BLOCK_RE = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
if (!SEO_BLOCK_RE.test(template)) {
  throw new Error('index.html is missing the <!-- seo:start/end --> markers');
}
if (!template.includes('<div id="root"></div>')) {
  throw new Error('index.html #root is not the expected empty shell');
}

const absUrl = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`);

function outFileFor(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, routePath.replace(/^\//, ''), 'index.html');
}

/**
 * IMPORTANT: every replacement value goes through a function — page copy
 * contains `$68,000` and String.replace treats $-sequences in replacement
 * STRINGS as patterns, silently corrupting output.
 */
function assemble(bodyHtml, headHtml, lang, { prerendered = true } = {}) {
  let out = template;
  out = out.replace(/<html lang="[a-z-]+">/, () => `<html lang="${lang}">`);
  out = out.replace(SEO_BLOCK_RE, () => headHtml);
  out = out.replace(
    '<div id="root"></div>',
    () =>
      prerendered
        ? `<div id="root" data-prerendered="true">${bodyHtml}</div>`
        : `<div id="root">${bodyHtml}</div>`,
  );
  return out;
}

let count = 0;
for (const meta of ALL_PAGES) {
  const bodyHtml = await render(meta.path);
  const headHtml = renderHeadTags(meta);
  const outFile = outFileFor(meta.path);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, assemble(bodyHtml, headHtml, meta.lang));
  count++;
}
console.log(`[prerender] wrote ${count} routes`);

// ─── 404 page (bilingual, noindexed; Netlify serves dist/404.html with a
//     real 404 status for any unknown path once no catch-all exists) ─────
{
  const bodyHtml = await render('/definitely-not-a-real-page');
  const headHtml = [
    '<title>Página no encontrada · Page not found — Selvadentro Tulum</title>',
    '<meta name="robots" content="noindex" />',
    '<meta name="description" content="Esta página no existe. This page does not exist." />',
  ].join('\n    ');
  fs.writeFileSync(path.join(DIST, '404.html'), assemble(bodyHtml, headHtml, 'es'));
  console.log('[prerender] wrote 404.html');
}

// ─── sitemap.xml ─────────────────────────────────────────────────────────
{
  const xmlEsc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const urlEntries = ALL_PAGES.map((meta) => {
    const loc = absUrl(meta.path);
    const lines = [`  <url>`, `    <loc>${xmlEsc(loc)}</loc>`, `    <lastmod>${meta.updated}</lastmod>`];
    if (meta.altPath) {
      const esPath = meta.lang === 'es' ? meta.path : meta.altPath;
      const enPath = meta.lang === 'en' ? meta.path : meta.altPath;
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="es" href="${xmlEsc(absUrl(esPath))}" />`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${xmlEsc(absUrl(enPath))}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEsc(absUrl(esPath))}" />`,
      );
    }
    lines.push(`  </url>`);
    return lines.join('\n');
  });
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urlEntries,
    '</urlset>',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  console.log(`[prerender] wrote sitemap.xml (${ALL_PAGES.length} URLs)`);
}

// ─── pricing.md (machine-readable for AI agents) ─────────────────────────
{
  const md = `# Pricing — Selvadentro Tulum

Residential lots inside a private community in Tulum, Quintana Roo, Mexico,
built around ${PRICING.cenoteCount} natural cenotes with ${PRICING.jungleSharePercent}% of the jungle preserved.

## Lots (Suspiro enclave — currently selling)

- Price: from $${PRICING.lotPriceFromUSD.toLocaleString('en-US')} USD per lot
- Price per m²: from $${PRICING.pricePerM2USD} USD (launch price May 2025: $${PRICING.launchPricePerM2USD} USD/m²)
- Lot sizes: ${PRICING.lotSizeMinM2}–${PRICING.lotSizeMaxM2.toLocaleString('en-US')} m²
- Payment plan: ${PRICING.paymentPlanMonths} months, ${PRICING.paymentPlanInterest}% interest
- Delivery: ${PRICING.deliveryYear} (cenote and amenity access starts at purchase)
- Maintenance fee (HOA): ${PRICING.hoaFeeLabelEn}
- Building rules: max ${PRICING.cosPercent}% lot coverage (COS), ${PRICING.cusPercent}% buildable intensity (CUS), two levels + roof deck
- Projected closing price: $${PRICING.projectedClosePerM2USD} USD/m²

## Contact

- Website: ${SITE_URL}/en/tulum-land-for-sale (ES: ${SITE_URL}/lotes-en-venta-tulum)
- Email: ${ORG.email}
- Phone / WhatsApp: ${ORG.telephone}

Last updated: ${new Date().toISOString().slice(0, 10)}
`;
  fs.writeFileSync(path.join(DIST, 'pricing.md'), md);
  console.log('[prerender] wrote pricing.md');
}

// ─── llms.txt + llms-full.txt ────────────────────────────────────────────
{
  const pageLine = (m) => `- [${m.title}](${absUrl(m.path)}): ${m.description}`;
  const staticEs = ALL_PAGES.filter((m) => m.lang === 'es' && !m.key.startsWith('post:'));
  const staticEn = ALL_PAGES.filter((m) => m.lang === 'en' && !m.key.startsWith('post:'));
  const postsEs = ALL_PAGES.filter((m) => m.lang === 'es' && m.key.startsWith('post:'));
  const postsEn = ALL_PAGES.filter((m) => m.lang === 'en' && m.key.startsWith('post:'));

  const llms = `# Selvadentro Tulum

> Selvadentro is the only private residential community in Tulum, Mexico built around nine natural cenotes, preserving ${PRICING.jungleSharePercent}% of its jungle. Residential lots from $${PRICING.lotPriceFromUSD.toLocaleString('en-US')} USD ($${PRICING.pricePerM2USD} USD/m²) with a ${PRICING.paymentPlanMonths}-month interest-free plan. Developed by JJF Creando (Aldea Zamá, Yucatán Country Club); masterplan by Estudio AMA. SEDETUS Quintana Roo verified full permit compliance in September 2025. Site is bilingual: Spanish at /, English under /en.

Key facts: 9 named cenotes (Mirador, Playa, Piedra, Luz, Azul, Selva, Madera, Vida, Caverna) · lots ${PRICING.lotSizeMinM2}–${PRICING.lotSizeMaxM2.toLocaleString('en-US')} m² · delivery ${PRICING.deliveryYear} · 8 min from the Maya Train, 35 from Tulum International Airport · machine-readable pricing at ${SITE_URL}/pricing.md

## Pages (English)

${staticEn.map(pageLine).join('\n')}

## Páginas (Español)

${staticEs.map(pageLine).join('\n')}

## Guides (English)

${postsEn.map(pageLine).join('\n')}

## Guías (Español)

${postsEs.map(pageLine).join('\n')}

## Contact

- Email: ${ORG.email}
- Phone / WhatsApp: ${ORG.telephone}
- Instagram: ${ORG.instagram}
`;
  fs.writeFileSync(path.join(DIST, 'llms.txt'), llms);

  const stripTags = (html) =>
    html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  const fullSections = POSTS.map(
    (p) =>
      `---\n\n# ${p.title}\n\nURL: ${absUrl(p.path)}\nLanguage: ${p.lang}\nAuthor: ${p.author}\nPublished: ${p.datePublished} · Updated: ${p.updated}\n\n${stripTags(p.html)}\n`,
  );
  fs.writeFileSync(path.join(DIST, 'llms-full.txt'), llms + '\n' + fullSections.join('\n'));
  console.log('[prerender] wrote llms.txt + llms-full.txt');
}
