# Các game đã triển khai

**Phaser update:** the three top-down games (`first-shift`, `mentor`, `locker-walk`) and platformer (`platform`) now use Phaser. The other twelve games remain 2D with Three.js. See [PHASER.md](PHASER.md). The engine descriptions below document the preceding Three.js implementation.

**Cập nhật 2D dùng Three.js:** cả 16 game và 96 màn đã chuyển sang tương tác hình phẳng bằng Three.js. Nội dung về DOM/Canvas 2D hoặc các bản chơi chữ ở phần mô tả cũ bên dưới là lịch sử thiết kế, không còn là cơ chế chạy hiện tại. Xem [kiến trúc và phạm vi Three.js](THREEJS.md).

**Cập nhật:** cả 16 game hiện có chế độ 6 màn, xu và cửa hàng gợi ý; xem [luật và phạm vi hiện tại](CAMPAIGN.md). Bảng dưới đây ghi vòng chơi của bản đầu, trước khi tăng màn. Các bản Three.js gốc vẫn truy cập riêng.

Tất cả 16 mục trong bộ sưu tập đã có bản chơi thử. Game A và B giữ phần chơi cũ; 14 game C–P dùng khung 2D chung trong `games/`. Không có backend, tài khoản, multiplayer qua mạng hoặc đánh giá chứng nhận. Hai game Canvas chuyển động có phương án chọn bằng danh sách/nút hỗ trợ khi không mở được Canvas. Các chiến dịch dùng DOM, CSS, Canvas và SVG, không cần WebGL.

## Phạm vi hiện thực của 14 game mới

| Game / ID | Cơ chế đã có | Nội dung để hoàn thành |
| --- | --- | --- |
| Theo chân người kèm cặp / `mentor` | Nhân vật trên Canvas 2D, chạm đi tới hoặc nút bốn hướng, nghe giới thiệu bốn trạm rồi nhớ lại vị trí, hỏi lại không trừ điểm | 4 giới thiệu + 6 lượt ghi nhớ trên sơ đồ hư cấu |
| Chọn đúng — Báo đúng / `report` | Hội thoại ghi lại lựa chọn và phản hồi của người hướng dẫn; nhánh sai phải sửa | 6 tình huống |
| Bậc thang đầu ca / `platform` | Di chuyển, trọng lực, nhảy, tiếp đất trên sàn, camera ngang; mở bảng theo trình tự; nút hỗ trợ đến bảng | 6 bảng tương ứng 6 nhóm bước đầu ca |
| Xếp trọn một ca / `sequence` | Đổi hai thẻ bằng chạm hoặc nút lên/xuống; kiểm tra chuỗi | 2 bảng, mỗi bảng 6 thẻ |
| Lật thẻ — Nhớ nơi trả / `memory` | Lật cặp việc/nơi thực hiện, mở toàn bộ thẻ để học, giữ cặp đã ghép; không tính điểm số lần lật | 3 bộ, tổng 7 cặp |
| Bộ thẻ phản hồi / `response-cards` | Chọn/bỏ nhiều thẻ trong tay bài, xác nhận chính xác cả bộ; không chấp nhận bộ thiếu/thừa | 6 tình huống, 8 thẻ phản hồi |
| Một vòng khu sinh hoạt / `locker-walk` | Nhân vật di chuyển giữa bốn trạm, thực hiện phiếu khi đến gần; danh sách trạm hỗ trợ | 6 phiếu độc lập; không trình bày như thứ tự toàn ca |
| Góc làm việc gọn gàng / `tidy` | Chọn vật trên tranh hoặc danh sách, đặt về nơi có nhãn, đồ đã đặt hiện trong khay | 2 bàn hư cấu, mỗi bàn 4 vật dụng văn phòng |
| Bàn hành trình an toàn / `board` | Bàn 12 ô đi theo đường zíc zắc, mở ô kế tiếp khi sửa đúng, luân phiên 1–4 người cùng thiết bị | 12 thẻ chủ đề |
| Hai giỏ quy định / `sort` | Chọn giỏ Trách nhiệm/Bị cấm cho từng thẻ, giải thích và sửa sai | 12 thẻ hành vi |
| Chuyện ở phòng giao ca / `comic` | 3 truyện bằng khung hình và chữ, điền lời thoại, đọc lại khung đã hoàn thiện | 2 điểm chọn mỗi truyện, tổng 6 lượt |
| Ghép bức tranh cuối ca / `jigsaw` | Tranh SVG cắt thành 6 ô đổi chỗ; xem mẫu hoặc bỏ phần ghép rồi nối tranh với ý nghĩa | 3 tranh 2×3 và 3 câu nối với bước cuối ca |
| Mảnh còn thiếu / `missing` | Đọc nhật ký có ô trống và chọn mảnh để điền; nhật ký được hoàn thiện khi đúng | 6 nhật ký |
| Sổ tay tìm căn cứ / `evidence` | Mở thẻ tóm ý nguồn, lọc thẻ theo tên, chọn căn cứ hoặc Chưa đủ thông tin | 6 hồ sơ, 8 thẻ nguồn |

Đồ họa là hình khối Canvas/SVG và các khung truyện đơn giản, chưa có minh họa mỹ thuật hoặc âm thanh. Các bản này hoàn thiện vòng chơi nêu trên, không khẳng định đã đáp ứng mọi chi tiết hoặc thời lượng của thiết kế ban đầu. Những câu hỏi lặp mục tiêu giữa các game là chủ ý ôn lại cùng bộ nguồn hạn chế, không phải các quy trình mới độc lập.

## Nội dung, nguồn và giới hạn

`games/content.js` tập trung chuỗi đầu/cuối ca, tình huống, bộ thẻ và giải thích với đề mục nguồn. Nguồn chính là MD-01 (2017): Bài 2 mục 4.1–4.2; Bài 3 mục 3.3, 3.4.c, mục Trang phục/Vệ sinh lao động và 3.7. Game kèm cặp dùng mục tiêu hướng dẫn và nhận biết nơi vừa được giới thiệu từ MD-02/MD-03. Nơi đặt đồ văn phòng, bậc nhảy và bản đồ là dữ liệu thiết kế hư cấu.

Không mô phỏng khai thác, thao tác bình tự cứu, cứu hộ, sửa điện, ngưỡng khí hoặc tuyến thoát nạn. Hai bài tìm căn cứ cho phép chọn “Chưa đủ thông tin” khi bộ nguồn chưa cung cấp đáp án kỹ thuật hoặc sơ đồ thực tế. Quy trình, danh mục BHLĐ theo nghề và đầu mối báo cáo hiện hành vẫn cần đơn vị xác nhận. Đánh số mục trang phục 3.5/3.6 cần đối chiếu bản gốc.

## Trạng thái và lưu dữ liệu

Khung `games/shell.js` ghi mục tiêu đã sửa đúng, chặn hoàn thành khi chưa đủ, tóm tắt chủ đề đã chọn sai và xử lý chơi lại. Không cộng trùng mục tiêu. Điều khiển nhân vật, nhảy, lật thẻ và ghép mảnh không được quy đổi thành điểm năng lực an toàn. Nút hỗ trợ điều khiển không phạt người chơi. Gợi ý tự chọn hiện mua bằng 5 xu; giải thích bắt buộc vẫn miễn phí.

Kết quả hoàn thành lưu riêng theo ID dưới khóa `md-learning-results-v1` trong localStorage để hiện nhãn trên bộ sưu tập. Không lưu tên người chơi, không gửi kết quả lên máy chủ. Đang chơi dở chưa có lưu/tiếp tục; tải lại bắt đầu lượt mới. localStorage không khả dụng vẫn chơi được. Điểm game A và trạng thái game B giữ nguyên cách xử lý trước đây, chưa ghi vào nhãn kết quả chung.

## Kiểm tra

```sh
node MD_game/tests/arcade.mjs
node MD_game/tests/catalog.mjs
node MD_game/tests/gameplay.mjs
node MD_game/idea-b/tests.mjs
```

Kiểm tra browser thực hiện qua Chrome headless đang mở DevTools ở cổng 9222 và máy chủ dự án ở cổng 8080:

```sh
node MD_game/tests/browser-arcade.mjs
```

Bộ này chạy toàn bộ 14 game tới tổng kết ở 360, 390 và 1440 px, thử chọn sai và sửa sai, kiểm tra chơi lại, nút tối thiểu 44 px, không tràn ngang, lưu kết quả, menu nguồn, bộ lọc 16 game, liên kết thiết kế, URL game không tồn tại. Có kiểm tra di chuyển platformer bằng phím và hoàn thành cả ba game Canvas khi Canvas không khả dụng. Chưa thay thế thử trực tiếp trên điện thoại thật.

## Xuất bản chơi thử không kèm tài liệu nội bộ

```sh
python3 scripts/prepare-preview.py
```

Script xuất danh sách file game cho phép sang thư mục tạm, đổi liên kết tài liệu sang trang thông tin nguồn công khai. Không sao chép `docs/`, `.git`, kiểm thử hoặc cấu hình riêng. Dùng `--output /tmp/<thu-muc>` để cập nhật thư mục máy chủ Quick Tunnel đang phục vụ. Bản xuất là bản chụp; sửa code cần xuất lại.
