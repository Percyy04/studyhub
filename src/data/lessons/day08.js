// Ngày 8: Phân phối vào ngoặc
export const day08 = {
  day: 8,
  topic: "Phân phối vào ngoặc",
  goal: "Hiểu bản chất tính chất phân phối; nhân số ngoài ngoặc với TỪNG hạng tử trong ngoặc, không bỏ sót",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Nhớ lại phép nhân số nguyên", time: "10 phút" },
    { label: "Quy tắc phân phối & Hình học hóa", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d08-w01",
      prompt: "Tính diện tích hình chữ nhật lớn ghép từ 2 hình chữ nhật nhỏ có cùng chiều rộng là 2, chiều dài lần lượt là 3 và 5:",
      choices: [
        { id: "a", text: "2 × (3 + 5) = 16", isCorrect: true, note: "Chính xác! 2×3 + 2×5 = 6 + 10 = 16." },
        { id: "b", text: "2 × 3 + 5 = 11", isDistractor: true, errorCode: "A1", note: "Bạn đã quên nhân chiều rộng 2 với hình thứ hai!" },
      ],
      correctAnswer: "a",
      explanation: "Diện tích tổng là: 2 × (3 + 5) = 2 × 3 + 2 × 5 = 16. Chiều rộng 2 phải nhân với TỪNG chiều dài.",
      errorCode: "A1",
    },
    {
      id: "d08-w02",
      prompt: "Tính nhẩm: 15 × 102 bằng cách viết 102 = 100 + 2:",
      choices: [
        { id: "a", text: "1530", isCorrect: true, note: "Chính xác! 15 × 100 + 15 × 2 = 1500 + 30 = 1530." },
        { id: "b", text: "1502", isDistractor: true, note: "Bạn quên nhân 15 với 2." },
      ],
      correctAnswer: "a",
      explanation: "15 × (100 + 2) = 15 × 100 + 15 × 2 = 1500 + 30 = 1530.",
    },
  ],
  concept: {
    title: "Bản chất: Chia quà công bằng cho từng người trong nhà",
    visualType: "area-model",
    content:
      "Hãy tưởng tượng thừa số ngoài ngoặc a như người mang quà đến thăm một ngôi nhà (b + c). Muốn công bằng, a phải chia quà cho CẢ b và CẢ c: a(b + c) = a × b + a × c. Lỗi phổ biến nhất là 'chia quà cho người đứng đầu cửa (b)' rồi bỏ quên người ở phòng sau (c)!",
    rules: [
      {
        rule: "Tính chất phân phối",
        math: "a(b + c) = a × b + a × c",
        note: "Số a bên ngoài phải nhân lần lượt với từng hạng tử bên trong ngoặc.",
      },
      {
        rule: "Phân phối với phép trừ",
        math: "a(b − c) = a × b − a × c",
        note: "Giữ đúng dấu của hạng tử: a × (−c) = −ac.",
      },
      {
        rule: "Khi số ngoài ngoặc mang dấu âm",
        math: "(−a)(b + c) = −ab − ac  và  (−a)(b − c) = −ab + ac",
        note: "Đặc biệt chú ý: (−a) × (−c) = +ac (âm nhân âm ra dương).",
      },
    ],
    commonPitfall: "Lỗi A1: Viết 2(x + 3) = 2x + 3. Quên nhân số 2 với số 3! Kết quả đúng bắt buộc là 2x + 6.",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Phân phối cơ bản",
      problem: "Khai triển biểu thức: A = 2(x + 3)",
      steps: [
        { step: 1, description: "Lấy 2 nhân với hạng tử thứ nhất (x).", math: "2 × x = 2x" },
        { step: 2, description: "Lấy 2 nhân với hạng tử thứ hai (+3).", math: "2 × 3 = 6" },
        { step: 3, description: "Viết kết quả tổng hợp.", math: "A = 2x + 6" },
      ],
      pitfall: "Lỗi A1: Quên nhân với 3, viết thành 2x + 3.",
      selfCheck: "Thử với x = 1: Vế trái là 2(1 + 3) = 2 × 4 = 8. Vế phải là 2(1) + 6 = 8. Hai vế bằng nhau!",
    },
    {
      title: "Ví dụ 2: Phân phối có dấu âm bên ngoài",
      problem: "Khai triển biểu thức: B = −3(2x − 5)",
      steps: [
        { step: 1, description: "Lấy (−3) nhân với 2x.", math: "(−3) × 2x = −6x" },
        { step: 2, description: "Lấy (−3) nhân với hạng tử (−5): âm nhân âm ra dương.", math: "(−3) × (−5) = +15" },
        { step: 3, description: "Gộp lại kết quả.", math: "B = −6x + 15" },
      ],
      pitfall: "Sai dấu thành −6x − 15 (Lỗi E2: quên âm nhân âm ra dương).",
      selfCheck: "Thử với x = 0: −3(0 − 5) = −3 × (−5) = 15. Khớp hoàn hảo!",
    },
  ],
  guidedPractice: [
    {
      id: "d08-g01",
      prompt: "Khai triển: 2(x + 3) =",
      choices: [
        { id: "a", text: "2x + 3", isDistractor: true, errorCode: "A1", note: "Lỗi A1 kinh điển: Bạn chỉ nhân 2 với x mà quên nhân 2 với 3!" },
        { id: "b", text: "2x + 6", isCorrect: true, note: "Chính xác! 2 × x + 2 × 3 = 2x + 6 (Ví dụ chuẩn mục 6 AGENTS.md)." },
        { id: "c", text: "5x", isDistractor: true, errorCode: "A3", note: "Lỗi A3: 2x và 6 không đồng dạng, không được cộng gộp thành biến x." },
        { id: "d", text: "x + 6", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "b",
      explanation: "2(x + 3) = 2 × x + 2 × 3 = 2x + 6.",
      errorCode: "A1",
      hints: [
        "Tính chất phân phối: Nhân số ngoài ngoặc với TỪNG số trong ngoặc.",
        "Số ngoài ngoặc là 2. Trong ngoặc có x và 3.",
        "Lấy 2 × x = 2x, và 2 × 3 = 6. Kết quả là 2x + 6.",
      ],
    },
    {
      id: "d08-g02",
      prompt: "Khai triển: −4(x − 2) =",
      choices: [
        { id: "a", text: "−4x + 8", isCorrect: true, note: "Chính xác! (−4) × x = −4x và (−4) × (−2) = +8." },
        { id: "b", text: "−4x − 8", isDistractor: true, errorCode: "E2", note: "Sai dấu: (−4) × (−2) phải ra DƯƠNG 8." },
        { id: "c", text: "−4x − 2", isDistractor: true, errorCode: "A1", note: "Quên nhân 4 với 2." },
        { id: "d", text: "4x − 8", isDistractor: true, note: "Sai dấu." },
      ],
      correctAnswer: "a",
      explanation: "(−4) × x + (−4) × (−2) = −4x + 8.",
      errorCode: "A1",
      hints: [
        "Nhân −4 với x được −4x.",
        "Nhân −4 với −2: Chú ý âm nhân âm ra dương!",
        "Kết quả là −4x + 8.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d08-p01",
      prompt: "Khai triển: 3(x + 4) =",
      choices: [
        { id: "a", text: "3x + 12", isCorrect: true },
        { id: "b", text: "3x + 4", isDistractor: true, errorCode: "A1" },
        { id: "c", text: "7x", isDistractor: true, errorCode: "A3" },
        { id: "d", text: "3x + 7", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "3 × x + 3 × 4 = 3x + 12.",
      errorCode: "A1",
    },
    {
      id: "d08-p02",
      prompt: "Khai triển: 5(2x − 1) =",
      choices: [
        { id: "a", text: "10x − 5", isCorrect: true },
        { id: "b", text: "10x − 1", isDistractor: true, errorCode: "A1" },
        { id: "c", text: "7x − 5", isDistractor: true },
        { id: "d", text: "5x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "5 × 2x − 5 × 1 = 10x − 5.",
      errorCode: "A1",
    },
    {
      id: "d08-p03",
      prompt: "Khai triển: −2(3x + 4) =",
      choices: [
        { id: "a", text: "−6x − 8", isCorrect: true },
        { id: "b", text: "−6x + 8", isDistractor: true, errorCode: "E2" },
        { id: "c", text: "−6x + 4", isDistractor: true, errorCode: "A1" },
        { id: "d", text: "6x − 8", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(−2) × 3x + (−2) × 4 = −6x − 8.",
      errorCode: "E2",
    },
    {
      id: "d08-p04",
      prompt: "Khai triển: x(x + 5) =",
      choices: [
        { id: "a", text: "x² + 5x", isCorrect: true },
        { id: "b", text: "2x + 5", isDistractor: true },
        { id: "c", text: "x² + 5", isDistractor: true, errorCode: "A1" },
        { id: "d", text: "6x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x × x + x × 5 = x² + 5x.",
      errorCode: "A1",
    },
    {
      id: "d08-p05",
      prompt: "Khai triển: −(2x + 7) tương đương với nhân số nào vào ngoặc?",
      choices: [
        { id: "a", text: "Nhân số −1 vào ngoặc: −2x − 7", isCorrect: true },
        { id: "b", text: "Nhân số 0 vào ngoặc: 0", isDistractor: true },
        { id: "c", text: "−2x + 7", isDistractor: true, errorCode: "A2" },
        { id: "d", text: "2x − 7", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Dấu trừ trước ngoặc chính là thừa số (−1): (−1) × (2x + 7) = −2x − 7.",
      errorCode: "A2",
    },
    {
      id: "d08-p06",
      prompt: "Khai triển và rút gọn: 2(x + 1) + 3(x + 2) =",
      choices: [
        { id: "a", text: "5x + 8", isCorrect: true },
        { id: "b", text: "5x + 3", isDistractor: true, errorCode: "A1" },
        { id: "c", text: "13x", isDistractor: true, errorCode: "A3" },
        { id: "d", text: "5x + 6", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(2x + 2) + (3x + 6) = (2x + 3x) + (2 + 6) = 5x + 8.",
    },
    {
      id: "d08-p07",
      prompt: "Khai triển: 4(3 − x) =",
      choices: [
        { id: "a", text: "12 − 4x", isCorrect: true },
        { id: "b", text: "12 − x", isDistractor: true, errorCode: "A1" },
        { id: "c", text: "7 − 4x", isDistractor: true },
        { id: "d", text: "8x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "4 × 3 − 4 × x = 12 − 4x.",
      errorCode: "A1",
    },
    {
      id: "d08-p08",
      prompt: "Khai triển: −5(1 − 2x) =",
      choices: [
        { id: "a", text: "−5 + 10x (hay 10x − 5)", isCorrect: true },
        { id: "b", text: "−5 − 10x", isDistractor: true, errorCode: "E2" },
        { id: "c", text: "−5 − 2x", isDistractor: true, errorCode: "A1" },
        { id: "d", text: "5x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(−5) × 1 + (−5) × (−2x) = −5 + 10x.",
      errorCode: "E2",
    },
    {
      id: "d08-p09",
      prompt: "Tìm x biết: 3(x − 2) = 12",
      choices: [
        { id: "a", text: "x = 6", isCorrect: true },
        { id: "b", text: "x = 4", isDistractor: true },
        { id: "c", text: "x = 2", isDistractor: true },
        { id: "d", text: "x = 8", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "3x − 6 = 12 ⇒ 3x = 18 ⇒ x = 6. (Hoặc x − 2 = 12÷3 = 4 ⇒ x = 6).",
    },
    {
      id: "d08-p10",
      prompt: "Khai triển: (x + 2)(x + 3) =",
      choices: [
        { id: "a", text: "x² + 5x + 6", isCorrect: true },
        { id: "b", text: "x² + 6", isDistractor: true, note: "Quên nhân chéo các hạng tử ở giữa!" },
        { id: "c", text: "2x + 5", isDistractor: true },
        { id: "d", text: "x² + 6x + 6", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x(x + 3) + 2(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Chứng minh bằng mô hình diện tích",
    prompt:
      "Vẽ một hình chữ nhật có chiều rộng a và chiều dài được chia thành 2 đoạn (b và c).\nHãy giải thích dựa trên diện tích hình học tại sao: a(b + c) = ab + ac.",
    type: "why",
    rubric: [
      "Mô tả hình chữ nhật lớn có kích thước cạnh là a và (b + c).",
      "Tính diện tích hình chữ nhật lớn bằng công thức S = a × (b + c).",
      "Chỉ ra hình chữ nhật lớn được ghép từ 2 hình chữ nhật nhỏ có diện tích là ab và ac. Vì diện tích tổng bằng tổng các diện tích thành phần nên a(b + c) = ab + ac.",
    ],
    sampleSolution:
      "Chứng minh hình học rất trực quan:\n- Hình chữ nhật lớn có một cạnh là a, cạnh kia là (b + c). Do đó diện tích của nó là S = a × (b + c).\n- Hình chữ nhật này được chia thành 2 hình chữ nhật nhỏ ghép lại: Hình thứ nhất có kích thước a và b nên diện tích là a × b; Hình thứ hai có kích thước a và c nên diện tích là a × c.\n- Rõ ràng diện tích hình lớn bằng tổng diện tích 2 hình nhỏ: S = ab + ac.\nTừ đó suy ra hệ thức phân phối: a(b + c) = ab + ac luôn đúng với mọi kích thước!",
  },
  summary: {
    keyTakeaways: [
      "Nhân ngoài ngoặc với TẤT CẢ các hạng tử bên trong: a(b + c) = ab + ac.",
      "Tuyệt đối không bỏ sót hạng tử đứng sau: 2(x + 3) = 2x + 6 (Không phải 2x + 3).",
      "Khi nhân số âm vào ngoặc: nhớ quy tắc âm × âm = dương.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Tại sao khi phân phối số vào ngoặc thì không được bỏ quên số hạng thứ hai?'",
  },
};
