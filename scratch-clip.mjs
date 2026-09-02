import sharp from 'sharp';
for (const f of ['public/map-cenote-caverna.jpg','public/hero/cenote-land.webp','public/og/og-cenotes.jpg','public/amenity-cenote-mirador.webp','public/hero/cenotes.webp']) {
  const { data, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width*info.height;
  let clipped=0, black=0;
  for (let i=0;i<data.length;i+=info.channels) {
    if (data[i]>=250 && data[i+1]>=250 && data[i+2]>=250) clipped++;
    if (data[i]<=4 && data[i+1]<=4 && data[i+2]<=4) black++;
  }
  console.log(`${f}  ${info.width}x${info.height}  clipped-white=${(100*clipped/n).toFixed(2)}%  crushed-black=${(100*black/n).toFixed(2)}%`);
}
