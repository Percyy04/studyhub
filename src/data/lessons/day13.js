// Ngày 13: Kết nối với Toán 8 đang học (Hằng đẳng thức, Phân thức & Rút gọn)
export const day13 = {
  day: 13,
  topic: "Kết nối với Toán 8 đang học",
  goal: "Vận dụng các quy tắc nền tảng (phân phối, đổi dấu, rút gọn phân số) vào các dạng toán lớp 8: Hằng đẳng thức & Rút gọn phân thức đại số",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  isCustomizable: true,
  defaultTopicName: "Hằng đẳng thức đáng nhớ & Rút gọn phân thức đại số",
  breakdown: [
    { label: "Nhìn lại 12 ngày nền tảng", time: "10 phút" },
    { label: "Kết nối: Số học bước sang Đại số 8", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d13-w01",
      prompt: "Rút gọn phân số 6/9 là chia cả tử và mẫu cho 3. Vậy với phân thức (3x)/(3y), ta chia cả tử và mẫu cho cái gì?",
      choices: [
        { id: "a", text: "Chia cả tử và mẫu cho thừa số chung 3", isCorrect: true, note: "Chính xác! Giống hệt rút gọn phân số số học: (3x)/(3y) = x/y." },
        { id: "b", text: "Chia cho x", isDistractor: true },
        { id: "c", text: "Trừ bớt 3 ở cả tử và mẫu", isDistractor: true, errorCode: "F1" },
      ],
      correctAnswer: "a",
      explanation: "Rút gọn phân thức đại số hoàn toàn tương tự rút gọn phân số: Chia cả tử và mẫu cho nhân tử chung.",
    },
    {
      id: "d13-w02",
      prompt: "Khai triển (x + 3)² bằng hằng đẳng thức (a + b)² = a² + 2ab + b²:",
      choices: [
        { id: "a", text: "x² + 6x + 9", isCorrect: true, note: "Chính xác! a² + 2ab + b² = x² + 2(x)(3) + 3² = x² + 6x + 9." },
        { id: "b", text: "x² + 9", isDistractor: true, note: "Quên hạng tử 2ab ở giữa!" },
        { id: "c", text: "x² + 3x + 9", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9.",
    },
  ],
  concept: {
    title: "Cây cầu nối: Từ số học lớp 6-7 sang Đại số lớp 8",
    visualType: "algebraic-bridge",
    content:
      "Toán 8 không hề có phép tính nào 'trên trời rơi xuống'! Tất cả đều là sự mở rộng của những điều em đã học 12 ngày qua:\n- Rút gọn phân thức = Rút gọn phân số (Ngày 3).\n- Quy đồng phân thức = Quy đồng mẫu phân số (Ngày 4).\n- Hằng đẳng thức = Tính chất phân phối nhân vào ngoặc (Ngày 8).",
    rules: [
      {
        rule: "1. Hằng đẳng thức là phép nhân đa thức",
        math: "(A + B)² = A² + 2AB + B²  và  A² − B² = (A − B)(A + B)",
        note: "Bản chất là nhân phân phối (A+B)(A+B) rồi thu gọn hạng tử đồng dạng.",
      },
      {
        rule: "2. Rút gọn phân thức đại số",
        math: "(A × C) / (B × C) = A / B",
        note: "BẮT BUỘC phải phân tích tử và mẫu thành TÍCH (nhân tử chung) rồi mới được triệt tiêu.",
      },
      {
        rule: "3. Đổi dấu trong phân thức",
        math: "A / (B − A) = − A / (A − B)",
        note: "Ứng dụng trực tiếp quy tắc: B − A = −(A − B) từ Ngày 9.",
      },
    ],
    commonPitfall: "Gạch bỏ hạng tử trong phép cộng ở phân thức: (x + 2)/(x + 5) gạch x còn 2/5! Đây là lỗi sai đại kỵ.",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Rút gọn phân thức đại số lớp 8",
      problem: "Rút gọn phân thức: P = (2x + 6) / (x² − 9)",
      steps: [
        { step: 1, description: "Phân tích tử thức thành tích bằng cách đặt thừa số chung 2 (Ngày 8).", math: "Tử = 2(x + 3)" },
        { step: 2, description: "Phân tích mẫu thức bằng hằng đẳng thức hiệu hai bình phương A² − B² = (A−B)(A+B).", math: "Mẫu = x² − 3² = (x − 3)(x + 3)" },
        { step: 3, description: "Triệt tiêu nhân tử chung (x + 3) ở cả tử và mẫu (với điều kiện x ≠ ±3).", math: "P = 2 / (x − 3)" },
      ],
      pitfall: "Không phân tích thành tích mà gạch x ở cả tử và mẫu.",
      selfCheck: "Thử với x = 5: Tử = 2(5)+6 = 16. Mẫu = 25 − 9 = 16. 16/16 = 1. Kết quả: 2/(5−3) = 2/2 = 1. Khớp 100%!",
    },
    {
      title: "Ví dụ 2: Cộng hai phân thức đại số",
      problem: "Tính: Q = 1/(x − 2) + 1/(x + 2)",
      steps: [
        { step: 1, description: "Tìm mẫu thức chung: MTC = (x − 2)(x + 2).", math: "MTC = (x − 2)(x + 2)" },
        { step: 2, description: "Quy đồng tử số bằng cách nhân với thừa số phụ tương ứng.", math: "Q = (x + 2)/[(x−2)(x+2)] + (x − 2)/[(x−2)(x+2)]" },
        { step: 3, description: "Cộng hai tử số và thu gọn hạng tử đồng dạng (Ngày 10).", math: "Tử = (x + 2) + (x − 2) = 2x" },
        { step: 4, description: "Kết quả cuối cùng.", math: "Q = 2x / (x² − 4)" },
      ],
      pitfall: "Lỗi F2: Lấy tử cộng tử, mẫu cộng mẫu thành 2/(2x).",
      selfCheck: "Thử với x = 3: 1/1 + 1/5 = 6/5. Kết quả: 2(3)/(9 − 4) = 6/5.",
    },
  ],
  guidedPractice: [
    {
      id: "d13-g01",
      prompt: "Rút gọn phân thức: (x² + 2x) / (x + 2) =",
      choices: [
        { id: "a", text: "x", isCorrect: true, note: "Chính xác! Đặt x ra ngoài: x(x + 2) / (x + 2) = x." },
        { id: "b", text: "x²", isDistractor: true },
        { id: "c", text: "2x", isDistractor: true },
        { id: "d", text: "x + 1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Tử số x² + 2x = x(x + 2). Triệt tiêu (x + 2), ta còn lại x.",
      hints: [
        "Phân tích tử số thành tích: x² và 2x có chung thừa số gì?",
        "Tử số viết thành: x(x + 2).",
        "Triệt tiêu cả tử và mẫu cho (x + 2): còn lại x.",
      ],
    },
    {
      id: "d13-g02",
      prompt: "Hiệu hai bình phương: x² − 16 phân tích thành tích là:",
      choices: [
        { id: "a", text: "(x − 4)(x + 4)", isCorrect: true, note: "Chính xác! a² − b² = (a − b)(a + b) với 16 = 4²." },
        { id: "b", text: "(x − 4)²", isDistractor: true, note: "(x − 4)² = x² − 8x + 16, khác hoàn toàn." },
        { id: "c", text: "(x − 8)(x + 8)", isDistractor: true },
        { id: "d", text: "x(x − 16)", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x² − 16 = x² − 4² = (x − 4)(x + 4).",
      hints: [
        "Nhận diện 16 = 4².",
        "Áp dụng hằng đẳng thức A² − B² = (A − B)(A + B).",
        "Thay A = x, B = 4.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d13-p01",
      prompt: "Khai triển hằng đẳng thức: (x − 2)² =",
      choices: [
        { id: "a", text: "x² − 4x + 4", isCorrect: true },
        { id: "b", text: "x² − 4", isDistractor: true },
        { id: "c", text: "x² + 4", isDistractor: true },
        { id: "d", text: "x² − 4x − 4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(x − 2)² = x² − 2(x)(2) + 2² = x² − 4x + 4.",
    },
    {
      id: "d13-p02",
      prompt: "Rút gọn phân thức: (3x − 3) / 6 =",
      choices: [
        { id: "a", text: "(x − 1) / 2", isCorrect: true },
        { id: "b", text: "x − 1", isDistractor: true },
        { id: "c", text: "x / 2", isDistractor: true },
        { id: "d", text: "3(x − 1)", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "3(x − 1) / 6 = (x − 1) / 2.",
    },
    {
      id: "d13-p03",
      prompt: "Biểu thức 4x² − 9 phân tích thành tích là:",
      choices: [
        { id: "a", text: "(2x − 3)(2x + 3)", isCorrect: true },
        { id: "b", text: "(4x − 3)(4x + 3)", isDistractor: true },
        { id: "c", text: "(2x − 9)(2x + 9)", isDistractor: true },
        { id: "d", text: "(2x − 3)²", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(2x)² − 3² = (2x − 3)(2x + 3).",
    },
    {
      id: "d13-p04",
      prompt: "Rút gọn phân thức: (x − 5) / (5 − x) =",
      choices: [
        { id: "a", text: "−1", isCorrect: true },
        { id: "b", text: "1", isDistractor: true },
        { id: "c", text: "0", isDistractor: true },
        { id: "d", text: " Không xác định", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "5 − x = −(x − 5) (Quy tắc đổi dấu Ngày 9). Vậy (x − 5) / [−(x − 5)] = −1.",
    },
    {
      id: "d13-p05",
      prompt: "Tính tổng phân thức cùng mẫu: (x − 3)/(x + 1) + (4)/(x + 1) =",
      choices: [
        { id: "a", text: "1", isCorrect: true },
        { id: "b", text: "(x + 1)/(2x + 2)", isDistractor: true, errorCode: "F2" },
        { id: "c", text: "x + 1", isDistractor: true },
        { id: "d", text: "(x + 7)/(x + 1)", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Cùng mẫu: (x − 3 + 4)/(x + 1) = (x + 1)/(x + 1) = 1.",
    },
    {
      id: "d13-p06",
      prompt: "Tìm x biết: (x − 3)(x + 2) = 0",
      choices: [
        { id: "a", text: "x = 3 hoặc x = −2", isCorrect: true },
        { id: "b", text: "x = −3 hoặc x = 2", isDistractor: true },
        { id: "c", text: "x = 3", isDistractor: true },
        { id: "d", text: "x = −2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Phương trình tích A × B = 0 ⇔ A = 0 hoặc B = 0. x − 3 = 0 ⇒ x = 3; x + 2 = 0 ⇒ x = −2.",
    },
    {
      id: "d13-p07",
      prompt: "Rút gọn: (x² − 4)/(x − 2) =",
      choices: [
        { id: "a", text: "x + 2", isCorrect: true },
        { id: "b", text: "x − 2", isDistractor: true },
        { id: "c", text: "x", isDistractor: true },
        { id: "d", text: "2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(x − 2)(x + 2) / (x − 2) = x + 2.",
    },
    {
      id: "d13-p08",
      prompt: "Nhân hai phân thức: (x/2) × (4/x²) =",
      choices: [
        { id: "a", text: "2/x", isCorrect: true },
        { id: "b", text: "4x / 2x²", isDistractor: true, note: "Chưa rút gọn." },
        { id: "c", text: "x / 2", isDistractor: true },
        { id: "d", text: "2x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(x × 4) / (2 × x²) = 4x / 2x² = 2/x.",
    },
    {
      id: "d13-p09",
      prompt: "Tìm x biết: x² − 9 = 0",
      choices: [
        { id: "a", text: "x = 3 hoặc x = −3", isCorrect: true },
        { id: "b", text: "x = 3", isDistractor: true, note: "Quên nghiệm âm (−3)² cũng bằng 9!" },
        { id: "c", text: "x = 9", isDistractor: true },
        { id: "d", text: "x = 4.5", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(x − 3)(x + 3) = 0 ⇒ x = 3 hoặc x = −3.",
    },
    {
      id: "d13-p10",
      prompt: "Giá trị của phân thức (x² − 1)/(x − 1) tại x = 99 là:",
      choices: [
        { id: "a", text: "100", isCorrect: true },
        { id: "b", text: "98", isDistractor: true },
        { id: "c", text: "99", isDistractor: true },
        { id: "d", text: "1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Rút gọn trước: (x − 1)(x + 1)/(x − 1) = x + 1. Thay x = 99: 99 + 1 = 100 (tính cực nhanh!).",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Phân biệt biến đổi phân số và phân thức",
    prompt:
      "Em hãy giải thích: Tại sao khi rút gọn phân thức (x² − 4)/(x − 2) thành (x + 2), sách giáo khoa luôn phải ghi kèm điều kiện x ≠ 2? Điều kiện này tương ứng với quy tắc nào trong số học?",
    type: "why",
    rubric: [
      "Chỉ ra mẫu thức của phân thức không được phép bằng 0.",
      "Khi x = 2 thì mẫu số x − 2 = 0, phép chia cho 0 không xác định.",
      "Kết nối với số học: Trong phân số a/b, mẫu số b luôn phải khác 0.",
    ],
    sampleSolution:
      "Trong toán học từ lớp 6, phép chia cho số 0 là không xác định (mẫu số của phân số bắt buộc phải khác 0). Khi ta có phân thức (x² − 4)/(x − 2), mẫu số là (x − 2). Nếu x = 2 thì x − 2 = 0, làm cho phân thức vô nghĩa ngay từ ban đầu. Vì vậy, ta chỉ có thể rút gọn phân thức khi và chỉ khi x ≠ 2. Đây chính là sự kế thừa trực tiếp nguyên lý 'mẫu số phải khác 0' từ số học sang đại số!",
  },
  summary: {
    keyTakeaways: [
      "Toán 8 là sự mở rộng trực tiếp của số học 6 và 7.",
      "Hằng đẳng thức giúp biến đổi nhanh tích thành tổng và ngược lại.",
      "Rút gọn phân thức: Luôn phân tích thành tích trước khi triệt tiêu.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Tại sao phải phân tích thành nhân tử (dạng tích) thì mới được rút gọn phân thức đại số?'",
  },
};
