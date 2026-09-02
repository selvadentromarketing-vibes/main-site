import sharp from 'sharp';
const f = 'public/map-cenote-mirador.jpg';
const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
const {width:W, height:H, channels:ch} = info;
const px=(x,y)=>{const i=(y*W+x)*ch; return [data[i],data[i+1],data[i+2]];};
const isBlk=(x,y)=>{const [r,g,b]=px(x,y); return r<14&&g<14&&b<14;};
console.log('--- per-row: rightmost run of black pixels at right edge (last 200 rows) ---');
for (let y=H-1; y>=H-200; y-=10) {
  let run=0; let x=W-1;
  while (x>=0 && isBlk(x,y)) { run++; x--; }
  console.log(`  y=${y}  black run from right edge = ${run}px`);
}
console.log('--- per-col: black run up from bottom edge (last 220 cols) ---');
for (let x=W-1; x>=W-220; x-=10) {
  let run=0; let y=H-1;
  while (y>=0 && isBlk(x,y)) { run++; y--; }
  console.log(`  x=${x}  black run from bottom edge = ${run}px`);
}
// left edge probe: is there a dark band?
console.log('--- left/top edge black runs ---');
for (let y=0;y<H;y+=150){ let run=0,x=0; while(x<W&&isBlk(x,y)){run++;x++;} console.log(`  y=${y} left black run=${run}`); }
for (let x=0;x<W;x+=150){ let run=0,y=0; while(y<H&&isBlk(x,y)){run++;y++;} console.log(`  x=${x} top black run=${run}`); }
