import {World} from './world.js?v=trials-1';
import {trialPlan,observations,preparation,dailyProgress,localDay} from '../trials-content.js';
import {refs} from '../content.js';
const put=(w,o,x,y)=>{w.root.add(o.setPosition(x,y));return o;};
// Flat front-facing tunnel. Positions and geometry are learning illustrations only.
function tunnel(w,q,unsafe){
 const wall=w.rect(11,5,0x425b65,0,-.6);for(let i=-4;i<=4;i+=4){w.rect(.18,4.3,0xb49a68,i,-.6);w.rect(3.8,.18,0xb49a68,i,-2.6);}w.rect(10,.15,0x92a995,0,1.6);w.root.sendToBack(wall);
 for(let i=0;i<3;i++){
  const x=(i-1)*3.2,issue=unsafe&&i===q.slot,topic=observations[q.topic],g=w.group();
  if(topic.id==='doors'){
   const open=issue||i===((q.slot+1)%3),frame=w.scene.add.rectangle(0,0,1.8,2.5,0x263f49).setStrokeStyle(.08,0xd5c18c);g.add(frame);
   if(!open)g.add(w.scene.add.rectangle(0,0,1.55,2.3,0x9cb7a1));
   else{g.add(w.scene.add.rectangle(-.85,0,.18,2.3,0xe3c984));}
  }else{
   g.add(w.worker({helmet:!(issue&&topic.id==='ppe')}).setPosition(0,1));
   if(topic.id==='water'){
    if(issue){const graphics=w.scene.make.graphics({add:false});graphics.lineStyle(.12,0x6eb9d2);graphics.beginPath();graphics.moveTo(-.8,-1.4);graphics.lineTo(.9,-.2);graphics.lineTo(.9,.8);graphics.strokePath();graphics.fillStyle(0x8f7656);graphics.fillEllipse(.7,1.3,1.8,.4);g.add(graphics);}
    else g.add(w.scale(w.icon('book'),.5).setPosition(.55,.2));
   }else if(topic.id==='lighter'||topic.id==='beer')g.add(w.scale(w.icon(issue?topic.kind:'lamp'),.7).setPosition(.6,.25));
  }
  w.add(`inspect-${i}`,g,x,-.2,{label:`Vị trí ${i+1}`,click:()=>w.onInspect?.(i)});
 }
 w.render();
}
async function frame(c){c.clear();const heading=c.el('h2',c.game.title),instruction=c.el('p','','instruction');c.stage.append(heading,instruction);const w=await World.create(c);w.scene.children.list.filter(o=>o.depth===-100).forEach(o=>o.setVisible(false));w.scene.cameras.main.setBackgroundColor('#263f49');const tools=c.el('div',undefined,'world-tools');c.dock.append(tools);return {w,heading,instruction,tools};}
function hint(c,f,text,ids){f.tools.append(c.button('Gợi ý · 5 xu',()=>c.hint(text,()=>ids.forEach(id=>f.w.glow(id))),'secondary'));}
function lesson(q){return {...observations[q.topic],theme:observations[q.topic].title};}
export async function mount(c){
 const f=await frame(c),{w}=f,id=c.game.id,plan=trialPlan(id,c.config.level);let round=0,phase='',identified=false,prep=0,selected=null,hearts=3,reviews=[],reviewing=false;
 if(id==='zero-mistake')for(const q of plan)q.slot=Math.floor(Math.random()*3);
 const total=id==='safe-journey'?plan.length*2+preparation.length:plan.length;c.total(total);
 let streak=0;try{const saved=JSON.parse(localStorage.getItem('md-daily-practice-v1')||'null');if(saved?.day===localDay()||saved?.day===localDay(new Date(Date.now()-86400000)))streak=saved.streak||0;}catch{}
 const finish=()=>{if(!c.complete(total))return;if(id==='daily-mine'){try{const key='md-daily-practice-v1',old=JSON.parse(localStorage.getItem(key)||'null');localStorage.setItem(key,JSON.stringify(dailyProgress(old)));}catch{/* optional local streak; campaign has its own storage fallback */}}};
 function advance(){if(++round===plan.length){if(id==='daily-mine'&&reviews.length){reviewing=true;round=0;draw();}else finish();}else draw();}
 function tools(){f.tools.replaceChildren();}
 function preparationDraw(){
  phase='prepare';w.clear();tools();const p=preparation[prep];f.heading.textContent=`Trước ca · ${prep+1}/${preparation.length}`;f.instruction.textContent='Chạm vật rồi chạm khay: trang bị cần nhận hoặc vật phải loại bỏ. Đây là bài ôn, không thay checklist theo nghề.';
  const g=w.token(p.kind);if(p.kind==='lamp')g.add(w.scale(w.icon('rescue'),.6).setPosition(.7,.4));
  w.add('prepare-item',g,0,-1.5,{label:p.label,click:()=>{selected=true;w.glow('prepare-item');},draggable:true,drop:key=>{selected=true;if(key?.startsWith('prepare-bin-'))place(key.endsWith('keep'));}});
  for(const [i,k] of ['keep','remove'].entries())w.add(`prepare-bin-${k}`,w.tray(i?'stop':'shield'),(i?1:-1)*2.5,1.5,{label:i?'Loại bỏ / không dùng':'Trang bị cần nhận',click:()=>place(!i)});
  hint(c,f,p.explanation,[`prepare-bin-${p.keep?'keep':'remove'}`]);w.render();
 }
 function place(keep){if(!selected){w.caption.textContent='Chạm vật trước rồi chọn khay';return;}const p=preparation[prep];if(c.answer(`prepare-${prep}`,keep===p.keep,{...p,theme:'Chuẩn bị trước ca'}))c.next(()=>{selected=null;if(++prep===preparation.length){phase='map';draw();}else preparationDraw();});}
 function map(){
  phase='map';w.clear();tools();f.heading.textContent=`Hành trình · Trạm ${round+1}/${plan.length}`;f.instruction.textContent=c.config.reduced?'Đến trạm đang mở trên sơ đồ minh họa.':'Chạm trạm có vòng sáng để đến kiểm tra hiện trường. Sơ đồ không dùng dẫn đường thật.';
  const hero=put(w,w.worker(),-3.4,1.9);for(let i=0;i<plan.length;i++){
   const x=(i%3-1)*3.1,y=Math.floor(i/3)*2.7-2.4;
   w.add(`station-${i}`,w.token(i<round?'shield':i===round?'lamp':'lock'),x,y,{label:`Trạm ${i+1}`,click:()=>{if(i!==round){w.caption.textContent='Hoàn thành trạm đang mở trước';return;}hero.setPosition(x,y+.5);w.render();if(c.answer(`station-${round}`,true,{source:refs.start,explanation:'Đã đến trạm kiểm tra trong sơ đồ học tập hư cấu. Tiếp theo hãy quan sát hiện trường.',theme:'Hành trình'}))c.next(()=>{phase='observe';draw();});}});
  }w.glow(`station-${round}`);w.render();
 }
 function model(){
  phase='model';w.clear();tools();f.heading.textContent='Ghi nhớ cảnh mẫu';f.instruction.textContent='Cảnh mẫu cho chủ đề này: mũ được đội, không mang vật cấm, cửa gió không mở đồng thời; không có dữ kiện nước bất thường trong hình. Chạm từng vị trí để xem.';
  const q=plan[round];tunnel(w,q,false);w.onInspect=i=>{w.caption.textContent=`Vị trí ${i+1} · ${observations[q.topic].title} — cảnh mẫu`;};
  f.tools.append(c.button('Đã quan sát · Bắt đầu',()=>{phase='observe';draw();},'primary'));
 }
 function draw(){
  if(id==='safe-journey'&&phase==='map'){map();return;}
  if(id==='zero-mistake'&&phase==='model'){model();return;}
  w.clear();tools();identified=false;const q=reviewing?reviews[round]:plan[round],topic=observations[q.topic];
  f.heading.textContent=`${reviewing?'Ôn lại':id==='safety-dispatch'?'Ca trực':id==='daily-mine'?'Trạm ngắn':'Đoạn lò'} ${round+1}/${reviewing?reviews.length:plan.length} · ${topic.title}`;
  f.instruction.textContent=id==='safety-dispatch'?'Hồ sơ ảnh mô phỏng: chạm vị trí cần xem xét, rồi đóng dấu phù hợp. “Đạt” chỉ nói về tiêu chí của ảnh, không cấp phép làm việc thật.':id==='daily-mine'?`Quan sát rồi chạm dấu kiểm hoặc bộ đàm. ${hearts?'♥'.repeat(hearts):'Ôn không giới hạn'} · Chuỗi ${streak} ngày trên máy này. Sai sẽ vào trạm ôn; không mất xu.`:'Quan sát từng vị trí. Nếu có bất thường, chỉ ra vị trí rồi báo cáo; chỉ đi tiếp khi cảnh đạt tiêu chí đang ôn.';
  tunnel(w,q,q.unsafe);
  w.onInspect=i=>{selected=i;w.glow(`inspect-${i}`);if(q.unsafe&&i===q.slot){identified=true;w.caption.textContent=`Đã đánh dấu vị trí ${i+1} để đối chiếu`; }else w.caption.textContent=`Đã xem vị trí ${i+1}`;};
  for(const [key,kind,label] of [['pass','shield',id==='safety-dispatch'?'Đóng dấu đạt tiêu chí ảnh':'Đi tiếp — cảnh đạt'],['report','radio',id==='safety-dispatch'?'Chưa đạt — báo xử lý':'Báo cáo / quay lại']]){const token=w.token(kind);token.add(w.scene.make.text({x:0,y:1.15,text:key==='pass'?'Đạt / Đi tiếp':'Báo cáo',style:{fontFamily:'Arial',fontSize:'32px',color:'#fff4d4',resolution:2},add:false}).setOrigin(.5).setScale(.55/32));w.add(`verdict-${key}`,token,key==='pass'?-2:2,2.5,{label,click:()=>decide(key)});}
  if(id==='zero-mistake')f.tools.append(c.button('Xem lại cảnh mẫu',model,'secondary'));
  hint(c,f,q.unsafe?`${topic.explanation} Xem vị trí ${q.slot+1}, sau đó báo cáo.`:'Cảnh không thể hiện vi phạm tiêu chí đang ôn. Chọn dấu kiểm.',q.unsafe?[`inspect-${q.slot}`,'verdict-report']:['verdict-pass']);
  w.render();
 }
 function decide(key){
  const q=reviewing?reviews[round]:plan[round],correct=q.unsafe?key==='report'&&identified:key==='pass',base=lesson(q);
  const explanation=correct?(q.unsafe?base.explanation:'Cảnh này đạt tiêu chí được minh họa. Không suy ra hiện trường thật an toàn chỉ từ một ảnh. '+base.explanation):q.unsafe&&key==='report'&&!identified?'Hãy chỉ ra vị trí có dữ kiện bất thường trước khi báo cáo. '+base.explanation:q.unsafe?'Bạn đã bỏ sót dữ kiện bất thường. '+base.explanation:'Ảnh không có vi phạm tiêu chí đang ôn; hãy đối chiếu cảnh mẫu, tránh báo nhầm.';
  if(!correct&&id==='daily-mine'){hearts=Math.max(0,hearts-1);if(!reviewing&&!reviews.includes(q))reviews.push(q);}
  if(reviewing){if(correct){c.explain(explanation);c.next(()=>{if(++round===reviews.length)finish();else draw();});}else{c.explain(explanation);c.next(draw,'Ôn lại');}return;}
  if(!correct){c.answer(`check-${round}`,false,{...base,explanation});c.next(draw,'Thử lại');return;}
  if(c.answer(`check-${round}`,true,{...base,explanation}))c.next(()=>{if(id==='safe-journey')phase='map';advance();});
 }
 if(id==='safe-journey')preparationDraw();else if(id==='zero-mistake'){phase='model';model();}else draw();
 return()=>w.dispose();
}
