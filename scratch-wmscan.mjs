import sharp from 'sharp';
import fs from 'node:fs';
const files = fs.readdirSync('public').filter(f=>/^(map|amenity|render|hero)-.*\.(jpg|webp)$/.test(f));
for (const f of files) {
  const p = 'public/'+f;
  const m = await sharp(p).metadata();
  const W=m.width,H=m.height;
  // bottom-left region
  const rw = Math.min(230, W), rh = Math.min(120, H);
  const { data, info } = await sharp(p).removeAlpha().extract({left:0, top:H-rh, width:rw, height:rh}).raw().toBuffer({resolveWithObject:true});
  let bright=0, tot=info.width*info.height, sum=0;
  for (let i=0;i<data.length;i+=info.channels){ const l=0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2]; sum+=l; if(l>200) bright++; }
  const mean = sum/tot;
  // also whole-image bright fraction for reference
  console.log(`${f.padEnd(34)} ${String(W).padStart(4)}x${String(H).padEnd(4)}  BL-region mean=${mean.toFixed(1).padStart(6)}  bright>200 = ${(100*bright/tot).toFixed(2)}%`);
}
