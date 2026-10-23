// Ngày 10: Thu gọn biểu thức
export const day10 = {
  day: 10,
  topic: "Thu gọn biểu thức",
  goal: "Phân biệt hạng tử đồng dạng, chỉ gộp các hạng tử cùng loại, xử lý dấu chính xác",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Ôn bỏ ngoặc & phân phối", time: "10 phút" },
    { label: "Khái niệm hạng tử đồng dạng", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d10-w01",
      prompt: "Hai quả táo cộng ba quả táo bằng mấy quả táo? 2x + 3x =",
      choices: [
        { id: "a", text: "5x", isCorrect: true, note: "Chính xác! 2 con x cộng 3 con x bằng 5 con x." },
        { id: "b", text: "5x²", isDistractor: true, note: "Cộng không làm tăng số mũ! Chỉ có nhân x × x mới ra x²." },
        { id: "c", text: "6x", isDistractor: true, note: "Bạn đã lấy 2 nhân 3." },
      ],
      correctAnswer: "a",
      explanation: "2x + 3x = (2 + 3)x = 5x. Cộng các hệ số, giữ nguyên phần biến.",
    },
    {
      id: "d10-w02",
      prompt: "Hai quả táo cộng ba cái kẹo có thể gộp thành 5 quả táo kẹo được không? Biểu thức 2x + 3 có gộp được không?",
      choices: [
        { id: "a", text: "KHÔNG gộp được, giữ nguyên 2x + 3", isCorrect: true, note: "Chính xác! Chúng khác loại (khác đơn vị) nên không thể cộng gộp số lượng." },
        { id: "b", text: "Gộp được thành 5x", isDistractor: true, errorCode: "A3", note: "Lỗi A3 kinh điển: Biến x và số tự do không đồng dạng, không được cộng thành 5x!" },
      ],
      correctAnswer: "a",
      explanation: "2x là hạng tử chứa biến, còn 3 là số tự do. Chúng không đồng dạng nên không thể gộp thành 5x.",
      errorCode: "A3",
    },
  ],
  concept: {
    title: "Nguyên tắc: Táo cộng táo, Cam cộng cam",
    visualType: "like-terms",
    content:
      "Trong đại số, chỉ những hạng tử 'đồng dạng' (cùng chung phần biến và cùng số mũ) mới được phép cộng hoặc trừ với nhau. Số tự do chỉ được cộng với số tự do. Biến bậc nhất (x) chỉ cộng với biến bậc nhất. Biến bậc hai (x²) chỉ cộng với biến bậc hai.",
    rules: [
      {
        rule: "Hạng tử đồng dạng là gì?",
        math: "Cùng biến và CÙNG SỐ MŨ",
        note: "Ví dụ: 3x và −5x là đồng dạng; 2x² và 7x² là đồng dạng. Nhưng 2x và 3x² KHÔNG đồng dạng!",
      },
      {
        rule: "Cách gộp hạng tử đồng dạng",
        math: "ax + bx = (a + b)x",
        note: "Cộng hoặc trừ các HỆ SỐ đứng trước, giữ nguyên phần biến x.",
      },
      {
        rule: "Tuyệt đối cấm",
        math: "ax + b ≠ (a + b)x",
        note: "2x + 3 không thể bằng 5x. Giữ nguyên 2x + 3 là biểu thức tối giản.",
      },
    ],
    commonPitfall: "Lỗi A3: Viết 2x + 3 = 5x hoặc 3x² + 2x = 5x³. Đây là lỗi cực kỳ nguy hiểm khiến học sinh bị 0 điểm khi giải phương trình!",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Nhận diện và gộp hạng tử đồng dạng",
      problem: "Thu gọn biểu thức: A = 4x + 7 − 9x + 2",
      steps: [
        { step: 1, description: "Nhóm các hạng tử chứa x lại với nhau, giữ nguyên dấu đứng trước mỗi số.", math: "(4x − 9x)" },
        { step: 2, description: "Nhóm các số tự do lại với nhau.", math: "(+7 + 2)" },
        { step: 3, description: "Tính từng nhóm: 4x − 9x = −5x; 7 + 2 = 9.", math: "A = −5x + 9" },
      ],
      pitfall: "Lỗi A3: Lấy −5x + 9 gộp tiếp thành 4x.",
      selfCheck: "−5x chứa biến x, còn 9 là hằng số. Không thể gộp thêm được nữa!",
    },
    {
      title: "Ví dụ 2: Phân phối, bỏ ngoặc rồi thu gọn",
      problem: "Thu gọn: B = 3(x + 2) − 2(2x − 1)",
      steps: [
        { step: 1, description: "Phân phối 3 vào ngoặc thứ nhất.", math: "3(x + 2) = 3x + 6" },
        { step: 2, description: "Phân phối −2 vào ngoặc thứ hai (chú ý: −2 × −1 = +2).", math: "−2(2x − 1) = −4x + 2" },
        { step: 3, description: "Gộp hạng tử đồng dạng: (3x − 4x) và (6 + 2).", math: "B = (3x − 4x) + (6 + 2) = −x + 8" },
      ],
      pitfall: "Sai dấu khi nhân −2 với −1 thành −2, hoặc phân phối thiếu hạng tử.",
      selfCheck: "Thử x = 1: B = 3(3) − 2(1) = 9 − 2 = 7. Kết quả −1 + 8 = 7.",
    },
  ],
  guidedPractice: [
    {
      id: "d10-g01",
      prompt: "Thu gọn biểu thức: 2x + 3x =",
      choices: [
        { id: "a", text: "5x", isCorrect: true, note: "Chính xác! 2x và 3x đồng dạng nên (2 + 3)x = 5x (Ví dụ chuẩn mục 6 AGENTS.md)." },
        { id: "b", text: "5x²", isDistractor: true, note: "Chỉ phép nhân mới tăng bậc x²." },
        { id: "c", text: "5", isDistractor: true, note: "Mất biến x." },
        { id: "d", text: "6x", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "a",
      explanation: "2x + 3x = 5x. Cộng hai hạng tử đồng dạng.",
      errorCode: "A3",
      hints: [
        "Hai hạng tử có cùng biến x.",
        "Cộng hai hệ số: 2 + 3 = 5.",
        "Giữ nguyên biến x: Kết quả là 5x.",
      ],
    },
    {
      id: "d10-g02",
      prompt: "Biểu thức 2x + 3 có thể thu gọn tiếp thành 5x được không?",
      choices: [
        { id: "a", text: "Không thể, vì 2x và 3 không đồng dạng", isCorrect: true, note: "Chính xác! 2x chứa biến, 3 là hằng số. Không thể gộp (Ví dụ chuẩn mục 6 AGENTS.md)." },
        { id: "b", text: "Có thể, thành 5x", isDistractor: true, errorCode: "A3", note: "Lỗi A3: Tuyệt đối không được cộng gộp số tự do vào biến x!" },
        { id: "c", text: "Có thể, thành 6x", isDistractor: true, note: "Sai hoàn toàn." },
      ],
      correctAnswer: "a",
      explanation: "2x + 3x = 5x, nhưng 2x + 3 không thể gộp thành 5x (Ví dụ chuẩn mục 6 AGENTS.md).",
      errorCode: "A3",
      hints: [
        "Hãy nhớ quy tắc: Táo cộng táo, Cam cộng cam.",
        "2x là 2 con x, còn 3 là số 3 đơn thuần.",
        "Chúng khác loại nên không thể cộng gộp hệ số với nhau.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d10-p01",
      prompt: "Thu gọn: 7x − 4x =",
      choices: [
        { id: "a", text: "3x", isCorrect: true },
        { id: "b", text: "3", isDistractor: true },
        { id: "c", text: "11x", isDistractor: true },
        { id: "d", text: "−3x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(7 − 4)x = 3x.",
    },
    {
      id: "d10-p02",
      prompt: "Thu gọn: 3x + 8 − 5x =",
      choices: [
        { id: "a", text: "−2x + 8 (hay 8 − 2x)", isCorrect: true },
        { id: "b", text: "6x", isDistractor: true, errorCode: "A3" },
        { id: "c", text: "2x + 8", isDistractor: true },
        { id: "d", text: "6", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(3x − 5x) + 8 = −2x + 8.",
      errorCode: "A3",
    },
    {
      id: "d10-p03",
      prompt: "Thu gọn: 4x² + 3x² − 2x =",
      choices: [
        { id: "a", text: "7x² − 2x", isCorrect: true },
        { id: "b", text: "5x²", isDistractor: true, errorCode: "A3" },
        { id: "c", text: "5x", isDistractor: true },
        { id: "d", text: "7x⁴ − 2x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(4 + 3)x² − 2x = 7x² − 2x. Không gộp x² với x vì khác số mũ.",
      errorCode: "A3",
    },
    {
      id: "d10-p04",
      prompt: "Thu gọn: 2(x + 4) − 3x =",
      choices: [
        { id: "a", text: "−x + 8", isCorrect: true },
        { id: "b", text: "−x + 4", isDistractor: true, errorCode: "A1" },
        { id: "c", text: "7x", isDistractor: true, errorCode: "A3" },
        { id: "d", text: "5x + 8", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2x + 8 − 3x = (2x − 3x) + 8 = −x + 8.",
      errorCode: "A1",
    },
    {
      id: "d10-p05",
      prompt: "Thu gọn: (5x − 3) + (2x + 7) =",
      choices: [
        { id: "a", text: "7x + 4", isCorrect: true },
        { id: "b", text: "7x + 10", isDistractor: true, errorCode: "E1" },
        { id: "c", text: "11x", isDistractor: true, errorCode: "A3" },
        { id: "d", text: "7x − 4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(5x + 2x) + (−3 + 7) = 7x + 4.",
    },
    {
      id: "d10-p06",
      prompt: "Thu gọn: (4x − 5) − (x − 2) =",
      choices: [
        { id: "a", text: "3x − 3", isCorrect: true },
        { id: "b", text: "3x − 7", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "5x − 7", isDistractor: true },
        { id: "d", text: "0", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "4x − 5 − x + 2 = (4x − x) + (−5 + 2) = 3x − 3.",
      errorCode: "A2",
    },
    {
      id: "d10-p07",
      prompt: "Thu gọn: 2x × 3x =",
      choices: [
        { id: "a", text: "6x²", isCorrect: true },
        { id: "b", text: "6x", isDistractor: true },
        { id: "c", text: "5x²", isDistractor: true },
        { id: "d", text: "5x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Phép nhân: hệ số nhân hệ số (2×3=6), biến nhân biến (x×x=x²), được 6x².",
    },
    {
      id: "d10-p08",
      prompt: "Thu gọn: 5(x − 1) − 3(x + 2) =",
      choices: [
        { id: "a", text: "2x − 11", isCorrect: true },
        { id: "b", text: "2x + 1", isDistractor: true },
        { id: "c", text: "2x − 1", isDistractor: true },
        { id: "d", text: "−9x", isDistractor: true, errorCode: "A3" },
      ],
      correctAnswer: "a",
      explanation: "5x − 5 − 3x − 6 = (5x − 3x) + (−5 − 6) = 2x − 11.",
    },
    {
      id: "d10-p09",
      prompt: "Tìm x biết: 5x − 2x = 18",
      choices: [
        { id: "a", text: "x = 6", isCorrect: true },
        { id: "b", text: "x = 3", isDistractor: true },
        { id: "c", text: "x = 9", isDistractor: true },
        { id: "d", text: "x = 2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "3x = 18 ⇒ x = 18 ÷ 3 = 6.",
    },
    {
      id: "d10-p10",
      prompt: "Tính giá trị biểu thức A = 4x − 7 + 2x khi x = 3:",
      choices: [
        { id: "a", text: "11", isCorrect: true },
        { id: "b", text: "5", isDistractor: true },
        { id: "c", text: "18", isDistractor: true },
        { id: "d", text: "−1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Thu gọn trước: 6x − 7. Thay x = 3: 6(3) − 7 = 18 − 7 = 11.",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Phân biệt phép cộng và phép nhân đơn thức",
    prompt:
      "Em hãy giải thích sự khác nhau cơ bản giữa hai phép tính sau cho một bạn học sinh lớp 8 đang bị nhầm lẫn:\n1) 3x + 2x\n2) 3x × 2x",
    type: "why",
    rubric: [
      "Tính đúng kết quả của cả hai: 3x + 2x = 5x; 3x × 2x = 6x².",
      "Chỉ ra phép cộng: phần biến x không đổi bậc (chỉ cộng hệ số số lượng 3 + 2 = 5).",
      "Chỉ ra phép nhân: nhân cả hệ số (3×2=6) và nhân cả phần biến (x×x=x²).",
    ],
    sampleSolution:
      "Điểm khác nhau cốt lõi:\n1) Phép cộng (3x + 2x = 5x): Đây là phép đếm số lượng các đối tượng cùng loại. 3 cái bút chì cộng 2 cái bút chì bằng 5 cái bút chì. Đơn vị 'bút chì' (biến x) giữ nguyên vẹn bậc nhất, ta chỉ cộng hệ số: 3 + 2 = 5.\n2) Phép nhân (3x × 2x = 6x²): Ta nhân cả hai thành phần: hệ số nhân với hệ số (3 × 2 = 6) và biến nhân với biến (x × x = x²). Do đó kết quả tăng lên bậc hai là 6x² (tương tự như tính diện tích hình chữ nhật cạnh 3x và 2x).",
  },
  summary: {
    keyTakeaways: [
      "Chỉ gộp các hạng tử đồng dạng: ax + bx = (a + b)x.",
      "Tuyệt đối không gộp số tự do vào biến: 2x + 3 không thể bằng 5x (Lỗi A3).",
      "Cộng biến thì giữ nguyên số mũ; chỉ có nhân biến mới tăng số mũ.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Tại sao 2x + 3 lại không thể rút gọn thành 5x?'",
  },
};
