import sharp from 'sharp';
import fs from 'node:fs';
const files = process.argv.slice(2);
for (const f of files) {
  try {
    const m = await sharp(f).metadata();
    const st = fs.statSync(f);
    const out = { file: f, bytes: st.size, format: m.format, width: m.width, height: m.height,
      space: m.space, channels: m.channels, depth: m.depth, density: m.density,
      chromaSubsampling: m.chromaSubsampling, isProgressive: m.isProgressive,
      hasProfile: m.hasProfile, hasAlpha: m.hasAlpha, orientation: m.orientation,
      exif: m.exif ? m.exif.length + ' bytes' : null,
      icc: m.icc ? m.icc.length + ' bytes' : null,
      iptc: m.iptc ? m.iptc.length + ' bytes' : null,
      xmp: m.xmp ? (m.xmp.toString('utf8').slice(0,2000)) : null,
      comments: m.comments || null };
    console.log(JSON.stringify(out, null, 2));
    if (m.exif) console.log('EXIF RAW:', JSON.stringify(m.exif.toString('latin1')));
    if (m.icc) console.log('ICC desc:', JSON.stringify(m.icc.toString('latin1').replace(/[^\x20-\x7e]+/g,' ').slice(0,400)));
  } catch (e) { console.log(f, 'ERROR', e.message); }
  console.log('---');
}
