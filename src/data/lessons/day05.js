// Ngày 5: Nhân, chia phân số
export const day05 = {
  day: 5,
  topic: "Nhân, chia phân số",
  goal: "Thành thạo nhân tử với tử, mẫu với mẫu; chia phân số là nhân nghịch đảo; rút gọn chéo trước khi tính",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Ôn phép cộng trừ phân số", time: "10 phút" },
    { label: "Quy tắc nhân & phân số nghịch đảo", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Kế hoạch", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d05-w01",
      prompt: "Phân số nghịch đảo của phân số 4/5 là phân số nào?",
      choices: [
        { id: "a", text: "5/4", isCorrect: true, note: "Chính xác! Đảo ngược vị trí giữa tử số và mẫu số." },
        { id: "b", text: "−4/5", isDistractor: true, note: "Đây là số đối, không phải phân số nghịch đảo." },
        { id: "c", text: "−5/4", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "a",
      explanation: "Phân số nghịch đảo của a/b là b/a (tích của chúng bằng 1: 4/5 × 5/4 = 1).",
    },
    {
      id: "d05-w02",
      prompt: "Tính: (1/3) × (2/5) =",
      choices: [
        { id: "a", text: "2/15", isCorrect: true, note: "Chính xác! Nhân tử với tử: 1×2 = 2; nhân mẫu với mẫu: 3×5 = 15." },
        { id: "b", text: "3/8", isDistractor: true, note: "Nhầm sang cộng tử với tử, mẫu với mẫu." },
      ],
      correctAnswer: "a",
      explanation: "Nhân hai phân số: tử nhân tử, mẫu nhân mẫu: (1 × 2)/(3 × 5) = 2/15.",
    },
  ],
  concept: {
    title: "Nhân tử với tử, mẫu với mẫu & Nhân nghịch đảo",
    visualType: "fraction-multiplication",
    content:
      "Khác với phép cộng cần quy đồng mẫu số, phép nhân phân số cực kỳ đơn giản: Tử nhân Tử, Mẫu nhân Mẫu. Còn phép chia phân số thực chất là phép nhân với phân số nghịch đảo (đảo ngược tử và mẫu của số chia).",
    rules: [
      {
        rule: "Nhân hai phân số",
        math: "a/b × c/d = (a × c) / (b × d)",
        note: "Mẹo hay: Hãy rút gọn chéo (triệt tiêu ước chung giữa tử và mẫu) TRƯỚC KHI nhân để không phải tính số to.",
      },
      {
        rule: "Chia hai phân số (Nhân nghịch đảo)",
        math: "a/b ÷ c/d = a/b × d/c = (a × d) / (b × c)",
        note: "Giữ nguyên phân số thứ nhất, đổi phép chia '÷' thành phép nhân '×', và đảo ngược phân số thứ hai.",
      },
      {
        rule: "Nhân/chia với số nguyên",
        math: "a/b × k = (a × k)/b  và  a/b ÷ k = a / (b × k)",
        note: "Coi số nguyên k như phân số k/1.",
      },
    ],
    commonPitfall: "Lỗi F3: Nhìn thấy 2/3 ÷ 4/5 liền giữ nguyên phép nhân không đảo ngược: 2/3 × 4/5 = 8/15. Sai hoàn toàn! Phải đảo ngược thành 2/3 × 5/4 = 10/12 = 5/6.",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Chia hai phân số chuẩn",
      problem: "Tính: D = 2/3 ÷ 4/5",
      steps: [
        {
          step: 1,
          description: "Chuyển phép chia thành phép nhân với phân số nghịch đảo của 4/5 (nghịch đảo là 5/4).",
          math: "D = 2/3 × 5/4",
        },
        {
          step: 2,
          description: "Rút gọn chéo trước khi nhân: tử 2 và mẫu 4 cùng chia hết cho 2.",
          math: "D = (2 ÷ 2)/(3) × 5/(4 ÷ 2) = 1/3 × 5/2",
        },
        {
          step: 3,
          description: "Nhân tử với tử, mẫu với mẫu.",
          math: "D = (1 × 5) / (3 × 2) = 5/6",
        },
      ],
      pitfall: "Lỗi F3: Viết 2/3 ÷ 4/5 = 2/3 × 4/5 = 8/15.",
      selfCheck: "2/3 ÷ 4/5 = 5/6. Thử lại bằng phép nhân: 5/6 × 4/5 = 20/30 = 2/3 (Khớp chính xác!).",
    },
    {
      title: "Ví dụ 2: Nhân phân số có dấu âm và rút gọn chéo",
      problem: "Tính: M = (−9/10) × (5/12)",
      steps: [
        {
          step: 1,
          description: "Xác định dấu: Âm nhân Dương ra ÂM.",
          math: "M = −( (9 × 5) / (10 × 12) )",
        },
        {
          step: 2,
          description: "Rút gọn chéo: 9 và 12 cùng chia cho 3 (còn 3 và 4); 5 và 10 cùng chia cho 5 (còn 1 và 2).",
          math: "M = −( (3 × 1) / (2 × 4) )",
        },
        {
          step: 3,
          description: "Tính kết quả cuối cùng.",
          math: "M = −3/8",
        },
      ],
      pitfall: "Nhân trực tiếp 9 × 5 = 45 và 10 × 12 = 120 rồi rút gọn rất dễ nhầm.",
      selfCheck: "Dấu âm chính xác. 45/120 chia cho 15 ra đúng 3/8.",
    },
  ],
  guidedPractice: [
    {
      id: "d05-g01",
      prompt: "Tính: 2/3 ÷ 4/5 =",
      choices: [
        { id: "a", text: "8/15", isDistractor: true, errorCode: "F3", note: "Lỗi F3: Bạn quên đảo ngược phân số thứ hai! Phải nhân với 5/4." },
        { id: "b", text: "5/6", isCorrect: true, note: "Chính xác! 2/3 × 5/4 = 10/12 = 5/6 (Ví dụ chuẩn mục 6 AGENTS.md)." },
        { id: "c", text: "6/5", isDistractor: true, note: "Bạn đã đảo ngược cả phân số thứ nhất." },
        { id: "d", text: "10/12", isDistractor: true, note: "Đúng nhưng chưa rút gọn về tối giản 5/6." },
      ],
      correctAnswer: "b",
      explanation: "2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.",
      errorCode: "F3",
      hints: [
        "Chia phân số là nhân với phân số nghịch đảo.",
        "Phân số thứ hai là 4/5, đảo ngược thành 5/4.",
        "Biểu thức thành: 2/3 × 5/4 = (2 × 5)/(3 × 4) = 10/12 = 5/6.",
      ],
    },
    {
      id: "d05-g02",
      prompt: "Tính: (−3/7) × (14/9) =",
      choices: [
        { id: "a", text: "−2/3", isCorrect: true, note: "Chính xác! Rút gọn 14 với 7 (được 2), 3 với 9 (được 3) ra −2/3." },
        { id: "b", text: "2/3", isDistractor: true, errorCode: "E2", note: "Sai dấu: âm nhân dương phải ra âm!" },
        { id: "c", text: "−42/63", isDistractor: true, note: "Đúng nhưng chưa rút gọn tối giản." },
        { id: "d", text: "−6/9", isDistractor: true, note: "Chưa tối giản hoàn toàn." },
      ],
      correctAnswer: "a",
      explanation: "(−3 × 14) / (7 × 9) = −(1 × 2) / (1 × 3) = −2/3.",
      errorCode: "E2",
      hints: [
        "Xác định dấu trước: âm nhân dương ra âm.",
        "Rút gọn chéo: 14 chia 7 được 2; 3 chia 9 còn mẫu 3.",
        "Kết quả là −2/3.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d05-p01",
      prompt: "Tính: (3/5) × (10/9) =",
      choices: [
        { id: "a", text: "2/3", isCorrect: true },
        { id: "b", text: "30/45", isDistractor: true, note: "Chưa rút gọn tối giản." },
        { id: "c", text: "3/2", isDistractor: true },
        { id: "d", text: "27/50", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(3 × 10)/(5 × 9) = (1 × 2)/(1 × 3) = 2/3.",
    },
    {
      id: "d05-p02",
      prompt: "Tính: 3/4 ÷ 3/8 =",
      choices: [
        { id: "a", text: "2", isCorrect: true },
        { id: "b", text: "9/32", isDistractor: true, errorCode: "F3" },
        { id: "c", text: "1/2", isDistractor: true },
        { id: "d", text: "8/4 = 2", isCorrect: true },
      ],
      correctAnswer: "a",
      explanation: "3/4 × 8/3 = 8/4 = 2.",
      errorCode: "F3",
    },
    {
      id: "d05-p03",
      prompt: "Tính: (−4/5) ÷ 2 =",
      choices: [
        { id: "a", text: "−2/5", isCorrect: true },
        { id: "b", text: "−8/5", isDistractor: true },
        { id: "c", text: "2/5", isDistractor: true },
        { id: "d", text: "−4/10", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(−4/5) × (1/2) = −4/10 = −2/5.",
    },
    {
      id: "d05-p04",
      prompt: "Tính: 5 ÷ (−1/3) =",
      choices: [
        { id: "a", text: "−15", isCorrect: true },
        { id: "b", text: "−5/3", isDistractor: true, errorCode: "F3" },
        { id: "c", text: "15", isDistractor: true },
        { id: "d", text: "5/3", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "5 × (−3/1) = −15.",
      errorCode: "F3",
    },
    {
      id: "d05-p05",
      prompt: "Tính: (−2/3) × (−9/4) =",
      choices: [
        { id: "a", text: "3/2", isCorrect: true },
        { id: "b", text: "−3/2", isDistractor: true, errorCode: "E2" },
        { id: "c", text: "18/12", isDistractor: true, note: "Chưa rút gọn." },
        { id: "d", text: "6/7", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Âm nhân âm ra dương: (2 × 9)/(3 × 4) = 18/12 = 3/2.",
      errorCode: "E2",
    },
    {
      id: "d05-p06",
      prompt: "Tìm x biết: x × 3/5 = −6/25",
      choices: [
        { id: "a", text: "x = −2/5", isCorrect: true },
        { id: "b", text: "x = 2/5", isDistractor: true },
        { id: "c", text: "x = −18/125", isDistractor: true, errorCode: "F3" },
        { id: "d", text: "x = −10/3", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x = (−6/25) ÷ (3/5) = (−6/25) × (5/3) = −2/5.",
      errorCode: "F3",
    },
    {
      id: "d05-p07",
      prompt: "Tính: (1/2)² =",
      choices: [
        { id: "a", text: "1/4", isCorrect: true },
        { id: "b", text: "1", isDistractor: true },
        { id: "c", text: "1/2", isDistractor: true },
        { id: "d", text: "2/4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(1/2)² = (1/2) × (1/2) = 1/4.",
    },
    {
      id: "d05-p08",
      prompt: "Tính: (2/3 ÷ 1/6) × 1/4 =",
      choices: [
        { id: "a", text: "1", isCorrect: true },
        { id: "b", text: "1/9", isDistractor: true },
        { id: "c", text: "4", isDistractor: true },
        { id: "d", text: "1/16", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2/3 ÷ 1/6 = 2/3 × 6 = 4; sau đó 4 × 1/4 = 1.",
    },
    {
      id: "d05-p09",
      prompt: "Nghịch đảo của số −3 là:",
      choices: [
        { id: "a", text: "−1/3", isCorrect: true },
        { id: "b", text: "3", isDistractor: true },
        { id: "c", text: "1/3", isDistractor: true },
        { id: "d", text: " Không có", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Số nghịch đảo của a là 1/a. Với a = −3, nghịch đảo là 1/(−3) = −1/3.",
    },
    {
      id: "d05-p10",
      prompt: "Tính giá trị biểu thức: B = (3/4) × (5/7) + (3/4) × (2/7) =",
      choices: [
        { id: "a", text: "3/4", isCorrect: true },
        { id: "b", text: "15/28", isDistractor: true },
        { id: "c", text: "21/28", isDistractor: true },
        { id: "d", text: "1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Đặt 3/4 làm thừa số chung: 3/4 × (5/7 + 2/7) = 3/4 × 7/7 = 3/4 × 1 = 3/4.",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Vì sao chia phân số lại là nhân nghịch đảo?",
    prompt:
      "Nhiều học sinh chỉ học vẹt câu: 'Chia là nhân đảo ngược'. Em hãy giải thích: Tại sao khi tính 2 ÷ (1/3) kết quả lại bằng 6 (tức là 2 × 3)? Hãy dùng một ví dụ đời sống thực tế.",
    type: "why",
    rubric: [
      "Nêu ví dụ thực tế trực quan (ví dụ: chia 2 cái bánh, mỗi phần là 1/3 cái bánh).",
      "Chỉ ra mỗi cái bánh chia được 3 phần 1/3, vậy 2 cái bánh chia được 2 × 3 = 6 phần.",
      "Kết luận: Phép chia hỏi 'có bao nhiêu lượng 1/3 trong 2', vì mỗi đơn vị có 3 phần nên tổng số phần là 2 nhân 3.",
    ],
    sampleSolution:
      "Ví dụ thực tế: Bạn có 2 chiếc bánh pizza. Bạn muốn chia cho các bạn, mỗi bạn được 1/3 chiếc bánh. Hỏi có bao nhiêu bạn được chia bánh?\nTa thấy: Cứ 1 chiếc bánh thì chia được 3 miếng (mỗi miếng 1/3). Do đó, với 2 chiếc bánh, số miếng chia được là 2 × 3 = 6 miếng bánh. Như vậy: 2 ÷ (1/3) = 2 × (3/1) = 6! Chia cho 1/3 chính là hỏi 'có bao nhiêu lần 1/3', và vì cứ 1 đơn vị chứa 3 phần nên ta phải nhân với 3.",
  },
  summary: {
    keyTakeaways: [
      "Nhân phân số: Tử nhân Tử, Mẫu nhân Mẫu. Hãy rút gọn chéo trước khi nhân.",
      "Chia phân số: Giữ nguyên phân số đầu, nhân với phân số nghịch đảo của số chia.",
      "Lưu ý quy tắc dấu: cùng dấu ra dương, khác dấu ra âm.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Phân số nghịch đảo là gì và cách chia hai phân số?'",
  },
};
