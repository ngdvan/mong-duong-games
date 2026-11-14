export const source = {file:'Bài giảng huấn luyện AT bước 1. P.TCLĐ.doc', year:2017, status:'Đã đối chiếu tài liệu nguồn; chưa duyệt theo quy trình hiện hành'};
export const topics = [
 {id:'ppe', title:'Trang bị của người thợ', observation:'Người thợ đang làm việc nhưng chưa mang đủ bảo hộ lao động (BHLĐ) theo công việc được giao.', reason:'Chưa sử dụng đầy đủ BHLĐ theo công việc.', action:'Sử dụng đầy đủ BHLĐ theo quy định của công việc.', explanation:'Tài liệu yêu cầu người lao động sử dụng đầy đủ BHLĐ theo ngành nghề và quy định của Công ty. Danh mục cụ thể phải được đơn vị xác nhận.', section:'Bài 3, mục Trang phục tại nơi làm việc, điểm b (bản trích xuất ghi 3.5; đề cương ý tưởng ghi 3.6)'},
 {id:'alcohol', title:'Chai đồ uống bên bàn', observation:'Trong giờ làm việc, một người đang uống bia. Nhãn chai ghi rõ “BIA”.', reason:'Sử dụng đồ uống có cồn trong khi làm việc.', action:'Tuân thủ việc không sử dụng rượu, bia trong khi làm việc.', explanation:'Bài giảng liệt kê sử dụng rượu, bia, đồ uống có cồn trong khi làm việc là hành vi bị cấm.', section:'Bài 3, mục 3.3 — Hành vi bị cấm'},
 {id:'danger', title:'Lời báo nguy từ đồng đội', observation:'Đồng đội báo: “Công việc này có nguy cơ rõ ràng đe dọa tính mạng”. Đây là dữ kiện của tình huống, không phải kết luận từ hình vẽ.', reason:'Đã có thông tin về nguy cơ rõ ràng đe dọa tính mạng.', action:'Báo ngay người có trách nhiệm; nhận biết quyền từ chối công việc hoặc rời nơi nguy hiểm.', explanation:'Mục 3.7 nêu trách nhiệm báo ngay người có trách nhiệm và quyền từ chối công việc/rời nơi làm việc khi có nguy cơ rõ ràng. Liên lạc và rút lui thực tế phải theo phương án của đơn vị.', section:'Bài 3, mục 3.7 — Phòng ngừa tai nạn lao động, bệnh nghề nghiệp'}
];
export const scenes = [
 {title:'Một góc phân xưởng', subtitle:'Quan sát trước khi bắt đầu việc', color:0x92aaa1, positions:[[-3,0,1],[0,0,-1],[3,0,1]]},
 {title:'Khu vực chuẩn bị', subtitle:'Đổi góc nhìn, giữ sự chú ý', color:0xb6a58b, positions:[[3,0,1],[-3,0,1],[0,0,-1]]},
 {title:'Điểm trao đổi công việc', subtitle:'Ôn lại cách nhận diện và phản hồi', color:0x819eaa, positions:[[0,0,-1],[3,0,1],[-3,0,1]]}
];
export const fresh = () => ({scene:0, solved:[], errors:[], firstReason:0, firstAction:0});
export function answer(state, id, phase, correct) {
 const key=`${state.scene}:${id}:${phase}`;
 if(state.solved.includes(key)) return false;
 if(!correct){if(!state.errors.includes(key))state.errors.push(key);return false;}
 state.solved.push(key);
 if(!state.errors.includes(key))state[phase==='reason'?'firstReason':'firstAction']++;
 return true;
}
export const complete = state => topics.every(t=>['reason','action'].every(p=>state.solved.includes(`${state.scene}:${t.id}:${p}`)));
