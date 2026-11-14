# Chiến dịch 6 màn — Xu, gợi ý và thời gian

16 game × 6 màn = **96 màn chơi**. Từ trang chọn game mở chế độ chiến dịch. Hai bản Three.js gốc vẫn có tại first-shift.html và idea-b/index.html; trong màn chọn có liên kết “Chơi bản Three.js gốc”. Chế độ nhiều màn của A/B dùng lại dữ liệu nhiệm vụ/nguồn của bản gốc, được trình bày bằng DOM/SVG 2D. Bản gốc không tự thêm xu hoặc đồng hồ.

## Luật chung

- Màn 1 mở sẵn; qua màn hiện tại mới mở màn kế tiếp. Không cho nhảy màn bằng URL.
- Sáu bậc: Làm quen → Ghi nhớ → Vận dụng → Phối hợp → Tự chủ → Ôn tổng hợp.
- Thưởng lần đầu lần lượt **10, 12, 14, 16, 18, 20 xu**. Chơi lại màn đã thắng không nhận thưởng trùng. Không thưởng hoàn thành nhanh hoặc bỏ bước.
- Ví bắt đầu **0 xu**, dùng chung 16 game. Không có tiền thật, quảng cáo, nạp xu hoặc phí chơi lại.
- Mỗi gợi ý tùy chọn giá **5 xu**. Trước khi mua chỉ hiện giá và số dư; nội dung/callback trợ giúp chỉ mở khi mua thành công. Gợi ý đã mua được lưu theo game/màn/nội dung, dùng lại miễn phí khi thử lại hoặc tải lại.
- Chưa đủ xu vẫn có thể hoàn thành màn: thao tác cơ bản, dữ kiện đề bài và phản hồi an toàn sau câu sai luôn miễn phí. Đây là nội dung bắt buộc để học và sửa sai, không phải gợi ý trả xu.
- Khi hết giờ, chặn thao tác và không cấp thưởng/mở màn. Có nút thử lại cùng màn; không trừ xu, không mất gợi ý đã mua. Không có giới hạn số lần thử.
- Đồng hồ tạm dừng khi đọc phản hồi, mở hộp tài liệu/gợi ý, tạm nghỉ hoặc rời tab. Không tính thời gian đọc giải thích vào yêu cầu điều khiển.
- Giới hạn thời gian, độ khó và xu là thiết kế trò chơi, không phải yêu cầu thao tác hoặc chỉ tiêu công việc tại mỏ.

## Độ khó thực tế

| Thể loại | Màn đầu | Màn cao |
| --- | --- | --- |
| Hội thoại, truyện, board game | 2–4 nhiệm vụ; 2 phương án | 12 nhiệm vụ; 4 phương án; trộn chủ đề và vị trí đáp án |
| Xếp chuỗi | 1 đoạn, 3 thẻ | 4 bảng, tối đa 6 thẻ/bảng, phối hợp đầu/cuối ca |
| Lật thẻ | 1 bộ, 2 cặp | 3 bộ, mỗi bộ 6 cặp; không mở thẻ tự động |
| Thẻ phản hồi | 2 tình huống, bàn tay ít thẻ | 6 tình huống, 8 thẻ, phải chọn đủ bộ không thừa |
| Top-down | 2 lượt nhớ/phiếu, nhãn ở mức làm quen | 10 lượt, đổi vị trí trạm, giảm nhãn, mua lại sơ đồ bằng xu |
| Dọn bàn | 1 bàn, 2 vật | 3 bàn, mỗi bàn 4 vật, đổi vị trí vật |
| Ghép hình | 1 tranh, 4 mảnh | 3 tranh, mỗi tranh 12 mảnh; tranh mẫu/hỗ trợ xếp mảnh mua bằng xu |
| Nhật ký thiếu bước | 2 nhật ký, mỗi nhật ký 1 ô trống | 6 nhật ký, mỗi nhật ký 3 ô trống và nhiều thẻ chọn |
| Phân loại, tìm căn cứ | 2–4 nhiệm vụ | 6–12 nhiệm vụ, thứ tự/chủ đề thay đổi, ít sàng lọc sẵn |
| Platformer | 3 bảng, sàn rộng, ít đáp án | 6 bảng, sàn hẹp hơn, 6 đáp án, xen chuỗi đầu/cuối ca |
| Ca đầu tiên | Từng đoạn 2–3 nhiệm vụ từ bản gốc | Toàn bộ 13 nhiệm vụ, nhiều thao tác và phương án gây nhiễu |
| Mắt tinh | 1 tình huống × nhận diện/phản hồi | 9 tình huống × 2 bước, nhiều phương án hơn |

Nút di chuyển hỗ trợ của platformer và danh sách trạm vẫn miễn phí: không bán khả năng điều khiển hoặc tiếp cận nội dung. Tranh, vị trí trạm và các ngữ cảnh là minh họa, không hướng dẫn thoát nạn thực tế. Nội dung chuyên môn vẫn bám cùng bộ nguồn; chưa thêm nguy cơ/ngưỡng kỹ thuật khi chưa có quy trình.

## Thời gian từng màn

Thời gian hiển thị dưới đây là phút:giây, chỉ đếm lúc thao tác (không đếm lúc đọc phản hồi). Các mức dự kiến theo lượng nội dung, chưa hiệu chỉnh bằng dữ liệu người chơi thực địa.

| Game | M1 | M2 | M3 | M4 | M5 | M6 |
| --- | --- | --- | --- | --- | --- | --- |
| Ca đầu tiên của tôi | 4:00 | 4:00 | 6:00 | 5:00 | 5:00 | 15:00 |
| Mắt tinh — Nhận diện nguy cơ | 2:35 | 3:40 | 4:45 | 5:50 | 8:00 | 11:15 |
| Theo chân người kèm cặp | 3:40 | 4:37 | 5:27 | 7:08 | 8:37 | 9:54 |
| Chọn đúng — Báo đúng | 2:54 | 3:31 | 4:03 | 5:08 | 6:06 | 8:01 |
| Bậc thang đầu ca | 4:45 | 5:39 | 6:26 | 7:08 | 6:50 | 6:33 |
| Xếp trọn một ca | 2:30 | 2:42 | 3:54 | 5:06 | 6:54 | 8:42 |
| Lật thẻ — Nhớ nơi trả | 2:30 | 2:42 | 3:54 | 4:42 | 7:30 | 8:42 |
| Bộ thẻ phản hồi | 2:54 | 3:31 | 4:03 | 4:32 | 4:57 | 4:46 |
| Một vòng khu sinh hoạt | 3:40 | 4:37 | 5:27 | 7:08 | 8:37 | 9:54 |
| Góc làm việc gọn gàng | 2:30 | 2:45 | 3:10 | 4:50 | 4:50 | 6:30 |
| Bàn hành trình an toàn | 4:18 | 5:31 | 6:36 | 7:34 | 8:24 | 8:01 |
| Hai giỏ quy định | 4:18 | 5:31 | 6:36 | 7:34 | 8:24 | 8:01 |
| Chuyện ở phòng giao ca | 2:54 | 4:11 | 5:20 | 6:21 | 7:15 | 8:01 |
| Ghép bức tranh cuối ca | 2:35 | 2:33 | 3:29 | 3:23 | 4:10 | 4:02 |
| Mảnh còn thiếu | 2:54 | 3:31 | 4:03 | 4:32 | 4:57 | 4:46 |
| Sổ tay tìm căn cứ | 2:54 | 3:31 | 4:03 | 4:32 | 4:57 | 4:46 |

## Lưu và kiểm tra

`games/campaign.js` chứa luật và cấu hình 96 màn; `games/storage.js` lưu ledger riêng ở `md-campaign-v1`. Tiến độ màn, xu và gợi ý đã mua tồn tại sau tải lại; chưa lưu thao tác trong lượt đang chơi. Khóa game A cũ và `md-learning-results-v1` được giữ. Đây là dữ liệu cục bộ thiết bị, không đồng bộ tài khoản. Dữ liệu gắn với địa chỉ website; đổi tên miền Quick Tunnel không tự chuyển ví sang địa chỉ mới. Khi trình duyệt chặn localStorage, trạng thái giữ trong tab hiện tại; tải lại có thể mất tiến độ. Xu cục bộ không phải cơ chế chống gian lận hoặc tài sản có giá trị.

`tests/campaign.mjs` kiểm tra mở khóa, thưởng một lần, thiếu xu, gợi ý mua một lần, đồng hồ dừng/hết giờ và fallback lưu trữ. `tests/browser-arcade.mjs` đã chơi đủ 96 màn ở 360 và 390 px, chơi lại màn 6 của mọi game ở 1440 px, thử ví 0 xu, mua/đọc lại gợi ý, tạm dừng, hết giờ, thử lại và xác nhận không cộng thưởng trùng. Sơ đồ dùng phương án không Canvas trong lượt vét cạn, sau đó kiểm tra riêng di chuyển Canvas thật; platformer vẫn chạy mô hình vật lý. Chưa thử trên điện thoại thật hoặc hiệu chỉnh thời gian với công nhân.
