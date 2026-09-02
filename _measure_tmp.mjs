import sharp from 'sharp';
import path from 'node:path';
const PUB = '/home/user/main-site/public';
const HERO_TARGET_LUMA = 112;

async function clipStats(buf, label) {
  const img = sharp(buf);
  const meta = await img.metadata();
  const { channels } = await sharp(buf).stats();
  const [r,g,b] = channels.slice(0,3).map(c=>c.mean);
  const luma = 0.2126*r + 0.7152*g + 0.0722*b;
  // count fully-clipped white pixels (all channels 255)
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const n = info.width*info.height;
  let white=0, anyMax=0;
  for (let i=0;i<n;i++){
    const o=i*info.channels;
    const R=data[o],G=data[o+1],B=data[o+2];
    if (R===255&&G===255&&B===255) white++;
    if (R===255||G===255||B===255) anyMax++;
  }
  console.log(`${label}: ${info.width}x${info.height} means ${r.toFixed(1)}/${g.toFixed(1)}/${b.toFixed(1)} luma ${luma.toFixed(1)} pureWhite ${(100*white/n).toFixed(2)}% anyChanMax ${(100*anyMax/n).toFixed(2)}%`);
  return { luma, r, g, b };
}

for (const [src, dest, crop] of [
  ['map-cenote-caverna.jpg','hero/cenote-land.webp',null],
  ['amenity-cenote-mirador.webp','hero/cenotes.webp',null],
]) {
  const from = path.join(PUB, src);
  const base = sharp(from);
  if (crop) base.extract(crop);
  const resized = await base.resize(1600,800,{fit:'cover',position:'attention',withoutEnlargement:true}).toBuffer();
  const s = await clipStats(resized, `RESIZED  ${src}`);
  const brightness = Math.min(2.4, Math.max(1, HERO_TARGET_LUMA/Math.max(s.luma,1)));
  const out = await sharp(resized).modulate({brightness, saturation:1.06}).webp({quality:56,effort:6}).toBuffer();
  console.log(`  raw ratio = ${(HERO_TARGET_LUMA/s.luma).toFixed(2)}  applied brightness = ${brightness.toFixed(2)}`);
  await clipStats(out, `OUTPUT   ${dest}`);
  // committed file on disk
  const disk = await sharp(path.join(PUB,dest)).toBuffer();
  await clipStats(disk, `ON DISK  ${dest}`);
  console.log('');
}
// og-cenotes for comparison
await clipStats(await sharp(path.join(PUB,'og/og-cenotes.jpg')).toBuffer(), 'ON DISK  og/og-cenotes.jpg');
