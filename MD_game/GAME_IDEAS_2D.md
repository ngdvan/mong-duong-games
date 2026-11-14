# Các ý tưởng game 2D — Mông Dương

12 ý tưởng mới (E–P), bổ sung cho A–D. Các thiết kế E–P và C/D đã có bản chơi thử; cả bộ có 16 game chơi được. Đáp án chưa được duyệt theo quy trình hiện hành. Tài liệu này giữ thiết kế ban đầu; phạm vi thực tế xem [Các game đã triển khai](IMPLEMENTED_GAMES.md). Trang chọn game đọc cùng dữ liệu từ `catalog.js`; thay đổi bản thiết kế cần cập nhật tệp dữ liệu và tài liệu này.

## Căn cứ và giới hạn chung

Mục tiêu học tập dựa trên nguồn bên dưới. Tên game, thể loại, vòng chơi, ví dụ hư cấu, thời lượng và phạm vi bản đầu là đề xuất thiết kế, không phải quy trình nghiệp vụ. Các tài liệu 2017–2020 chưa được đối chiếu tình trạng áp dụng hiện nay. Không suy ra ngưỡng khí, thao tác cứu hộ, điện, chống lò hoặc tuyến thoát nạn từ tên chủ đề đào tạo. Mọi đáp án cần được người phụ trách an toàn duyệt trước khi dùng đào tạo.

- **MD-01:** [Bài giảng huấn luyện AT bước 1 — P.TCLĐ (2017)](source-note.html).
- **MD-02:** [Chương trình khung (2019)](source-note.html).
- **MD-03:** [Quy định chương trình khung huấn luyện ATVSLĐ (2020)](source-note.html).

Mục trang phục trong bản trích xuất MD-01 ghi 3.5, đề cương ban đầu ghi 3.6; dẫn thêm tiêu đề mục và xác minh bản trình bày trước khi duyệt. Tất cả cơ chế ưu tiên điện thoại, nút tối thiểu 44 × 44 CSS px, hỗ trợ bàn phím và cách chọn bằng danh sách khi tương tác đồ họa khó sử dụng. Không đánh giá năng lực làm việc từ kỹ năng phản xạ, nhảy hoặc ghi nhớ hình ảnh. Không thưởng tốc độ, bỏ bước hoặc chọn hành vi mất an toàn. Cho đọc giải thích và sửa mọi lỗi.

## Danh mục 12 ý tưởng mới

| Mã | Tên | Thể loại | Thời lượng dự kiến |
| --- | --- | --- | --- |
| E | Bậc thang đầu ca | Platformer | 4–5 phút |
| F | Xếp trọn một ca | Puzzle | 3–5 phút |
| G | Lật thẻ — Nhớ nơi trả | Lật thẻ | 3–4 phút |
| H | Bộ thẻ phản hồi | Thẻ bài | 5–7 phút |
| I | Một vòng khu sinh hoạt | Top-down | 4–6 phút |
| J | Góc làm việc gọn gàng | Point & click | 3–5 phút |
| K | Bàn hành trình an toàn | Board game | 8–10 phút |
| L | Hai giỏ quy định | Phân loại | 3–5 phút |
| M | Chuyện ở phòng giao ca | Truyện tương tác | 4–6 phút |
| N | Ghép bức tranh cuối ca | Ghép hình | 4–6 phút |
| O | Mảnh còn thiếu | Suy luận | 3–5 phút |
| P | Sổ tay tìm căn cứ | Điều tra | 5–7 phút |

## E. Bậc thang đầu ca

**Thể loại:** Platformer · **Thời lượng dự kiến:** 4–5 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Đi qua các tầng kiến thức, mở bậc tiếp theo bằng trình tự đúng.

**Mục tiêu:** Ghi nhớ chuỗi chuẩn bị đầu ca.

**Vòng chơi:** Đi trên các sàn phẳng → dừng ở bảng nhiệm vụ → chọn bước kế tiếp → mở cầu sang tầng mới. Nhảy chỉ là thao tác trong không gian học tập trừu tượng.

**Điều khiển:** Nút trái/phải/nhảy lớn; nút “Đến bảng” thay thao tác nhảy chính xác.

**Đánh giá và sửa sai:** Mở đủ sáu bảng sau khi sửa sai; không thưởng tốc độ hoặc kỹ năng nhảy.

**Ví dụ:** Sau thay BHLĐ, chọn nhận đèn và bình tự cứu trước khi nhận lệnh.

**Phạm vi bản đầu:** Một màn 2D trừu tượng, sáu bảng; không mất mạng.

**Thông tin cần bổ sung:** Không thể hiện nhảy qua đường ray, máy móc hoặc hố nguy hiểm. Cần duyệt lại trình tự đầu ca hiện hành.

**Nguồn:** MD-01, Bài 2, mục 4.1.

## F. Xếp trọn một ca

**Thể loại:** Puzzle · **Thời lượng dự kiến:** 3–5 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Sắp lại các mảnh lịch trình đầu ca và cuối ca.

**Mục tiêu:** Phân biệt hai chuỗi và các bước dễ bỏ sót.

**Vòng chơi:** Chọn bộ đầu ca/cuối ca → đổi vị trí thẻ → kiểm tra → đọc giải thích chỗ sai → sửa chuỗi.

**Điều khiển:** Chạm hai thẻ để đổi; có nút lên/xuống, không bắt buộc kéo thả.

**Đánh giá và sửa sai:** Ghi nhận chuỗi đúng lần đầu và các cặp cần ôn; chỉ kết thúc khi sửa đủ.

**Ví dụ:** Đưa bước trả đèn và bình tự cứu lên trước bước trả BHLĐ, tắm.

**Phạm vi bản đầu:** Hai bảng, mỗi bảng sáu nhóm bước, gợi ý theo nguồn.

**Thông tin cần bổ sung:** Quy trình hiện hành phải được xác nhận; các mảnh không phải hướng dẫn thao tác thiết bị.

**Nguồn:** MD-01, Bài 2, mục 4.1–4.2.

## G. Lật thẻ — Nhớ nơi trả

**Thể loại:** Lật thẻ · **Thời lượng dự kiến:** 3–4 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Ghép trang bị với nơi nhận hoặc trả được nêu trong tài liệu.

**Mục tiêu:** Nhớ nơi trả đèn, bình tự cứu và BHLĐ sau ca.

**Vòng chơi:** Lật một thẻ trang bị và một thẻ nơi trả → xác nhận cặp → đọc giải thích. Mỗi bộ dùng quan hệ rõ ràng, không bắt đoán giữa nhiều cặp giống nhau.

**Điều khiển:** Chạm thẻ, nhãn chữ đầy đủ; chế độ mở tất cả để giảm tải ghi nhớ.

**Đánh giá và sửa sai:** Số cặp đã hiểu; số lần lật không tính thành điểm an toàn.

**Ví dụ:** Ghép “đèn và bình tự cứu” với “nhà đèn”; “BHLĐ” với “khu trả bảo hộ tại nhà tắm”.

**Phạm vi bản đầu:** Ba bộ nhỏ, mỗi bộ 2–3 cặp, có chế độ ôn mở thẻ.

**Thông tin cần bổ sung:** Cần đơn vị xác nhận tên nơi cấp/trả hiện nay; không tự thêm danh mục trang bị.

**Nguồn:** MD-01, Bài 2, mục 4.2.

## H. Bộ thẻ phản hồi

**Thể loại:** Thẻ bài · **Thời lượng dự kiến:** 5–7 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Chọn thẻ phản hồi phù hợp với dữ kiện được công bố.

**Mục tiêu:** Phân biệt nhận diện nguy cơ, trách nhiệm báo cáo và quyền từ chối.

**Vòng chơi:** Rút thẻ tình huống hư cấu → đọc dữ kiện → chọn bộ thẻ phản hồi → giải thích lựa chọn → mở phần đối chiếu.

**Điều khiển:** Chạm chọn/bỏ chọn thẻ; nút “Xác nhận bộ thẻ”; không giới hạn lượt rút.

**Đánh giá và sửa sai:** Đánh giá đủ ý theo tình huống; không có thẻ tăng tốc, hy sinh an toàn hoặc tài nguyên cứu hộ.

**Ví dụ:** Dữ kiện có nguy cơ rõ ràng đe dọa tính mạng: chọn thẻ “Báo ngay” và thẻ “Quyền từ chối/rời nơi nguy hiểm”.

**Phạm vi bản đầu:** Sáu tình huống, bộ tám thẻ chữ; chơi một người.

**Thông tin cần bổ sung:** Cần duyệt từng bộ đáp án; không diễn giải thẻ thành trình tự cứu hộ hay tuyến rút lui.

**Nguồn:** MD-01, Bài 3, mục 3.7.

## I. Một vòng khu sinh hoạt

**Thể loại:** Top-down · **Thời lượng dự kiến:** 4–6 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Điều khiển nhân vật tìm đúng nơi nhận, trả trang bị trên bản đồ 2D.

**Mục tiêu:** Phân biệt nơi thực hiện từng công việc trong chuỗi sau ca.

**Vòng chơi:** Nhận một phiếu nhiệm vụ → chạm đường đi trên sân minh họa → gặp người trực → chọn thao tác → ghi sổ. Khác game A: nhiệm vụ ngắn theo nhóm vật dụng, không tái diễn toàn bộ ca.

**Điều khiển:** Chạm điểm đến; nút bốn hướng; danh sách trạm thay điều khiển nhân vật.

**Đánh giá và sửa sai:** Chấm đúng nơi và đúng việc; không thưởng đường ngắn hoặc di chuyển nhanh.

**Ví dụ:** Có đèn và bình tự cứu cần trả: tìm nhà đèn, sau đó đọc lại bước tiếp theo.

**Phạm vi bản đầu:** Một bản đồ Canvas 2D, bốn trạm, sáu phiếu nhiệm vụ.

**Thông tin cần bổ sung:** Bản đồ hoàn toàn hư cấu; không tạo bài học đường thoát hoặc đi lại thực địa.

**Nguồn:** MD-01, Bài 2, mục 4.2.

## J. Góc làm việc gọn gàng

**Thể loại:** Point & click · **Thời lượng dự kiến:** 3–5 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Khám phá tranh minh họa và giải thích điều cần sắp xếp.

**Mục tiêu:** Nhớ trách nhiệm giữ nơi làm việc gọn gàng, sạch sẽ.

**Vòng chơi:** Quan sát góc bàn mô phỏng → chọn vật được ghi rõ là để sai nơi → xem nhãn nơi quy định trong tranh → đưa về đúng vị trí.

**Điều khiển:** Chạm vật rồi chạm vị trí, có danh sách chữ thay hình.

**Đánh giá và sửa sai:** Hoàn thành khi giải thích đúng mọi thay đổi; chạm ngẫu nhiên không cộng điểm.

**Ví dụ:** Thẻ ghi “dụng cụ đang để sai nơi quy định”: chọn vị trí có nhãn của dụng cụ đó trong tranh.

**Phạm vi bản đầu:** Hai tranh bàn làm việc, mỗi tranh bốn vật an toàn để tương tác.

**Thông tin cần bổ sung:** Vị trí và nhãn trong tranh là dữ liệu hư cấu. Cần sơ đồ đơn vị để dạy bố trí thật; không thao tác điện, hóa chất hoặc vật đang vận hành.

**Nguồn:** MD-01, Bài 3, mục 3.4.c; mục Vệ sinh lao động.

## K. Bàn hành trình an toàn

**Thể loại:** Board game · **Thời lượng dự kiến:** 8–10 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Đi trên bàn ô kiến thức, cùng hoàn thiện một ca học.

**Mục tiêu:** Liên hệ các bước chuẩn bị và trách nhiệm an toàn.

**Vòng chơi:** Chọn ô chủ đề liền kề → cả nhóm thảo luận thẻ → người điều phối mở giải thích → sửa trước khi đi tiếp. Không dùng xúc xắc để bỏ qua bài học.

**Điều khiển:** Chạm ô và thẻ; chế độ chuyền một điện thoại, hiện tên lượt.

**Đánh giá và sửa sai:** Cả nhóm hoàn thành mục tiêu; không loại người hoặc phạt việc nêu nguy cơ.

**Ví dụ:** Ô “Nhà đèn”: kể đủ hai trang bị được nêu trong bước nhận đồ đầu ca.

**Phạm vi bản đầu:** Bàn 12 ô, 12 thẻ, 1–4 người cùng thiết bị.

**Thông tin cần bổ sung:** Cần cán bộ duyệt bộ thẻ và cách tổ chức thảo luận; tên người chơi chỉ giữ trong lượt.

**Nguồn:** MD-01, Bài 2, mục 4.1–4.2; Bài 3, mục 3.7.

## L. Hai giỏ quy định

**Thể loại:** Phân loại · **Thời lượng dự kiến:** 3–5 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Đặt thẻ hành vi vào nhóm phù hợp rồi giải thích.

**Mục tiêu:** Phân biệt trách nhiệm và hành vi bị cấm theo bài giảng.

**Vòng chơi:** Đọc một thẻ có ngữ cảnh → chọn “Trách nhiệm” hoặc “Bị cấm” → xem đề mục → sửa nếu nhầm.

**Điều khiển:** Hai nút nhóm luôn hiển thị; không vuốt nhanh, không thẻ chạy mất.

**Đánh giá và sửa sai:** Điểm đúng lần đầu và nhóm còn nhầm; mọi thẻ sai phải được sửa.

**Ví dụ:** “Sử dụng bia trong khi làm việc” vào nhóm bị cấm; “báo ngay khi phát hiện nguy cơ” vào nhóm trách nhiệm.

**Phạm vi bản đầu:** 12 thẻ chữ, hai nhóm, một lượt ôn các thẻ nhầm.

**Thông tin cần bổ sung:** Không dùng nội dung pháp luật cũ làm quy định hiện hành; cần duyệt từng thẻ.

**Nguồn:** MD-01, Bài 3, mục 3.3 và 3.7.

## M. Chuyện ở phòng giao ca

**Thể loại:** Truyện tương tác · **Thời lượng dự kiến:** 4–6 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Hoàn thiện truyện tranh bằng lời thoại đúng nội dung nguồn.

**Mục tiêu:** Nhận ra bước bị bỏ sót và diễn đạt câu hỏi cần hỏi lại.

**Vòng chơi:** Đọc ba khung tranh → chọn lời thoại cho ô trống → xem khung giải thích → sửa và đọc lại truyện hoàn chỉnh.

**Điều khiển:** Chạm lời thoại; mọi khung có bản mô tả chữ; không cần âm thanh.

**Đánh giá và sửa sai:** Ghi nhận thông tin hiểu đúng; không chấm giọng nói hoặc khả năng đọc nhanh.

**Ví dụ:** Nhân vật đã thay bảo hộ nhưng định nhận lệnh ngay: chọn lời nhắc về đèn và bình tự cứu.

**Phạm vi bản đầu:** Ba truyện, mỗi truyện bốn khung và hai điểm lựa chọn.

**Thông tin cần bổ sung:** Lời thoại là thiết kế hư cấu; cần duyệt cách xưng hô và thuật ngữ tại đơn vị.

**Nguồn:** MD-01, Bài 2, mục 4.1; MD-02, Trang PDF 2, mục III — kèm cặp.

## N. Ghép bức tranh cuối ca

**Thể loại:** Ghép hình · **Thời lượng dự kiến:** 4–6 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Ghép cảnh sinh hoạt sau ca rồi nối với bước tương ứng.

**Mục tiêu:** Gắn hình ảnh với các nhóm bước cuối ca.

**Vòng chơi:** Ghép 2×3 mảnh bằng chạm đổi vị trí → đọc mô tả toàn cảnh → ghép cảnh với thẻ bước → mở nguồn.

**Điều khiển:** Chạm hai mảnh để đổi; nút “Xem tranh hoàn chỉnh” và chế độ bỏ phần ghép hình.

**Đánh giá và sửa sai:** Đánh giá ghép đúng ý nghĩa cảnh; số lần đổi mảnh không phản ánh kiến thức an toàn.

**Ví dụ:** Tranh minh họa nhà đèn đi với thẻ “Trả đèn và bình tự cứu”.

**Phạm vi bản đầu:** Ba tranh, mỗi tranh sáu mảnh và một câu ghép ý nghĩa.

**Thông tin cần bổ sung:** Tranh không mô tả kỹ thuật trả/kiểm định thiết bị; vị trí trong tranh không phải sơ đồ thật.

**Nguồn:** MD-01, Bài 2, mục 4.2.

## O. Mảnh còn thiếu

**Thể loại:** Suy luận · **Thời lượng dự kiến:** 3–5 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

So sánh nhật ký hư cấu với chuỗi trong tài liệu để tìm bước thiếu.

**Mục tiêu:** Phát hiện thiếu sót thay vì chỉ học thuộc trật tự.

**Vòng chơi:** Đọc nhật ký bốn hoặc năm bước → chọn ô thiếu → chèn thẻ phù hợp → chỉ ra nguồn giải thích.

**Điều khiển:** Chạm ô trống và chọn thẻ; có chế độ đọc danh sách từng bước.

**Đánh giá và sửa sai:** Chấm tìm đúng thiếu sót và sửa hoàn chỉnh; không cho qua nhật ký thiếu bước.

**Ví dụ:** Nhật ký có báo công, ăn cơm, thay BHLĐ, nhận lệnh: chỉ ra thiếu nhận đèn và bình tự cứu.

**Phạm vi bản đầu:** Sáu nhật ký, mỗi bài thiếu một nhóm bước.

**Thông tin cần bổ sung:** Nhật ký là bài tập hư cấu, không dùng làm hồ sơ công việc. Cần đối chiếu quy trình hiện hành.

**Nguồn:** MD-01, Bài 2, mục 4.1–4.2.

## P. Sổ tay tìm căn cứ

**Thể loại:** Điều tra · **Thời lượng dự kiến:** 5–7 phút · **Trạng thái:** đã có bản chơi thử 2D; nội dung dưới đây là thiết kế ban đầu.

Tìm đoạn tài liệu hỗ trợ cho một nhận định an toàn.

**Mục tiêu:** Rèn thói quen tìm căn cứ và nhận ra thông tin chưa đủ.

**Vòng chơi:** Nhận nhận định → đọc các thẻ trích ý nguồn → chọn căn cứ hoặc “Chưa đủ thông tin” → xem giải thích và đề mục.

**Điều khiển:** Chạm thẻ nguồn; chữ lớn, bộ lọc theo chủ đề, không cần soi vật thể nhỏ.

**Đánh giá và sửa sai:** Đúng khi chọn căn cứ phù hợp; ghi nhận biết dừng khi tài liệu chưa đủ.

**Ví dụ:** Nhận định về một ngưỡng khí cụ thể: chọn chưa đủ thông tin vì bộ nguồn của bài không cung cấp ngưỡng đó.

**Phạm vi bản đầu:** Sáu hồ sơ hư cấu, tám thẻ tóm ý nguồn; không có hướng dẫn kỹ thuật tự suy ra.

**Thông tin cần bổ sung:** Không biến tên chủ đề trong chương trình khung thành đáp án thao tác. Cần xác nhận cách diễn đạt từng nhận định.

**Nguồn:** MD-01, Bài 3, mục 3.7; MD-03, Trang PDF 4 — các chủ đề khí mỏ, thông gió, tự chủ an toàn.

## Tích hợp vào dự án chung

`MD_game/index.html` là trang chọn trò chơi; `catalog.js` là danh mục trung tâm. Game A chuyển sang `first-shift.html` và giữ nguyên module, dữ liệu cùng khóa lưu tiến độ. Game B giữ tại `idea-b/index.html`. Hai game dùng chung `vendor/` và thanh điều hướng `shared/navigation.js`; không nhập module gameplay vào trang chọn. Ý tưởng C và D ban đầu cũng đã có bản chơi thử trong danh mục; không được tính vào 12 ý tưởng mới trên. Các tệp `game.js`, `journey.js`, `styles.css` cũ giữ để tham khảo, không công bố như game đang hoạt động.

Ưu tiên triển khai đề xuất: F (xếp chuỗi), G (lật thẻ) và L (phân loại) vì dữ kiện nguồn rõ, thao tác điện thoại đơn giản; sau đó E (platformer) và I (top-down 2D). Đây là đề xuất phát triển, không phải xác nhận đáp án.
