// Ngày 9: Dấu trừ trước ngoặc
export const day09 = {
  day: 9,
  topic: "Dấu trừ trước ngoặc",
  goal: "Thành thạo quy tắc bỏ dấu ngoặc: Đổi dấu toàn bộ các hạng tử khi có dấu trừ đằng trước",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Nhớ lại phép nhân với −1", time: "10 phút" },
    { label: "Bản chất quy tắc đổi dấu", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d09-w01",
      prompt: "Tính: (−1) × (x − 4) bằng quy tắc phân phối:",
      choices: [
        { id: "a", text: "−x + 4", isCorrect: true, note: "Chính xác! (−1) × x = −x và (−1) × (−4) = +4." },
        { id: "b", text: "−x − 4", isDistractor: true, errorCode: "A2", note: "Bạn quên đổi dấu của số −4 khi nhân với −1!" },
      ],
      correctAnswer: "a",
      explanation: "(−1) × x + (−1) × (−4) = −x + 4. Đây chính là bản chất của −(x − 4).",
      errorCode: "A2",
    },
    {
      id: "d09-w02",
      prompt: "Khi bỏ dấu ngoặc có dấu cộng '+' đứng trước: +(a − b + c) =",
      choices: [
        { id: "a", text: "a − b + c (Giữ nguyên dấu)", isCorrect: true, note: "Chính xác! Dấu cộng phía trước không làm thay đổi dấu của các hạng tử trong ngoặc." },
        { id: "b", text: "−a + b − c", isDistractor: true, note: "Chỉ đổi dấu khi có dấu TRỪ đứng trước ngoặc." },
      ],
      correctAnswer: "a",
      explanation: "Dấu '+' trước ngoặc: giữ nguyên dấu tất cả các hạng tử bên trong.",
    },
  ],
  concept: {
    title: "Quy tắc dấu ngoặc: Chiếc gương đổi chiều",
    visualType: "sign-change",
    content:
      "Dấu trừ đứng trước ngoặc hoạt động như một chiếc gương đảo chiều: Bất kỳ số nào đi qua cửa ngoặc đều phải đổi thành số đối của nó. Dương (+) biến thành Âm (−), và Âm (−) biến thành Dương (+).",
    rules: [
      {
        rule: "Dấu trừ trước ngoặc",
        math: "−(a + b − c) = −a − b + c",
        note: "Đổi dấu TẤT CẢ các hạng tử trong ngoặc. Hạng tử đầu tiên a đổi thành −a, +b đổi thành −b, −c đổi thành +c.",
      },
      {
        rule: "Dấu cộng trước ngoặc",
        math: "+(a + b − c) = a + b − c",
        note: "Giữ nguyên vẹn toàn bộ dấu của các hạng tử bên trong.",
      },
      {
        rule: "Bản chất toán học",
        math: "−(biểu thức) = (−1) × (biểu thức)",
        note: "Hiểu bản chất này sẽ không bao giờ bị quên đổi dấu của hạng tử phía sau.",
      },
    ],
    commonPitfall: "Lỗi A2 kinh điển: Viết −(x − 4) = −x − 4. Học sinh chỉ đổi dấu x thành −x mà quên đổi −4 thành +4! Đáp án đúng bắt buộc là −x + 4.",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Bỏ ngoặc đơn giản",
      problem: "Bỏ ngoặc biểu thức: A = −(x − 4)",
      steps: [
        { step: 1, description: "Nhận diện dấu trừ trước ngoặc. Xem như nhân (−1) vào từng hạng tử.", math: "A = (−1) × x − (−1) × 4" },
        { step: 2, description: "Đổi dấu x thành −x; đổi dấu −4 thành +4.", math: "A = −x + 4" },
      ],
      pitfall: "Lỗi A2: Quên đổi dấu số 4, viết thành −x − 4.",
      selfCheck: "Thử với x = 10: Vế trái là −(10 − 4) = −6. Vế phải là −10 + 4 = −6. Bằng nhau!",
    },
    {
      title: "Ví dụ 2: Bỏ ngoặc và thu gọn biểu thức",
      problem: "Thu gọn: B = (3x − 2) − (x − 5)",
      steps: [
        { step: 1, description: "Ngoặc thứ nhất có dấu cộng ngầm hiểu phía trước: Giữ nguyên.", math: "3x − 2" },
        { step: 2, description: "Ngoặc thứ hai có dấu trừ phía trước: Đổi dấu cả x và −5 thành −x và +5.", math: "− (x − 5) = −x + 5" },
        { step: 3, description: "Gộp các hạng tử đồng dạng lại với nhau.", math: "B = 3x − 2 − x + 5 = (3x − x) + (−2 + 5) = 2x + 3" },
      ],
      pitfall: "Viết thành 3x − 2 − x − 5 = 2x − 7 vì quên đổi dấu −5.",
      selfCheck: "Thử với x = 0: (0 − 2) − (0 − 5) = −2 − (−5) = −2 + 5 = 3. 2(0) + 3 = 3.",
    },
  ],
  guidedPractice: [
    {
      id: "d09-g01",
      prompt: "Bỏ dấu ngoặc của biểu thức −(x − 4) ta được:",
      choices: [
        { id: "a", text: "−x − 4", isDistractor: true, errorCode: "A2", note: "Lỗi A2: Bạn chỉ đổi dấu x mà quên đổi dấu của −4 thành +4!" },
        { id: "b", text: "−x + 4", isCorrect: true, note: "Chính xác! Cả hai hạng tử đều phải đổi dấu: x thành −x và −4 thành +4 (Ví dụ chuẩn mục 6 AGENTS.md)." },
        { id: "c", text: "x + 4", isDistractor: true, note: "Bạn quên đổi dấu của x." },
        { id: "d", text: "x − 4", isDistractor: true, note: "Chưa đổi dấu hạng tử nào." },
      ],
      correctAnswer: "b",
      explanation: "−(x − 4) = −x + 4. Đổi dấu tất cả hạng tử trong ngoặc khi có dấu trừ đứng trước.",
      errorCode: "A2",
      hints: [
        "Có dấu trừ đứng trước ngoặc: Mọi số bên trong đều phải đảo dấu.",
        "x đang là số dương, đảo thành −x.",
        "−4 đang là số âm, đảo thành +4. Vậy biểu thức là −x + 4.",
      ],
    },
    {
      id: "d09-g02",
      prompt: "Bỏ ngoặc biểu thức: 5 − (2x + 1) =",
      choices: [
        { id: "a", text: "4 − 2x (hay −2x + 4)", isCorrect: true, note: "Chính xác! 5 − 2x − 1 = 4 − 2x." },
        { id: "b", text: "6 − 2x", isDistractor: true, errorCode: "A2", note: "Quên đổi dấu +1 thành −1: bạn đã lấy 5 + 1 = 6." },
        { id: "c", text: "5 − 2x + 1", isDistractor: true, errorCode: "A2" },
        { id: "d", text: "3x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "5 − (2x + 1) = 5 − 2x − 1 = (5 − 1) − 2x = 4 − 2x.",
      errorCode: "A2",
      hints: [
        "Phá ngoặc trước: 2x đổi thành −2x, +1 đổi thành −1.",
        "Biểu thức thành: 5 − 2x − 1.",
        "Tính 5 − 1 = 4. Kết quả là 4 − 2x.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d09-p01",
      prompt: "Bỏ ngoặc: −(3x + 5) =",
      choices: [
        { id: "a", text: "−3x − 5", isCorrect: true },
        { id: "b", text: "−3x + 5", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "3x − 5", isDistractor: true },
        { id: "d", text: "3x + 5", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "−(3x + 5) = −3x − 5.",
      errorCode: "A2",
    },
    {
      id: "d09-p02",
      prompt: "Bỏ ngoặc: −(−2x + 7) =",
      choices: [
        { id: "a", text: "2x − 7", isCorrect: true },
        { id: "b", text: "−2x − 7", isDistractor: true },
        { id: "c", text: "2x + 7", isDistractor: true, errorCode: "A2" },
        { id: "d", text: "−2x + 7", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "−(−2x) đổi thành +2x; +7 đổi thành −7. Ta được 2x − 7.",
      errorCode: "A2",
    },
    {
      id: "d09-p03",
      prompt: "Thu gọn: (x + 3) − (x − 2) =",
      choices: [
        { id: "a", text: "5", isCorrect: true },
        { id: "b", text: "1", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "2x + 1", isDistractor: true },
        { id: "d", text: "−1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x + 3 − x + 2 = (x − x) + (3 + 2) = 5.",
      errorCode: "A2",
    },
    {
      id: "d09-p04",
      prompt: "Thu gọn: 10 − (4 − x) =",
      choices: [
        { id: "a", text: "6 + x (hay x + 6)", isCorrect: true },
        { id: "b", text: "6 − x", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "14 − x", isDistractor: true },
        { id: "d", text: "14 + x", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "10 − 4 + x = 6 + x.",
      errorCode: "A2",
    },
    {
      id: "d09-p05",
      prompt: "Bỏ ngoặc: −(a − b − c) =",
      choices: [
        { id: "a", text: "−a + b + c", isCorrect: true },
        { id: "b", text: "−a − b − c", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "−a + b − c", isDistractor: true, errorCode: "A2" },
        { id: "d", text: "a + b + c", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Đổi dấu toàn bộ: a thành −a; −b thành +b; −c thành +c.",
      errorCode: "A2",
    },
    {
      id: "d09-p06",
      prompt: "Thu gọn: 2x − (3x − 4) =",
      choices: [
        { id: "a", text: "−x + 4", isCorrect: true },
        { id: "b", text: "−x − 4", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "5x − 4", isDistractor: true },
        { id: "d", text: "x + 4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2x − 3x + 4 = −x + 4.",
      errorCode: "A2",
    },
    {
      id: "d09-p07",
      prompt: "Tìm x biết: 8 − (x − 2) = 5",
      choices: [
        { id: "a", text: "x = 5", isCorrect: true },
        { id: "b", text: "x = 1", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "x = 11", isDistractor: true },
        { id: "d", text: "x = −5", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "8 − x + 2 = 5 ⇒ 10 − x = 5 ⇒ x = 5.",
      errorCode: "A2",
    },
    {
      id: "d09-p08",
      prompt: "Bỏ ngoặc biểu thức: 4 − [x − (2 − x)] =",
      choices: [
        { id: "a", text: "6 − 2x", isCorrect: true },
        { id: "b", text: "2 − 2x", isDistractor: true },
        { id: "c", text: "6", isDistractor: true },
        { id: "d", text: "2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Ngoặc trong trước: x − 2 + x = 2x − 2. Sau đó: 4 − (2x − 2) = 4 − 2x + 2 = 6 − 2x.",
      errorCode: "A2",
    },
    {
      id: "d09-p09",
      prompt: "Thu gọn biểu thức: P = (2a − 3b) − (a + 2b) + (3a − b) =",
      choices: [
        { id: "a", text: "4a − 6b", isCorrect: true },
        { id: "b", text: "4a − 2b", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "6a − 6b", isDistractor: true },
        { id: "d", text: "4a", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2a − 3b − a − 2b + 3a − b = (2a − a + 3a) + (−3b − 2b − b) = 4a − 6b.",
    },
    {
      id: "d09-p10",
      prompt: "Biểu thức −(x − y) bằng với biểu thức nào?",
      choices: [
        { id: "a", text: "y − x", isCorrect: true },
        { id: "b", text: "x − y", isDistractor: true },
        { id: "c", text: "−x − y", isDistractor: true, errorCode: "A2" },
        { id: "d", text: "−(y − x)", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "−(x − y) = −x + y = y − x. Số đối của (x − y) chính là (y − x).",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Tại sao −(a − b) lại bằng b − a?",
    prompt:
      "Em hãy giải thích: Tại sao khi đảo ngược hiệu (từ a − b sang b − a) thì giá trị lại đổi dấu thành số đối của nó? Ví dụ: 7 − 3 = 4, còn 3 − 7 = −4.",
    type: "why",
    rubric: [
      "Áp dụng quy tắc bỏ dấu ngoặc: −(a − b) = −a + b = b − a.",
      "Giải thích bằng trục số: Khoảng cách có hướng từ b đến a và từ a đến b là hai vector ngược chiều nhau.",
      "Kết luận: Hai hiệu ngược nhau (a − b) và (b − a) luôn là hai số đối nhau.",
    ],
    sampleSolution:
      "1. Về mặt đại số: Khi ta lấy số đối của (a − b), tức là đặt dấu trừ trước ngoặc: −(a − b) = −a + b. Theo tính chất giao hoán của phép cộng, −a + b chính là b − a!\n2. Về mặt trực quan trên trục số: Hiệu a − b biểu thị khoảng cách và hướng đi từ điểm b đến điểm a. Khi ta tính b − a, hướng đi bị đảo ngược 180° sang chiều đối diện. Do đó, độ dài khoảng cách không đổi nhưng mang dấu âm ngược lại. Vì vậy, đảo thứ tự phép trừ luôn tạo ra số đối!",
  },
  summary: {
    keyTakeaways: [
      "Dấu trừ trước ngoặc: Đổi dấu TẤT CẢ các hạng tử: −(x − 4) = −x + 4.",
      "Dấu cộng trước ngoặc: Giữ nguyên vẹn toàn bộ dấu.",
      "Nhớ kỹ: a − b và b − a là hai số đối nhau: b − a = −(a − b).",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Khi bỏ dấu ngoặc có dấu trừ đằng trước, tại sao phải đổi dấu của toàn bộ các số bên trong?'",
  },
};
