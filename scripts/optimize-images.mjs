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
  let img = sharp(from);
  if (opts.width) img = img.resize(opts.width, opts.height ?? null);
  await img.webp({ quality: opts.quality ?? 80 }).toFile(to);
  console.log(`${src} (${kb(from)} KB) → ${dest} (${kb(to)} KB)`);
}

async function toOg(src, dest) {
  const from = path.join(PUB, src);
  const to = path.join(PUB, dest);
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
