// Shared flat illustrations; no engine imports or gameplay rendering here.
const palette={green:'#315d50',yellow:'#f4c968',skin:'#d9ac81',navy:'#29495b',paper:'#fff4d0'};
const css=c=>typeof c==='number'?'#'+c.toString(16).padStart(6,'0'):c;
export function artwork(kind,{helmet=true,color=palette.yellow}={}){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=192;const c=canvas.getContext('2d');c.scale(1.6,1.6);c.lineWidth=4;c.lineJoin='round';c.lineCap='round';
 const rect=(x,y,w,h,fill)=>{c.fillStyle=css(fill);c.fillRect(x,y,w,h);};
 const circle=(x,y,r,fill)=>{c.fillStyle=css(fill);c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();};
 const path=(pts,fill,stroke)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));if(fill){c.closePath();c.fillStyle=css(fill);c.fill();}if(stroke){c.strokeStyle=css(stroke);c.stroke();}};
 const line=(pts,col=palette.green)=>path(pts,null,col);
 const {green,yellow,skin,navy,paper}=palette;
 const shirt=(col=yellow)=>{path([[39,29],[24,38],[16,65],[33,72],[40,57],[40,100],[81,100],[81,57],[88,72],[104,65],[96,38],[80,29]],col);rect(40,61,41,7,paper);};
 const bottle=()=>{rect(49,17,21,22,'#915b35');rect(42,37,36,63,'#915b35');rect(44,58,32,26,paper);};
 const stop=()=>{c.strokeStyle='#bd563a';c.lineWidth=8;c.beginPath();c.arc(60,60,45,0,Math.PI*2);c.stroke();line([[27,93],[93,27]],'#bd563a');};
 switch(kind){
 case 'worker':rect(39,77,16,34,navy);rect(66,77,16,34,navy);rect(32,104,24,9,green);rect(66,104,24,9,green);rect(35,45,51,38,color);rect(23,48,13,36,color);rect(85,48,13,36,color);rect(35,62,51,6,paper);circle(60,29,17,skin);if(helmet){path([[38,25],[43,10],[60,5],[77,10],[82,25]],yellow);rect(33,24,54,6,yellow);rect(55,12,11,11,paper);}break;
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
 case 'exit':rect(17,13,8,93,green);rect(94,13,8,93,green);rect(17,13,85,9,green);path([[35,53],[69,53],[69,37],[96,64],[69,91],[69,75],[35,75]],yellow);break;
 case 'warning':path([[60,12],[112,102],[8,102]],yellow);rect(55,40,10,34,navy);circle(60,88,6,navy);break;
 case 'unknown':circle(60,60,46,'#8fa5a0');c.strokeStyle=paper;c.lineWidth=7;c.beginPath();c.arc(60,47,18,Math.PI,Math.PI*2.7);c.stroke();line([[51,64],[51,76]],paper);circle(51,90,4,paper);break;
 case 'stop':stop();break;
 case 'crate':rect(15,22,90,81,'#b88d56');rect(19,24,9,76,'#765d3e');rect(91,24,9,76,'#765d3e');line([[28,32],[91,94]],'#765d3e');break;
 default:rect(26,15,70,93,paper);
 }
 return canvas;
}
export function buildingArtwork(kind='office'){
 const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const c=canvas.getContext('2d');
 const color={office:'#bb9564',canteen:'#b97d64',locker:'#739d94',lamp:'#bcab60',bath:'#739ba9',work:'#8c9c7b',guard:'#9c8569'}[kind]||'#739771';
 c.fillStyle=color;c.fillRect(35,85,186,137);c.fillStyle=palette.green;c.beginPath();c.moveTo(20,86);c.lineTo(128,20);c.lineTo(236,86);c.closePath();c.fill();c.fillStyle=palette.navy;c.fillRect(110,150,37,72);c.fillStyle=palette.paper;c.fillRect(52,111,40,36);c.fillRect(166,111,40,36);
 const icon=artwork(({office:'paper',canteen:'meal',locker:'helmet',lamp:'lamp',bath:'shower',work:'worker',guard:'shield'})[kind]||'paper');c.drawImage(icon,88,65,80,80);return canvas;
}
export const stepIcons=['paper','meal','clothes','lamp','book','worker'];
export const endIcons=['shield','lamp','clothes','shower','clothes','exit'];
export const actionIcons=['radio','shield','helmet','no-beer','brush','crate','warning','stop'];
