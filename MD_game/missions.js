// Source: docs/MD/Bài giảng huấn luyện AT bước 1. P.TCLĐ.doc (2017).
// Locations and dialogue are learning-game design, not a real mine layout.
export const SOURCE = 'Bài giảng huấn luyện AT bước 1 — P.TCLĐ (2017)';
export const stations = [
 {id:'office',name:'Phòng giao ca',person:'Người giao ca',x:210,y:650,building:{x:80,y:700,w:260,h:175},color:'#c49c62',symbol:'▤'},
 {id:'canteen',name:'Nhà ăn',person:'Người phục vụ',x:650,y:650,building:{x:520,y:700,w:260,h:175},color:'#bd7054',symbol:'♨'},
 {id:'locker',name:'Tủ bảo hộ',person:'Tủ cá nhân',x:1090,y:650,building:{x:960,y:700,w:260,h:175},color:'#658e91',symbol:'▥'},
 {id:'lamp',name:'Nhà đèn',person:'Người cấp phát',x:210,y:350,building:{x:80,y:125,w:260,h:175},color:'#b79b45',symbol:'☀'},
 {id:'bath',name:'Nhà tắm',person:'Khu trả đồ & nhà tắm',x:650,y:350,building:{x:520,y:125,w:260,h:175},color:'#6896aa',symbol:'≈'},
 {id:'work',name:'Điểm nhận việc',person:'Người kèm cặp',x:1090,y:350,building:{x:960,y:125,w:260,h:175},color:'#6b7c66',symbol:'⚒'},
 {id:'guard',name:'Trạm cửa lò',person:'Người trực trạm',x:1190,y:490,color:'#866d58',symbol:'▣'},
 {id:'exit',name:'Lối ra về',person:'Hành lang ngoài',x:70,y:490,color:'#60916a',symbol:'←'}
];
export const gear = [
 ['clothes','Thay quần áo bảo hộ','Quần áo bảo hộ'],
 ['boots','Mang ủng và ghệt','Ủng và ghệt'],
 ['helmet','Đội mũ lò','Mũ lò'],
 ['special','Nhận bảo hộ chuyên dùng theo công việc','Bảo hộ chuyên dùng']
];
const m=(station,title,instruction,actions,source,lesson)=>({station,title,instruction,actions,source,lesson});
export const missions = [
 m('office','Báo công đầu ca','Đến phòng giao ca. Gặp người giao ca và báo công trước khi đi ăn.',[['report','Báo công đầu ca']], 'Bài 2, mục 4.1 và 4.3.a','Báo công tại phòng giao ca của đơn vị trước khi lên nhà ăn Công ty.'),
 m('canteen','Ăn cơm đầu ca','Bạn đã báo công. Đến nhà ăn và nhận suất ăn đầu ca.',[['eat','Nhận và ăn suất cơm đầu ca']], 'Bài 2, mục 4.1','Sau khi báo công, người lao động đi ăn cơm tại nhà ăn Công ty, rồi mới thay bảo hộ.'),
 m('locker','Thay đủ bảo hộ','Đến tủ cá nhân. Thay và mang đủ bốn nhóm bảo hộ nêu trong bài giảng.',gear.map(([id,label])=>[id,label]), 'Bài 2, mục 3; Bài 3, mục 3.6.b','Sử dụng đầy đủ bảo hộ theo công việc được giao. Danh mục trong game cần được đối chiếu với checklist theo nghề của đơn vị.'),
 m('locker','Cất đồ sạch, khóa tủ','Tại tủ cá nhân, cất quần áo sạch và đồ dùng cá nhân rồi khóa tủ.',[['lock','Cất đồ sạch và khóa tủ']], 'Bài 2, mục 4.1','Đồ dùng cá nhân sạch thay ra được đặt trong tủ và khóa lại trước khi đi nhận đèn, bình tự cứu.'),
 m('lamp','Nhận đèn và bình tự cứu','Đến nhà đèn. Nhận cả hai trang bị trước khi về nhận lệnh.',[['lamp','Nhận đèn lò'],['rescue','Nhận bình tự cứu cá nhân']], 'Bài 2, mục 4.1','Bước tại nhà đèn gồm nhận cả đèn và bình tự cứu cá nhân. Game không hướng dẫn thao tác sử dụng bình.'),
 m('office','Trở lại nhận lệnh','Đã đủ trang bị. Trở về phòng giao ca để nhận lệnh sản xuất.',[['order','Nhận lệnh sản xuất']], 'Bài 2, mục 4.1','Nhận lệnh sản xuất sau khi thay bảo hộ và nhận đèn, bình tự cứu; sau đó mới đến vị trí làm việc.'),
 m('work','Đến điểm nhận việc','Đến gặp người kèm cặp tại điểm nhận việc minh họa.',[['arrive','Gặp người kèm cặp tại vị trí làm việc']], 'Bài 2, mục 4.1','Nhận lệnh sản xuất xong mới đến vị trí làm việc. Phần làm việc thực tế được lược qua trong game; không mô phỏng thao tác khai thác.'),
 m('guard','Báo cáo sau ca','Ca làm việc được lược qua. Đến trạm cửa lò để báo cáo và lấy thẻ lò theo quy định.',[['endReport','Báo cáo và lấy thẻ lò theo quy định']], 'Bài 2, mục 4.2','Cuối ca, báo cáo và lấy thẻ lò tại trạm bảo vệ gác cửa lò theo quy định trước khi trả đèn, bình tự cứu.'),
 m('lamp','Trả đèn và bình tự cứu','Trở lại nhà đèn. Trả đủ hai trang bị đã nhận.',[['returnLamp','Trả đèn lò'],['returnRescue','Trả bình tự cứu cá nhân']], 'Bài 2, mục 4.2','Đèn và bình tự cứu được trả tại nhà đèn; không để trong tủ quần áo hoặc nhà tắm.'),
 m('bath','Trả bảo hộ sau ca','Đến khu trả bảo hộ tại nhà tắm trước khi vệ sinh cá nhân.',[['returnGear','Trả trang bị bảo hộ cá nhân']], 'Bài 2, mục 4.2','Sau khi trả đèn và bình tự cứu, người lao động vào nhà tắm trả bảo hộ cá nhân, rồi mới đi tắm.'),
 m('bath','Vệ sinh cá nhân','Bạn đã trả bảo hộ. Thực hiện bước tắm sau ca.',[['wash','Tắm sau ca']], 'Bài 2, mục 4.2','Trả bảo hộ xong đi tắm, sau đó về tủ cá nhân mặc quần áo sạch.'),
 m('locker','Thay quần áo sạch','Trở lại tủ cá nhân và thay quần áo sạch sau khi tắm.',[['clean','Thay quần áo sạch']], 'Bài 2, mục 4.2','Sau khi tắm, về tủ cá nhân mặc quần áo sạch và các trang bị cá nhân.'),
 m('exit','Trọn vẹn một ca','Đi đến lối ra bên trái khu sinh hoạt, kết thúc hành trình ôn tập.',[['leave','Đi theo hành lang ngoài để ra về']], 'Bài 2, mục 4.2','Hoàn thành báo cáo, trả trang bị, tắm và thay đồ sạch, rồi đi theo hành lang ngoài để ra về.')
];
export function freshState(){return {version:2,step:0,done:[],inventory:[],position:{x:110,y:490},started:false};}
export function validState(s){
 if(!s||s.version!==2||!Number.isInteger(s.step)||s.step<0||s.step>missions.length||typeof s.started!=='boolean')return false;
 if(!Array.isArray(s.done)||!Array.isArray(s.inventory)||!s.inventory.every(i=>['clothes','boots','helmet','special','lamp','rescue','order','clean'].includes(i)))return false;
 const keys=missions[s.step]?.actions.map(a=>a[0])||[];
 return new Set(s.done).size===s.done.length&&s.done.every(k=>keys.includes(k))&&Number.isFinite(s.position?.x)&&Number.isFinite(s.position?.y)&&s.position.x>=25&&s.position.x<=1275&&s.position.y>=25&&s.position.y<=975;
}
export function perform(state,station,action){
 const mission=missions[state.step];
 if(!mission)return {ok:false,message:'Bạn đã hoàn thành hành trình.'};
 if(station!==mission.station)return {ok:false,message:`Chưa thực hiện bước này. ${mission.instruction}`};
 if(!mission.actions.some(a=>a[0]===action))return {ok:false,message:`Hãy hoàn thành nhiệm vụ hiện tại: ${mission.title}.`};
 if(state.done.includes(action))return {ok:false,message:'Bạn đã thực hiện thao tác này.'};
 state.done.push(action);
 if([...gear.map(g=>g[0]),'lamp','rescue','order','clean'].includes(action))state.inventory=[...new Set([...state.inventory,action])];
 if(action==='returnLamp')state.inventory=state.inventory.filter(i=>i!=='lamp');
 if(action==='returnRescue')state.inventory=state.inventory.filter(i=>i!=='rescue');
 if(action==='returnGear')state.inventory=state.inventory.filter(i=>!gear.some(g=>g[0]===i));
 const complete=mission.actions.every(([key])=>state.done.includes(key));
 if(complete){state.step++;state.done=[];}
 return {ok:true,complete,mission,message:complete?mission.lesson:'Đã thực hiện. Hãy hoàn thành các thao tác còn lại tại đây.'};
}
