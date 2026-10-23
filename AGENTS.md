# AGENTS.md — Website học Toán 8 từ gốc theo lộ trình 14 ngày

## 1. Vai trò và mục tiêu

Bạn là coding agent chịu trách nhiệm thiết kế, triển khai, kiểm thử và hoàn thiện một website học Toán dành cho học sinh lớp 8 đang cần củng cố kiến thức nền tảng.

Mục tiêu sản phẩm:
- Giúp học sinh **hiểu vì sao**, không chỉ ghi nhớ quy tắc.
- Học theo lộ trình 14 ngày được mô tả trong tài liệu nguồn `theo_doi_toan_14_ngay_ngoc_dang(1).html`.
- Mỗi bài có giải thích ngắn, ví dụ từng bước, bài luyện tập tương tác, phản hồi khi sai và câu hỏi vận dụng tư duy.
- Có thể dùng như công cụ tự học của học sinh và công cụ theo dõi tiến bộ của gia sư/người dạy.
- Giao diện tiếng Việt tự nhiên, thân thiện, không gây cảm giác bị kiểm tra hay phán xét.

Đây là sản phẩm giáo dục, không phải một dashboard theo dõi đơn thuần. Học sinh phải có thể mở bài, học kiến thức, xem ví dụ, làm bài, nhận gợi ý và biết nên ôn gì tiếp theo.

## 2. Quy tắc làm việc của agent

1. Trước khi code, kiểm tra repository, cấu trúc thư mục, package manager, framework, conventions, scripts và các thành phần đã có. **Tái sử dụng cấu trúc hiện hữu** nếu hợp lý; không tự ý viết lại toàn bộ dự án.
2. Đọc đầy đủ file lộ trình nguồn. Xem danh sách 14 ngày và bảng lỗi sai là nguồn dữ liệu chuẩn cho phạm vi MVP.
3. Nếu repository chưa có công nghệ được lựa chọn, ưu tiên:
   - Next.js App Router
   - JavaScript, không dùng TypeScript trừ khi repository hiện tại đã dùng TypeScript
   - React
   - Tailwind CSS nếu đã có; nếu chưa có thì chọn CSS module hoặc CSS toàn cục có tổ chức, tránh cài nhiều thư viện chỉ để trang trí
   - LocalStorage cho tiến độ MVP, không bắt buộc tài khoản hoặc backend
4. Không chỉ tạo giao diện tĩnh/mockup. Các luồng học, làm bài, chấm bài, gợi ý, lưu tiến độ và điều hướng phải hoạt động thực sự.
5. Không tự nhận đã hoàn thành nếu chưa chạy lint/build/test phù hợp với repository. Báo rõ lệnh đã chạy và lỗi còn tồn tại.
6. Không tự động cài thư viện lớn hoặc thay đổi kiến trúc khi chưa có lý do rõ ràng.
7. Nội dung Toán phải chính xác. Tự kiểm tra phép tính, đáp án, điều kiện và lời giải trước khi đưa vào ứng dụng.
8. Dữ liệu và nội dung học nên tách khỏi component giao diện để dễ sửa, thêm bài và kiểm thử.
9. Không đưa thông tin riêng của học sinh lên giao diện công khai. Tên học sinh không cần hard-code; dùng tên trung tính như “Bạn học”.
10. Nếu phát hiện yêu cầu mâu thuẫn với source, ưu tiên giữ đúng lộ trình nguồn và ghi rõ phần đề xuất mở rộng.

## 3. Đối tượng và nguyên tắc sư phạm

Đối tượng là học sinh lớp 8 bị hổng kiến thức nền, đặc biệt có thể nhầm dấu số nguyên, thứ tự phép tính và phân số.

Nguyên tắc:
- Đi từ trực quan đến ký hiệu; từ bài đơn giản đến bài tổng hợp.
- Mỗi màn hình chỉ tập trung vào một ý chính.
- Dùng câu ngắn, từ phổ thông, giải thích thuật ngữ trước khi sử dụng.
- Tránh dồn nhiều quy tắc trong một đoạn văn dài.
- Không hiển thị đáp án ngay trước khi học sinh thử làm.
- Khi sai, không chỉ báo “Sai”. Hãy chỉ ra bước dễ nhầm, đặt câu hỏi gợi mở và cho phép thử lại.
- Tách rõ: **nhớ quy tắc**, **hiểu quy tắc**, **tự làm được**, **giải thích được**, **nhớ lại sau vài ngày**.
- Khuyến khích nỗ lực và tiến bộ, không gắn nhãn tiêu cực cho học sinh.
- Câu hỏi tư duy không được đánh đố bằng ngôn ngữ; phải kiểm tra suy luận Toán học.
- Với mỗi kỹ năng, nên có ví dụ mẫu, bài luyện có hướng dẫn, bài tự làm và ít nhất một câu hỏi “Vì sao?” hoặc “Nếu thay đổi dữ kiện thì sao?”.

## 4. Lộ trình học chuẩn — không tự ý đổi thứ tự

Tạo dữ liệu cho đủ 14 ngày theo đúng nội dung sau:

| Ngày | Chủ đề | Mục tiêu chính | Bài kiểm tra gợi ý |
|---|---|---|---|
| 1 | Số nguyên: cộng, trừ | Phân biệt dấu của số và phép toán; trừ số âm | 10 câu, mục tiêu ≥ 8/10 |
| 2 | Nhân, chia số nguyên; thứ tự phép tính | Quy tắc dấu và thứ tự thực hiện phép tính | 10 câu, mục tiêu ≥ 8/10 |
| 3 | Phân số bằng nhau, rút gọn | Tìm ước chung và rút gọn đúng | 10 câu, mục tiêu ≥ 8/10 |
| 4 | Quy đồng, cộng và trừ phân số | Tìm mẫu chung; giữ đúng dấu | 10 câu, mục tiêu ≥ 8/10 |
| 5 | Nhân, chia phân số | Nhân tử với tử; đảo phân số khi chia | 10 câu, mục tiêu ≥ 8/10 |
| 6 | Ôn trộn số nguyên và phân số | Chọn đúng quy tắc, không làm theo cảm tính | 12 câu, mục tiêu ≥ 10/12 |
| 7 | Kiểm tra giữa chặng và chữa lỗi | Xác định phần đã vững và phần cần học lại | 20 câu, mục tiêu ≥ 16/20 |
| 8 | Phân phối vào ngoặc | Nhân với từng hạng tử trong ngoặc | 10 câu, mục tiêu ≥ 8/10 |
| 9 | Dấu trừ trước ngoặc | Đổi dấu đúng khi bỏ ngoặc | 10 câu, mục tiêu ≥ 8/10 |
| 10 | Thu gọn biểu thức | Gộp hạng tử đồng dạng, xử lý dấu | 10 câu, mục tiêu ≥ 8/10 |
| 11 | Phương trình có ngoặc | Bỏ ngoặc, thu gọn, tìm x và thử lại | 10 câu, mục tiêu ≥ 8/10 |
| 12 | Hình học nền | Góc kề bù, tổng góc tam giác, tam giác cân | 10 câu, mục tiêu ≥ 8/10 |
| 13 | Kết nối với Toán 8 đang học | Vận dụng kiến thức nền vào bài trên lớp | 10 câu, mục tiêu ≥ 8/10 |
| 14 | Kiểm tra cuối chặng | So sánh với đầu vào và lập kế hoạch tiếp theo | 20 câu mới, mục tiêu ≥ 16/20 |

Thời lượng tham khảo mỗi buổi: **60 phút**
- 10 phút: ôn bài cũ.
- 15 phút: học ý chính.
- 20 phút: luyện có hướng dẫn.
- 10 phút: tự kiểm tra.
- 5 phút: ghi lỗi và kế hoạch tiếp theo.

Đây là khung gợi ý, không khóa cứng thời gian. Học sinh có thể nghỉ hoặc học chậm hơn khi cần.

## 5. Cấu trúc bài học bắt buộc

Mỗi ngày cần có các phần sau:

1. **Mục tiêu hôm nay**
   - Học sinh sẽ hiểu/làm được điều gì.
   - Hiển thị thời lượng tham khảo và vị trí trong lộ trình.

2. **Khởi động / nhớ lại**
   - 1–3 câu ngắn để kiểm tra kiến thức tiên quyết.
   - Nếu sai, đưa liên kết quay lại bài nền tương ứng.

3. **Giải thích dễ hiểu**
   - Nêu ý tưởng bằng ngôn ngữ đơn giản.
   - Khi thích hợp, dùng trục số, mô hình phần bằng nhau, sơ đồ hoặc hình minh họa SVG/CSS.
   - Phân biệt các khái niệm dễ nhầm.

4. **Ví dụ từng bước**
   - Hiển thị đề bài.
   - Chia lời giải thành từng bước, có nút “Xem bước tiếp theo”.
   - Giải thích lý do của từng phép biến đổi.
   - Có phần “Điểm dễ sai” và “Cách tự kiểm tra”.
   - Không để toàn bộ lời giải lộ ra ngay nếu điều đó làm giảm cơ hội tự suy nghĩ.

5. **Luyện tập có hướng dẫn**
   - Bài đầu tiên có gợi ý.
   - Cho phép mở gợi ý theo từng nấc.
   - Khi trả lời sai, phản hồi dựa trên loại lỗi nếu có thể xác định.

6. **Tự luyện**
   - Có nhiều câu ở các mức cơ bản, thông hiểu và vận dụng.
   - Câu hỏi được trộn từ ngân hàng bài đã kiểm tra đáp án.
   - Tránh sinh đề ngẫu nhiên mà không kiểm soát đáp án.
   - Có thể làm lại; lưu lịch sử kết quả tốt nhất và lần gần nhất.

7. **Thử thách tư duy**
   - Ít nhất một câu yêu cầu giải thích “vì sao”, tìm lỗi sai, so sánh hai cách làm hoặc tìm nhiều cách giải.
   - Không nhất thiết chấm tự động câu trả lời tự luận; có thể dùng checklist tự đánh giá hoặc lời giải tham khảo.

8. **Tóm tắt cuối bài**
   - 2–4 điều cần nhớ.
   - Một câu hỏi kiểm tra khả năng giải thích quy tắc.
   - Nút đánh dấu hoàn thành buổi học.
   - Đề xuất ôn lại hoặc chuyển bài theo tiêu chí mastery bên dưới.

## 6. Quy tắc phản hồi khi làm bài

Không dùng phản hồi chung chung như “Sai rồi, thử lại”. Thiết kế các mức hỗ trợ:

- **Gợi ý 1 — Nhận diện:** hỏi học sinh cần dùng quy tắc nào.
- **Gợi ý 2 — Chỉ bước:** chỉ ra bước tiếp theo nhưng chưa đưa đáp án.
- **Gợi ý 3 — Làm mẫu tương tự:** đưa ví dụ khác cùng dạng và giải từng bước.
- **Xem lời giải:** giải đầy đủ, sau đó đưa một câu tương tự để học sinh tự làm.

Ví dụ nội dung cần thể hiện chính xác:
- `−7 − (−4) = −7 + 4 = −3`. Trừ một số âm tương đương cộng số đối của số đó.
- `(-3) × (-4) = 12`. Hai thừa số cùng dấu cho kết quả dương.
- `2 + 3 × 4 = 14`, vì nhân trước cộng; không phải 20.
- `6/9 = 2/3`, chia cả tử và mẫu cho ước chung 3.
- `1/2 + 1/3 = 3/6 + 2/6 = 5/6`.
- `2/3 ÷ 4/5 = 2/3 × 5/4 = 5/6`.
- `2(x + 3) = 2x + 6`.
- `−(x − 4) = −x + 4`.
- `2x + 3x = 5x`, nhưng `2x + 3` không thể gộp thành `5x`.
- Với phương trình, giải thích rằng phép biến đổi phải giữ hai vế bằng nhau; ưu tiên mô tả thao tác thực hiện cùng phép toán ở hai vế thay vì dạy máy móc “chuyển vế đổi dấu”.

Các ví dụ này là bộ kiểm thử nội dung bắt buộc. Đảm bảo đáp án và giải thích trên giao diện khớp với chúng.

## 7. Ngân hàng lỗi sai và chữa lỗi

Tạo mã lỗi và dùng chúng để đề xuất ôn tập:

| Mã | Lỗi | Cách chữa |
|---|---|---|
| E1 | Sai dấu số nguyên | Đổi trừ số âm thành cộng số đối; kiểm tra bằng trục số |
| E2 | Sai dấu nhân/chia | Cùng dấu ra dương, khác dấu ra âm |
| E3 | Sai thứ tự phép tính | Ngoặc trước; nhân/chia trước cộng/trừ |
| F1 | Rút gọn phân số sai | Chia cả tử và mẫu cho cùng ước chung |
| F2 | Cộng/trừ phân số sai | Quy đồng mẫu trước, sau đó cộng/trừ tử |
| F3 | Chia phân số sai | Nhân với phân số nghịch đảo |
| A1 | Phân phối thiếu hạng tử | Nhân số ngoài ngoặc với từng hạng tử |
| A2 | Bỏ ngoặc sai dấu | Đổi dấu tất cả hạng tử khi có dấu trừ đứng trước ngoặc |
| A3 | Gộp hạng tử không đồng dạng | Chỉ gộp các hạng tử đồng dạng |
| X1 | Biến đổi phương trình sai | Thực hiện phép toán tương đương ở cả hai vế |
| H1 | Nhầm tính chất hình học | Vẽ hình, ghi dữ kiện và nêu quy tắc trước khi tính |

Lưu ý sửa nội dung ví dụ sai trong file theo dõi cũ nếu cần hiển thị dưới dạng “lỗi thường gặp”. Ví dụ minh họa sai phải được đánh dấu rõ là **bài làm sai**, sau đó giải thích cách sửa; tuyệt đối không trình bày như đáp án đúng.

Yêu cầu tính năng:
- Ghi nhận lỗi sai sau mỗi lần làm bài.
- Hiển thị lỗi thường gặp của học sinh bằng ngôn ngữ tích cực.
- Nếu cùng mã lỗi xuất hiện từ 2 buổi trở lên, đưa 1–3 câu ôn dạng đó vào phần khởi động buổi sau.
- Có trang “Sổ tay lỗi sai”: câu đã làm, lựa chọn/câu trả lời, đáp án đúng, giải thích, ngày gặp lỗi và trạng thái đã khắc phục.
- Học sinh có thể đánh dấu “Em đã hiểu” nhưng hệ thống chỉ xem là lỗi đã khắc phục sau khi làm đúng một câu tương tự ở lần luyện sau.

## 8. Tiêu chí thành thạo và điều hướng lộ trình

Không tự động mở khóa bài mới chỉ dựa vào điểm trắc nghiệm.

Các tiêu chí tham khảo:
- **Chưa vững:** dưới 6/10 hoặc sai quy tắc cốt lõi. Dạy lại bằng ví dụ đơn giản và luyện 5–8 câu cùng dạng.
- **Đang hình thành:** 6–7/10 hoặc còn phụ thuộc gợi ý. Tiếp tục luyện có hướng dẫn và trộn bài cũ.
- **Có thể cân nhắc chuyển bài:** từ 8/10, tự trình bày được ít nhất 3 bài và giải thích được quy tắc.
- **Vững bền:** đạt các tiêu chí trên và làm tốt bài ôn sau 2–3 ngày. Giảm bài lặp, tăng bài vận dụng.

Trong ứng dụng:
- Hiển thị rõ lý do khuyến nghị học sinh ôn lại hay tiếp tục.
- Cho phép người dạy ghi đè quyết định và ghi chú lý do.
- Nếu điểm cao nhưng học sinh dùng nhiều gợi ý hoặc không giải thích được, không đánh dấu thành thạo.
- Có lịch nhắc ôn lại sau 2–3 ngày. Với MVP không có backend, hiển thị nhắc ôn ngay trên trang chủ khi người dùng mở lại website; không giả định có thể gửi notification khi trình duyệt đã đóng.
- Ngày 7 và ngày 14 phải là bài kiểm tra tổng hợp, có câu hỏi mới, không chỉ lặp nguyên xi câu đã học.

## 9. Các màn hình / trang

### A. Trang chủ — Bảng điều khiển học tập
- Tiêu đề thân thiện: “Mỗi ngày vững hơn một chút”.
- Tiến độ tổng thể 14 ngày.
- Ngày học tiếp theo và nút “Tiếp tục học”.
- Các thẻ: số buổi đã học, số câu đúng/tổng câu, tỷ lệ đúng, kỹ năng đã thành thạo.
- Nhắc ôn tập đến hạn.
- Khu vực “Kỹ năng nên luyện thêm” lấy từ lỗi thực tế, không hard-code kết quả.
- Hiển thị rõ đây là tiến độ cá nhân trên thiết bị hiện tại nếu dùng LocalStorage.

### B. Trang lộ trình 14 ngày
- Danh sách ngày theo thứ tự nguồn.
- Mỗi ngày có chủ đề, trạng thái (chưa học / đang học / cần ôn / hoàn thành), điểm lần gần nhất.
- Có thể mở lại bài cũ.
- Khóa/mở bài nên mềm dẻo: cho phép xem bài sau nhưng khuyến khích hoàn thành kiến thức tiên quyết trước; không khiến học sinh bị mắc kẹt.

### C. Màn hình bài học
- Bố cục tập trung, dễ đọc trên điện thoại và máy tính.
- Điều hướng theo các phần: Học hiểu → Ví dụ → Luyện có hướng dẫn → Tự luyện → Thử thách → Tổng kết.
- Hiển thị tiến trình trong bài.
- Hỗ trợ phím Tab, Enter phù hợp, focus rõ và aria-label cho điều khiển cần thiết.

### D. Kết quả sau bài luyện
- Điểm số và số câu đúng.
- Những kỹ năng đã làm tốt.
- Lỗi nên ôn và liên kết quay lại phần giải thích.
- Không dùng thông điệp làm học sinh xấu hổ.
- Nút “Luyện lại câu sai”, “Ôn kiến thức”, “Về lộ trình”.

### E. Sổ tay lỗi sai / ôn tập
- Lọc theo chủ đề và mã lỗi.
- Luyện lại câu tương tự.
- Theo dõi lỗi lặp và lỗi đã khắc phục.

### F. Khu vực người dạy (MVP đơn giản)
- Có thể xem tiến độ từng ngày, điểm, mức độ tự làm, khả năng giải thích, ghi chú và kế hoạch cải thiện.
- Không cần tài khoản trong MVP; bảo vệ thông tin bằng cách không xuất bản dữ liệu cá nhân và có nút xuất/nhập bản sao lưu.
- Không xây hệ thống phân quyền/backend nếu chưa được yêu cầu.

## 10. Thiết kế UI/UX

Phong cách:
- Sáng sủa, hiện đại, nhẹ nhàng, phù hợp học sinh THCS; không quá trẻ con.
- Ưu tiên khả năng đọc và sự tập trung hơn hiệu ứng.
- Dùng thẻ nội dung có khoảng trắng, tiêu đề phân cấp rõ, màu sắc nhất quán.
- Màu trạng thái phải kèm chữ/biểu tượng, không chỉ dựa vào màu.
- Chuyển động tinh tế, tôn trọng `prefers-reduced-motion`.
- Tránh gamification gây áp lực, bảng xếp hạng hoặc so sánh học sinh với nhau.
- Responsive từ màn hình điện thoại nhỏ đến desktop.
- Có trạng thái loading, empty, success, error và confirm trước khi xóa dữ liệu.

Typography và trình bày Toán:
- Công thức phải dễ đọc, dấu âm và ngoặc không bị mơ hồ.
- Không dựa vào ảnh chụp công thức; dùng HTML/MathJax/KaTeX nếu repository đã có hoặc thật sự cần thiết. Nếu chưa có thư viện công thức, trình bày công thức đơn giản bằng HTML có khoảng cách hợp lý.
- Không để công thức bị tràn màn hình điện thoại.
- Hình hình học phải có nhãn góc/đỉnh rõ và không đánh lừa về tỷ lệ hình.

## 11. Dữ liệu và kiến trúc gợi ý

Tách nội dung thành dữ liệu có cấu trúc, ví dụ:
- `src/data/learningPlan.js`
- `src/data/lessons/day01.js` … `day14.js` hoặc cấu trúc tương đương phù hợp repository.
- `src/data/questionBank.js` hoặc module theo chủ đề.
- `src/lib/progressStorage.js`
- `src/lib/scoring.js`
- `src/lib/masteryRules.js`
- Component riêng cho `LessonStep`, `WorkedExample`, `QuestionCard`, `HintPanel`, `ProgressSummary`, `ErrorNotebook`.

Một đối tượng câu hỏi nên có:
- `id` ổn định
- `day`
- `topic`
- `skill`
- `difficulty` (basic / intermediate / challenge)
- `type` (multiple-choice, numeric, true-false, error-diagnosis; tự luận có thể dùng checklist)
- `prompt`
- `choices` nếu có
- `correctAnswer`
- `explanation`
- `hints` theo từng mức
- `errorCode` nếu phù hợp
- `tags`

Lưu tiến độ cục bộ:
- Ngày/buổi đã học.
- Kết quả theo lần làm bài.
- Câu trả lời, câu sai, số lần dùng gợi ý.
- Tình trạng kỹ năng.
- Lịch ôn tập.
- Ghi chú của người dạy.
- Phiên bản schema dữ liệu để có thể migrate sau này.

LocalStorage là lựa chọn MVP, nhưng:
- Bọc thao tác đọc/ghi trong try/catch.
- Có xử lý khi dữ liệu hỏng hoặc thiếu trường.
- Có xuất/nhập JSON.
- Có xác nhận trước khi xóa.
- Không lưu dữ liệu nhạy cảm không cần thiết.
- Không giả định dữ liệu tự đồng bộ giữa các thiết bị.
- Không dùng LocalStorage làm cơ sở dữ liệu đa người dùng.

## 12. Ngân hàng bài tập và chất lượng nội dung

MVP phải có nội dung thực tế cho cả 14 ngày, không chỉ tạo 1–2 ngày mẫu rồi để placeholder cho phần còn lại.

Mỗi ngày tối thiểu cần:
- 1 phần giải thích khái niệm.
- 2 ví dụ được giải từng bước.
- 5 câu luyện có hướng dẫn/tự luyện, tốt nhất có nhiều hơn để đáp ứng kiểm tra 10–20 câu theo ngày.
- 1 thử thách tư duy.
- Đáp án và lời giải giải thích.
- Các câu hỏi phải bao phủ mục tiêu của ngày.
- Ngày 7 có ít nhất 20 câu tổng hợp và ngày 14 có ít nhất 20 câu mới. Nếu số câu được chia thành nhiều lượt, phải theo dõi đủ số câu và không đếm lặp câu như câu mới.

Kiểm tra chất lượng:
- Mỗi câu có đáp án đúng duy nhất nếu là câu trắc nghiệm một lựa chọn.
- Các phương án nhiễu phải hợp lý, phản ánh lỗi học sinh thường gặp.
- Đảm bảo không có hai đáp án cùng đúng do cách diễn đạt mơ hồ.
- Kiểm tra tất cả phép tính bằng test hoặc rà soát độc lập.
- Không sinh câu hỏi mới bằng AI trong runtime cho MVP.
- Câu tư duy có lời giải mẫu và rubric tự kiểm tra.
- Độ khó tăng dần nhưng không bỏ qua kiến thức tiên quyết.
- Ngày 13 phải cho phép người dạy nhập chủ đề Toán 8 đang học để tạo bài vận dụng tương ứng; nếu chưa cấu hình thì cung cấp bộ bài mẫu tổng quát và ghi rõ là ví dụ.

## 13. Theo dõi tiến độ và thống kê

Các chỉ số phải có định nghĩa rõ:
- **Buổi đã ghi nhận:** có ngày học hoặc kết quả/ghi chú đã lưu.
- **Tổng câu đúng / tổng câu:** tính từ dữ liệu lần làm bài được chọn theo quy tắc rõ ràng; tránh cộng lặp câu khi học sinh làm lại nhiều lần mà hiển thị như một bài duy nhất.
- **Tỷ lệ đúng:** số câu đúng chia tổng câu theo cùng phạm vi thống kê.
- **Kỹ năng thành thạo:** số kỹ năng đạt tiêu chí mastery, không chỉ số ngày được đánh dấu hoàn thành.

Lưu cả lần gần nhất và kết quả tốt nhất. Mặc định trang tổng quan nên dùng kết quả lần gần nhất để phản ánh hiện trạng; hiển thị điểm tốt nhất riêng nếu hữu ích.

Cho phép xuất tiến độ ra JSON và CSV, in/lưu PDF nếu dễ triển khai trong kiến trúc hiện có. Nhập JSON phải xác thực schema trước khi thay dữ liệu.

## 14. Accessibility, riêng tư và an toàn

- Giao diện tiếng Việt có dấu, ngôn ngữ phù hợp học sinh lớp 8.
- Tương phản màu đạt mức dễ đọc; không chỉ dùng màu để truyền tải trạng thái.
- Các nút có nhãn rõ, vùng bấm đủ lớn.
- Điều khiển bằng bàn phím được.
- Thông báo kết quả cho screen reader ở những chỗ phù hợp.
- Không thu thập họ tên đầy đủ, trường, địa chỉ, số điện thoại hoặc dữ liệu cá nhân không cần thiết.
- Không có quảng cáo, leaderboard hoặc chia sẻ điểm công khai.
- Nếu chỉ dùng LocalStorage, nêu rõ dữ liệu chỉ nằm trên trình duyệt/thiết bị này.
- Không đưa API key hoặc secret vào client.

## 15. Kiểm thử bắt buộc

Viết hoặc thực hiện kiểm thử phù hợp cho:
1. Các phép tính và đáp án ví dụ nêu tại mục 6.
2. Chấm điểm: mẫu số hợp lệ, điểm không âm, điểm đúng không vượt tổng số câu.
3. Lưu và tải lại tiến độ.
4. Dữ liệu LocalStorage bị hỏng.
5. Xuất/nhập JSON.
6. Tính tỷ lệ đúng và số kỹ năng thành thạo.
7. Quy tắc gợi ý chuyển bài.
8. Bài ngày 7 và 14 không lặp toàn bộ câu cũ.
9. Responsive ở kích thước mobile và desktop.
10. Không có link/nút chính bị vô hiệu hoặc chỉ mang tính trang trí.

Nếu repository có sẵn framework test, dùng framework đó. Nếu chưa có, ưu tiên viết unit test cho logic thuần và chạy build/lint. Không thêm một hệ thống test nặng không cần thiết.

## 16. Tiêu chí nghiệm thu

Chỉ xem MVP hoàn thành khi:
- [ ] Website khởi chạy được theo hướng dẫn rõ ràng.
- [ ] Đủ 14 ngày, đúng thứ tự và đúng mục tiêu nguồn.
- [ ] Mỗi ngày có giải thích, ví dụ từng bước, luyện tập, gợi ý, đáp án và thử thách tư duy.
- [ ] Nội dung và lời giải không có lỗi toán học đã biết.
- [ ] Học sinh nhận được phản hồi hữu ích khi trả lời sai.
- [ ] Có theo dõi tiến độ, lưu cục bộ, xem lại bài cũ và ôn lỗi sai.
- [ ] Tiêu chí chuyển bài xét cả điểm, khả năng tự làm và giải thích.
- [ ] Có bài kiểm tra giữa chặng và cuối chặng đủ số lượng câu.
- [ ] Có xuất/nhập bản sao lưu nếu dùng LocalStorage.
- [ ] Giao diện responsive, dễ đọc và có accessibility cơ bản.
- [ ] Build/lint/test đã chạy; nêu rõ kết quả và các hạn chế còn lại.
- [ ] README hướng dẫn cài đặt, chạy local, build và mô tả cách dữ liệu được lưu.

## 17. Quy trình triển khai

Làm theo thứ tự:
1. Khảo sát repository và xác định kiến trúc phù hợp.
2. Tóm tắt ngắn cấu trúc hiện tại và kế hoạch triển khai.
3. Xây dựng data model cho lộ trình, bài học, câu hỏi, lỗi sai và tiến độ.
4. Hoàn thiện một bài mẫu đầy đủ và kiểm tra trải nghiệm học.
5. Dùng cùng chuẩn chất lượng để tạo nội dung thực tế cho đủ 14 ngày.
6. Xây luồng làm bài, chấm điểm, gợi ý, ghi nhận lỗi và ôn tập.
7. Xây dashboard, lộ trình, sổ tay lỗi sai và khu vực người dạy.
8. Hoàn thiện responsive/accessibility.
9. Chạy kiểm thử, lint, build; sửa lỗi có thể khắc phục.
10. Cập nhật README và báo cáo cuối cùng.

## 18. Báo cáo sau khi hoàn thành

Khi kết thúc, báo cáo ngắn gọn:
- Những tính năng đã triển khai.
- Các route/trang chính.
- Công nghệ sử dụng và lý do.
- Cách chạy local.
- Kết quả lint/build/test.
- Những phần chưa hoàn thành hoặc giả định đã sử dụng.
- Những nội dung cần người dạy kiểm tra thêm.

**Ưu tiên cao nhất:** trải nghiệm học thật sự dễ hiểu và nội dung Toán chính xác. Không hy sinh chất lượng bài học để chạy theo hiệu ứng hình ảnh.
