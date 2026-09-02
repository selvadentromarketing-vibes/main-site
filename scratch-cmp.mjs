import sharp from 'sharp';
const files = ['public/map-cenote-mirador.jpg','public/map-cenote-piedra.jpg','public/map-cenote-madera.jpg','public/map-cenote-caverna.jpg','public/amenity-cenote-mirador.webp','public/hero/cenotes.webp','public/hero/cenote-land.webp','public/og/og-cenotes.jpg'];
const sigs = {};
for (const f of files) {
  const b = await sharp(f).removeAlpha().resize(16,16,{fit:'fill'}).greyscale().raw().toBuffer();
  sigs[f] = Array.from(b);
  // dominant hue stats
  const st = await sharp(f).stats();
  console.log(f, 'channel means:', st.channels.map(c=>c.mean.toFixed(1)).join('/'), 'entropy:', st.entropy?.toFixed(3), 'isOpaque:', st.isOpaque);
}
function ncc(a,b){const n=a.length;const ma=a.reduce((s,v)=>s+v,0)/n, mb=b.reduce((s,v)=>s+v,0)/n;let num=0,da=0,db=0;for(let i=0;i<n;i++){const x=a[i]-ma,y=b[i]-mb;num+=x*y;da+=x*x;db+=y*y;}return num/Math.sqrt(da*db);}
console.log('\n--- 16x16 grey normalized cross-correlation (1.0 = same image) ---');
for (let i=0;i<files.length;i++) for (let j=i+1;j<files.length;j++) {
  const r = ncc(sigs[files[i]], sigs[files[j]]);
  if (r > 0.55) console.log(`  ${r.toFixed(4)}  ${files[i]}  vs  ${files[j]}`);
}
console.log('\n--- all pairs among the 4 map photos ---');
const four = files.slice(0,4);
for (let i=0;i<4;i++) for (let j=i+1;j<4;j++) console.log(`  ${ncc(sigs[four[i]],sigs[four[j]]).toFixed(4)}  ${four[i]} vs ${four[j]}`);
