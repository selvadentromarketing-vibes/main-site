import sharp from 'sharp';
await sharp('public/map-cenote-mirador.jpg').extract({left:620,top:990,width:280,height:210}).resize({width:840,kernel:'nearest'}).png().toFile('/home/user/main-site/scratch-mirador-BR.png');
await sharp('public/map-cenote-mirador.jpg').extract({left:0,top:0,width:280,height:210}).resize({width:840,kernel:'nearest'}).png().toFile('/home/user/main-site/scratch-mirador-TL.png');
console.log('ok');
