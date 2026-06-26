# Assets pending replacement

> **TL;DR:** the images listed below were extracted from the design team's
> prototype HTML (`Selvadentro_Prototipo_Web.html`, June 2026) as
> *temporary placeholders* so the site can ship visually complete. They are
> low-resolution copies, downsampled from base64 embeds inside the prototype.
> **Every one of them should be swapped for the high-resolution original
> file once the design team delivers it.**

The prototype's own copy already flagged these as `⚠️ PENDIENTE` items.
We're just unblocking visual handoff with what was already in the file.

## Replacement targets

| Section | Current placeholder | High-res replacement target | Notes |
|---|---|---|---|
| **Hero background** | `public/hero-cenote.webp` (465 KB, 1920×1080) | Original cenote photo ≥ 2560 px wide | Already swapped 2026-06-25 for the man-on-walkway shot. May want an even higher-res master version. |
| **Suspiro** entrance render | `public/suspiro-entrance.webp` (469 KB, 1600×900) | Original SUSPIRO entrance render at full resolution (project ARCHIVE) | Jeep approaching the stone SUSPIRO sign with palm trees. |
| **Tu pedazo de selva** lot diagram | `public/lot-diagram.webp` (73 KB, 1400×866) | Original lot dimension diagram at full resolution | Has "Cotizar Ahora" baked in. EN viewers see that Spanish text. Get clean version. |
| **Masterplan** | `public/masterplan.webp` (952 KB, 2400×1552) | `013_260514_MP_AMENIDADES` master file at full resolution | The version that was originally promised in the redesign doc. |
| **Amenities · Naturaleza viva** | `public/amenity-naturaleza.webp` (181 KB, 1200×900) | "Casa del Árbol nocturna" master image | Treehouse at night. |
| **Amenities · Cuerpo y movimiento** | `public/amenity-cuerpo.webp` (253 KB, 1200×1200) | Spa cave render master | Stone alcove spa setup. |
| **Amenities · Vida en comunidad** | `public/amenity-comunidad.webp` (325 KB, 1200×1050) | "Restaurante alberca" master image | A-frame pool pavilion. |
| **Testimonial · Shawn Khodadad** | `public/testimonial-shawn.webp` (67 KB, 800×662) | Original photoshoot file at full resolution | Currently a low-res grab. |
| **Testimonial · Angela Epstein** | `public/testimonial-angela.webp` (52 KB, 800×550) | Individual portrait of Angela (the placeholder is a group photo) | The prototype shipped a group shot tagged "Angela" — get a proper individual portrait. |
| **Testimonial · Ricardo Garza** | `public/testimonial-ricardo.webp` (54 KB, 800×637) | Original photoshoot file at full resolution | Currently a low-res grab. |
| **Location map** | (no image yet — dashed placeholder block) | Suspiro brochure map showing beach + Tren Maya + town | Block lives in `LocationSection.tsx`, currently renders a "📍 Map goes here" placeholder. |
| **Partner logos** | (text-only placeholders in CredentialsSection) | High-res PNG transparent logos: **Maat Handasa**, **AMA Estudio** | JJF Creando logo already present. The other two render as text-on-card placeholders. |
| **Spanish BG film** | (placeholder block on ES About section) | Spanish-language institutional film URL on YouTube/Vimeo | When the URL arrives, swap the placeholder in `AboutSection.tsx` for a `<VideoEmbed youtubeId="…" />`. |

## How to swap

Each placeholder is annotated in code with `{/* PLACEHOLDER (low-res) — … */}`
comments. To swap one:

1. Drop the high-res file into `public/` with the **same filename** as the
   placeholder (e.g. overwrite `public/masterplan.webp`).
2. Run `npm run build` to confirm nothing else broke.
3. Delete the `{/* PLACEHOLDER … */}` comment in the relevant section file.
4. Remove the matching row from this document.

## How to find every placeholder in code

```bash
grep -rn "PLACEHOLDER" src/
```

That single grep is the source of truth — if anything is in there, it
still needs swapping.
