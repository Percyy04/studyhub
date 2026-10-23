# Kế hoạch triển khai Website Học Toán 8 Nền Tảng Theo Lộ Trình 14 Ngày
*(Cập nhật theo tiêu chuẩn UI/UX Pro Max & UI Styling System)*

## Overview
Website học Toán tương tác dành cho học sinh lớp 8 đang cần củng cố kiến thức nền tảng từ gốc theo tài liệu nguồn `theo_doi_toan_14_ngay_ngoc_dang.html` và quy chuẩn sư phạm tại `AGENTS.md`.

Hệ thống kết hợp 2 phân hệ thống nhất trên nền tảng **Next.js App Router (JavaScript + React 19)** với hệ thống UI Styling hiện đại (**Tailwind CSS + shadcn/ui component architecture + Lucide Vector Icons**):
1. **Không gian Tự học Tương tác (Học sinh)**: Trực quan, giải thích bản chất "Vì sao", lộ trình từng bước (Khởi động → Giải thích trực quan → Ví dụ tương tác có nút xem bước → Luyện tập có gợi ý 3 nấc → Tự luyện chấm điểm tức thì → Thử thách tư duy → Sổ tay sửa lỗi).
2. **Không gian Theo dõi & Điều chỉnh Sư phạm (Gia sư / Giáo viên)**: Bảng theo dõi tiến độ chi tiết 14 buổi, nhập đánh giá độc lập/thành thạo/giải thích quy tắc, ghi chú sư phạm, gợi ý quyết định chuyển bài thông minh, cảnh báo lỗi lặp từ 2 buổi, xuất/nhập JSON & CSV, in báo cáo PDF chuẩn in ấn.

Toàn bộ dữ liệu được lưu trữ an toàn trên thiết bị (LocalStorage với Schema Validation, versioning, fallback khi lỗi) mà không cần cấu hình backend hay tài khoản phức tạp.

---

## Requirements

### 1. Phạm vi Lộ trình 14 Ngày (Chuẩn AGENTS.md Mục 4)
- **Ngày 1**: Số nguyên: cộng, trừ (Phân biệt dấu của số và phép toán; trừ số âm). Mục tiêu ≥ 8/10.
- **Ngày 2**: Nhân, chia số nguyên; thứ tự phép tính (Quy tắc dấu và thứ tự thực hiện phép tính). Mục tiêu ≥ 8/10.
- **Ngày 3**: Phân số bằng nhau, rút gọn (Tìm ước chung và rút gọn đúng). Mục tiêu ≥ 8/10.
- **Ngày 4**: Quy đồng, cộng và trừ phân số (Tìm mẫu chung; giữ đúng dấu). Mục tiêu ≥ 8/10.
- **Ngày 5**: Nhân, chia phân số (Nhân tử với tử; đảo phân số khi chia). Mục tiêu ≥ 8/10.
- **Ngày 6**: Ôn trộn số nguyên và phân số (Chọn đúng quy tắc, không làm theo cảm tính). Mục tiêu ≥ 10/12.
- **Ngày 7**: Kiểm tra giữa chặng và chữa lỗi (Xác định phần đã vững và phần cần học lại). 20 câu tổng hợp, mục tiêu ≥ 16/20.
- **Ngày 8**: Phân phối vào ngoặc (Nhân với từng hạng tử trong ngoặc). Mục tiêu ≥ 8/10.
- **Ngày 9**: Dấu trừ trước ngoặc (Đổi dấu đúng khi bỏ ngoặc). Mục tiêu ≥ 8/10.
- **Ngày 10**: Thu gọn biểu thức (Gộp hạng tử đồng dạng, xử lý dấu). Mục tiêu ≥ 8/10.
- **Ngày 11**: Phương trình có ngoặc (Bỏ ngoặc, thu gọn, tìm x và thử lại, cân bằng 2 vế). Mục tiêu ≥ 8/10.
- **Ngày 12**: Hình học nền (Góc kề bù, tổng góc tam giác, tam giác cân). Mục tiêu ≥ 8/10.
- **Ngày 13**: Kết nối với Toán 8 đang học (Vận dụng kiến thức nền vào bài trên lớp; hỗ trợ cấu hình chủ đề hoặc dùng bộ đề mẫu chuẩn). Mục tiêu ≥ 8/10.
- **Ngày 14**: Kiểm tra cuối chặng (So sánh với đầu vào và lập kế hoạch tiếp theo). 20 câu mới hoàn toàn, mục tiêu ≥ 16/20.

### 2. Cấu trúc 8 Phần Bắt Buộc cho Mỗi Ngày Học (AGENTS.md Mục 5)
1. **Mục tiêu hôm nay**: Nêu rõ kỹ năng sẽ đạt được, khung thời gian 60 phút (10’ ôn cũ, 15’ học ý chính, 20’ luyện có hướng dẫn, 10’ tự kiểm tra, 5’ ghi lỗi & kế hoạch).
2. **Khởi động / Nhớ lại**: 1–3 câu ngắn kiểm tra kiến thức tiên quyết + tích hợp câu ôn lỗi lặp nếu có mã lỗi tái diễn từ ≥ 2 buổi trước.
3. **Giải thích dễ hiểu**: Dùng hình ảnh trực quan (trục số SVG cho số nguyên, mô hình chia thanh/chia bánh cho phân số, mô hình cân thăng bằng cho phương trình, hình học SVG có nhãn góc chuẩn).
4. **Ví dụ từng bước**: Hiển thị từng bước giải khi học sinh bấm "Xem bước tiếp theo", kèm mục "Điểm dễ sai" và "Cách tự kiểm tra".
5. **Luyện tập có hướng dẫn**: Hỗ trợ 3 mức gợi ý tăng dần (Gợi ý 1: Nhận diện quy tắc; Gợi ý 2: Chỉ bước tiếp; Gợi ý 3: Bài mẫu tương tự) + Xem lời giải chi tiết.
6. **Tự luyện**: Tối thiểu 5–10 câu kiểm soát chặt chẽ đáp án (Cơ bản → Thông hiểu → Vận dụng); tính điểm, ghi nhận số lần dùng gợi ý, lưu kết quả gần nhất và kết quả tốt nhất.
7. **Thử thách tư duy**: Ít nhất 1 câu hỏi "Vì sao?", tìm lỗi sai ("Spot the error") hoặc so sánh cách làm; có Rubric checklist tự đánh giá + lời giải mẫu.
8. **Tóm tắt cuối bài**: 2–4 điều cốt lõi cần nhớ, câu hỏi giải thích quy tắc bằng lời của bản thân, nút hoàn thành bài học và gợi ý chuyển bài / ôn tập.

### 3. Hệ thống 11 Mã Lỗi Chuẩn (Taxonomy E1–H1) & Sổ Tay Lỗi Sai
- `E1`: Sai dấu số nguyên (−7 − (−4) = −3, trừ số âm là cộng số đối).
- `E2`: Sai dấu nhân/chia ((−3) × (−4) = 12, cùng dấu dương, khác dấu âm).
- `E3`: Sai thứ tự phép tính (2 + 3 × 4 = 14, nhân trước cộng).
- `F1`: Rút gọn phân số sai (6/9 = 2/3, chia cho ƯCLN).
- `F2`: Cộng/trừ phân số sai (1/2 + 1/3 = 5/6, quy đồng mẫu trước).
- `F3`: Chia phân số sai (2/3 ÷ 4/5 = 2/3 × 5/4 = 5/6, nhân nghịch đảo).
- `A1`: Phân phối thiếu hạng tử (2(x + 3) = 2x + 6).
- `A2`: Bỏ ngoặc sai dấu (−(x − 4) = −x + 4, đổi dấu toàn bộ hạng tử).
- `A3`: Gộp hạng tử không đồng dạng (2x + 3x = 5x, nhưng 2x + 3 không thể gộp thành 5x).
- `X1`: Biến đổi phương trình sai (giữ cân bằng 2 vế, thao tác cùng phép tính ở 2 vế).
- `H1`: Nhầm tính chất hình học (góc kề bù = 180°, tổng 3 góc tam giác = 180°, tính chất góc đáy tam giác cân).
- *Cơ chế Sổ tay lỗi sai*: Theo dõi từng lỗi sai thực tế khi làm bài. Trạng thái "Đã khắc phục" chỉ kích hoạt khi học sinh làm đúng câu tương tự trong bài luyện hoặc bài ôn.

### 4. Tiêu chí Thành thạo (Mastery Engine) & Điều hướng Lộ trình
- Dưới 6/10 hoặc sai quy tắc cốt lõi: **Chưa vững** → Khuyến nghị học lại, làm 5–8 câu bài tập đơn giản.
- 6–7/10 hoặc phụ thuộc gợi ý: **Đang hình thành** → Khuyến nghị tiếp tục luyện có hướng dẫn, trộn bài cũ.
- Từ 8/10, tự làm độc lập, giải thích được quy tắc: **Có thể chuyển bài** → Cho phép chuyển sang bài mới, kèm lịch nhắc ôn lại sau 2–3 ngày.
- Làm tốt bài kiểm tra ôn lại sau 2–3 ngày: **Vững bền**.
- Gia sư/người dạy có quyền ghi đè quyết định và lưu lý do sư phạm.

---

## UI/UX & Design System (Áp dụng kỹ năng `ui-ux-pro-max` & `ui-styling`)

### 1. Phân tích Đối tượng & Định hướng Thẩm mỹ
- **Đối tượng**: Học sinh lớp 8 (13–14 tuổi), tâm lý nhạy cảm, sợ bị phán xét, dễ nản khi gặp bài khó, cần giao diện sáng sủa, tạo cảm giác an tâm và tự tin.
- **Phong cách Thiết kế**: **Modern Clean EdTech & Swiss Functionalism** kết hợp các thẻ bo góc mềm mại (`rounded-xl`), phân cấp thị giác rõ ràng, màu sắc tích cực, không dùng phong cách trẻ con (không dùng font Comic hay hình vẽ tiểu học) và không dùng giao diện khô khan như bảng tính.
- **Tiêu chuẩn Biểu tượng (Iconography)**:
  - **TUYỆT ĐỐI KHÔNG DÙNG EMOJI** làm icon điều hướng, trạng thái hay cấu trúc hệ thống (Anti-pattern hàng đầu theo `ui-ux-pro-max`).
  - Sử dụng toàn bộ biểu tượng Vector chuẩn từ **`lucide-react`** với nét vẽ đồng nhất (`strokeWidth={2}` hoặc `1.75`), kích thước token quy chuẩn (`w-4 h-4`, `w-5 h-5`, `w-6 h-6`).
  - Mọi icon trang trí đi cùng chữ phải có `aria-hidden="true"`; các icon button độc lập phải có `aria-label` minh bạch.

### 2. Bảng Màu Chuẩn (Color Palette & Tokens) — Đạt WCAG AA 4.5:1
Dựa trên kết quả tối ưu từ `ui-ux-pro-max` cho nền tảng giáo dục:

| Vai trò | Mã Hex | Tailwind Class | Mô tả & Công dụng |
|---|---|---|---|
| **Primary (Chính)** | `#1E3A8A` / `#2563EB` | `bg-blue-600`, `text-blue-900` | Xanh tri thức, kích thích tập trung, tin cậy |
| **Primary Soft** | `#EFF6FF` | `bg-blue-50` | Nền thẻ nổi bật, nền câu đang làm |
| **Success (Đúng/Thành thạo)** | `#059669` / `#10B981` | `text-emerald-700`, `bg-emerald-500` | Khích lệ tiến bộ, tương phản $\ge 4.5:1$ trên nền trắng |
| **Warning (Cần ôn/Lỗi lặp)** | `#D97706` | `text-amber-700`, `bg-amber-500` | Nhắc nhở tích cực, không gây hoảng sợ |
| **Error (Cần xem lại/Điểm dễ sai)** | `#DC2626` | `text-rose-700`, `bg-rose-50` | Chỉ rõ ngộ nhận, kết hợp lời hướng dẫn khắc phục |
| **Background (Nền)** | `#F8FAFC` | `bg-slate-50` | Sáng mát mắt, giảm mỏi mắt khi học lâu |
| **Surface/Card** | `#FFFFFF` | `bg-white` | Thẻ học tập sắc nét, bóng mờ nhẹ (`shadow-sm` đến `shadow-md`) |
| **Border / Line** | `#E2E8F0` | `border-slate-200` | Đường phân cách rõ ràng, không mờ nhạt |
| **Text Primary** | `#0F172A` | `text-slate-900` | Độ tương phản tối ưu $12:1$ |
| **Text Muted** | `#475569` | `text-slate-600` | Độ tương phản $5.5:1$, đạt chuẩn AA cho văn bản phụ |

### 3. Typography & Trình bày Toán học (Math Rendering)
- **Cặp Font chữ kết hợp**:
  - **Heading**: **`Outfit`** (Google Font hình học, hiện đại, trang trọng nhưng trẻ trung).
  - **Body text**: **`Inter`** hoặc **`Work Sans`** (dễ đọc ở cỡ 14–16px, line-height 1.6, tối ưu tiếng Việt có dấu).
  - **Số học & Bảng tính**: **`JetBrains Mono`** / `tabular-nums` giúp các số hạng trong phép tính thẳng cột nhau.
- **Khắc phục lỗi Trình bày Toán học (Math Layout Defects)**:
  - **Dấu trừ chuẩn**: Dùng ký tự toán học Unicode Minus `−` (`\u2212`), không bao giờ dùng dấu gạch ngang bàn phím `-` (hyphen).
  - **Dấu nhân chuẩn**: Dùng `×` (`\u00D7`), không bao giờ dùng chữ `x`.
  - **Dấu chia chuẩn**: Dùng `÷` (`\u00F7`) hoặc dấu gạch phân số.
  - **Component `FractionView`**: Hiển thị phân số bằng cấu trúc Flexbox ngữ nghĩa dạng cột (Tử số, Mẫu số, đường kẻ phân số ngang `h-[1.5px] bg-current`), căn chỉnh trục ngang (math axis) thẳng hàng hoàn hảo với các phép toán xung quanh.
  - **Chống tràn màn hình điện thoại**: Mọi khối công thức đều đặt trong container có `overflow-x-auto`, padding dự phòng và hỗ trợ cuộn mượt mà trên màn hình nhỏ từ 360px.

### 4. Quy chuẩn Tương tác & Khả năng Tiếp cận (Interaction & Accessibility)
- **Vùng chạm tối thiểu (Touch Targets)**:
  - Mọi nút bấm (`Button`), thẻ lựa chọn trắc nghiệm (`ChoiceCard`), tab điều hướng đều có chiều cao $\ge 44\text{px}$ trên mobile và padding thoáng (tối thiểu `py-3 px-4`).
- **Phản hồi Tương tác Ổn định (Stable Interaction States)**:
  - Tuyệt đối không dùng các hiệu ứng hover làm thay đổi kích thước biên (layout-shifting transforms) gây giật màn hình.
  - Sử dụng chuyển đổi màu nền, độ bóng, và `ring-2 ring-blue-500 ring-offset-2` với thời gian phản hồi 150–200ms.
- **Chỉ thị Trạng thái Đa kênh (Multi-channel Affordance)**:
  - Không truyền tải thông tin chỉ qua màu sắc. Mọi thông báo đúng/sai luôn đi kèm **Icon vector (`CheckCircle2`, `AlertCircle`, `HelpCircle`) + Chữ nhãn rõ nghĩa + Màu sắc**.
- **Chế độ Giảm chuyển động (Prefers-reduced-motion)**:
  - Tự động tắt hoạt ảnh phức tạp nếu người dùng cài đặt `prefers-reduced-motion: reduce`.
- **Hỗ trợ Điều khiển Bàn phím & Screen Reader**:
  - Thứ tự Tab tự nhiên, `focus-visible` có viền nổi bật.
  - Các bước trong bài học có thông báo trạng thái `aria-live="polite"` khi chuyển bước hoặc hiển thị gợi ý.

### 5. Tối ưu In ấn & Xuất bản (`@media print`)
- Khi người dạy hoặc học sinh bấm "In / Lưu PDF":
  - Ẩn toàn bộ thanh điều hướng, nút thao tác không cần thiết (`.no-print`).
  - Chuyển nền sang trắng tinh, giữ khung viền và bảng điểm rõ nét, ngắt trang thông minh (`break-inside-avoid`).

---

## Architecture

### 1. Lựa chọn Công nghệ (Tuân thủ AGENTS.md & UI-Styling)
- **Framework**: **Next.js 15+ (App Router)** với **React 19**
- **Ngôn ngữ**: **JavaScript** (`.jsx`, `.js`), không dùng TypeScript (theo AGENTS.md mục 2.3).
- **Styling**: **Tailwind CSS** kết hợp **shadcn/ui accessible component patterns** (Button, Card, Tabs, Accordion, Progress, Badge, Alert, Dialog).
- **Icons**: **`lucide-react`** (100% vector SVG).
- **Data Persistence**: **LocalStorage Engine** an toàn (`src/lib/storage.js`) có schema validation, try/catch, backup import/export.
- **Testing**: **Node.js Test Runner / Vitest** kiểm thử độc lập 10 phép tính chuẩn, logic mastery và schema.

### 2. Cấu trúc Thư mục Dự kiến

```
d:/Ngoc_Quynh/
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
├── .gitignore
├── README.md
├── AGENTS.md
├── theo_doi_toan_14_ngay_ngoc_dang.html (nguồn tham chiếu)
├── public/
│   ├── favicon.ico
│   └── svg/ (Minh họa toán học trục số, phân số)
├── src/
│   ├── app/
│   │   ├── layout.jsx            # Shell toàn cục: font Outfit/Inter, NavBar, Footer
│   │   ├── page.jsx              # Trang chủ: Dashboard tiến độ, tiếp tục học, nhắc ôn
│   │   ├── lo-trinh/
│   │   │   └── page.jsx          # Lộ trình 14 ngày trực quan, thẻ trạng thái
│   │   ├── bai-hoc/
│   │   │   └── [day]/
│   │   │       └── page.jsx      # Không gian bài học tương tác 8 bước
│   │   ├── so-tay-loi/
│   │   │   └── page.jsx          # Sổ tay lỗi sai & Luyện khắc phục
│   │   ├── gia-su/
│   │   │   └── page.jsx          # Khu vực người dạy: Bảng 14 ngày, ghi chú, sao lưu
│   │   └── globals.css           # Tailwind directives, font imports, print styles
│   ├── components/
│   │   ├── ui/                   # shadcn-inspired headless components
│   │   │   ├── Button.jsx        # Nút tương tác với focus ring, kích thước chuẩn
│   │   │   ├── Card.jsx          # Thẻ nội dung có phân cấp rõ ràng
│   │   │   ├── Tabs.jsx          # Thanh chuyển tab / chặng bài học
│   │   │   ├── Accordion.jsx     # Accordion gợi ý 3 nấc mượt mà
│   │   │   ├── Progress.jsx      # Thanh tiến độ trực quan
│   │   │   ├── Badge.jsx         # Tag trạng thái & mã lỗi
│   │   │   ├── Alert.jsx         # Hộp cảnh báo / điểm dễ sai / chú thích
│   │   │   └── Modal.jsx         # Dialog xuất/nhập dữ liệu
│   │   ├── math/
│   │   │   ├── MathView.jsx      # Render công thức toán, số âm, ngoặc chuẩn
│   │   │   ├── FractionView.jsx  # Hiển thị phân số chuẩn toán học (tử/mẫu/gạch ngang)
│   │   │   └── NumberLineSvg.jsx # Minh họa trục số SVG tương tác cho số nguyên
│   │   ├── Header.jsx            # Header điều hướng có icon vector và trạng thái
│   │   ├── StepByStepCard.jsx    # Ví dụ từng bước có nút "Xem bước tiếp"
│   │   ├── QuestionCard.jsx      # Thẻ câu hỏi trắc nghiệm chạm lớn, phản hồi đa kênh
│   │   ├── HintAccordion.jsx     # Gợi ý 3 tầng (Nhận diện -> Chỉ bước -> Bài mẫu)
│   │   ├── ChallengeSection.jsx  # Thử thách tư duy & checklist tự đánh giá
│   │   ├── ErrorCard.jsx         # Thẻ lỗi sai với phân tích cách sửa
│   │   └── TutorSummaryTable.jsx # Bảng dữ liệu người dạy tương tác
│   ├── data/
│   │   ├── curriculum.js         # Danh sách 14 ngày, metadata, tiêu chí
│   │   ├── errorTaxonomy.js      # 11 mã lỗi E1-H1, ví dụ sai vs sửa đúng
│   │   ├── lessons/              # Dữ liệu 14 ngày bài học
│   │   │   ├── day01.js … day14.js
│   │   └── index.js
│   └── lib/
│       ├── storage.js            # Quản lý LocalStorage an toàn
│       ├── scoring.js            # Chấm điểm & thống kê chính xác
│       ├── masteryRules.js       # Thuật toán đánh giá thành thạo & gợi ý chuyển bài
│       └── exportHelper.js       # Xuất JSON và CSV có UTF-8 BOM
└── tests/
    ├── mathAccuracy.test.js      # Kiểm thử bắt buộc 10 ví dụ toán tại AGENTS.md mục 6
    ├── scoring.test.js           # Kiểm thử thuật toán chấm điểm và mastery
    └── storage.test.js           # Kiểm thử export/import và dữ liệu hỏng
```

---

## Implementation Steps

### Giai đoạn 1: Chuẩn bị Project & UI Foundation (Bước 1 - Bước 3)
1. **Khởi tạo Next.js App Router**: Thiết lập project Next.js bằng JavaScript trong workspace `d:/Ngoc_Quynh`, cấu hình `package.json`, `.gitignore`, đảm bảo an toàn cho các tài liệu gốc.
2. **Cài đặt Tailwind CSS & Vector Icons**:
   - Cài đặt Tailwind CSS, PostCSS, Autoprefixer và `lucide-react`.
   - Cấu hình `tailwind.config.js` với hệ màu chuẩn EdTech, font `Outfit` và `Inter/Work Sans`.
   - `globals.css`: Tích hợp CSS tokens, cấu trúc in ấn `@media print`, typography cho toán học.
3. **Xây dựng Bộ UI Primitives & Math Components**:
   - `Button`, `Card`, `Tabs`, `Accordion`, `Progress`, `Badge`, `Alert`.
   - `MathView`, `FractionView`, `NumberLineSvg`.
   - Core libraries: `storage.js`, `scoring.js`, `masteryRules.js`.

### Giai đoạn 2: Xây dựng Bộ Dữ liệu Chuẩn 14 Ngày (Bước 4 - Bước 6)
4. **Chuẩn hóa Danh mục Lỗi Sai (`errorTaxonomy.js`)**: 11 mã lỗi E1–H1 với ví dụ sai cụ thể, giải thích vì sao sai và hướng dẫn khắc phục.
5. **Soạn Thảo Dữ liệu Chi Tiết 14 Bài Học**:
   - Đầy đủ 8 phần cho mỗi ngày: Mục tiêu, Khởi động, Giải thích trực quan, Ví dụ từng bước, Luyện có gợi ý, Tự luyện, Thử thách tư duy, Tóm tắt.
   - Ngày 7: 20 câu tổng hợp giữa chặng.
   - Ngày 14: 20 câu mới cuối chặng.
6. **Kiểm tra Toán học Bắt buộc (Unit Tests)**: Viết test runner kiểm tra độc lập 10 phép tính chuẩn tại Mục 6 [AGENTS.md](file:///d:/Ngoc_Quynh/AGENTS.md) và toàn bộ đáp án của ngân hàng câu hỏi.

### Giai đoạn 3: Phát triển Giao diện Học sinh (Bước 7 - Bước 10)
7. **Trang Chủ (Dashboard - `src/app/page.jsx`)**:
   - Thẻ chào "Mỗi ngày vững hơn một chút".
   - 4 thẻ thống kê: Buổi đã học, Tổng câu đúng/tổng câu, Tỉ lệ đúng %, Số kỹ năng thành thạo.
   - Nút nổi bật "Tiếp tục học" dẫn thẳng tới buổi tiếp theo.
   - Hộp "Nhắc ôn tập sau 2–3 ngày" và danh sách "Kỹ năng nên luyện thêm" lọc trực tiếp từ các mã lỗi thực tế.
8. **Trang Lộ trình 14 Ngày (`src/app/lo-trinh/page.jsx`)**:
   - Dòng thời gian 14 ngày với thẻ trạng thái có màu và biểu tượng (Chưa học, Đang học, Cần ôn, Hoàn thành).
   - Điều hướng linh hoạt, cảnh báo điều kiện tiên quyết thân thiện.
9. **Màn hình Bài học Tương tác (`src/app/bai-hoc/[day]/page.jsx`)**:
   - Trình phát bài học 8 bước, chỉ số tiến trình rõ ràng.
   - Component trực quan (trục số SVG, phân số, cán cân phương trình).
   - Ví dụ từng bước với nút xem bước tiếp, điểm dễ sai, cách tự kiểm tra.
   - Luyện tập với gợi ý 3 nấc (Accordion trượt êm).
   - Tự luyện với thẻ câu hỏi lớn, phản hồi đa kênh, giải thích theo mã lỗi.
   - Thử thách tư duy kèm rubric tự đánh giá.
10. **Màn hình Kết quả & Chữa lỗi**:
    - Điểm số, phản hồi khích lệ, danh sách câu cần xem lại kèm liên kết ôn kiến thức.

### Giai đoạn 4: Sổ Tay Lỗi Sai & Khu Vực Người Dạy (Bước 11 - Bước 13)
11. **Trang Sổ Tay Lỗi Sai (`src/app/so-tay-loi/page.jsx`)**:
    - Bộ lọc theo mã lỗi E1–H1 và theo ngày học.
    - Hiển thị so sánh: Câu đã làm sai vs Cách giải đúng.
    - Chức năng "Luyện khắc phục": Làm đúng câu tương tự để chuyển trạng thái sang "Đã khắc phục".
12. **Khu Vực Người Dạy / Gia Sư (`src/app/gia-su/page.jsx`)**:
    - Bảng tổng hợp chi tiết 14 ngày (Điểm, Tự làm, Thành thạo, Giải thích quy tắc, Ghi chú, Kế hoạch sau).
    - Form cập nhật nhanh từng buổi.
    - Gợi ý quyết định sư phạm tự động theo tiêu chí mastery.
    - Công cụ sao lưu: Xuất/Nhập JSON, Xuất CSV tiếng Việt, In / Lưu PDF với print stylesheet chuyên nghiệp.
13. **Kiểm thử Toàn Diện, Lint, Build & Documentation (Bước 14 - Bước 15)**:
    - Chạy toàn bộ test suites.
    - Chạy `npm run build` và `npm run lint`.
    - Soạn tài liệu `README.md` hoàn chỉnh.

---

## TODO List

- [ ] **Giai đoạn 1: Chuẩn bị Project, Tailwind CSS & UI Primitives**
  - [ ] Khởi tạo dự án Next.js (JavaScript, App Router) trong workspace mà không ảnh hưởng file gốc
  - [ ] Cài đặt Tailwind CSS, PostCSS, Autoprefixer và `lucide-react`
  - [ ] Cấu hình `tailwind.config.js` (palette màu EdTech, font `Outfit` & `Inter`, border-radius)
  - [ ] Xây dựng `src/app/globals.css` (tokens, CSS variables, typography, print styles)
  - [ ] Xây dựng các UI Primitives theo `ui-styling`: `Button`, `Card`, `Tabs`, `Accordion`, `Progress`, `Badge`, `Alert`, `Modal`
  - [ ] Xây dựng components toán học: `MathView`, `FractionView`, `NumberLineSvg`
  - [ ] Viết module `src/lib/storage.js` quản lý LocalStorage an toàn (try/catch, migrations, backup)
  - [ ] Viết module `src/lib/scoring.js` và `src/lib/masteryRules.js`
  - [ ] Viết unit tests cho các phép tính toán bắt buộc (Mục 6 AGENTS.md) và scoring

- [ ] **Giai đoạn 2: Xây dựng Ngân hàng Dữ liệu Toán & 14 Bài học**
  - [ ] Tạo module `src/data/errorTaxonomy.js` (11 mã lỗi E1–H1)
  - [ ] Soạn nội dung đầy đủ Ngày 1 (Cộng trừ số nguyên, trục số SVG, ví dụ, câu hỏi, tư duy)
  - [ ] Soạn nội dung đầy đủ Ngày 2 (Nhân chia số nguyên, thứ tự phép tính)
  - [ ] Soạn nội dung đầy đủ Ngày 3 (Phân số bằng nhau, rút gọn)
  - [ ] Soạn nội dung đầy đủ Ngày 4 (Quy đồng, cộng trừ phân số)
  - [ ] Soạn nội dung đầy đủ Ngày 5 (Nhân chia phân số)
  - [ ] Soạn nội dung đầy đủ Ngày 6 (Ôn trộn số nguyên và phân số)
  - [ ] Soạn nội dung đầy đủ Ngày 7 (Kiểm tra giữa chặng 20 câu tổng hợp)
  - [ ] Soạn nội dung đầy đủ Ngày 8 (Phân phối vào ngoặc)
  - [ ] Soạn nội dung đầy đủ Ngày 9 (Dấu trừ trước ngoặc)
  - [ ] Soạn nội dung đầy đủ Ngày 10 (Thu gọn biểu thức)
  - [ ] Soạn nội dung đầy đủ Ngày 11 (Phương trình có ngoặc, cân bằng 2 vế)
  - [ ] Soạn nội dung đầy đủ Ngày 12 (Hình học nền: góc kề bù, tam giác, tam giác cân kèm hình vẽ SVG)
  - [ ] Soạn nội dung đầy đủ Ngày 13 (Kết nối Toán 8, cho phép tùy biến đề)
  - [ ] Soạn nội dung đầy đủ Ngày 14 (Kiểm tra cuối chặng 20 câu mới)

- [ ] **Giai đoạn 3: Phát triển Giao diện Học sinh (Chuẩn UI/UX Pro Max)**
  - [ ] Xây dựng Layout chung (`Header`, `Navigation`, `Footer`) với `lucide-react` vector icons
  - [ ] Phát triển Trang chủ Dashboard (`/`): Tổng quan tiến độ, tiếp tục học, nhắc ôn, lỗi cần luyện
  - [ ] Phát triển Trang Lộ trình (`/lo-trinh`): 14 chặng học, trạng thái trực quan, điểm số
  - [ ] Phát triển Màn hình Bài học tương tác (`/bai-hoc/[day]`):
    - [ ] Component hiển thị Mục tiêu & Khung giờ 60 phút
    - [ ] Component Khởi động & Nhớ lại (tích hợp ôn lỗi lặp)
    - [ ] Component Trực quan hóa kiến thức (Trục số, Cân phương trình, SVG)
    - [ ] Component Ví dụ từng bước (Nút "Xem bước tiếp theo", Điểm dễ sai)
    - [ ] Component Luyện tập có gợi ý 3 nấc (Accordion mượt)
    - [ ] Component Tự luyện với thẻ câu hỏi lớn ($\ge 44\text{px}$), phản hồi đa kênh
    - [ ] Component Thử thách tư duy kèm checklist rubric
    - [ ] Component Tóm tắt cuối bài & Hoàn thành buổi học
  - [ ] Phát triển Màn hình Kết quả & Chữa lỗi sau bài luyện

- [ ] **Giai đoạn 4: Sổ Tay Lỗi Sai & Khu Vực Người Dạy**
  - [ ] Phát triển Trang Sổ tay lỗi sai (`/so-tay-loi`): Lọc theo mã lỗi, so sánh câu làm sai vs cách sửa, nút luyện khắc phục
  - [ ] Phát triển Trang Khu vực Người dạy (`/gia-su`):
    - [ ] Bảng theo dõi 14 buổi với input điểm, mức độ tự làm, mức độ thành thạo, ghi chú
    - [ ] Gợi ý quyết định sư phạm tự động theo tiêu chí mastery
    - [ ] Bảng tổng hợp tần suất mã lỗi
    - [ ] Tính năng Xuất/Nhập JSON backup
    - [ ] Tính năng Xuất CSV (hỗ trợ tiếng Việt Excel có BOM)
    - [ ] Tính năng In / Xuất PDF với layout print chuyên nghiệp

- [ ] **Giai đoạn 5: Kiểm thử, Tối ưu & Hoàn thiện**
  - [ ] Chạy toàn bộ test suites tự động
  - [ ] Kiểm tra responsive trên thiết bị di động (375px, 414px, 768px, 1024px, 1440px)
  - [ ] Kiểm tra khả năng truy cập: Bàn phím Tab/Enter, focus visible, aria-labels
  - [ ] Chạy `npm run lint` và `npm run build` đảm bảo không có lỗi cảnh báo nghiêm trọng
  - [ ] Viết `README.md` hoàn chỉnh hướng dẫn khởi chạy và sử dụng

---

## Risk Assessment

| Rủi ro tiềm ẩn | Mức độ | Biện pháp giảm thiểu |
|---|---|---|
| **Sai sót về mặt Toán học trong câu hỏi & đáp án** | Cao | Viết unit test tự động cho toàn bộ biểu thức mẫu bắt buộc trong AGENTS.md; rà soát đối chiếu từng phép tính với file gốc `theo_doi_toan_14_ngay_ngoc_dang.html`. |
| **Lỗi UI vỡ layout công thức toán trên điện thoại 360px** | Trung bình | Bọc công thức trong container cuộn ngang tự nhiên (`overflow-x-auto`) với padding an toàn; tách phân số bằng `FractionView` có kích thước tương đối. |
| **Dữ liệu LocalStorage bị mất khi người dùng xóa cache** | Trung bình | Bọc toàn bộ thao tác LocalStorage trong try/catch; cung cấp thông báo nhắc nhở sao lưu và hỗ trợ nút Export JSON/CSV một chạm ngay trên giao diện; có schema migration tự động. |
| **Icon bị hiển thị sai hoặc vỡ font** | Thấp | Không dùng emoji cho hệ thống; dùng 100% SVG vector từ `lucide-react` nhúng thẳng vào component. |
| **Học sinh bị nản lòng khi gặp câu khó** | Thấp | Thiết kế phản hồi tâm lý sư phạm tích cực: gợi ý 3 nấc thay vì hiển thị trực tiếp đáp án, không dùng từ ngữ gây xấu hổ hay phán xét. |

---

## Success Criteria

1. **Tuân thủ 100% Lộ trình Nguồn**: Đủ 14 ngày theo đúng thứ tự, đúng chủ đề và mục tiêu sư phạm từ Ngày 1 đến Ngày 14.
2. **Cấu trúc Bài học Chuẩn**: Mọi ngày học đều có đầy đủ 8 phần (Mục tiêu, Khởi động, Giải thích trực quan, Ví dụ từng bước, Luyện có gợi ý, Tự luyện, Thử thách tư duy, Tóm tắt).
3. **Chính xác Tuyệt đối về Toán học**: Vượt qua 100% unit tests cho các phép tính chuẩn (cộng trừ số nguyên, nhân chia dấu, thứ tự phép tính, phân số, phân phối ngoặc, đổi dấu khi bỏ ngoặc, phương trình cân bằng vế).
4. **Chuẩn mực UI/UX & Styling Hiện đại**:
   - Sử dụng Tailwind CSS + shadcn/ui headless components + 100% `lucide-react` vector icons (không dùng emoji làm icon hệ thống).
   - Đạt chuẩn tương phản WCAG AA 4.5:1, vùng chạm $\ge 44\text{px}$, responsive từ 360px đến desktop, hỗ trợ `@media print`.
   - Trình bày công thức toán học chuẩn mực (Unicode Minus `−`, nhân `×`, component `FractionView` căn thẳng hàng).
5. **Hệ thống Lỗi Sai Thực tế**: Tự động bắt 11 mã lỗi E1–H1, hiển thị trong Sổ tay lỗi sai và đưa vào câu hỏi ôn tập warm-up nếu lặp lại từ 2 buổi trở lên.
6. **Đầy đủ Công cụ Gia sư / Người dạy**: Bảng quản lý 14 buổi, nhập đánh giá độc lập, gợi ý quyết định sư phạm, xuất/nhập JSON, xuất CSV và in báo cáo PDF hoạt động trơn tru.
7. **Chất lượng Kỹ thuật Cao**: `npm run build` và `npm run test` thành công không lỗi.
