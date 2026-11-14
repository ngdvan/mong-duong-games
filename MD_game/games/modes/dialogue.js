import {orderFor,choiceOrder} from '../campaign.js';
import {challengeQuestions as questions} from '../content.js';
const scenes=[
 ['Phòng giao ca','“Mình đã thay BHLĐ, khóa tủ rồi. Nhận lệnh luôn được chưa?”','Bạn nhớ lại chuỗi đầu ca trong bài giảng.'],
 ['Trao đổi trước công việc','“Việc này có nguy cơ rõ ràng đe dọa tính mạng, nhưng chỉ tiêu đang gấp…”','Dữ kiện nguy hiểm được nêu rõ trong lời thoại; hình không dùng để kết luận kỹ thuật.'],
 ['Trong giờ làm việc','Một người đưa chai bia cho đồng đội. “Uống một chút có sao không?”','Lời nhắc cần dựa vào mục hành vi bị cấm.']
];
export function mount(c,variant){const comic=variant==='comic',count=c.config.count,ids=orderFor(questions.length,c.config.level,count);let round=0;c.total(count);
 function draw(){c.clear();const q=questions[ids[round]];c.stage.append(c.el('span',comic?`TRUYỆN ${Math.floor(round/2)+1}/${Math.ceil(count/2)} · LỜI THOẠI ${round%2+1}/2`:`CUỘC TRAO ĐỔI ${round+1}/${count}`,'eyebrow'));
 if(comic){const story=[q.theme,q.prompt,'Các đồng đội đối chiếu dữ kiện trước khi chọn phản hồi.'],panels=c.el('div',undefined,'comic-strip');[story[0],story[1],story[2]].forEach((text,i)=>{const panel=c.el('article',undefined,'comic-panel');const art=c.el('div',i===0?'⛏':i===1?'◯ ◯':'▤','comic-figure');art.setAttribute('aria-hidden','true');panel.append(c.el('small',`KHUNG ${i+1}`),art,c.el('p',text));panels.append(panel);});panels.append(c.el('article','KHUNG 4 · Chọn lời thoại để hoàn thiện câu chuyện bên dưới.','comic-panel waiting'));c.stage.append(panels);}
 const thread=c.el('div',undefined,'chat-thread');thread.append(c.el('p',q.prompt,'bubble mentor'));c.stage.append(thread);c.tell(comic?'Chọn lời thoại cho khung cuối. Khi đúng, câu chuyện được ghi lại cùng giải thích.':'Chọn câu trả lời của bạn. Người hướng dẫn sẽ phản hồi; cần sửa câu chưa phù hợp để tiếp tục.');
 const indexes=choiceOrder(q,c.config,round);const grid=c.choices(c.stage,indexes.map(i=>q.choices[i]),(choice,b)=>{const index=indexes[choice];thread.append(c.el('p',q.choices[index],'bubble worker'));if(c.answer(`dialogue-${round}`,index===q.correct,q)){for(const b of grid.children)b.disabled=true;thread.append(c.el('p',q.explanation,'bubble mentor'));if(comic){const panel=c.stage.querySelector('.waiting');panel.textContent=`KHUNG 4 · ${q.choices[index]}`;panel.classList.add('filled');}c.next(()=>{if(++round===count)c.complete(count);else draw();},comic?'Đọc tiếp câu chuyện →':'Tiếp tục trao đổi →');}else thread.append(c.el('p','Hãy xem lại: '+q.explanation,'bubble mentor correction'));});
 }draw();
}
