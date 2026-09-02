import sharp from 'sharp';
await sharp('public/map-mirador.jpg').extract({left:0,top:820,width:200,height:80}).resize({width:1000,kernel:'lanczos3'}).png().toFile('/home/user/main-site/scratch-wm.png');
console.log('ok');
