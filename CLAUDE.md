# Selvadentro main site — working notes

Bilingual marketing site for Selvadentro, a private residential land
development in Tulum, Quintana Roo. Spanish lives at `/`, English under
`/en`. Vite + React 18 + TypeScript, Tailwind, deployed on Netlify.

## Deploy convention

**"Push" means live.** Develop on a branch, then merge into `main` and push —
Netlify's Git integration deploys `main` automatically. Don't leave finished
work sitting on a feature branch waiting for someone to merge it.

## Build pipeline (`npm run build`)

The site is a **prerendered** SPA: every route ships complete static HTML so
search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot don't execute
JavaScript) get real content, not an empty shell.

```
node scripts/build-content.mjs   markdown collections → src/generated/content.ts
vite build                       client bundle
vite build --ssr …               → dist-ssr/entry-server.js
node scripts/prerender.mjs       React server-render per route + per-page <head>;
                                 emits sitemap.xml, llms.txt, llms-full.txt,
                                 pricing.md, 404.html
node scripts/check-static.mjs    BUILD GATE — fails the deploy if any URL
                                 breaks the SEO contract
```

`npm run typecheck` runs the content build first (the generated module is
gitignored, so it must exist before `tsc`).

Optional: `node scripts/smoke-hydration.mjs` after a build — loads key routes
in headless Chromium and fails on hydration mismatches or console errors.
`node scripts/optimize-images.mjs` is a one-off (outputs are committed).

## Where things live

| Concern | File |
|---|---|
| Site constants, pricing, authors, geo | `src/seo/site.ts` |
| **Route + SEO registry (single source of truth)** | `src/seo/meta.ts` |
| Per-page `<head>` string generation | `src/seo/head.ts` |
| JSON-LD `@graph` builders | `src/seo/schema.ts` |
| Route table → components | `src/routes/AppRoutes.tsx` |
| Landing pages | `src/pages/*Page.tsx` |
| Shared chrome for subpages | `src/components/PageLayout.tsx` |
| Homepage sections | `src/components/sections/` |
| Shared copy (chrome, homepage FAQ, testimonials) | `src/i18n/translations.ts` |
| Cenote/amenity data (map + pages + schema) | `src/data/masterplan.ts` |
| Extended FAQ (page + FAQPage schema) | `src/data/faq.ts` |

Adding a static page = add its ES **and** EN entries to `src/seo/meta.ts`
(with the explicit `altPath` pairing — slugs are localized, never a mechanical
`/en` prefix swap), register the component in `AppRoutes.tsx`, and add it to
the footer nav in `Footer.tsx` (that footer is the crawl path; without a link
the page is an orphan). Routing, prerendering, sitemap, hreflang and the
language switcher all follow from the registry.

## Markdown content collections

```
content/blog/{es,en}/<slug>.md      → /blog/…      · /en/blog/…
content/learn/{es,en}/<slug>.md     → /guia/…      · /en/guide/…     (buyer Q&A)
content/glossary/{es,en}/<slug>.md  → /glosario/…  · /en/glossary/…  (+ `term:`)
```

`content/blog/README.md` documents the frontmatter for editors. Rules the
build enforces: description ≤160 chars, `translationKey` joins the ES/EN pair,
author is `juan-camara` or `omar-curi`, and the body must open with a plain
paragraph — that first paragraph is extracted as the answer/definition and
emitted as FAQPage / DefinedTerm structured data.

## Conventions that matter

- **Header nav is fixed** (Proyecto · Suspiro · Masterplan▾ · Inversión ·
  Testimonios · JJF Creando · Ver disponibilidad). Don't add items; put
  discovery links in the footer.
- Every page's H1 must equal its registry `h1` — the build gate asserts it.
- ES and EN are **adapted, not translated** (national vs foreign buyer angle).
- Never invent facts, prices or dates. Product numbers come from `PRICING`
  in `src/seo/site.ts`; market-wide figures are framed as typical ranges.
- The SEDETUS episode (Sept 11 2025 listing → Sept 16 2025 clearance) is
  addressed transparently with press citations. Keep the dates exact.
- No `Review`/`AggregateRating` schema on our own organization (Google
  penalizes self-serving review markup).
- SSR-safety: no `window`/`document` access during render, no `new Date()` in
  rendered copy — pages are server-rendered at build time and hydrated.
- `public/_redirects` must stay deleted; it overrides `netlify.toml` and would
  resurrect the catch-all that broke 404s and duplicated every URL.

## Analytics (inline in `index.html`, do not touch)

GA4 `G-7F35BWLHTZ`, Meta Pixel `680727997874671`, Microsoft Clarity, PostHog.
The lead form (`src/components/sections/FinalCTASection.tsx`) posts to
`netlify/functions/submit-lead.ts` → GoHighLevel, with reCAPTCHA v3 and a
honeypot, and fires `generate_lead` / Pixel `Lead` on success. The build gate
checks all four analytics fingerprints survive prerendering.
