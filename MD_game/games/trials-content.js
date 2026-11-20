// Prototype scenarios paraphrase checked repository sources; layout/timing are fictional.
import {refs} from './content.js';
export const VENT='MD-04 · Quy định quản lý công tác thông gió và kiểm soát khí gió, phòng ngừa than tự cháy - ký.docx';
export const trialIds=['safe-journey','safety-dispatch','daily-mine','zero-mistake'];
export const observations=[
 {id:'ppe',title:'Bảo hộ theo công việc',kind:'helmet',source:refs.ppe,explanation:'Dùng đầy đủ BHLĐ theo công việc được giao. Hình chỉ kiểm tra việc đội mũ trong cảnh; không thay thế danh mục bảo hộ theo nghề.'},
 {id:'lighter',title:'Vật cấm trong hầm lò',kind:'lighter',source:refs.ban,explanation:'Không mang diêm, bật lửa vào hầm lò, kể cả chưa sử dụng.'},
 {id:'doors',title:'Quan sát hai cửa gió',kind:'door',source:VENT+' · Điều 22 khoản 1',explanation:'Qua cửa gió thường đóng phải mở lần lượt từng cửa; nghiêm cấm mở đồng thời hai cửa. Đây là bài nhận diện, không hướng dẫn điều khiển cửa thật.'},
 {id:'water',title:'Quan sát gương lò',kind:'water',source:VENT+' · Điều 84–85; '+refs.danger,explanation:'Nước chảy có áp lực hoặc nước chảy kèm bùn loãng, nước đục là dữ kiện nguy hiểm trong nguồn. Các trường hợp này phải tạm dừng sản xuất; báo ngay người có trách nhiệm. Không tự khoan hoặc tự xử lý.'},
 {id:'beer',title:'Đồ uống trong giờ làm việc',kind:'beer',source:refs.ban,explanation:'Sử dụng rượu, bia, đồ uống có cồn trong khi làm việc là hành vi bị cấm.'}
];
export function trialPlan(id,level){
 const count=id==='daily-mine'?[3,3,4,4,5,6][level-1]:[2,3,4,5,6,7][level-1];
 return Array.from({length:count},(_,i)=>({topic:(i+level-1)%Math.min(5,level+1),unsafe:(i+level)%3!==0,slot:(i*2+level)%3,seed:level*17+i,station:i%3}));
}
export const preparation=[
 {kind:'helmet',label:'Mũ bảo hộ',keep:true,source:refs.ppe,explanation:'Sử dụng đầy đủ bảo hộ theo công việc. Mũ trong tranh là một phần minh họa, không phải toàn bộ checklist.'},
 {kind:'lamp',label:'Đèn và bình tự cứu',keep:true,source:refs.start,explanation:'Nhận cả đèn và bình tự cứu trước khi nhận lệnh sản xuất.'},
 {kind:'lighter',label:'Bật lửa',keep:false,source:refs.ban,explanation:'Không được mang bật lửa vào hầm lò.'},
 {kind:'beer',label:'Bia',keep:false,source:refs.ban,explanation:'Không sử dụng rượu, bia trong khi làm việc.'}
];
export function localDay(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function dailyProgress(state,today=localDay()){
 const previous=new Date(today+'T12:00:00');previous.setDate(previous.getDate()-1);
 const valid=state&&Number.isSafeInteger(state.streak)&&state.streak>0&&state.streak<100000;
 if(valid&&state.day===today)return {day:today,streak:state.streak};
 return {day:today,streak:valid&&state.day===localDay(previous)?state.streak+1:1};
}
