import {image} from './assets.js?v=trials-1';
// Shared flat illustrations; no engine imports or gameplay rendering here.
const palette={green:'#315d50',yellow:'#f4c968',skin:'#d9ac81',navy:'#29495b',paper:'#fff4d0'};
const css=c=>typeof c==='number'?'#'+c.toString(16).padStart(6,'0'):c;
function paint_artwork(kind,{helmet=true,color=palette.yellow,pose='idle'}={}){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=192;const c=canvas.getContext('2d');c.scale(1.6,1.6);c.lineWidth=4;c.lineJoin='round';c.lineCap='round';
 const rect=(x,y,w,h,fill)=>{c.fillStyle=css(fill);c.fillRect(x,y,w,h);};
 const circle=(x,y,r,fill)=>{c.fillStyle=css(fill);c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();};
 const path=(pts,fill,stroke)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));if(fill){c.closePath();c.fillStyle=css(fill);c.fill();}if(stroke){c.strokeStyle=css(stroke);c.stroke();}};
 const line=(pts,col=palette.green)=>path(pts,null,col);
 const {green,yellow,skin,navy,paper}=palette;
 if(['helmet','lamp','radio','boots','rescue','clothes'].includes(kind)){c.drawImage(image('icon-'+(kind==='clothes'&&color===0xf1edce?'clothes-clean':kind)),0,0,120,120);return canvas;}
 if(kind==='crate'){c.drawImage(image('industrial-043'),8,8,104,104);return canvas;}
 const shirt=(col=yellow)=>{path([[39,29],[24,38],[16,65],[33,72],[40,57],[40,100],[81,100],[81,57],[88,72],[104,65],[96,38],[80,29]],col);rect(40,61,41,7,paper);};
 const bottle=()=>{rect(49,17,21,22,'#915b35');rect(42,37,36,63,'#915b35');rect(44,58,32,26,paper);};
 const stop=()=>{c.strokeStyle='#bd563a';c.lineWidth=8;c.beginPath();c.arc(60,60,45,0,Math.PI*2);c.stroke();line([[27,93],[93,27]],'#bd563a');};
 switch(kind){
 case 'worker':{
  c.drawImage(image('worker-'+pose),0,20,96,108,12,6,96,108);
  c.save();c.globalCompositeOperation='source-atop';c.globalAlpha=.32;c.fillStyle=css(color);c.fillRect(38,68,43,28);c.restore();
  if(helmet){const hat=image('icon-helmet');c.drawImage(hat,27,4,68,44);}break;}
 case 'helmet':path([[22,70],[27,39],[42,23],[76,23],[94,42],[98,70]],yellow);rect(13,69,94,11,yellow);rect(49,40,23,20,paper);line([[60,26],[60,36]]);break;
 case 'boots':for(const x of [19,66]){rect(x,24,26,63,green);rect(x-5,82,40,21,navy);rect(x,38,26,7,yellow);}break;
 case 'clothes':shirt();break;
 case 'lamp':c.strokeStyle=green;c.lineWidth=6;c.beginPath();c.arc(60,28,19,Math.PI,0);c.stroke();rect(32,32,56,65,yellow);rect(39,40,42,31,paper);rect(27,94,66,9,green);rect(53,75,14,10,green);break;
 case 'rescue':rect(30,31,60,71,'#b8c1ac');rect(43,18,34,15,yellow);rect(40,59,40,8,green);rect(56,43,8,40,green);break;
 case 'meal':circle(60,64,45,paper);circle(49,60,24,'#f3e5b4');circle(83,52,13,'#7a9b56');circle(79,80,12,'#cf8c4c');break;
 case 'radio':rect(31,30,58,78,navy);rect(74,8,7,25,navy);rect(41,42,37,21,yellow);for(let i=0;i<4;i++)rect(42,73+i*7,33,3,paper);break;
 case 'shield':path([[24,19],[96,19],[90,78],[60,108],[30,78]],'#4f826a');line([[39,61],[54,78],[82,43]],paper);break;
 case 'beer':bottle();break;
 case 'no-beer':bottle();stop();break;
 case 'cigarette':path([[22,80],[85,39],[92,51],[29,92]],paper);line([[24,83],[33,89]],'#c16a3b');line([[87,30],[78,20],[88,8]],'#8eaaa3');break;
 case 'lighter':rect(36,40,48,63,'#b77a43');rect(36,23,48,20,'#bac1ae');rect(46,14,23,11,navy);break;
 case 'brush':line([[69,14],[52,75]],'#8b6841');rect(22,71,70,14,'#bc8a49');for(let i=0;i<8;i++)rect(23+i*9,85,6,17,'#8a9e5d');break;
 case 'book':rect(23,18,77,85,'#4e7880');rect(26,18,9,85,navy);rect(44,37,42,7,paper);rect(44,52,32,5,paper);rect(36,94,64,9,paper);break;
 case 'pen':path([[35,103],[43,75],[85,15],[98,25],[55,85]],navy);path([[35,103],[43,75],[55,85]],yellow);break;
 case 'ruler':rect(17,39,87,34,yellow);for(let i=0;i<10;i++)rect(21+i*8,40,2,i%2?14:23,navy);break;
 case 'paper':rect(26,15,70,93,paper);for(let i=0;i<5;i++)rect(36,34+i*13,i===4?28:49,4,'#819a85');break;
 case 'lock':c.strokeStyle=green;c.lineWidth=8;c.beginPath();c.arc(60,43,21,Math.PI,0);c.stroke();rect(29,43,62,60,yellow);circle(60,65,7,green);rect(57,65,6,19,green);break;
 case 'shower':line([[29,105],[29,24],[75,24]],'#7d9d94');path([[66,25],[92,25],[101,42],[56,42]],'#7d9d94');for(let i=0;i<4;i++)line([[63+i*10,53],[58+i*12,82]],'#69a7b7');break;
 case 'exit':c.drawImage(image('industrial-070'),28,40,70,48);rect(17,13,8,93,green);rect(94,13,8,93,green);rect(17,13,85,9,green);path([[35,53],[69,53],[69,37],[96,64],[69,91],[69,75],[35,75]],yellow);break;
 case 'warning':path([[60,12],[112,102],[8,102]],yellow);rect(55,40,10,34,navy);circle(60,88,6,navy);break;
 case 'unknown':circle(60,60,46,'#8fa5a0');c.strokeStyle=paper;c.lineWidth=7;c.beginPath();c.arc(60,47,18,Math.PI,Math.PI*2.7);c.stroke();line([[51,64],[51,76]],paper);circle(51,90,4,paper);break;
 case 'stop':stop();break;
 case 'crate':rect(15,22,90,81,'#b88d56');rect(19,24,9,76,'#765d3e');rect(91,24,9,76,'#765d3e');line([[28,32],[91,94]],'#765d3e');break;
 default:rect(26,15,70,93,paper);
 }
 return canvas;
}
function paint_buildingArtwork(kind='office'){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=320;const c=canvas.getContext('2d');
 const labels={office:'GIAO CA',canteen:'NHÀ ĂN',locker:'TỦ ĐỒ',lamp:'NHÀ ĐÈN',bath:'NHÀ TẮM',work:'NHIỆM VỤ',guard:'BẢO VỆ',exit:'LỐI RA'};
 const accent={office:'#4f8791',canteen:'#c8784c',locker:'#d4a545',lamp:'#d4a545',bath:'#66a0af',work:'#6b9071',guard:'#8a7963'}[kind]||'#608572';
 c.fillStyle='#294b59';c.fillRect(24,44,272,250);c.fillStyle=c.createPattern(image('rpg-091'),'repeat');c.fillRect(33,92,254,190);
 for(let x=24;x<296;x+=68)c.drawImage(image(x%136===24?'industrial-029':'industrial-030'),x,35,68,68);
 for(const x of [27,280]){c.drawImage(image('industrial-085'),x,110,13,166);c.drawImage(image('industrial-086'),x-3,104,19,20);}
 c.fillStyle=accent;c.fillRect(24,93,272,16);c.fillStyle='#e8e6cd';c.fillRect(24,279,272,12);
 c.drawImage(image('industrial-071'),122,190,76,90);c.drawImage(image(kind==='office'?'industrial-032':'industrial-074'),98,210,22,30);for(const x of [45,218])c.drawImage(image('industrial-095'),x,179,58,64);
 c.fillStyle='#163e50';c.fillRect(48,117,224,45);c.strokeStyle='#e1c078';c.lineWidth=3;c.strokeRect(48,117,224,45);c.fillStyle='#fff2cc';c.textAlign='center';c.font='bold 21px system-ui,sans-serif';c.fillText(labels[kind]||'TRẠM',160,147);
 const symbol=artwork(({office:'paper',canteen:'meal',locker:'helmet',lamp:'lamp',bath:'shower',work:'worker',guard:'shield'})[kind]||'exit');c.fillStyle='#eee4be';c.beginPath();c.arc(160,70,39,0,Math.PI*2);c.fill();c.drawImage(symbol,122,32,76,76);
 for(const x of [31,289])for(const y of [44,99,283]){c.fillStyle='#f0d79c';c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fill();}return canvas;
}
export const stepIcons=['paper','meal','clothes','lamp','book','worker'];
export const endIcons=['shield','lamp','clothes','shower','clothes','exit'];
export const actionIcons=['radio','shield','helmet','no-beer','brush','crate','warning','stop'];

// Cached offscreen illustrations; both engines upload these as ordinary 2D textures.
function canvas2d(width,height=width){const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;return [canvas,canvas.getContext('2d')];}
function roundPath(c,x,y,w,h,r){c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();}
function rounded(c,x,y,w,h,r,fill,stroke){c.beginPath();roundPath(c,x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
function paint_tokenArtwork(kind,color=0x467363){const [canvas,c]=canvas2d(192);const hex=css(color);c.lineWidth=4;rounded(c,7,7,178,178,28,'#183f50','#e3c278');rounded(c,16,16,160,160,22,hex,'#779e98');c.lineWidth=2;rounded(c,24,24,144,144,16,'#f0ecd6','#ddd4b2');c.drawImage(artwork(kind),26,26,140,140);for(const x of [18,174])for(const y of [18,174]){c.fillStyle='#e5c77f';c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fill();}return canvas;}
function paint_trayArtwork(kind){const [canvas,c]=canvas2d(256,224);c.lineWidth=5;rounded(c,5,5,246,214,22,'#345967','#bbd0c1');rounded(c,17,17,222,190,14,'#d1d7bd','#8daea1');c.setLineDash([8,8]);c.lineWidth=2;rounded(c,33,31,190,158,10,null,'#668b81');c.setLineDash([]);c.drawImage(artwork(kind),64,45,128,128);return canvas;}
function paint_surfaceArtwork(){const [canvas,c]=canvas2d(768,640);c.fillStyle='#264c5d';c.fillRect(0,0,768,640);c.drawImage(image('industrial-029'),0,0,768,640);c.fillStyle='#204856';c.globalAlpha=.7;c.fillRect(0,0,768,640);c.globalAlpha=1;c.lineWidth=4;rounded(c,22,22,724,596,20,'#e3dfbf','#c5ab71');c.strokeStyle='#c6ceb4';c.lineWidth=1;for(let x=44;x<736;x+=32){c.beginPath();c.moveTo(x,40);c.lineTo(x,600);c.stroke();}for(let y=44;y<608;y+=32){c.beginPath();c.moveTo(40,y);c.lineTo(728,y);c.stroke();}for(const x of [12,756])for(const y of [12,628]){c.fillStyle='#e0bd68';c.beginPath();c.arc(x,y,4,0,Math.PI*2);c.fill();}return canvas;}
function paint_sceneArtwork({side=false}={}){
 const [canvas,c]=canvas2d(1024);if(side){
  c.fillStyle='#dce6e1';c.fillRect(0,0,1024,1024);c.globalAlpha=.18;c.fillStyle=c.createPattern(image('industrial-029'),'repeat');c.fillRect(0,0,1024,1024);c.globalAlpha=1;
  c.strokeStyle='#b2c9c5';c.lineWidth=2;for(let n=0;n<=1024;n+=64){c.beginPath();c.moveTo(n,0);c.lineTo(n,1024);c.moveTo(0,n);c.lineTo(1024,n);c.stroke();}
  for(let n=0;n<8;n++){const x=55+n*137,y=90+(n%3)*240;c.strokeStyle='#9fbdb7';c.lineWidth=4;c.beginPath();c.arc(x,y,28,0,Math.PI*2);c.stroke();c.beginPath();c.moveTo(x-42,y);c.lineTo(x+42,y);c.moveTo(x,y-42);c.lineTo(x,y+42);c.stroke();}
  return canvas;
 }
 c.fillStyle=c.createPattern(image('rpg-003'),'repeat');c.fillRect(0,0,1024,1024);c.fillStyle='#e3ead9';c.globalAlpha=.65;c.fillRect(0,0,1024,1024);c.globalAlpha=1;
 c.lineWidth=12;rounded(c,94,135,836,754,28,'#d4ddca','#7e9a8e');c.save();c.beginPath();roundPath(c,110,151,804,722,18);c.clip();c.fillStyle='#e5e1c9';c.fillRect(110,151,804,722);c.globalAlpha=.24;c.fillStyle=c.createPattern(image('rpg-047'),'repeat');c.fillRect(110,151,804,722);c.globalAlpha=1;c.restore();
 c.fillStyle=c.createPattern(image('rpg-015'),'repeat');c.fillRect(467,151,90,722);c.fillRect(110,473,804,78);c.strokeStyle='#f0eed6';c.lineWidth=3;for(const x of [462,562]){c.beginPath();c.moveTo(x,151);c.lineTo(x,873);c.stroke();}
 for(let n=0;n<7;n++){for(const x of [16,948]){const pic=n%2?'rpg-156':'rpg-159';c.drawImage(image(pic),x,118+n*117,60,60);}}
 for(const [x,y] of [[19,19],[899,19],[21,903],[896,903]])c.drawImage(image(x<100?'rpg-195':'rpg-199'),x,y,108,110);
 for(const [i,name] of ['industrial-044','industrial-057','industrial-058'].entries())c.drawImage(image(name),337+i*92,40,64,64);
 for(const [x,y] of [[149,36],[739,37],[151,921],[741,922]]){c.fillStyle='#7a9a8c';c.fillRect(x,y,126,46);c.drawImage(image('industrial-073'),x+5,y+4,116,38);}
 return canvas;
}
function paint_platformArtwork(){const [canvas,c]=canvas2d(280,70);for(let x=0;x<280;x+=70)c.drawImage(image('industrial-029'),x,0,70,70);c.fillStyle='#244c5e';c.fillRect(0,40,280,30);c.fillStyle='#d9b466';c.fillRect(0,8,280,7);c.fillStyle='#e7ece1';c.fillRect(0,0,280,5);for(let x=15;x<280;x+=35){c.fillStyle='#acc2ba';c.beginPath();c.arc(x,55,3,0,Math.PI*2);c.fill();}return canvas;}

function paint_cardArtwork(){const [canvas,c]=canvas2d(256,240);c.lineWidth=5;rounded(c,5,5,246,230,21,'#173d50','#d9ba71');rounded(c,17,17,222,206,14,'#386c6c','#78a092');c.strokeStyle='#517f79';c.lineWidth=1;for(let n=30;n<230;n+=18){c.beginPath();c.moveTo(n,25);c.lineTo(n,215);c.stroke();}for(const x of [15,241])for(const y of [15,225]){c.fillStyle='#e7cc84';c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fill();}return canvas;}
function paint_jigsawArtwork(type){const [canvas,c]=canvas2d(600,400);c.fillStyle='#d6e0d5';c.fillRect(0,0,600,400);c.drawImage(sceneArtwork(),0,380,1024,640,0,0,600,400);c.drawImage(buildingArtwork(['lamp','bath','locker'][type]),140,10,320,320);c.fillStyle='#ecdec0';c.beginPath();c.moveTo(274,304);c.lineTo(326,304);c.lineTo(390,400);c.lineTo(210,400);c.fill();const person=artwork('worker');c.drawImage(person,405,220,110,110);return canvas;}

const cache=new Map();
function memo(key,paint){if(!cache.has(key))cache.set(key,paint());return cache.get(key);}
export function artwork(kind,options={}){return memo('icon:'+kind+JSON.stringify(options),()=>paint_artwork(kind,options));}
export function buildingArtwork(kind='office'){return memo('building:'+kind,()=>paint_buildingArtwork(kind));}
export function tokenArtwork(kind,color=0x467363){return memo('token:'+kind+color,()=>paint_tokenArtwork(kind,color));}
export function trayArtwork(kind){return memo('tray:'+kind,()=>paint_trayArtwork(kind));}
export function surfaceArtwork(){return memo('surface',()=>paint_surfaceArtwork());}
export function sceneArtwork(options={}){return memo('scene:'+!!options.side,()=>paint_sceneArtwork(options));}
export function platformArtwork(){return memo('platform',()=>paint_platformArtwork());}
export function cardArtwork(){return memo('card',()=>paint_cardArtwork());}
export function jigsawArtwork(type){return memo('jigsaw:'+type,()=>paint_jigsawArtwork(type));}
