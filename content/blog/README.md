# Blog content — how to add or edit posts

Posts are plain markdown files:

```
content/blog/es/<slug>.md   ← Spanish posts (URL: /blog/<slug>)
content/blog/en/<slug>.md   ← English posts (URL: /en/blog/<slug>)
```

`npm run build` (and `npm run dev`) runs `scripts/build-content.mjs`, which
validates every file, renders the markdown, and regenerates routing, the
sitemap, hreflang pairing and the article JSON-LD automatically. **A broken
frontmatter fails the build on purpose** — fix the reported field.

## Frontmatter

```yaml
---
title: "The post H1 — include the target search query naturally"
metaTitle: "Optional <title> override (≤60 chars). Omit if title works."
description: "Meta description. MAX 160 characters — the build enforces it."
slug: url-slug-goes-here            # letters/numbers/hyphens only
translationKey: shared-key          # SAME value on the ES and EN versions
date: 2026-09-01                    # published (YYYY-MM-DD)
updated: 2026-09-01                 # optional; bump when you edit the post
author: juan-camara                 # juan-camara | omar-curi
tags: [legal, compra]               # 2–3 from the vocabulary below
draft: false                        # true = excluded from the site
---
```

- **translationKey pairs the languages.** The ES and EN versions of the same
  topic carry the same key; slugs stay localized. The pairing produces the
  hreflang tags and the ES·EN language switcher target.
- **Tags** drive "related guides": `legal`, `inversion`, `compra`, `cenotes`,
  `tulum-vida`, `costos`, `diseno`, `mercado`. Use the same tags on both
  halves of a pair.

## Body conventions (SEO/AEO)

- First paragraph = a direct 40–60 word answer to the query the post targets.
- `##` headings phrased as the questions people actually search.
- Tables for anything comparable; numbered lists for processes.
- Every statistic carries a date (and a named source if external).
- Link related pages/posts with normal markdown links (`/lotes-en-venta-tulum`).
- Facts about pricing/product must match `src/seo/site.ts` (PRICING).
- No raw HTML. No invented numbers. Honest, calm, brand tone.
