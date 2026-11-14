import * as THREE from '../vendor/three.module.min.js';
import {topics,scenes,source,fresh,answer,complete} from './content.js';
const $=s=>document.querySelector(s),state=fresh(),world=$('#world'),dialog=$('#question');
let renderer,scene,camera,zoomed=false,active,phase,accepted=false;
const anchors=[],labels=[],raycaster=new THREE.Raycaster();
function mesh(geometry,color,x,y,z,parent=scene){const m=new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color}));m.position.set(x,y,z);parent.add(m);return m;}
function box(w,h,d,c,x,y,z,parent){return mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z,parent);}
function text(text,x,y,z,w=2.5){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#fff3cd';ctx.fillRect(0,0,512,128);ctx.fillStyle='#193e38';ctx.font='bold 44px Arial';ctx.textAlign='center';ctx.fillText(text,256,80);const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map}));s.position.set(x,y,z);s.scale.set(w,w/4,1);scene.add(s);labels.push(s);}
function worker(x,z,helmet=true){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);box(.6,.85,.4,0xeab650,0,1.1,0,g);box(.2,.6,.24,0x334b50,-.17,.4,0,g);box(.2,.6,.24,0x334b50,.17,.4,0,g);mesh(new THREE.SphereGeometry(.24,16,12),0xd9ad85,0,1.82,0,g);if(helmet){mesh(new THREE.SphereGeometry(.28,16,12,0,Math.PI*2,0,Math.PI/2),0xffd55f,0,1.88,0,g);box(.68,.07,.55,0xffd55f,0,1.88,0,g);}box(.18,.7,.2,0xeab650,-.43,1.1,0,g);box(.18,.7,.2,0xeab650,.43,1.1,0,g);return g;}
function disposeScene(){if(!scene)return;scene.traverse(o=>{o.geometry?.dispose();const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];for(const m of ms){m.map?.dispose();m.dispose();}});}
function build(){
 if(!renderer)return;disposeScene();anchors.length=0;labels.length=0;scene=new THREE.Scene();scene.background=new THREE.Color(scenes[state.scene].color);
 scene.add(new THREE.HemisphereLight(0xfff8e1,0x557372,2.4));const sun=new THREE.DirectionalLight(0xffffff,2.5);sun.position.set(-4,9,5);scene.add(sun);
 box(12,.3,8,0xbdbda5,0,-.2,0);box(12,3,.25,0x536e65,0,1.3,-3.6);
 for(let x=-5;x<=5;x+=2){box(.16,4,.2,0x294e47,x,1.8,-3.4);box(1.3,.12,.3,0xe2e6c9,x,3.3,-3.15);}
 box(12,.15,.25,0x294e47,0,3.6,-3.5);
 for(let x=-5;x<=5;x+=1.2)box(.5,.02,.1,0xf4d585,x,0,.1);
 text(['PHÂN XƯỞNG · 01','CHUẨN BỊ · 02','TRAO ĐỔI · 03'][state.scene],0,2.7,-3.2,3.8);
 scenes[state.scene].positions.forEach(([x,,z],i)=>{
 worker(x,z,i!==0);anchors.push(new THREE.Vector3(x,2.6,z));
 if(i===0){box(1.2,.1,.7,0x6b857a,x+.7,.8,z+.6);text('BHLĐ CHƯA ĐỦ',x,2.3,z,2);}
 if(i===1){box(1.3,.12,.8,0x876c51,x+.65,.95,z+.3);for(const dx of [.2,1])box(.08,.9,.08,0x435e57,x+dx,.45,z+.3);mesh(new THREE.CylinderGeometry(.09,.13,.55,12),0x91502c,x+.7,1.3,z+.3);text('BIA',x+.7,1.65,z+.3,.7);}
 if(i===2){worker(x+.85,z+.1);text('BÁO NGUY',x+.3,2.3,z,1.8);}
 });resize();
}
function resize(){if(!renderer||!scene)return;const w=world.clientWidth,h=world.clientHeight;renderer.setSize(w,h,false);const aspect=w/h,size=zoomed?4.3:6.9;camera.left=-size*aspect;camera.right=size*aspect;camera.top=size;camera.bottom=-size;camera.position.set(9,10,13);camera.lookAt(0,.6,0);camera.updateProjectionMatrix();renderer.render(scene,camera);anchors.forEach((v,i)=>{const p=v.clone().project(camera),b=$(`#marker-${i}`);b.style.left=`${(p.x*.5+.5)*w}px`;b.style.top=`${(-p.y*.5+.5)*h}px`;});}
function solved(t,p){return state.solved.includes(`${state.scene}:${t.id}:${p}`);}
function render(){
 $('#scene-count').textContent=`CẢNH ${state.scene+1} / 3`;
 $('#scene-title').textContent=scenes[state.scene].title;
 $('#list').replaceChildren();$('#markers').replaceChildren();
 topics.forEach((t,i)=>{const done=solved(t,'action');for(const parent of [$('#list'),$('#markers')]){const b=document.createElement('button');b.textContent=parent.id==='list'?`${done?'✓':i+1} · ${t.title}`:`${done?'✓':i+1}`;b.onclick=()=>open(t);if(parent.id==='markers'){b.id=`marker-${i}`;b.className=`marker ${done?'done':''}`;b.setAttribute('aria-label',`Tình huống ${i+1}: ${t.title}${done?', đã hoàn thành':''}`);}parent.append(b);}});
 $('#progress').textContent=`${topics.filter(t=>solved(t,'action')).length} / 3 đã sửa đúng`;
 $('#score').textContent=`Đúng lần đầu · Nhận diện: ${state.firstReason}/9 · Phản hồi: ${state.firstAction}/9`;
 $('#next').disabled=!complete(state);$('#next').textContent=state.scene===2?'Xem kết quả →':'Cảnh tiếp theo →';resize();
}
function open(t){active=t;phase=solved(t,'reason')?'action':'reason';question();dialog.showModal();}
function question(){accepted=solved(active,phase);$('#phase').textContent=phase==='reason'?'BƯỚC 1 / 2 · NHẬN DIỆN':'BƯỚC 2 / 2 · PHẢN HỒI';$('#question-title').textContent=active.title;$('#observation').textContent=active.observation;$('#feedback').textContent='';$('#evidence').textContent='';$('#continue').hidden=true;$('#choices').replaceChildren();
 const choices=phase==='reason'?[active.reason,'Chưa có điểm nào cần chú ý trong tình huống này.','Chỉ cần hoàn thành công việc nhanh hơn.']:[active.action,'Tiếp tục làm như cũ để kịp tiến độ.','Bỏ qua vì đó là việc của người khác.'];
 // Deterministic rotation avoids a fixed correct answer position.
 const offset=(state.scene+topics.indexOf(active)+(phase==='action'?1:0))%3;
 for(let i=0;i<3;i++){const index=(i+offset)%3,b=document.createElement('button');b.textContent=choices[index];b.disabled=accepted;b.onclick=()=>choose(index===0);$('#choices').append(b);}
 if(accepted)showEvidence();
}
function choose(correct){if(accepted)return;answer(state,active.id,phase,correct);if(!correct){$('#feedback').textContent=phase==='reason'?'Chưa phù hợp. Đọc lại dữ kiện: tình huống đã nêu rõ vấn đề cần chú ý. Hãy chọn lại.':'Chưa phù hợp. Bỏ qua hoặc chạy theo tiến độ không giải quyết vấn đề. Hãy chọn phản hồi gắn với quy định và trách nhiệm trong tình huống.';$('#evidence').textContent=`${active.explanation} Nguồn: ${source.file} — ${active.section}.`;return;}accepted=true;for(const b of $('#choices').children)b.disabled=true;showEvidence();render();}
function showEvidence(){$('#feedback').textContent='✓ Đã chọn đúng. Hãy đọc giải thích trước khi tiếp tục.';$('#evidence').textContent=`${active.explanation} Nguồn: ${source.file} (${source.year}) — ${active.section}. ${source.status}.`;$('#continue').hidden=false;$('#continue').textContent=phase==='reason'?'Chọn phản hồi →':'Trở lại quan sát';}
$('#continue').onclick=()=>{if(phase==='reason'){phase='action';question();}else dialog.close();};
$('#next').onclick=()=>{if(!complete(state))return;if(state.scene<2){state.scene++;zoomed=false;$('#zoom').setAttribute('aria-pressed','false');$('#zoom').textContent='Phóng to +';render();build();$('#scene-title').setAttribute('tabindex','-1');$('#scene-title').focus();}else{active=null;$('#phase').textContent='ĐÃ HOÀN THÀNH 3 CẢNH';$('#question-title').textContent='Bạn đã sửa đúng cả 9 tình huống';$('#observation').textContent=`Đúng lần đầu: nhận diện ${state.firstReason}/9, phản hồi ${state.firstAction}/9. Không chấm theo thời gian.`;$('#choices').replaceChildren();$('#feedback').textContent=state.errors.length?'Chủ đề cần ôn: '+topics.filter(t=>state.errors.some(k=>k.split(':')[1]===t.id)).map(t=>t.title).join('; '):'Bạn đã chọn đúng tất cả ngay lần đầu.';$('#evidence').textContent='Ba chủ đề được ôn qua ba bố trí khác nhau. Kết quả ôn tập không chứng nhận năng lực làm việc độc lập.';$('#continue').hidden=true;dialog.showModal();}};
$('#restart').onclick=()=>{Object.assign(state,fresh());zoomed=false;$('#zoom').textContent='Phóng to +';$('#zoom').setAttribute('aria-pressed','false');render();build();};
$('#zoom').onclick=()=>{zoomed=!zoomed;$('#zoom').setAttribute('aria-pressed',String(zoomed));$('#zoom').textContent=zoomed?'Thu nhỏ −':'Phóng to +';resize();};
$('#sources').onclick=()=>$('#source-dialog').showModal();document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
render();
try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.domElement.setAttribute('aria-label','Cảnh phân xưởng minh họa ba chiều. Dùng các nút đánh số hoặc danh sách để chọn tình huống.');world.prepend(renderer.domElement);camera=new THREE.OrthographicCamera(-8,8,7,-7,.1,100);build();new ResizeObserver(resize).observe(world);
 // Raycasting also lets users select the worker underneath each numbered point.
 renderer.domElement.addEventListener('pointerup',e=>{const r=renderer.domElement.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hits=raycaster.intersectObjects(scene.children,true);if(!hits.length)return;const p=hits[0].point;let nearest=-1,distance=1.2;anchors.forEach((a,i)=>{const d=Math.hypot(a.x-p.x,a.z-p.z);if(d<distance){distance=d;nearest=i;}});if(nearest>=0)open(topics[nearest]);});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('#fallback').hidden=false;$('#markers').hidden=true;});
}catch(error){console.warn('Three.js unavailable:',error.message);$('#fallback').hidden=false;$('#markers').hidden=true;}
