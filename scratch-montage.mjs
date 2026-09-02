import sharp from 'sharp';
const cands = ['map-casa-arbol.jpg','map-village.jpg','map-wellness.jpg','map-jungle-gym.jpg','map-acceso.jpg','map-casa-cenotes.jpg','map-pabellon.jpg','map-padel.jpg'];
const tiles = [];
for (const f of cands) {
  const m = await sharp('public/'+f).metadata();
  const buf = await sharp('public/'+f).removeAlpha().extract({left:0, top:m.height-110, width:Math.min(300,m.width), height:110}).resize(600,220,{fit:'fill',kernel:'lanczos3'}).png().toBuffer();
  tiles.push(buf);
}
const H=220*tiles.length;
await sharp({create:{width:600,height:H,channels:3,background:'#000'}})
  .composite(tiles.map((b,i)=>({input:b, top:i*220, left:0})))
  .png().toFile('scratch-bl-montage.png');
console.log(cands.map((f,i)=>`row ${i+1} (y ${i*220}-${i*220+219}): ${f}`).join('\n'));
