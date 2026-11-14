// Paraphrases of MD-01 (2017), except mentor orientation: MD-02/03.
// Scenarios and illustrative locations are fictional, never site operating procedures.
export const refs={start:'MD-01 · Bài 2, mục 4.1 — Đầu ca',end:'MD-01 · Bài 2, mục 4.2 — Cuối ca',ban:'MD-01 · Bài 3, mục 3.3 — Hành vi bị cấm',tidy:'MD-01 · Bài 3, mục 3.4.c và mục Vệ sinh lao động',ppe:'MD-01 · Bài 3, mục Trang phục tại nơi làm việc, điểm b (đánh số 3.5/3.6 cần đối chiếu)',danger:'MD-01 · Bài 3, mục 3.7 — Phòng ngừa tai nạn',mentor:'MD-02 · Trang PDF 2 mục III; trang PDF 3, tuần thứ nhất. MD-03 · Trang PDF 4 mục II.4.1'};
export const startSteps=['Báo công','Ăn cơm đầu ca','Thay BHLĐ, cất đồ sạch và khóa tủ','Nhận đèn và bình tự cứu','Nhận lệnh sản xuất','Đến vị trí làm việc'];
export const endSteps=['Báo cáo và lấy thẻ lò theo quy định','Trả đèn và bình tự cứu tại nhà đèn','Trả BHLĐ tại nhà tắm','Tắm sau ca','Thay quần áo sạch tại tủ cá nhân','Đi theo hành lang ngoài để ra về'];
const q=(id,prompt,choices,correct,explanation,source,theme)=>({id,prompt,choices,correct,explanation,source,theme});
export const questions=[
 q('lamp','Đã thay bảo hộ và khóa tủ. Trước khi nhận lệnh, bạn còn bước nào?', ['Nhận đèn và bình tự cứu','Đến vị trí làm việc ngay','Ra về'],0,'Theo chuỗi đầu ca, nhận cả đèn và bình tự cứu tại nhà đèn rồi mới nhận lệnh sản xuất.',refs.start,'Chuỗi đầu ca'),
 q('danger','Tình huống nêu rõ công việc có nguy cơ đe dọa tính mạng. Phản hồi nào phù hợp?',['Tiếp tục để đủ chỉ tiêu','Báo ngay người có trách nhiệm; nhận biết quyền từ chối hoặc rời nơi nguy hiểm','Tự sửa thiết bị để thử'],1,'Tài liệu nêu trách nhiệm báo ngay và quyền từ chối/rời nơi nguy hiểm. Liên lạc, rút lui phải theo phương án đơn vị; bài học không hướng dẫn cứu hộ.',refs.danger,'Báo nguy cơ và quyền'),
 q('alcohol','Đồng đội đang uống bia trong giờ làm việc. Bạn nhận định thế nào?',['Chỉ bị cấm nếu làm chậm','Có thể uống nếu ít','Đây là hành vi bị cấm trong bài giảng'],2,'Sử dụng rượu, bia, đồ uống có cồn trong khi làm việc nằm trong mục hành vi bị cấm.',refs.ban,'Hành vi bị cấm'),
 q('report','Bạn phát hiện một nguy cơ mất an toàn. Trách nhiệm được nêu trong tài liệu là gì?',['Báo ngay người có trách nhiệm','Đợi đến hết ca mới nói','Bỏ qua khi chưa có tai nạn'],0,'Khi phát hiện nguy cơ hoặc sự cố, người lao động phải báo ngay người có trách nhiệm.',refs.danger,'Báo nguy cơ và quyền'),
 q('return','Cuối ca, đèn và bình tự cứu cần trả ở đâu theo bài giảng?',['Tủ cá nhân','Nhà đèn','Nhà ăn'],1,'Trả đèn lò và bình tự cứu tại nhà đèn trước bước trả BHLĐ và tắm.',refs.end,'Chuỗi cuối ca'),
 q('ppe','Trang bị theo nghề còn thiếu. Nội dung cần nhớ là gì?',['Tự bỏ món gây vướng','Lấy một danh mục bất kỳ trên mạng','Sử dụng đầy đủ BHLĐ theo quy định công việc'],2,'Bài giảng yêu cầu sử dụng đầy đủ BHLĐ theo ngành nghề. Danh mục theo công việc phải do đơn vị xác nhận.',refs.ppe,'Bảo hộ lao động'),
 q('clean','Nơi làm việc cần được giữ thế nào?',['Gọn gàng, sạch sẽ; dụng cụ đúng nơi quy định','Để đâu tiện tay','Chỉ dọn khi kiểm tra'],0,'Giữ nơi làm việc gọn gàng, ngăn nắp, sạch sẽ và để công cụ đúng nơi quy định là nội dung của bài giảng.',refs.tidy,'Nơi làm việc'),
 q('before-meal','Theo chuỗi đầu ca, trước khi lên nhà ăn cần làm gì?',['Nhận lệnh trước','Báo công tại phòng giao ca','Đi làm ngay'],1,'Báo công tại phòng giao ca rồi đi ăn cơm đầu ca.',refs.start,'Chuỗi đầu ca'),
 q('after-bath','Theo chuỗi cuối ca, sau khi tắm bạn làm gì?',['Đi nhận lệnh mới','Mặc lại bảo hộ vừa trả','Về tủ cá nhân thay quần áo sạch'],2,'Sau khi tắm, về tủ cá nhân mặc quần áo sạch và trang bị cá nhân trước khi ra về.',refs.end,'Chuỗi cuối ca'),
 q('order','Theo bài giảng, sau khi nhận lệnh sản xuất là bước nào?',['Đến vị trí làm việc','Bỏ qua trang bị chưa nhận','Ăn cơm đầu ca'],0,'Nhận lệnh sau khi chuẩn bị trang bị; nhận lệnh xong mới đến vị trí làm việc.',refs.start,'Chuỗi đầu ca'),
 q('gear-return','Tại nhà tắm, bước nào đứng trước tắm sau ca?',['Nhận đèn','Trả BHLĐ cá nhân','Ra về'],1,'Trả BHLĐ tại nhà tắm rồi tắm, sau đó thay đồ sạch.',refs.end,'Chuỗi cuối ca'),
 q('unknown','Bộ tài liệu ở đây chỉ nêu chủ đề khí mỏ, chưa cho quy trình chi tiết. Có thể tự đặt ngưỡng khí để làm đáp án không?',['Có, nếu thấy hợp lý','Có, nếu mọi người đồng ý','Không; cần bổ sung quy trình được xác nhận'],2,'Tên chủ đề đào tạo không đủ để suy ra ngưỡng khí hoặc thao tác xử lý. Phải bổ sung nguồn được xác nhận.', 'MD-03 · Trang PDF 4 — chương trình khí mỏ, thông gió; giới hạn bộ nguồn hiện có','Tìm căn cứ')
];
export const sortCards=[
 ['Báo ngay người có trách nhiệm khi phát hiện nguy cơ',0,refs.danger,'Báo nguy cơ là trách nhiệm được nêu tại mục 3.7.'],
 ['Uống bia trong khi làm việc',1,refs.ban,'Đồ uống có cồn trong khi làm việc thuộc mục hành vi bị cấm.'],
 ['Sử dụng đầy đủ BHLĐ theo quy định công việc',0,refs.ppe,'Bài giảng yêu cầu dùng đầy đủ BHLĐ theo ngành nghề.'],
 ['Hút thuốc tại khu vực cấm hút thuốc khi làm việc',1,refs.ban,'Hút thuốc tại khu vực cấm trong khi làm việc là hành vi bị cấm.'],
 ['Giữ nơi làm việc gọn gàng, sạch sẽ',0,refs.tidy,'Vệ sinh và sự gọn gàng tại nơi làm việc thuộc trách nhiệm người lao động.'],
 ['Hủy hoại hoặc chiếm đoạt tài sản Công ty',1,refs.ban,'Bài giảng liệt kê hủy hoại, chiếm đoạt tài sản trong mục bị cấm.'],
 ['Để công cụ làm việc đúng nơi quy định',0,refs.tidy,'Dụng cụ và phương tiện cần để đúng nơi quy định.'],
 ['Sử dụng chất gây nghiện trong khi làm việc',1,refs.ban,'Sử dụng chất gây nghiện thuộc hành vi bị cấm.'],
 ['Bảo đảm vệ sinh phương tiện được giao',0,refs.tidy,'Người lao động có trách nhiệm giữ vệ sinh nơi làm việc và phương tiện được giao.'],
 ['Mang diêm, bật lửa vào hầm lò',1,refs.ban,'Bài giảng cấm mang diêm, bật lửa vào hầm lò, kể cả chưa sử dụng.'],
 ['Báo ngay khi phát hiện sự cố mất an toàn',0,refs.danger,'Báo ngay người có trách nhiệm khi có sự cố.'],
 ['Gây lãng phí tài sản của Công ty',1,refs.ban,'Gây lãng phí tài sản Công ty được liệt kê trong mục hành vi bị cấm.']
].map(([prompt,correct,source,explanation],i)=>({id:`sort-${i}`,prompt,correct,source,explanation,theme:correct?'Hành vi bị cấm':'Trách nhiệm'}));
export const responseCards=['Báo ngay người có trách nhiệm','Nhận biết quyền từ chối công việc/rời nơi nguy hiểm','Sử dụng đầy đủ BHLĐ theo công việc','Không sử dụng rượu, bia trong khi làm việc','Giữ nơi làm việc gọn gàng, sạch sẽ','Tiếp tục để kịp tiến độ','Tự sửa thiết bị dù chưa được hướng dẫn','Bỏ qua vì chưa xảy ra tai nạn'];
export const cardRounds=[
 {prompt:'Có nguy cơ rõ ràng đe dọa tính mạng. Chọn đủ hai ý phản hồi được tài liệu nêu.',correct:[0,1],source:refs.danger,explanation:questions[1].explanation,theme:'Báo nguy cơ và quyền'},
 {prompt:'Bạn phát hiện nguy cơ mất an toàn; chưa có dữ kiện đe dọa tính mạng. Chọn ý báo cáo được nêu trực tiếp.',correct:[0],source:refs.danger,explanation:questions[3].explanation,theme:'Báo nguy cơ'},
 {prompt:'Trang bị bảo hộ theo công việc đang thiếu. Chọn nội dung phù hợp với mục Trang phục.',correct:[2],source:refs.ppe,explanation:questions[5].explanation,theme:'Bảo hộ lao động'},
 {prompt:'Một người định uống bia trong khi làm việc. Chọn thẻ nhắc đúng quy định.',correct:[3],source:refs.ban,explanation:questions[2].explanation,theme:'Hành vi bị cấm'},
 {prompt:'Bàn làm việc bừa bộn, vật dụng đang để sai nơi quy định. Chọn thẻ về vệ sinh lao động.',correct:[4],source:refs.tidy,explanation:questions[6].explanation,theme:'Nơi làm việc'},
 {prompt:'Tình huống nêu hai vấn đề: thiếu BHLĐ và dùng bia trong giờ làm việc. Chọn cả hai thẻ tương ứng.',correct:[2,3],source:`${refs.ppe}; ${refs.ban}`,explanation:'Cần sử dụng đầy đủ BHLĐ theo công việc và tuân thủ việc không dùng rượu, bia khi làm việc.',theme:'Bảo hộ và hành vi'}
];
export const memorySets=[
 [['Đèn lò và bình tự cứu','Nhà đèn'],['BHLĐ sau ca','Khu trả bảo hộ tại nhà tắm']],
 [['Sau khi tắm: thay đồ sạch','Tủ cá nhân'],['Báo cáo/lấy thẻ lò theo quy định','Trạm bảo vệ gác cửa lò']],
 [['Trả đèn lò và bình tự cứu','Nhà đèn'],['Trả BHLĐ','Nhà tắm'],['Thay quần áo sạch','Tủ cá nhân']]
];
export const evidenceCards=[
 {id:'start',title:'Chuỗi đầu ca',text:startSteps.join(' → '),source:refs.start},
 {id:'end',title:'Chuỗi cuối ca',text:endSteps.join(' → '),source:refs.end},
 {id:'ban',title:'Hành vi bị cấm',text:'Không sử dụng rượu, bia khi làm việc; không hút thuốc tại khu vực cấm.',source:refs.ban},
 {id:'ppe',title:'Trang phục theo công việc',text:'Sử dụng đầy đủ BHLĐ theo ngành nghề và quy định.',source:refs.ppe},
 {id:'danger',title:'Báo cáo và quyền',text:'Báo ngay khi phát hiện nguy cơ; quyền từ chối/rời nơi nguy hiểm khi có nguy cơ rõ ràng đe dọa sức khỏe, tính mạng.',source:refs.danger},
 {id:'tidy',title:'Nơi làm việc',text:'Giữ nơi làm việc gọn gàng, sạch sẽ; công cụ đúng nơi quy định.',source:refs.tidy},
 {id:'framework',title:'Chủ đề đào tạo',text:'Chương trình nêu khí mỏ, thông gió và an toàn đi lại. Thẻ này không cung cấp ngưỡng hoặc quy trình kỹ thuật.',source:'MD-03 · Trang PDF 4'},
 {id:'unknown',title:'Chưa đủ thông tin',text:'Cần quy trình hoặc sơ đồ được đơn vị xác nhận trước khi đưa ra đáp án kỹ thuật.',source:'Giới hạn nội dung bộ tài liệu đã đối chiếu'}
];
export const evidenceRounds=[
 {prompt:'Tìm căn cứ cho nhận định: nhận đèn và bình tự cứu trước khi nhận lệnh sản xuất.',correct:'start',explanation:questions[0].explanation,source:refs.start,theme:'Chuỗi đầu ca'},
 {prompt:'Tìm căn cứ cho nhận định: trả đèn và bình tự cứu tại nhà đèn sau ca.',correct:'end',explanation:questions[4].explanation,source:refs.end,theme:'Chuỗi cuối ca'},
 {prompt:'Tìm căn cứ cho nhận định: sử dụng bia trong khi làm việc là hành vi bị cấm.',correct:'ban',explanation:questions[2].explanation,source:refs.ban,theme:'Hành vi bị cấm'},
 {prompt:'Bộ thẻ này có đủ dữ liệu để chọn một ngưỡng khí mỏ cụ thể không?',correct:'unknown',explanation:'Chương trình chỉ nêu chủ đề khí mỏ; bộ nguồn của bài chưa cung cấp ngưỡng cụ thể. Không đoán số.',source:'MD-03 · Trang PDF 4; giới hạn nội dung',theme:'Thông tin cần bổ sung'},
 {prompt:'Tìm căn cứ cho trách nhiệm báo ngay người có trách nhiệm khi phát hiện nguy cơ.',correct:'danger',explanation:questions[3].explanation,source:refs.danger,theme:'Báo nguy cơ'},
 {prompt:'Có thể chọn tuyến rút lui thực tế chỉ từ bản đồ hư cấu trong game không?',correct:'unknown',explanation:'Bản đồ game không phải sơ đồ mỏ. Muốn hướng dẫn tuyến thực tế phải có sơ đồ và phương án hiện hành của đơn vị.',source:'MD-02 · Trang PDF 3; MD-03 · Trang PDF 4; giới hạn mô phỏng',theme:'Thông tin cần bổ sung'}
];
export const diaries=[
 {steps:startSteps,missing:0,source:refs.start}, {steps:startSteps,missing:3,source:refs.start}, {steps:startSteps,missing:4,source:refs.start},
 {steps:endSteps,missing:0,source:refs.end}, {steps:endSteps,missing:1,source:refs.end}, {steps:endSteps,missing:4,source:refs.end}
];

export const memoryPool=[['Đèn lò và bình tự cứu','Nhà đèn',refs.end],['BHLĐ sau ca','Khu trả bảo hộ tại nhà tắm',refs.end],['Thay quần áo sạch sau tắm','Tủ cá nhân',refs.end],['Báo cáo/lấy thẻ lò theo quy định','Trạm bảo vệ gác cửa lò',refs.end],['Báo công đầu ca','Phòng giao ca',refs.start],['Ăn cơm đầu ca','Nhà ăn',refs.start]];
// Extra distractors are explicitly incorrect proposals; never presented as procedures.
export const challengeQuestions=questions.map(q=>({...q,choices:[...q.choices,'Làm theo suy đoán thay vì đối chiếu hướng dẫn']}));
