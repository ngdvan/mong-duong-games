# Bản thử ý tưởng 1, 2, 5, 6

Đề bài: `6_y_tuong_game_mo_than_ban_rut_gon.docx` do người dùng cung cấp. Đây là tài liệu ý tưởng, không được dùng thay căn cứ kỹ thuật.

Bốn game mới nằm trên trang chọn chung, mỗi game có sáu màn mở tuần tự. Tất cả dùng Phaser 3.90, đồ họa 2D và cùng khung chơi toàn màn hình, dock nút, đồng hồ dừng khi đọc phản hồi, xu thưởng lần đầu và gợi ý 5 xu. Không đổi dữ liệu xu/tiến độ các game cũ.

| Ý tưởng | Bản thử | Phạm vi thực hiện |
| --- | --- | --- |
| 1 | Hành trình thợ mỏ an toàn | Phân trang bị/vật cấm, trạm trên sơ đồ hư cấu, kiểm tra từng hiện trường trước khi mở trạm sau |
| 2 | Trực ban an toàn | Hồ sơ ảnh minh họa, đánh dấu lỗi rồi đóng dấu đạt tiêu chí ảnh hoặc báo xử lý; không phải giấy phép làm việc thật |
| 5 | Chinh phục đường lò — Mỗi ngày | Màn ngắn 75–90 giây, ba tim chỉ để phản hồi, vẫn sửa sai khi hết tim; bắt buộc ôn lại cảnh từng nhầm, chuỗi ngày lưu trên máy |
| 6 | Đường lò không sai sót | Cảnh mẫu xem miễn phí, các cảnh đạt/chưa đạt, vị trí lỗi ngẫu nhiên mỗi lần chơi; chỉ rõ lỗi trước khi báo cáo |

## Đối chiếu nguồn

- MD-01: `docs/MD/Bài giảng huấn luyện AT bước 1. P.TCLĐ.doc`, Bài 2 mục 4.1 (nhận đèn và bình tự cứu trước lệnh), Bài 3 mục 3.3 (bia, diêm/bật lửa), mục Trang phục (BHLĐ theo nghề), mục 3.7 (báo ngay nguy cơ). Tiếp tục dùng các diễn giải đã đối chiếu trong game trước. Hình mũ chỉ kiểm tra một tiêu chí, không thay toàn bộ checklist bảo hộ.
- MD-04: `docs/Quy định quản lý công tác thông gió và kiểm soát khí gió, phòng ngừa than tự cháy - ký.docx`, đọc nội dung Word XML: Điều 22 khoản 1 cấm hai cửa gió thường đóng mở đồng thời; Điều 84 nêu nước có áp lực/nước đục kèm bùn; Điều 85 nêu các trường hợp phải tạm dừng sản xuất. Chỉ mô phỏng nhận diện và báo cáo; không thao tác kỹ thuật, tự khoan, cứu hộ hoặc chỉ đường rút lui.
- Mỗi phản hồi có đề mục nguồn. Không suy ra hiện trường thật an toàn chỉ từ ảnh đạt tiêu chí.

## Giới hạn cần duyệt

Chưa đưa năm phân hạng mỏ thành đáp án kỹ thuật; chưa mô phỏng ngưỡng khí, vị trí cảm biến, điều chỉnh ống gió, thao tác hiệu chuẩn, than tự cháy hoặc phương án thoát nạn. Nguồn có nhiều mục kỹ thuật nhưng cần chọn điều khoản, vai trò và quy trình hiện hành được đơn vị duyệt trước khi mở rộng. Không tự suy ra cách xử lý từ mô tả ý tưởng.

Chưa có máy chủ, xếp hạng tổ/phân xưởng hoặc đồng bộ chuỗi ngày. Chuỗi ngày theo lịch địa phương của thiết bị; tim không khóa học hoặc đổi lấy tiền. Âm thanh chưa triển khai; toàn bộ tín hiệu hiện có đều bằng hình và chữ. Thời gian, tim, trạm, vị trí và độ khó là thiết kế trò chơi.
