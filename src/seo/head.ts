/**
 * Build-time <head> generation. Pure string functions — no react-helmet,
 * no runtime head manager. Every internal navigation is a full document
 * load of a prerendered file (the site uses plain <a href>, never <Link>),
 * so each page's head is baked once by scripts/prerender.mjs and never
 * needs patching on the client.
 */

import { absUrl } from './site';
import { getMeta, type PageMeta } from './meta';
import { graphFor } from './schema';
import { GUIDES, POSTS, TERMS } from '../generated/content';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** hreflang triplet: es + en + x-default (x-default → the ES page). */
function hreflangTags(meta: PageMeta): string {
  if (!meta.altPath) return '';
  const esPath = meta.lang === 'es' ? meta.path : meta.altPath;
  const enPath = meta.lang === 'en' ? meta.path : meta.altPath;
  return [
    `<link rel="alternate" hreflang="es" href="${absUrl(esPath)}" />`,
    `<link rel="alternate" hreflang="en" href="${absUrl(enPath)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${absUrl(esPath)}" />`,
  ].join('\n    ');
}

export function renderHeadTags(meta: PageMeta): string {
  const url = absUrl(meta.path);
  const ogImage = absUrl(meta.ogImage);
  const locale = meta.lang === 'es' ? 'es_MX' : 'en_US';
  const altLocale = meta.lang === 'es' ? 'en_US' : 'es_MX';
  const record = meta.key.startsWith('post:')
    ? POSTS.find((p) => p.path === meta.path)
    : meta.key.startsWith('guide:')
      ? GUIDES.find((p) => p.path === meta.path)
      : meta.key.startsWith('term:')
        ? TERMS.find((p) => p.path === meta.path)
        : undefined;
  // JSON.stringify output is embedded in a <script> — escape the only
  // dangerous sequence (</script) via <.
  const jsonLd = JSON.stringify(graphFor(meta, record)).replace(/</g, '\\u003c');

  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    hreflangTags(meta),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Selvadentro Tulum" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:locale:alternate" content="${altLocale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    // Media-scoped so phones don't preload the desktop hero (and vice versa).
    meta.preloadHero
      ? `<link rel="preload" as="image" href="/hero-cenote.webp" media="(min-width: 640px)" />\n    <link rel="preload" as="image" href="/hero-cenote-mobile.jpg" media="(max-width: 639px)" />`
      : '',
    // Subpage hero photograph — it is the LCP element on those pages.
    meta.heroImage
      ? `<link rel="preload" as="image" href="${meta.heroImage.src}" />`
      : '',
    `<script type="application/ld+json">${jsonLd}</script>`,
  ];
  return lines.filter(Boolean).join('\n    ');
}

export { getMeta };
