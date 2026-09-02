/**
 * One-off image optimization (outputs are committed; not part of the build).
 *   node scripts/optimize-images.mjs
 *
 * - Converts the two multi-megabyte raster assets to WebP:
 *     lot-jungle.png (1.8 MB)      → lot-jungle.webp
 *     masterplan-map.jpg (2.25 MB) → masterplan-map.webp  (EXACTLY 3840×1528 —
 *       MasterplanExplorer's MAP_W_PHYS/MAP_H_PHYS depend on it)
 * - Generates the 1200×630 JPG Open Graph images (unfurlers choke on WebP):
 *     og/og-home.jpg    ← hero-cenote.webp
 *     og/og-lots.jpg    ← suspiro-entrance.webp
 *     og/og-cenotes.jpg ← map-cenote-caverna.jpg
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PUB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const kb = (f) => Math.round(fs.statSync(f).size / 1024);

async function toWebp(src, dest, opts = {}) {
  const from = path.join(PUB, src);
  const to = path.join(PUB, dest);
  if (!fs.existsSync(from)) {
    console.log(`skip ${src} — already converted (${dest} in place)`);
    return;
  }
  let img = sharp(from);
  if (opts.width) img = img.resize(opts.width, opts.height ?? null);
  await img.webp({ quality: opts.quality ?? 80 }).toFile(to);
  console.log(`${src} (${kb(from)} KB) → ${dest} (${kb(to)} KB)`);
}

async function toOg(src, dest) {
  const from = path.join(PUB, src);
  const to = path.join(PUB, dest);
  if (!fs.existsSync(from)) {
    console.log(`skip ${src} — source unavailable`);
    return;
  }
  await sharp(from)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, progressive: true })
    .toFile(to);
  console.log(`${src} → ${dest} (${kb(to)} KB, 1200×630)`);
}

fs.mkdirSync(path.join(PUB, 'og'), { recursive: true });

await toWebp('lot-jungle.png', 'lot-jungle.webp', { quality: 82 });
await toWebp('masterplan-map.jpg', 'masterplan-map.webp', {
  width: 3840,
  height: 1528,
  quality: 75,
});
await toOg('hero-cenote.webp', 'og/og-home.jpg');
await toOg('suspiro-entrance.webp', 'og/og-lots.jpg');
await toOg('map-cenote-caverna.jpg', 'og/og-cenotes.jpg');
console.log('done');

// ─── Hero crops ──────────────────────────────────────────────────────────
// Wide, aggressively compressed crops for the page heroes. The full-size
// originals are 250–470 KB each, which is too much to put behind ten
// headers; these land around 100 KB at 2000px wide, and they always sit
// under a dark scrim so fine detail is not doing any work.
// [source, output, crop?] — crop is a pre-resize sharp extract, used where
// the source is a brochure banner rather than a clean plate: the cream page
// margin and the burnt-in SUSPIRO wordmark have to come off before the crop
// can serve as a page hero.
const HEROES = [
  ['suspiro-entrance.webp', 'hero/lots.webp'],
  ['amenity-cenote-mirador.webp', 'hero/cenotes.webp'],
  ['map-cenote-caverna.jpg', 'hero/cenote-land.webp'],
  ['render-pool.webp', 'hero/amenities.webp'],
  ['render-aerial.webp', 'hero/location.webp'],
  // 2060×650 brochure banner: rows 0-31 are cream page, and the wordmark
  // starts near x=1290. Keep the clean left plate (pavilion, pool, cenote).
  ['amenity-casa-cenotes.webp', 'hero/investment.webp', { left: 0, top: 32, width: 1260, height: 618 }],
  ['render-jungle-bar.webp', 'hero/gated.webp'],
  ['amenity-naturaleza.webp', 'hero/eco.webp'],
  ['render-spa.webp', 'hero/living.webp'],
  ['portfolio-chable-resort.webp', 'hero/developer.webp'],
  ['amenity-comunidad.webp', 'hero/preventa.webp'],
];
fs.mkdirSync(path.join(PUB, 'hero'), { recursive: true });
// Target luminance for the crops. The sources range from a night-lit
// cavern to a midday render; behind a single shared scrim that reads as
// "some pages are black bands". Normalising every crop toward one
// luminance is what makes the set feel like one publication.
const HERO_TARGET_LUMA = 112;
const heroDims = [];
for (const [src, dest, crop] of HEROES) {
  const from = path.join(PUB, src);
  if (!fs.existsSync(from)) { console.warn(`hero source missing: ${src}`); continue; }
  const to = path.join(PUB, dest);
  const base = sharp(from);
  if (crop) base.extract(crop);
  // 1600px is plenty behind a scrim, and withoutEnlargement stops a
  // smaller source being upscaled into a *bigger* file than the original —
  // which is why most outputs are NOT 1600×800 and the real size has to be
  // recorded (HERO_IMAGES in src/seo/meta.ts, asserted by check-static).
  const resized = await base
    .resize(1600, 800, { fit: 'cover', position: 'attention', withoutEnlargement: true })
    .toBuffer();
  const { channels } = await sharp(resized).stats();
  const [r, g, b] = channels.slice(0, 3).map((c) => c.mean);
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const brightness = Math.min(2.4, Math.max(1, HERO_TARGET_LUMA / Math.max(luma, 1)));
  const info = await sharp(resized)
    .modulate({ brightness, saturation: 1.06 })
    .webp({ quality: 56, effort: 6 })
    .toFile(to);
  heroDims.push([dest, info.width, info.height]);
  console.log(
    `${src} (${kb(from)} KB, luma ${Math.round(luma)}) → ${dest} ` +
      `(${kb(to)} KB, ${info.width}×${info.height}, ×${brightness.toFixed(2)})`,
  );
}

// Paste-ready block for HERO_IMAGES in src/seo/meta.ts. The declared sizes
// must match the files on disk or the build gate fails, so print them here
// rather than leaving someone to measure by hand.
console.log('\n--- HERO_IMAGES dimensions (src/seo/meta.ts) ---');
for (const [dest, w, h] of heroDims) {
  const key = dest.replace('hero/', '').replace('.webp', '');
  console.log(`  '${key}': { src: '/${dest}', width: ${w}, height: ${h} },`);
}
