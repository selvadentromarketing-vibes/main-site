import sharp from 'sharp';
const files = process.argv.slice(2);
for (const f of files) {
  const img = sharp(f);
  const m = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels, W = info.width, H = info.height;
  const px = (x,y) => { const i=(y*W+x)*ch; return [data[i],data[i+1],data[i+2]]; };
  console.log(`\n=== ${f} ${W}x${H} ch=${ch} ===`);
  // corner probes
  const probes = [[0,0],[W-1,0],[0,H-1],[W-1,H-1],[2,2],[W-3,H-3],[W-8,H-8],[W-20,H-20],[W-40,H-40]];
  for (const [x,y] of probes) console.log(`  (${x},${y}) = ${px(x,y)}`);
  // count near-black pixels in each 60x60 corner
  const blk = (x0,y0) => { let n=0; for(let y=y0;y<y0+60;y++) for(let x=x0;x<x0+60;x++){const [r,g,b]=px(x,y); if(r<12&&g<12&&b<12) n++;} return n; };
  console.log(`  near-black in 60x60 corners TL=${blk(0,0)} TR=${blk(W-60,0)} BL=${blk(0,H-60)} BR=${blk(W-60,H-60)} (of 3600)`);
  // uniform border rows/cols
  const rowUniform = (y) => { const [r0,g0,b0]=px(0,y); for(let x=1;x<W;x++){const [r,g,b]=px(x,y); if(Math.abs(r-r0)>6||Math.abs(g-g0)>6||Math.abs(b-b0)>6) return false;} return true; };
  const colUniform = (x) => { const [r0,g0,b0]=px(x,0); for(let y=1;y<H;y++){const [r,g,b]=px(x,y); if(Math.abs(r-r0)>6||Math.abs(g-g0)>6||Math.abs(b-b0)>6) return false;} return true; };
  let topU=0; while(topU<H && rowUniform(topU)) topU++;
  let botU=0; while(botU<H && rowUniform(H-1-botU)) botU++;
  let leftU=0; while(leftU<W && colUniform(leftU)) leftU++;
  let rightU=0; while(rightU<W && colUniform(W-1-rightU)) rightU++;
  console.log(`  uniform border: top=${topU} bottom=${botU} left=${leftU} right=${rightU}`);
  // mean luma
  let s=0,n=0; for(let y=0;y<H;y+=4) for(let x=0;x<W;x+=4){const [r,g,b]=px(x,y); s+=0.2126*r+0.7152*g+0.0722*b; n++;}
  console.log(`  mean luma = ${(s/n).toFixed(1)}`);
}
