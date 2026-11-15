# Game 2D dùng Three.js cho toàn bộ 16 game

Toàn bộ 96 màn hiện dùng một cảnh 2D do WebGL/Three.js hiển thị. Các trang cũ `first-shift.html` và `idea-b/index.html` chuyển tới chiến dịch Three.js; không còn mở bản trắc nghiệm chữ. Các module DOM/Canvas 2D cũ vẫn được giữ trong mã phát triển để tham khảo, nhưng không được import hoặc xuất bản trong bản game mới.

Three.js chỉ là bộ hiển thị và xử lý tương tác. Tất cả game phải là 2D: sprite/hình phẳng, camera trực giao vuông góc, không phối cảnh/isometric, không mesh khối nổi, không đổ bóng 3D. Bản trước dùng mô hình khối và camera nghiêng là sai yêu cầu; đã thay bằng hình minh họa phẳng.

## Cơ chế đồ họa

| Game | Tương tác trong cảnh |
| --- | --- |
| Ca đầu tiên | Điều khiển thợ trên sân có công trình, tìm đường tránh nhà, tới trạm rồi nhấc trang bị, khóa tủ, nhận/trả đồ tại bàn thao tác |
| Mắt tinh | Quan sát nhân vật thiếu bảo hộ, chai bia hoặc tín hiệu báo nguy; chạm điểm cần xem xét rồi dùng đồ vật phản hồi |
| Theo chân người kèm cặp | Đi tới NPC hướng dẫn ở bốn trạm rồi nhớ lại vị trí trong sơ đồ 2D hư cấu |
| Chọn đúng — Báo đúng | Dùng bộ đàm, bảo hộ, mô hình quyền từ chối và các vật thể trong tình huống; hành động được thể hiện trên nhân vật |
| Platformer | Nhân vật Three.js chịu trọng lực, nhảy/tiếp đất trên sàn; thu mô hình biểu tượng theo chuỗi đầu/cuối ca |
| Xếp trọn một ca | Đổi hoặc kéo các mô hình bước công việc trên băng chuyền để xếp thứ tự |
| Lật thẻ | Thẻ phẳng co ngang khi mở, lộ hình trang bị/công việc hoặc công trình nơi thực hiện; ghép đúng cặp |
| Bộ thẻ phản hồi | Nhấc/chọn nhiều thẻ biểu tượng trên bàn, xác nhận đủ bộ bằng bệ kiểm tra |
| Một vòng khu sinh hoạt | Điều khiển nhân vật đi tới công trình theo phiếu nhiệm vụ; xác nhận khi ở gần trạm |
| Góc làm việc | Kéo đồ vật văn phòng vào khay có hình tương ứng; cũng có thể chạm vật rồi chạm khay |
| Bàn hành trình | Quân thợ trên bàn ô phẳng; mở ô để vào tình huống 2D, hoàn thành hành động để đi tiếp |
| Hai giỏ quy định | Nhấc mô hình hành vi trên băng chuyền và đặt vào khay Trách nhiệm hoặc Bị cấm |
| Chuyện ở phòng giao ca | Khung cảnh dựng bằng nhân vật/môi trường 2D; hoàn thiện diễn biến bằng tương tác vật thể, không chọn lời thoại chữ |
| Ghép bức tranh cuối ca | Mảnh ghép phẳng có texture hình công trình, đổi chỗ bằng chạm hoặc kéo trực tiếp |
| Mảnh còn thiếu | Điền mô hình bước công việc vào các ô trống trong nhật ký dạng cảnh vật |
| Sổ tay tìm căn cứ | Tìm quyển hồ sơ có biểu tượng chủ đề phù hợp và mang đến bàn đối chiếu; hồ sơ thiếu thể hiện bằng bìa có dấu hỏi |

Các biểu tượng là quy ước học tập, không phải biển báo hoặc hướng dẫn vận hành thực tế. Chữ còn dùng cho tên game/màn, yêu cầu ngắn, tên vật khi chọn, điều khiển, phản hồi an toàn và nguồn. Không có danh sách đáp án chữ, câu hỏi đặt lên panel 3D hay bản chơi text khi mất WebGL.

## Kỹ thuật và tiếp cận

- `games/three/world.js`: WebGLRenderer, camera trực giao vuông góc, không ánh sáng/bóng, raycasting, kéo/thả, vùng chạm tối thiểu 44 px, focus bàn phím và giải phóng GPU.
- `games/three/models.js`: nhân vật, công trình, đèn, bình tự cứu, bảo hộ, bộ đàm, thẻ, khay và vật dụng bằng sprite và hình phẳng.
- `games/three/plan.js`: kế hoạch nhiệm vụ lấy lại dữ liệu có nguồn.
- `puzzles.js`, `action.js`, `navigation.js`, `platform.js`: cơ chế riêng của từng thể loại; không dùng canvas 2D làm world.
- Canvas 2D chỉ dùng vẽ texture minh họa nhân vật, đồ vật, công trình và tranh trên mảnh ghép, không thay thế WebGL. Three.js dùng bản r180 có sẵn và giấy phép trong `vendor/`.
- Nút ẩn có nhãn ngắn phục vụ focus/đọc màn hình và bàn phím, luôn bám vật thể Three.js. Chúng chỉ tồn tại khi WebGL đã khởi tạo; không phải giao diện gameplay chữ thay thế. Kiểm thử dùng tọa độ của chúng rồi gửi pointer thật vào canvas để kiểm tra raycaster.
- Khởi tạo lỗi hoặc mất WebGL sẽ dừng thao tác, đồng hồ và phần thưởng; báo lỗi cảnh. Không chuyển sang bản chữ và không tự hoàn thành màn.
- Bối cảnh tĩnh chỉ render khi thay đổi. Cảnh có nhân vật chạy tối đa khoảng 30 fps, dừng cập nhật gameplay khi tab ẩn/đọc phản hồi; pixel ratio được giới hạn cho điện thoại.

## Tiến độ, nguồn và phạm vi

Giữ nguyên ledger `md-campaign-v1`, 6 màn mỗi game, xu thưởng lần đầu, gợi ý 5 xu, giới hạn thời gian và phản hồi miễn phí. Gợi ý đồ họa làm nổi bật vật trong cảnh. Mua gợi ý không tự thực hiện nhiệm vụ. Bộ nguồn chuyên môn vẫn là MD-01/02/03, không thêm quy trình khai thác, ngưỡng khí, thao tác cứu hộ hoặc tuyến thoát nạn.

Đây là đồ họa minh họa phẳng 2D, chưa có tài sản mỹ thuật/animation nhân vật chuyên nghiệp. Một số thể loại đã được diễn giải lại thành tương tác đồ vật để loại bỏ phần chơi chữ. Thời gian và khả năng đọc biểu tượng cần được hiệu chỉnh thêm qua người chơi thật.

## Kiểm tra

```sh
node MD_game/tests/three.mjs
node MD_game/tests/campaign.mjs
node MD_game/tests/arcade.mjs
node MD_game/tests/catalog.mjs
node MD_game/tests/browser-arcade.mjs http://127.0.0.1:8083 390 9225
```

Bộ browser mới thao tác bằng pointer/raycast trong WebGL, gồm kéo/thả thật, lật cặp vật, đi tới trạm và thu/trả trang bị; không gọi bộ chấm điểm hoặc chọn nút đáp án chữ để hoàn thành màn. Có kiểm tra không có DOM quiz và trường hợp WebGL không khả dụng không cho phần thưởng/fallback.
