# Website Học Toán 8 Từ Gốc — Lộ Trình 14 Ngày Vững Vàng

> Nền tảng học Toán tương tác dành cho học sinh lớp 8 cần củng cố kiến thức nền tảng, tập trung vào **hiểu bản chất vì sao**, không học vẹt quy tắc, có hệ thống phản hồi sư phạm 3 tầng gợi ý, phân loại lỗi sai (E1–H1) và khu vực quản lý tiến độ dành cho gia sư / phụ huynh.

---

## 🌟 Điểm nổi bật của sản phẩm

1. **Chuẩn lộ trình 14 ngày không cắt xén:**
   - Đầy đủ 14 ngày học với nội dung thực tế chi tiết, không dùng dữ liệu giả lập hay placeholder.
   - Ngày 7 là bài kiểm tra giữa chặng 20 câu; Ngày 14 là bài kiểm tra cuối chặng 20 câu độc lập.
2. **Cấu trúc sư phạm 8 bước mỗi bài học:**
   - **Mục tiêu:** Thời lượng tham khảo 60 phút và năng lực cần đạt.
   - **Khởi động / Nhớ lại:** Kiểm tra kiến thức tiên quyết & tích hợp 1–3 câu ôn dạng lỗi lặp nếu học sinh từng sai ≥ 2 buổi trước.
   - **Bản chất trực quan:** Trực quan hóa toán học bằng mô hình SVG tương tác (trục số nguyên, mô hình chia bánh phân số, cân thăng bằng phương trình, hình học trực quan).
   - **Ví dụ mẫu từng bước:** Mở từng bước suy luận, có mục *Điểm dễ sai* và *Cách tự kiểm tra*.
   - **Luyện có gợi ý:** 3 tầng hỗ trợ sư phạm (Gợi ý 1: Nhận diện quy tắc; Gợi ý 2: Chỉ bước tiếp theo; Gợi ý 3: Bài mẫu tương tự) trước khi xem lời giải hoàn chỉnh.
   - **Tự luyện:** Trộn câu hỏi từ ngân hàng bài tập đã qua kiểm tra đáp án, chấm điểm tức thì và phân tích mã lỗi.
   - **Thử thách tư duy:** Câu hỏi "Vì sao?", tìm lỗi sai trong bài làm giả định, bảng kiểm (checklist) tự đánh giá.
   - **Tổng kết:** Tóm tắt 2–4 ý chính, câu hỏi kiểm tra khả năng giải thích và đánh dấu hoàn thành.
3. **Sổ tay lỗi sai thông minh (Taxonomy E1–H1):**
   - Phân loại 11 mã lỗi kinh điển (E1: Dấu số nguyên, E2: Dấu nhân/chia, E3: Thứ tự phép tính, F1: Rút gọn phân số, F2: Cộng/trừ phân số, F3: Chia phân số, A1: Phân phối thiếu hạng tử, A2: Bỏ ngoặc sai dấu, A3: Gộp hạng tử không đồng dạng, X1: Cân bằng hai vế phương trình, H1: Nhầm tính chất hình học).
   - Có tính năng **Luyện tập khắc phục lỗi** trực tiếp ngay trong Sổ tay lỗi sai.
4. **Không gian gia sư / Người dạy:**
   - Xem tổng quan 14 buổi, điểm số, mức độ tự làm và khả năng giải thích.
   - Bộ tiêu chuẩn đánh giá thành thạo tự động: *Chưa vững*, *Đang hình thành*, *Cân nhắc chuyển bài*, *Vững bền*.
   - Cho phép người dạy ghi đè quyết định và lưu ghi chú cá nhân hóa.
   - Hỗ trợ xuất/nhập sao lưu JSON, xuất báo cáo CSV có UTF-8 BOM chuẩn cho Microsoft Excel và tối ưu giao diện in ấn `@media print`.
5. **Tôn trọng quyền riêng tư (Privacy-by-Design):**
   - Lưu trữ 100% trên `LocalStorage` của trình duyệt, không thu thập họ tên đầy đủ, trường lớp, số điện thoại.
   - Tên học sinh hiển thị thân thiện, trung tính: *"Bạn học"*.

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

### Yêu cầu hệ thống
- **Node.js**: Phiên bản 18.17 trở lên (đã kiểm tra tương thích tốt trên Node 20 / 22).
- **npm** hoặc **yarn** / **pnpm**.

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại địa chỉ: [http://localhost:3000](http://localhost:3000)

### 3. Kiểm thử toán học & cấu trúc (Unit & Integrity Tests)
Dự án tích hợp bộ kiểm thử tự động sử dụng test runner chuẩn của Node.js:
```bash
npm test
```
*Bộ test kiểm tra toàn bộ 10 ca kiểm thử toán học kinh điển theo Mục 6 AGENTS.md, công thức phân số, chuyển đổi dấu, và tính toàn vẹn 14 bài học.*

### 4. Build bản đóng gói triển khai (Production Build)
```bash
npm run build
npm run start
```

---

## 🗺️ Khung chương trình 14 ngày chuẩn

| Ngày | Chủ đề | Mục tiêu chính | Đánh giá |
|:---:|---|---|:---:|
| **1** | Số nguyên: cộng, trừ | Phân biệt dấu của số và phép toán; trừ số âm | 10 câu, mục tiêu ≥ 8/10 |
| **2** | Nhân, chia số nguyên & thứ tự phép tính | Quy tắc dấu và thứ tự thực hiện phép tính (nhân chia trước cộng trừ) | 10 câu, mục tiêu ≥ 8/10 |
| **3** | Phân số bằng nhau, rút gọn | Tìm ước chung lớn nhất và rút gọn phân số tối giản | 10 câu, mục tiêu ≥ 8/10 |
| **4** | Quy đồng, cộng và trừ phân số | Tìm mẫu chung; giữ đúng quy tắc dấu ở tử số | 10 câu, mục tiêu ≥ 8/10 |
| **5** | Nhân, chia phân số | Nhân tử với tử; nhân nghịch đảo khi chia | 10 câu, mục tiêu ≥ 8/10 |
| **6** | Ôn trộn số nguyên và phân số | Chọn đúng quy tắc, loại bỏ thói quen làm theo cảm tính | 12 câu, mục tiêu ≥ 10/12 |
| **7** | **Kiểm tra giữa chặng & Chữa lỗi** | Đánh giá toàn diện kiến thức nền nửa đầu chặng đường | **20 câu tổng hợp**, ≥ 16/20 |
| **8** | Phân phối vào ngoặc | Nhân số/đơn thức ngoài ngoặc với từng hạng tử | 10 câu, mục tiêu ≥ 8/10 |
| **9** | Dấu trừ trước ngoặc | Đổi dấu toàn bộ các hạng tử bên trong khi phá ngoặc | 10 câu, mục tiêu ≥ 8/10 |
| **10** | Thu gọn biểu thức | Nhận biết và gộp các hạng tử đồng dạng, xử lý dấu cẩn thận | 10 câu, mục tiêu ≥ 8/10 |
| **11** | Phương trình có ngoặc | Phá ngoặc, thu gọn, cân bằng hai vế tìm x và thử lại nghiệm | 10 câu, mục tiêu ≥ 8/10 |
| **12** | Hình học nền tảng | Góc kề bù, tổng ba góc trong tam giác, tam giác cân | 10 câu, mục tiêu ≥ 8/10 |
| **13** | Kết nối với Toán 8 đang học | Ứng dụng quy tắc nền vào phân thức đại số, nhân đa thức, hằng đẳng thức | 10 câu, mục tiêu ≥ 8/10 |
| **14** | **Kiểm tra cuối chặng** | Khảo sát tiến bộ cuối khóa với 20 câu hỏi mới hoàn toàn | **20 câu mới**, ≥ 16/20 |

---

## 📂 Cấu trúc mã nguồn

```
toan8-14-ngay/
├── src/
│   ├── app/
│   │   ├── layout.jsx            # Shell ứng dụng, phông chữ Outfit & Inter, responsive drawer
│   │   ├── page.jsx              # Dashboard học tập, thống kê, CTA bài học tiếp theo, nhắc nhở ôn tập
│   │   ├── globals.css           # Design tokens, tiện ích hiển thị phân số .math-fraction, print CSS
│   │   ├── lo-trinh/page.jsx     # Bản đồ 14 ngày học với trạng thái & cảnh báo bài tiên quyết
│   │   ├── bai-hoc/[day]/page.jsx# Bộ trình diễn bài học 8 bước tương tác hoàn chỉnh
│   │   ├── so-tay-loi/page.jsx   # Sổ tay lỗi sai E1–H1, lọc theo chủ đề & luyện tập khắc phục
│   │   └── gia-su/page.jsx       # Bảng điều khiển gia sư, xuất/nhập JSON & CSV, print preview
│   ├── components/
│   │   ├── Header.jsx            # Thanh điều hướng trên cùng, nhận diện thương hiệu
│   │   ├── Footer.jsx            # Chân trang với phương châm sư phạm
│   │   ├── MathView.jsx          # Bộ dựng biểu thức Toán sạch sẽ (Unicode minus, phân số chuẩn)
│   │   ├── VisualDiagram.jsx     # Trực quan hóa toán học SVG (trục số, phân số, cân thăng bằng, hình học)
│   │   ├── QuestionCard.jsx      # Thẻ câu hỏi trắc nghiệm, phản hồi đa kênh, 3 tầng gợi ý
│   │   ├── StepByStepCard.jsx    # Thẻ ví dụ mẫu hiển thị từng bước suy luận có kiểm tra
│   │   └── ChallengeSection.jsx  # Khu vực câu hỏi tư duy "Vì sao?" kèm rubric tự chấm
│   ├── data/
│   │   ├── curriculum.js         # Siêu dữ liệu chuẩn cho 14 ngày
│   │   ├── errorTaxonomy.js      # Danh mục 11 mã lỗi chuẩn E1–H1 kèm cơ chế chữa lỗi
│   │   └── lessons/              # Ngân hàng 14 bài học chi tiết từ day01.js đến day14.js
│   └── lib/
│       ├── storage.js            # Trình quản lý LocalStorage an toàn (migration, fallback, export/import)
│       ├── scoring.js            # Thư viện tính toán điểm số, tỷ lệ chính xác, phân tích lỗi
│       └── masteryRules.js       # Thuật toán đánh giá mức độ thành thạo và phát hiện lỗi lặp
├── tests/
│   ├── mathAccuracy.test.js      # Kiểm thử 10 ca toán học kinh điển theo AGENTS.md
│   └── curriculumIntegrity.test.js# Kiểm thử tính toàn vẹn của 14 bài học và ngân hàng đề thi
├── package.json
├── next.config.mjs
└── tailwind.config.js
```

---

## 🧪 Đảm bảo chất lượng & Kiểm thử

Các ca toán học kinh điển bắt buộc tại Mục 6 của `AGENTS.md` đã được mã hóa thành các bài kiểm thử tự động tại `tests/mathAccuracy.test.js`:
- `−7 − (−4) = −3` (Trừ số âm là cộng số đối).
- `(-3) × (-4) = 12` (Nhân hai số cùng dấu âm cho kết quả dương).
- `2 + 3 × 4 = 14` (Nhân trước cộng sau, không ra 20).
- `6/9 = 2/3` (Rút gọn chia cả tử và mẫu cho ước chung 3).
- `1/2 + 1/3 = 5/6` (Quy đồng mẫu số).
- `2/3 ÷ 4/5 = 5/6` (Nhân với phân số đảo ngược).
- `2(x + 3) = 2x + 6` (Phân phối vào ngoặc).
- `−(x − 4) = −x + 4` (Đổi dấu khi trước ngoặc là dấu trừ).
- `2x + 3x = 5x` và `2x + 3` không thể gộp thành `5x`.
- Biến đổi phương trình dựa trên nguyên tắc **giữ thăng bằng hai vế**.
- Ngày 7 có 20 câu tổng hợp; Ngày 14 có 20 câu độc lập mới hoàn toàn.
