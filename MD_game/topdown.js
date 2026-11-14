import * as THREE from './vendor/three.module.min.js';
import {stations,missions,gear,SOURCE,freshState,validState,perform} from './missions.js';
import {WORLD,blocked,findPath} from './navigation.js';
const $=s=>document.querySelector(s),storageKey='md-topdown-v2';
let state=freshState();try{const stored=JSON.parse(localStorage.getItem(storageKey));if(validState(stored))state=stored;}catch{}
const buildings=stations.filter(s=>s.building).map(s=>s.building);
if(blocked(state.position.x,state.position.y,buildings))state.position={x:110,y:490};
let renderer,scene,camera,player,objectiveRing,objectivePin,routeLine;
let active=false,path=[],keys=new Set(),lastTime=0,nearby=null,walking=false,lastSaved=0,zoom=1;
const position=new THREE.Vector2(state.position.x,state.position.y),textures=[],geometry=new Set(),materials=new Set();
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const labels=[];
$('#app').innerHTML=`<div class="game-shell"><section class="playfield" aria-label="Khu sinh hoạt mỏ minh họa"><div id="world"></div><div class="world-loading" id="world-loading">Đang chuẩn bị khu sinh hoạt mỏ…</div><div class="world-top"><div class="location-tag"><span class="live-dot"></span>KHU SINH HOẠT MỎ <span class="muted-tag">/ MÔ PHỎNG</span></div><div class="world-tools"><button id="zoom" aria-label="Đổi mức thu phóng bản đồ">⊕</button><button id="help" aria-label="Xem cách chơi">?</button><button id="pause" aria-label="Tạm nghỉ">Ⅱ</button></div></div><div class="mission-card"><div class="mission-top"><span id="chapter">NHIỆM VỤ ĐẦU CA</span><span id="counter"></span></div><h1 id="mission-title"></h1><p id="mission-instruction"></p><div class="mission-bottom"><span class="target-dot"></span><span id="target-name"></span><button id="guide">Dẫn tới điểm này ↗</button></div><div class="mission-progress"><span id="progress-fill"></span></div></div><div class="minimap"><div class="minimap-title">BẢN ĐỒ <span>↑ BẮC MINH HỌA</span></div><svg viewBox="0 0 1300 1000" role="img" aria-label="Bản đồ nhỏ và vị trí của bạn"><rect width="1300" height="1000" rx="60" fill="#55745b"/><path d="M50 510H1250M210 350V650M650 350V650M1090 350V650" fill="none" stroke="#c0b891" stroke-width="90"/>${stations.map(s=>s.building?`<rect x="${s.building.x}" y="${1000-s.building.y-s.building.h}" width="${s.building.w}" height="${s.building.h}" rx="14" fill="${s.color}"/>`:'').join('')}<circle id="mini-target" r="40" fill="none" stroke="#ffd66d" stroke-width="20"/><circle id="mini-player" r="30" fill="#e9fff4" stroke="#152c27" stroke-width="14"/></svg><p>Chấm trắng: bạn · Vòng vàng: nhiệm vụ</p></div><div id="toast" role="status" aria-live="polite"></div><div class="bottom-hint" id="bottom-hint">Chạm mặt đất để đi · WASD / phím mũi tên</div><div class="touch-pad" role="group" aria-label="Điều khiển di chuyển"><button data-direction="up" aria-label="Đi lên">▲</button><button data-direction="left" aria-label="Đi trái">◀</button><span aria-hidden="true">✥</span><button data-direction="right" aria-label="Đi phải">▶</button><button data-direction="down" aria-label="Đi xuống">▼</button></div><button id="interact" class="interact" disabled><span class="interact-icon">↗</span><span id="interact-label">Đến gần một địa điểm</span><kbd>E</kbd></button><div class="map-footnote">Bố trí hư cấu · Không dùng dẫn đường thực tế</div><div class="inventory"><span>TÚI TRANG BỊ</span><div id="inventory-items"></div></div></section><aside class="desktop-note"><span>01 — CA ĐẦU TIÊN CỦA TÔI</span><p>Đi đến nơi. Tự tay làm. Ghi nhớ từng bước an toàn.</p><button id="journal">Sổ hành trình ↗</button></aside></div><dialog id="interaction-dialog" aria-labelledby="interaction-title"></dialog><dialog id="intro-dialog" aria-labelledby="intro-title"></dialog><dialog id="journal-dialog" aria-labelledby="journal-title"></dialog>`;
const world=$('#world'),interaction=$('#interaction-dialog'),intro=$('#intro-dialog'),journal=$('#journal-dialog');
function save(){state.position={x:position.x,y:position.y};try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),6500);}
function mat(color){const m=new THREE.MeshBasicMaterial({color});materials.add(m);return m;}
function rect(x,y,w,h,color,z=0,parent=scene){const g=new THREE.PlaneGeometry(w,h);geometry.add(g);const mesh=new THREE.Mesh(g,mat(color));mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
function circle(x,y,r,color,z=0,parent=scene){const g=new THREE.CircleGeometry(r,24);geometry.add(g);const mesh=new THREE.Mesh(g,mat(color));mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
function textSprite(text,x,y,size=120,color='#f4eedc',bg='#203c32'){
 const c=document.createElement('canvas');c.width=640;c.height=100;const ctx=c.getContext('2d');
 ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(3,3,634,94,20);ctx.fill();ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 43px Arial';ctx.fillText(text,320,52);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;textures.push(t);const m=new THREE.SpriteMaterial({map:t,depthTest:false});materials.add(m);const s=new THREE.Sprite(m);s.position.set(x,y,15);s.scale.set(size,size/6.4,1);scene.add(s);labels.push(s);return s;
}
function makeBuilding(s){const b=s.building,cx=b.x+b.w/2,cy=b.y+b.h/2;
 rect(cx+10,cy-10,b.w+18,b.h+18,'#3c5846',1);rect(cx,cy,b.w,b.h,'#263d36',2);rect(cx,cy+7,b.w-12,b.h-18,s.color,3);
 for(let x=b.x+16;x<b.x+b.w-6;x+=19)rect(x,cy+7,3,b.h-20,'#ffffff',3.1).material.color.lerp(new THREE.Color(s.color),.88);
 rect(cx,cy+7,b.w-12,9,'#3f5146',4);rect(cx-62,cy+42,43,31,'#354e4c',5);rect(cx-62,cy+42,34,23,'#bad0c1',6);
 rect(cx+65,cy-35,42,38,'#d5d5ba',5);circle(cx+65,cy-35,13,'#647569',6);circle(cx+65,cy-35,4,'#bac6af',7);
 const top=s.y>b.y+b.h;const doorY=top?b.y+b.h+7:b.y-7;
 rect(cx,doorY,53,15,'#e5d1a1',5);rect(cx,s.y,74,57,'#b9b590',.6);
 textSprite(s.name,cx,top?b.y+50:b.y+b.h-42,200);
 // The attendant is outside the building; roofs are solid, not enterable rooms.
 npc(s.x+38,s.y,s.id==='work'?'#d6b344':'#d5bf93');
 textSprite(s.symbol,s.x+38,s.y+38,40,'#fff4d0','#325144');
}
function npc(x,y,color){circle(x+3,y-4,15,'#4c6250',6);rect(x,y,22,27,color,7);circle(x,y+5,10,'#e4c38b',8);rect(x,y+10,24,5,'#8a7141',9);}
function tree(x,y,r=26){circle(x+9,y-9,r+4,'#425f46',1);circle(x,y,r,'#355e43',4);circle(x-8,y+8,r*.7,'#456e48',5);circle(x+9,y+7,r*.55,'#557d50',6);}
function setup(){
 renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor('#6d885d');world.append(renderer.domElement);renderer.domElement.setAttribute('aria-label','Bản đồ nhìn từ trên xuống; chạm mặt đất để di chuyển');
 scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-500,500,350,-350,.1,100);camera.position.z=60;
 rect(650,500,1800,1400,'#759260',-4);rect(650,500,1280,980,'#819b6a',-3);
 // Perimeter fence and the walking lanes.
 [35,965].forEach(y=>{rect(650,y,1230,6,'#b0b498',0);for(let x=45;x<1270;x+=45)rect(x,y,6,14,'#d0c8aa',1);});
 [35,1265].forEach(x=>{rect(x,500,5,910,'#b0b498',0);});
 rect(650,490,1200,108,'#b6ad8c',-1);rect(650,490,1200,84,'#c3ba9b',0);
 [210,650,1090].forEach(x=>rect(x,500,90,390,'#c3ba9b',0));
 for(let x=120;x<1200;x+=65){rect(x,490,21,3,'#e5d5a5',.1);}
 for(let i=0;i<95;i++){const x=55+((i*193)%1190),y=60+((i*137)%880);if(Math.abs(y-490)>85&&!buildings.some(b=>x>b.x-20&&x<b.x+b.w+20&&y>b.y-30&&y<b.y+b.h+30))rect(x,y,5,3,i%2?'#a2b57d':'#5c804e',-.5);}
 stations.filter(s=>s.building).forEach(makeBuilding);
 rect(1190,548,75,35,'#786b52',4);rect(1190,548,80,14,'#d3b96c',5);npc(1210,490,'#b9a878');textSprite('Trạm cửa lò',1188,600,167);
 rect(62,490,20,87,'#395b46',3);textSprite('← LỐI RA',105,580,130,'#e6ebd7','#365342');
 // Details seen from above: planted islands, benches, lamp posts and parked carts.
 [[420,805],[420,680],[865,820],[870,680],[420,210],[425,340],[860,205],[860,340],[90,950],[300,940],[1000,940],[1225,945],[75,60],[1200,65]].forEach(([x,y],i)=>tree(x,y,22+i%3*5));
 [[420,570],[860,410],[430,430],[870,570]].forEach(([x,y])=>{rect(x,y,57,18,'#725c42',2);rect(x,y,57,4,'#b49a6d',3);});
 [[390,625],[830,625],[390,365],[830,365]].forEach(([x,y])=>{circle(x+5,y-6,13,'#5f7757',1);circle(x,y,6,'#dfd8b0',6);});
 objectiveRing=circle(210,650,33,'#f0cc68',.5);circle(0,0,25,'#c3ba9b',.6,objectiveRing);
 objectivePin=textSprite('! MỤC TIÊU',210,695,140,'#213b31','#f3d574');
 player=new THREE.Group();scene.add(player);player.position.set(position.x,position.y,10);
 circle(2,-4,17,'#405746',0,player);rect(-8,-10,9,18,'#263c36',1,player).name='foot-left';rect(8,-10,9,18,'#263c36',1,player).name='foot-right';
 rect(0,0,28,24,'#d0bda1',2,player).name='body';rect(-18,0,9,18,'#d0bda1',2,player);rect(18,0,9,18,'#d0bda1',2,player);
 circle(0,4,11,'#b18d67',3,player).name='helmet';rect(0,14,8,5,'#ffedb0',4,player).name='headlamp';
 resize();new ResizeObserver(resize).observe(world);renderer.domElement.addEventListener('pointerdown',onTap);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();active=false;renderer.setAnimationLoop(null);toast('Đồ họa bị gián đoạn. Tải lại trang để tiếp tục từ tiến độ đã lưu.');save();});
 $('#world-loading').hidden=true;renderer.setAnimationLoop(frame);
}
function resize(){if(!renderer)return;const w=world.clientWidth,h=world.clientHeight,aspect=w/h;const halfW=(w<650?290:Math.max(590,aspect*350))*zoom,halfH=halfW/aspect;
 camera.left=-halfW;camera.right=halfW;camera.top=halfH;camera.bottom=-halfH;camera.updateProjectionMatrix();renderer.setSize(w,h,false);updateCamera();renderer.render(scene,camera);
}
function updateCamera(){const halfW=camera.right,halfH=camera.top;
 const tx=halfW>=650?650:Math.max(halfW,Math.min(WORLD.w-halfW,position.x));
 const ty=halfH>=500?500:Math.max(halfH,Math.min(WORLD.h-halfH,position.y));
 camera.position.x=tx;camera.position.y=ty;
}
function frame(time){const dt=Math.min((time-lastTime)/1000,.04);lastTime=time;if(active&&!document.hidden&&!anyDialog())move(dt,time);updateCamera();
 if(objectivePin&&!reduceMotion)objectivePin.position.y=(stations.find(s=>s.id===missions[state.step]?.station)?.y||490)+49+Math.sin(time*.003)*4;
 renderer.render(scene,camera);
 if(active&&time-lastSaved>1800){save();lastSaved=time;}
}
function anyDialog(){return !!document.querySelector('dialog[open]');}
function move(dt,time){
 let dx=(keys.has('right')?1:0)-(keys.has('left')?1:0),dy=(keys.has('up')?1:0)-(keys.has('down')?1:0);
 if(dx||dy){path=[];clearRoute();const length=Math.hypot(dx,dy);dx/=length;dy/=length;}else if(path.length){const target=path[0],distance=Math.hypot(target.x-position.x,target.y-position.y);if(distance<5){path.shift();if(!path.length)clearRoute();return;}dx=(target.x-position.x)/distance;dy=(target.y-position.y)/distance;}
 walking=!!(dx||dy);const speed=185,step=Math.min(speed*dt,path.length?Math.hypot(path[0].x-position.x,path[0].y-position.y):speed*dt);
 if(walking){const nx=position.x+dx*step,ny=position.y+dy*step;if(!blocked(nx,position.y,buildings))position.x=nx;if(!blocked(position.x,ny,buildings))position.y=ny;player.rotation.z=Math.atan2(-dx,dy);}
 player.position.set(position.x,position.y,10);player.getObjectByName('foot-left').position.y=-10+(walking&&!reduceMotion?Math.sin(time*.018)*3:0);player.getObjectByName('foot-right').position.y=-10-(walking&&!reduceMotion?Math.sin(time*.018)*3:0);
 $('#mini-player').setAttribute('cx',position.x);$('#mini-player').setAttribute('cy',1000-position.y);updateNearby();
}
function updateNearby(){const next=stations.find(s=>Math.hypot(s.x-position.x,s.y-position.y)<77)||null;if(next?.id===nearby?.id)return;nearby=next;$('#interact').disabled=!nearby;$('#interact-label').textContent=nearby?`Tương tác · ${nearby.name}`:'Đến gần một địa điểm';}
function clearRoute(){if(routeLine){scene.remove(routeLine);routeLine.geometry.dispose();routeLine.material.dispose();routeLine=null;}}
function navigate(to){if(!active||anyDialog())return;const result=findPath(position,to,buildings);if(!result.length){toast('Chạm vào lối đi hoặc khoảng đất trống. Các tòa nhà không thể đi xuyên qua.');return;}path=result;clearRoute();
 const points=[new THREE.Vector3(position.x,position.y,1),...path.map(p=>new THREE.Vector3(p.x,p.y,1))];const g=new THREE.BufferGeometry().setFromPoints(points);routeLine=new THREE.Line(g,new THREE.LineDashedMaterial({color:'#f6db84',dashSize:10,gapSize:8,transparent:true,opacity:.8}));routeLine.computeLineDistances();scene.add(routeLine);
}
function onTap(e){if(!active||anyDialog())return;const b=renderer.domElement.getBoundingClientRect(),p=new THREE.Vector2((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1),ray=new THREE.Raycaster();ray.setFromCamera(p,camera);const point=new THREE.Vector3();ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1),0),point);
 const station=stations.find(s=>s.building&&point.x>s.building.x&&point.x<s.building.x+s.building.w&&point.y>s.building.y&&point.y<s.building.y+s.building.h||Math.hypot(point.x-s.x,point.y-s.y)<60);
 if(station){if(Math.hypot(position.x-station.x,position.y-station.y)<77){showStation(station);return;}navigate({x:station.x,y:station.y});toast(`Đang đi đến ${station.name}. Đến nơi, bấm “Tương tác”.`);}else navigate({x:point.x,y:point.y});
}
function updateHUD(){const mission=missions[state.step];$('#counter').textContent=`${Math.min(state.step+1,missions.length)} / ${missions.length}`;$('#chapter').textContent=state.step<7?'CHƯƠNG 01 · CHUẨN BỊ ĐẦU CA':'CHƯƠNG 02 · KẾT THÚC CA';
 $('#mission-title').textContent=mission?.title||'Một ca trọn vẹn!';$('#mission-instruction').textContent=mission?.instruction||'Bạn đã thực hiện đủ các bước ôn tập.';
 const s=stations.find(s=>s.id===mission?.station);$('#target-name').textContent=s?.name||'Hoàn thành';$('#progress-fill').style.width=`${state.step/missions.length*100}%`;
 if(s){objectiveRing.position.set(s.x,s.y,.5);objectivePin.position.set(s.x,s.y+49,16);$('#mini-target').setAttribute('cx',s.x);$('#mini-target').setAttribute('cy',1000-s.y);}
 objectiveRing.visible=!!s;objectivePin.visible=!!s;$('#mini-target').style.display=s?'':'none';$('#guide').disabled=!s;
 const names={...Object.fromEntries(gear.map(([id,,name])=>[id,name])),lamp:'Đèn lò',rescue:'Bình tự cứu',order:'Đã nhận lệnh',clean:'Đồ sạch'};
 $('#inventory-items').innerHTML=state.inventory.length?state.inventory.map(id=>`<span>${['lamp','rescue'].includes(id)?'◈':'✓'} ${names[id]}</span>`).join(''):'<em>Chưa nhận trang bị</em>';
 player.getObjectByName('body').material.color.set(state.inventory.includes('clothes')?'#f0bd4f':'#d0bda1');player.getObjectByName('helmet').material.color.set(state.inventory.includes('helmet')?'#f4cd5e':'#b18d67');player.getObjectByName('headlamp').visible=state.inventory.includes('lamp');
 $('#mini-player').setAttribute('cx',position.x);$('#mini-player').setAttribute('cy',1000-position.y);updateNearby();
}
function sourceLine(m){return `<p class="source-line">Nguồn: ${SOURCE} · ${m.source}.</p>`;}
function showStation(s){if(!active||Math.hypot(position.x-s.x,position.y-s.y)>=77)return;keys.clear();path=[];clearRoute();
 const m=missions[state.step],correct=m?.station===s.id;
 interaction.innerHTML=`<div class="dialog-eyebrow">${s.name.toUpperCase()}</div><button class="close-dialog" aria-label="Đóng">×</button><h2 id="interaction-title">${s.person}</h2><p class="dialog-speech">${correct?m.instruction:`Hiện tại bạn cần: ${m?.instruction||'Hoàn thành hành trình.'}`}</p>${correct?`<div class="action-list">${m.actions.map(([id,label])=>`<button data-action="${id}" ${state.done.includes(id)?'disabled':''}><span>${state.done.includes(id)?'✓':'→'}</span>${label}</button>`).join('')}</div><p class="interaction-feedback" role="status">${state.done.length?'Đã thực hiện '+state.done.length+'/'+m.actions.length+' thao tác tại đây.':'Thực hiện từng thao tác để hoàn thành nhiệm vụ.'}</p>${sourceLine(m)}`:`<div class="blocked-note">Chưa thể thực hiện bước ở đây. Hoàn thành nhiệm vụ hiện tại trước để giữ đúng trình tự.</div>${m?sourceLine(m):''}`}<button class="dialog-secondary close-action">Quay lại di chuyển</button>`;
 interaction.querySelector('.close-dialog').onclick=()=>interaction.close();interaction.querySelector('.close-action').onclick=()=>interaction.close();
 interaction.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>act(s,b.dataset.action));
 if(!interaction.open)interaction.showModal();
}
function act(station,action){if(Math.hypot(position.x-station.x,position.y-station.y)>=77)return;const result=perform(state,station.id,action);if(!result.ok){toast(result.message);return;}save();updateHUD();
 if(!result.complete){showStation(station);return;}
 interaction.innerHTML=`<div class="dialog-eyebrow">✓ ĐÃ HOÀN THÀNH</div><h2 id="interaction-title">${result.mission.title}</h2><p class="dialog-speech">${result.message}</p>${sourceLine(result.mission)}${state.step===7?'<div class="blocked-note">Game lược qua thời gian làm việc. Tiếp theo là thực hành trình tự cuối ca; không mô phỏng thao tác khai thác.</div>':''}<p class="next-mission">${missions[state.step]?`Tiếp theo: <strong>${missions[state.step].title}</strong><br>${missions[state.step].instruction}`:'Bạn đã hoàn thành cả hành trình đầu ca và cuối ca.'}</p><button id="continue-mission" class="dialog-primary">${state.step===missions.length?'Xem hành trình đã hoàn thành':'Tiếp tục di chuyển →'}</button>`;
 $('#continue-mission').onclick=()=>{interaction.close();if(state.step===missions.length)showJournal(true);};
}
function showIntro(help=false){keys.clear();path=[];clearRoute();intro.innerHTML=`<div class="dialog-eyebrow">MÔNG DƯƠNG · HỌC AN TOÀN QUA HÀNH ĐỘNG</div><div class="intro-icon">⛏</div><h2 id="intro-title">Ca đầu tiên<br><em>của tôi.</em></h2><p>Bạn là người thợ mới. Tự đi qua khu sinh hoạt mỏ, gặp người hướng dẫn và thực hiện các việc cần làm từ đầu ca đến lúc trở về.</p><div class="how-to"><div><b>01 · DI CHUYỂN</b><span>Chạm mặt đất hoặc công trình để đi đến đó. Dùng cụm phím ▲▼◀▶ trên điện thoại hoặc WASD trên máy tính.</span></div><div><b>02 · TƯƠNG TÁC</b><span>Đứng gần địa điểm, bấm “Tương tác” hoặc phím E. Tự nhận, trả trang bị và làm nhiệm vụ.</span></div><div><b>03 · HỌC TỪ VIỆC LÀM</b><span>Theo chỉ dẫn nhiệm vụ. Mỗi bước đều có giải thích và nguồn. Không giới hạn thời gian.</span></div></div><button id="begin" class="dialog-primary">${help?'Trở lại game':state.started?'Tiếp tục ca của tôi →':'Bắt đầu ca của tôi →'}</button>${state.started&&!help?'<button id="new-game" class="dialog-secondary">Bắt đầu lại từ đầu</button>':''}<p class="intro-disclaimer">Bối cảnh và hội thoại hư cấu. Trình tự theo tài liệu 2017; cần đối chiếu quy trình hiện hành. Game không cấp chứng nhận nghiệp vụ.</p>`;
 $('#begin').onclick=()=>{intro.close();state.started=true;active=true;save();if(state.step===missions.length)showJournal(true);};
 $('#new-game')?.addEventListener('click',()=>{state=freshState();position.set(110,490);state.started=true;active=true;intro.close();save();updateHUD();});if(!intro.open)intro.showModal();
}
function showJournal(complete=false){keys.clear();journal.innerHTML=`<div class="dialog-eyebrow">${complete?'✓ MỘT CA TRỌN VẸN':'SỔ HÀNH TRÌNH'}</div><button class="close-dialog" aria-label="Đóng">×</button><h2 id="journal-title">${state.step}/${missions.length} nhiệm vụ đã thực hiện</h2><p>${complete?'Bạn đã tự đi qua các địa điểm, chuẩn bị đủ bước và hoàn thành việc trả trang bị sau ca.':'Mỗi dấu tích ghi nhận một bước bạn đã tự thực hiện.'}</p><ol class="journal-list">${missions.map((m,i)=>`<li class="${i<state.step?'done':i===state.step?'current':''}"><span>${i<state.step?'✓':i+1}</span><div><b>${m.title}</b>${i<state.step?`<p>${m.lesson}</p><small>${m.source}</small>`:''}</div></li>`).join('')}</ol><p class="source-line">Nguồn chính: ${SOURCE}. Đây là kết quả ôn tập, không phải chứng nhận đủ điều kiện làm việc.</p><button id="journal-close" class="dialog-primary">${complete?'Khám phá lại khu sinh hoạt':'Tiếp tục hành trình'}</button>${complete?'<button id="journal-restart" class="dialog-secondary">Chơi lại từ đầu</button>':''}`;
 journal.querySelector('.close-dialog').onclick=()=>journal.close();$('#journal-close').onclick=()=>journal.close();$('#journal-restart')?.addEventListener('click',()=>{journal.close();state=freshState();position.set(110,490);state.started=true;active=true;save();updateHUD();});if(!journal.open)journal.showModal();
}
const direction={ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right'};
window.addEventListener('keydown',e=>{if(anyDialog()||!active)return;if(direction[e.code]){e.preventDefault();keys.add(direction[e.code]);}if(e.code==='KeyE'&&!e.repeat&&nearby)showStation(nearby);});
window.addEventListener('keyup',e=>keys.delete(direction[e.code]));
window.addEventListener('blur',()=>{keys.clear();save();});
document.addEventListener('visibilitychange',()=>{keys.clear();if(document.hidden){save();renderer?.setAnimationLoop(null);}else{lastTime=performance.now();renderer?.setAnimationLoop(frame);}});
for(const b of document.querySelectorAll('[data-direction]')){b.addEventListener('pointerdown',e=>{e.preventDefault();if(!active||anyDialog())return;b.setPointerCapture(e.pointerId);keys.add(b.dataset.direction);b.classList.add('pressed');});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>{keys.delete(b.dataset.direction);b.classList.remove('pressed');});}
$('#interact').onclick=()=>nearby&&showStation(nearby);$('#guide').onclick=()=>{const m=missions[state.step],s=stations.find(s=>s.id===m?.station);if(s){navigate({x:s.x,y:s.y});toast('Đi theo đường chấm vàng. Đến nơi, bấm Tương tác để tự làm nhiệm vụ.');}};
$('#zoom').onclick=()=>{zoom=zoom===1?1.4:1;resize();};$('#help').onclick=()=>showIntro(true);$('#pause').onclick=()=>{save();active=false;showIntro();};$('#journal').onclick=()=>showJournal();
const sourceDialog=$('#source-dialog');$('#source-button').onclick=()=>{keys.clear();sourceDialog.showModal();};$('#close-source').onclick=()=>sourceDialog.close();
for(const d of document.querySelectorAll('dialog'))d.addEventListener('close',()=>keys.clear());
window.addEventListener('pagehide',()=>save());
try{setup();updateHUD();showIntro();}catch(error){console.error(error);$('#world-loading').textContent='Không khởi tạo được đồ họa. Game cần WebGL 2. Hãy bật tăng tốc phần cứng hoặc thử trình duyệt khác.';$('#interact-label').textContent='Đồ họa chưa sẵn sàng';}
