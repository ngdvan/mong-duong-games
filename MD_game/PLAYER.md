# Yêu cầu khung chơi và renderer hiện tại

Yêu cầu chuẩn nằm tại `AGENTS.md`. Tất cả game phải là Phaser 2D; không dùng Three.js cho game đang chơi. Các màn và vật thể phải đủ lớn để nhận diện, không dùng camera nhìn cả một vùng trống quá lớn làm thu nhỏ nội dung.

Một màn chơi bao gồm thanh chức năng, HUD, hướng dẫn, canvas, dock thao tác và bảng thông báo. Chúng luôn nằm trong viewport khi đang chơi. Các nút Tiếp tục/Thử lại gắn với thông báo, các nút sau khi thắng gắn với dock. Nội dung bài học dài được đọc trong bảng có vùng cuộn riêng, không đẩy nút ra ngoài màn hình.

Có nút toàn màn cho cả khung; giữ nguyên tiến độ khi vào/thoát, xoay hoặc đổi kích thước. Trình duyệt không có Fullscreen API sử dụng khung mở rộng và giải thích giới hạn ẩn thanh địa chỉ. Có công cụ phóng to/thu nhỏ/vừa khung miễn phí. Xem `PHASER.md` về triển khai và kiểm tra.
