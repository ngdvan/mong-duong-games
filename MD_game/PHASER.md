# Toàn bộ game dùng Phaser 2D

Cả **16 game / 96 màn** dùng Phaser 3.90.0 và WebGL. Không có đường chơi Three.js, game 3D, giao diện chọn đáp án chữ hoặc bản chơi chữ thay thế khi lỗi đồ họa. Mã Three.js cũ chỉ còn trong mã phát triển để tra cứu, không được nạp hoặc xuất bản.

## Khung chơi

Khi bắt đầu một màn, khung chơi sử dụng viewport hiện tại. Thanh tiêu đề, tiến độ/xu/thời gian, hướng dẫn, cảnh chơi và các nút thao tác nằm trong cùng `#play-area`. Nút dọc nằm dưới cảnh; màn hình ngang thấp dùng cột điều khiển bên phải. Các nút chạm ít nhất 48 × 48 CSS px, hướng dẫn ít nhất 14 px.

Thông báo và nút Tiếp tục/Thử lại nằm chung trong bảng phản hồi. Phần cảnh và dock không nhận thao tác khi phản hồi đang mở. Nút chơi tiếp/chơi lại sau khi qua màn cũng ở dock. Không cuộn trang để tiếp cận nút khi đang chơi; nội dung dài của tài liệu hoặc bảng phản hồi được giới hạn trong bảng riêng.

Camera căn theo các vật thể của nhiệm vụ, loại trừ nền và khoảng trống trang trí. Kích thước mặc định ưu tiên nhận diện đồ vật; khi cần, người chơi kéo nền hoặc dùng Cỡ hình → Phóng to/Thu nhỏ/Vừa khung. Các thao tác xem luôn miễn phí và không lộ đáp án. Platformer theo nhân vật/sàn nhiệm vụ, có nút Đến sàn hỗ trợ di chuyển, không thưởng hoặc tiết lộ bước đúng.

Nút Toàn màn yêu cầu fullscreen cho toàn bộ khung, bao gồm điều khiển và hộp thoại. Đổi kích thước/thoát fullscreen cập nhật camera và vùng chạm. Trình duyệt không hỗ trợ được chuyển sang khung mở rộng trong viewport và hiển thị thông tin rõ; không giả định có thể ẩn thanh địa chỉ trên mọi thiết bị.

## Cấu trúc

- `games/phaser/world.js`: game/scene, sprites, texture/atlas, hit zones, kéo/thả, pan/zoom/fit, vùng chạm và giải phóng tài nguyên.
- `games/phaser/navigation.js`: hai game sơ đồ và Ca đầu tiên, giữ tìm đường/kiểm tra trạm.
- `games/phaser/platform.js`: Arcade Physics, nhảy/tiếp đất và thu biểu tượng.
- `games/phaser/puzzles.js`: xếp chuỗi, lật thẻ, ghép hình, thẻ phản hồi, phân loại, sắp xếp, điền bước và hồ sơ.
- `games/phaser/action.js`: tình huống, truyện, bàn hành trình và Mắt tinh.
- `games/shared/plan.js`, `path.js`: nội dung/kế hoạch có nguồn và tìm đường, độc lập renderer.
- `games/shell.js`: một đường nạp Phaser, đồng hồ, ledger, phản hồi và chức năng khung chơi.

Giữ nguyên sáu màn mỗi game, phần thưởng lần đầu, gợi ý 5 xu, khóa lưu trữ `md-campaign-v1` và `md-learning-results-v1`, dữ liệu an toàn và tài liệu tham chiếu. Lỗi tải hình hoặc WebGL dừng lượt, không cấp thưởng và không chuyển sang bản chữ.

## Kiểm tra

```sh
node MD_game/tests/phaser.mjs
node MD_game/tests/plans.mjs
node MD_game/tests/assets.mjs
node MD_game/tests/campaign.mjs
node MD_game/tests/arcade.mjs
node MD_game/tests/catalog.mjs
node MD_game/tests/browser-arcade.mjs http://127.0.0.1:8083 390,1440 9225 '' smoke
node MD_game/tests/browser-arcade.mjs http://127.0.0.1:8083 844x390 9225 '' smoke
```

Kiểm thử dùng pointer thật vào cảnh Phaser, kiểm tra kích thước/vị trí các nút, không cuộn trang, phản hồi và hành động cùng khung, vào/thoát fullscreen, trường hợp không hỗ trợ fullscreen, phóng to miễn phí, vật lý, xu và lỗi hình/WebGL. Kiểm tra viewport mô phỏng không thay thế kiểm thử thiết bị thực tế.
