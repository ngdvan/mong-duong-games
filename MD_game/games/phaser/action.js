import {World} from './world.js?v=trials-1';
import {cases,actionNames} from '../shared/plan.js';
import {topics} from '../../idea-b/content.js';
const distractors=['crate','warning','stop','meal','book','helmet','lamp','brush','radio','no-beer','shield','unknown','clothes','paper','worker'];
async function setup(c,title){c.clear();const heading=c.el('h2',title),instruction=c.el('p','','instruction');c.stage.append(heading,instruction);const w=await World.create(c,{title}),tools=c.el('div',undefined,'world-tools');c.dock.append(tools);return {w,heading,instruction,tools};}
function place(w,object,x,y){object.setPosition(x,y);w.root.add(object);return object;}
function scene(w,q,comic){
 const hero=place(w,w.worker({helmet:q.index!==5}),w.landscape?-4:0,w.landscape?1:-1.7);place(w,w.worker({color:0x7498a0}),w.landscape?-5.6:-1.25,w.landscape?.8:-2.1);place(w,w.scale(w.building(q.index===4?'lamp':'office'),w.landscape?.75:1),w.landscape?-4:3.2,w.landscape?-1.8:-3.5);w.rect(3,1.4,0xa48c62,w.landscape?-4:0,w.landscape?-1:-2.6);
 if([1,3,11].includes(q.index))place(w,w.icon(q.index===11?'unknown':'warning'),w.landscape?-2.5:1.2,w.landscape?.3:-1.7);
 if(q.index===2)place(w,w.scale(w.icon('beer'),.6).setName('case-beer'),w.landscape?-3.55:.45,w.landscape?.5:-1.5);
 if(q.index===6)for(let i=0;i<3;i++)place(w,w.scale(w.icon(['paper','book','pen'][i]),.55).setRotation(i*.12).setName(`clutter-${i}`),(w.landscape?-4.7:-.7)+i*.65,w.landscape?-1:-2.5);
 if(comic&&!w.landscape){for(const x of [-4.3,4.3]){w.rect(2.2,2.5,0xb8caaa,x,-1.7);place(w,w.worker({color:x<0?0xbc9365:0x7299a1}),x,-1.8);}w.rect(11,.07,0x3e6551,0,-.2);}
 return hero;
}
function effect(w,hero,action){
 const item=w.entities.get(`action-${action}`);if(item)item.object.setPosition(.7,-1.1);
 if(action==='helmet'){hero.setVisible(false);place(w,w.worker({helmet:true}),hero.x,hero.y);}
 if(action==='shield')hero.setX(-2.5);
 if(action==='radio'){place(w,w.scale(w.icon('radio'),.5),hero.x+.6,hero.y-.65);for(let i=0;i<3;i++){const ring=w.scene.add.circle(hero.x+.6,hero.y-.65,.25+i*.16).setStrokeStyle(.025,0xe4bc65);w.root.add(ring);w.scene.tweens.add({targets:ring,alpha:.2,duration:250,yoyo:true,repeat:2});}}
 if(action==='no-beer'){w.root.getByName('case-beer')?.setPosition(.5,-2.6);place(w,w.scale(w.icon('stop'),.5),hero.x,hero.y-1.6);}
 if(action==='clothes')place(w,w.scale(w.icon('clothes'),.8),hero.x,hero.y-.7);
 if(action==='brush'){for(let i=0;i<3;i++)w.root.getByName(`clutter-${i}`)?.setPosition(-.5+i*.1,-2.6).setRotation(0);place(w,w.icon('book'),0,-2.6);}
 if(action==='lamp')place(w,w.scale(w.icon('lamp'),.5),hero.x+.5,hero.y-.65);
 w.render();
}
export async function vignette(c,variant='report'){
 const f=await setup(c,variant==='comic'?'Truyện bằng hình':variant==='board'?'Bàn hành trình':'Phản hồi tại hiện trường'),{w}=f,plan=cases(c.config);let r=0,step=0,board=variant==='board';const total=plan.reduce((n,p)=>n+p.actions.length,0);c.total(total);
 function drawBoard(){w.clear();f.heading.textContent=`Bàn hành trình · Ô ${r+1}/${plan.length}`;f.instruction.textContent='Chạm ô đang mở để đưa quân thợ tới tình huống. Hoàn thành hành động mới được đi tiếp.';for(let i=0;i<plan.length;i++){const cols=w.landscape?6:4,row=Math.floor(i/cols),col=row%2?cols-1-i%cols:i%cols,x=(col-(cols-1)/2)*2.6,y=(w.landscape?-1.3:-3)+row*2.6;w.add(`node-${i}`,w.token(i<r?'shield':i===r?'worker':'lock',i===r?0xd1b569:0x557e6c),x,y,{label:`Ô ${i+1}${i>r?', chưa mở':''}`,click:()=>{if(i===r){board=false;draw();}}});}f.tools.replaceChildren();w.render();}
 function draw(){if(board){drawBoard();return;}w.clear();const q=plan[r],wanted=q.actions[step];f.heading.textContent=`${variant==='comic'?'Khung cảnh':'Tình huống'} ${r+1}/${plan.length} · ${step+1}/${q.actions.length}`;f.instruction.textContent=q.prompt;const hero=scene(w,q,variant==='comic'),pool=[wanted,...distractors.filter(k=>!q.actions.includes(k)).slice((r+c.config.level)%4,(r+c.config.level)%4+c.config.choices-1)],shifted=pool.slice((r+1)%pool.length).concat(pool.slice(0,(r+1)%pool.length));shifted.forEach((kind,i)=>w.add(`action-${kind}`,w.token(kind),w.landscape?1.4+i%2*2.7:(i%2-.5)*4,w.landscape?-1.3+Math.floor(i/2)*2.6:1.6+Math.floor(i/2)*2.5,{label:actionNames[kind]||kind,click:()=>act(kind,hero)}));f.tools.replaceChildren(c.button('Gợi ý bằng hình · 5 xu',()=>c.hint(`Tình huống ${r+1}: ${actionNames[wanted]}`,()=>w.glow(`action-${wanted}`)),'secondary'));w.render();}
 function act(kind,hero){const q=plan[r],correct=kind===q.actions[step];if(correct)effect(w,hero,kind);if(c.answer(`scene-${r}-${step}`,correct,q))c.next(()=>{if(++step<q.actions.length)draw();else{step=0;if(++r===plan.length)c.complete(total);else{board=variant==='board';draw();}}});}
 draw();return()=>w.dispose();
}
export async function spot(c){const f=await setup(c,'Mắt tinh — cảnh tương tác'),{w}=f,{count,level}=c.config;let r=0,phase='find';c.total(count*2);
 function draw(){w.clear();const t=(r+level-1)%3,topic=topics[t];f.heading.textContent=`Cảnh ${r+1}/${count}`;f.instruction.textContent=phase==='find'?'Tìm người hoặc đồ vật cần xem xét. Chạm trực tiếp trong cảnh.':topic.observation;const selectedIndex=(r+level)%3;for(let i=0;i<3;i++){const p=w.group().add(w.worker({helmet:!(t===0&&i===selectedIndex)}));if(i===selectedIndex&&t===1)p.add(w.scale(w.icon('beer'),.55).setPosition(.45,-.5));if(i===selectedIndex&&t===2)p.add(w.scale(w.icon('warning'),.65).setPosition(.65,-.4));w.add(`person-${i}`,p,w.landscape?-5+i*1.6:(i-1)*3.5,w.landscape?.7:-2,{label:`Người thợ ${i+1}`,click:()=>find(i)});}w.rect(10,1.2,0x9e8b68,0,-2.1);
 if(phase==='respond'){const expected=['helmet','no-beer','radio'][t],options=[expected,...['crate','stop','warning'].slice(0,c.config.choices-1)];options.forEach((kind,i)=>w.add(`action-${kind}`,w.token(kind),w.landscape?1.4+i%2*2.7:(i%2-.5)*4,w.landscape?-1.3+Math.floor(i/2)*2.6:1.5+Math.floor(i/2)*2.6,{label:actionNames[kind],click:()=>respond(kind,expected)}));f.tools.replaceChildren(c.button('Gợi ý · 5 xu',()=>c.hint(`Cảnh ${r+1}: ${actionNames[expected]}`,()=>w.glow(`action-${expected}`)),'secondary'));}else f.tools.replaceChildren(c.button('Gợi ý · 5 xu',()=>c.hint(`Cảnh ${r+1}: xem người thợ ${selectedIndex+1}`,()=>w.glow(`person-${selectedIndex}`)),'secondary'));w.render();}
 function find(i){if(phase!=='find')return;const topic=topics[(r+level-1)%3],correct=i===(r+level)%3;if(c.answer(`spot-${r}-find`,correct,{source:`MD-01 · ${topic.section}`,explanation:correct?topic.observation:'Điểm này chưa chứa dữ kiện của tình huống. Hãy quan sát các nhân vật còn lại.',theme:topic.title})){phase='respond';c.next(draw);}}
 function respond(kind,expected){const topic=topics[(r+level-1)%3];if(c.answer(`spot-${r}-respond`,kind===expected,{source:`MD-01 · ${topic.section}`,explanation:topic.explanation,theme:topic.title}))c.next(()=>{if(++r===count)c.complete(count*2);else{phase='find';draw();}});}draw();return()=>w.dispose();
}
