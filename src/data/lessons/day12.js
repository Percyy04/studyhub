// Ngày 12: Hình học nền
export const day12 = {
  day: 12,
  topic: "Hình học nền",
  goal: "Nắm vững 3 định lý hình học cốt lõi: Góc kề bù, Tổng ba góc trong tam giác, và Tính chất tam giác cân",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Nhớ lại khái niệm góc & tam giác", time: "10 phút" },
    { label: "3 định lý nền tảng hình học", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d12-w01",
      prompt: "Một góc bẹt (đường thẳng) có số đo bằng bao nhiêu độ?",
      choices: [
        { id: "a", text: "180°", isCorrect: true, note: "Chính xác! Hai tia đối nhau tạo thành góc bẹt 180°." },
        { id: "b", text: "90°", isDistractor: true, note: "90° là góc vuông." },
        { id: "c", text: "360°", isDistractor: true, note: "360° là một vòng tròn." },
      ],
      correctAnswer: "a",
      explanation: "Góc bẹt có số đo 180°. Hai góc kề bù ghép lại tạo thành một góc bẹt nên tổng bằng 180°.",
    },
    {
      id: "d12-w02",
      prompt: "Tam giác cân là tam giác có đặc điểm gì?",
      choices: [
        { id: "a", text: "Có hai cạnh bên bằng nhau và hai góc ở đáy bằng nhau", isCorrect: true, note: "Chính xác! Đây là định nghĩa và tính chất cơ bản của tam giác cân." },
        { id: "b", text: "Có ba cạnh bằng nhau", isDistractor: true, note: "Đó là tam giác đều." },
        { id: "c", text: "Có một góc vuông", isDistractor: true, note: "Đó là tam giác vuông." },
      ],
      correctAnswer: "a",
      explanation: "Tam giác cân có hai cạnh bên bằng nhau. Từ đó suy ra hai góc ở đáy cũng bằng nhau.",
    },
  ],
  concept: {
    title: "3 Cột trụ hình học: Luôn vẽ hình và nêu định lý trước khi tính",
    visualType: "geometry-diagram",
    content:
      "Học sinh THCS thường sợ hình học vì thói quen đoán mò bằng mắt thay vì căn cứ vào định lý toán học (Lỗi H1). Ba định lý dưới đây là chìa khóa giải quyết hầu hết các bài toán tính góc và chứng minh ở lớp 8.",
    rules: [
      {
        rule: "1. Hai góc kề bù",
        math: "Góc 1 + Góc 2 = 180°",
        note: "Có một cạnh chung và hai cạnh còn lại là hai tia đối nhau (tạo thành một đường thẳng).",
      },
      {
        rule: "2. Tổng 3 góc trong một tam giác",
        math: "Â + B̂ + Ĉ = 180°",
        note: "Biết 2 góc trong tam giác luôn tìm được góc thứ ba: Ĉ = 180° − (Â + B̂).",
      },
      {
        rule: "3. Tính chất tam giác cân (tại A)",
        math: "AB = AC  ⇒  B̂ = Ĉ = (180° − Â) ÷ 2",
        note: "Hai góc ở đáy luôn bằng nhau. Nếu biết góc ở đỉnh Â, tính được hai góc đáy.",
      },
    ],
    commonPitfall: "Lỗi H1: Nhìn hình rồi phán đoán góc vuông hoặc góc bằng nhau bằng mắt; quên ghi lý do hoặc nhầm tổng 3 góc tam giác với 360°.",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Tính góc kề bù",
      problem: "Cho hai góc kề bù xOy và yOz. Biết góc xOy = 65°. Tính số đo góc yOz.",
      steps: [
        { step: 1, description: "Nêu định lý: Hai góc kề bù có tổng số đo bằng 180°.", math: "xOy + yOz = 180°" },
        { step: 2, description: "Thay số đo góc đã biết vào hệ thức.", math: "65° + yOz = 180°" },
        { step: 3, description: "Tính số đo góc yOz.", math: "yOz = 180° − 65° = 115°" },
      ],
      pitfall: "Lỗi H1: Lấy 90° − 65° (nhầm kề bù với phụ nhau).",
      selfCheck: "Thử lại: 65° + 115° = 180°. Hai góc ghép thành góc bẹt.",
    },
    {
      title: "Ví dụ 2: Tìm góc ở đáy của tam giác cân",
      problem: "Cho tam giác ABC cân tại A. Biết góc ở đỉnh Â = 50°. Tính số đo góc B và góc C.",
      steps: [
        { step: 1, description: "Áp dụng định lý tổng 3 góc trong tam giác ABC: Â + B̂ + Ĉ = 180°.", math: "B̂ + Ĉ = 180° − Â = 180° − 50° = 130°" },
        { step: 2, description: "Vì tam giác ABC cân tại A nên hai góc ở đáy bằng nhau: B̂ = Ĉ.", math: "B̂ = Ĉ" },
        { step: 3, description: "Tính số đo mỗi góc đáy.", math: "B̂ = Ĉ = 130° ÷ 2 = 65°" },
      ],
      pitfall: "Lấy 180° − 50° = 130° rồi dừng lại, quên chia đôi cho hai góc đáy.",
      selfCheck: "Thử lại: 50° + 65° + 65° = 180°. Tam giác cân chuẩn xác!",
    },
  ],
  guidedPractice: [
    {
      id: "d12-g01",
      prompt: "Hai góc kề bù có một góc bằng 70°. Góc còn lại bằng bao nhiêu độ?",
      choices: [
        { id: "a", text: "110°", isCorrect: true, note: "Chính xác! 180° − 70° = 110°." },
        { id: "b", text: "20°", isDistractor: true, errorCode: "H1", note: "Bạn nhầm sang hai góc phụ nhau (tổng 90°). Kề bù tổng là 180°!" },
        { id: "c", text: "70°", isDistractor: true, note: "Chưa đúng." },
        { id: "d", text: "90°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Hai góc kề bù có tổng bằng 180°. Góc còn lại là: 180° − 70° = 110°.",
      errorCode: "H1",
      hints: [
        "Hai góc kề bù ghép lại tạo thành một đường thẳng (góc bẹt).",
        "Góc bẹt có số đo 180°.",
        "Lấy 180° − 70° = 110°.",
      ],
    },
    {
      id: "d12-g02",
      prompt: "Tam giác MNP có M̂ = 45° và N̂ = 65°. Số đo của góc P̂ là:",
      choices: [
        { id: "a", text: "70°", isCorrect: true, note: "Chính xác! 180° − (45° + 65°) = 180° − 110° = 70°." },
        { id: "b", text: "80°", isDistractor: true, note: "Tính nhầm tổng." },
        { id: "c", text: "110°", isDistractor: true, note: "110° là tổng của M và N, chưa lấy 180° trừ đi." },
        { id: "d", text: "90°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Tổng 3 góc trong tam giác bằng 180°. P̂ = 180° − (45° + 65°) = 70°.",
      errorCode: "H1",
      hints: [
        "Tổng ba góc trong bất kỳ tam giác nào cũng bằng 180°.",
        "Tính tổng hai góc đã biết: 45° + 65° = 110°.",
        "Góc thứ ba P̂ = 180° − 110° = 70°.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d12-p01",
      prompt: "Hai góc kề bù aOb và bOc có aOb = 120°. Số đo của bOc là:",
      choices: [
        { id: "a", text: "60°", isCorrect: true },
        { id: "b", text: "30°", isDistractor: true, errorCode: "H1" },
        { id: "c", text: "120°", isDistractor: true },
        { id: "d", text: "90°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "180° − 120° = 60°.",
      errorCode: "H1",
    },
    {
      id: "d12-p02",
      prompt: "Tam giác ABC vuông tại A có B̂ = 35°. Số đo của góc Ĉ là:",
      choices: [
        { id: "a", text: "55°", isCorrect: true },
        { id: "b", text: "65°", isDistractor: true },
        { id: "c", text: "45°", isDistractor: true },
        { id: "d", text: "145°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Trong tam giác vuông, hai góc nhọn phụ nhau: Ĉ = 90° − 35° = 55°.",
    },
    {
      id: "d12-p03",
      prompt: "Tam giác DEF cân tại D có góc ở đỉnh D̂ = 80°. Mỗi góc ở đáy có số đo là:",
      choices: [
        { id: "a", text: "50°", isCorrect: true },
        { id: "b", text: "100°", isDistractor: true, note: "Quên chia đôi cho hai góc đáy." },
        { id: "c", text: "40°", isDistractor: true },
        { id: "d", text: "60°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(180° − 80°) ÷ 2 = 100° ÷ 2 = 50°.",
    },
    {
      id: "d12-p04",
      prompt: "Tam giác ABC cân tại A có một góc ở đáy B̂ = 40°. Góc ở đỉnh Â có số đo là:",
      choices: [
        { id: "a", text: "100°", isCorrect: true },
        { id: "b", text: "140°", isDistractor: true },
        { id: "c", text: "70°", isDistractor: true },
        { id: "d", text: "80°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Vì cân tại A nên Ĉ = B̂ = 40°. Do đó Â = 180° − (40° + 40°) = 100°.",
    },
    {
      id: "d12-p05",
      prompt: "Một tam giác có ba góc bằng nhau. Số đo của mỗi góc là:",
      choices: [
        { id: "a", text: "60°", isCorrect: true },
        { id: "b", text: "90°", isDistractor: true },
        { id: "c", text: "45°", isDistractor: true },
        { id: "d", text: "50°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "180° ÷ 3 = 60° (đây là tam giác đều).",
    },
    {
      id: "d12-p06",
      prompt: "Hai đường thẳng cắt nhau tạo thành 4 góc. Biết một góc bằng 50°. Góc đối đỉnh với nó bằng:",
      choices: [
        { id: "a", text: "50°", isCorrect: true },
        { id: "b", text: "130°", isDistractor: true, note: "130° là góc kề bù." },
        { id: "c", text: "40°", isDistractor: true },
        { id: "d", text: "90°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Hai góc đối đỉnh thì bằng nhau: cùng bằng 50°.",
    },
    {
      id: "d12-p07",
      prompt: "Tam giác nào sau đây là tam giác vuông cân?",
      choices: [
        { id: "a", text: "Tam giác có một góc 90° và hai góc còn lại bằng 45°", isCorrect: true },
        { id: "b", text: "Tam giác có một góc 90° và một góc 60°", isDistractor: true },
        { id: "c", text: "Tam giác có ba góc đều bằng 60°", isDistractor: true },
        { id: "d", text: "Tam giác có hai góc bằng 50°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Vuông cân: một góc 90°, hai góc nhọn ở đáy bằng nhau: (180° − 90°) ÷ 2 = 45°.",
    },
    {
      id: "d12-p08",
      prompt: "Cho tam giác ABC có góc ngoài tại đỉnh C bằng 110°. Góc trong Ĉ của tam giác bằng:",
      choices: [
        { id: "a", text: "70°", isCorrect: true },
        { id: "b", text: "110°", isDistractor: true },
        { id: "c", text: "20°", isDistractor: true },
        { id: "d", text: "90°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Góc trong và góc ngoài tại cùng một đỉnh là hai góc kề bù: 180° − 110° = 70°.",
    },
    {
      id: "d12-p09",
      prompt: "Tam giác có số đo 3 góc tỉ lệ với 1, 2, 3 có góc lớn nhất bằng:",
      choices: [
        { id: "a", text: "90°", isCorrect: true },
        { id: "b", text: "60°", isDistractor: true },
        { id: "c", text: "100°", isDistractor: true },
        { id: "d", text: "120°", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Tổng số phần: 1 + 2 + 3 = 6 phần. Một phần: 180° ÷ 6 = 30°. Góc lớn nhất là 3 phần: 3 × 30° = 90° (Tam giác vuông!).",
    },
    {
      id: "d12-p10",
      prompt: "Một tam giác cân có góc ở đáy bằng 90° có tồn tại không?",
      choices: [
        { id: "a", text: "Không thể tồn tại, vì tổng hai góc đáy đã là 180°", isCorrect: true },
        { id: "b", text: "Có thể tồn tại", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Nếu góc đáy bằng 90° thì hai góc đáy có tổng là 90° + 90° = 180°, góc thứ ba bằng 0° (vô lý). Do đó góc ở đáy của tam giác cân luôn là góc nhọn (< 90°).",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Góc ngoài của tam giác",
    prompt:
      "Định lý góc ngoài phát biểu: 'Mỗi góc ngoài của một tam giác có số đo bằng tổng số đo của hai góc trong không kề với nó'.\nEm hãy dùng hai định lý đã học (Tổng 3 góc tam giác và Hai góc kề bù) để chứng minh ngắn gọn định lý trên.",
    type: "why",
    rubric: [
      "Gọi tam giác ABC, góc ngoài tại đỉnh C là góc ACx.",
      "Sử dụng góc kề bù: ACx + Ĉ = 180° ⇒ ACx = 180° − Ĉ.",
      "Sử dụng tổng 3 góc tam giác: Â + B̂ + Ĉ = 180° ⇒ Â + B̂ = 180° − Ĉ.",
      "So sánh hai biểu thức suy ra: ACx = Â + B̂.",
    ],
    sampleSolution:
      "Chứng minh cực kỳ ngắn gọn và đẹp đẽ:\n1) Xét đỉnh C: Góc ngoài ACx kề bù với góc trong Ĉ, do đó:\nACx + Ĉ = 180°  ⇒  ACx = 180° − Ĉ  (1)\n2) Xét tam giác ABC: Tổng ba góc bằng 180°, do đó:\nÂ + B̂ + Ĉ = 180°  ⇒  Â + B̂ = 180° − Ĉ  (2)\nTừ (1) và (2) cùng bằng 180° − Ĉ, ta suy ra ngay:\nACx = Â + B̂.\nNhư vậy, số đo góc ngoài luôn bằng tổng hai góc trong không kề với nó!",
  },
  summary: {
    keyTakeaways: [
      "Hai góc kề bù: luôn có tổng bằng 180°.",
      "Tổng 3 góc trong tam giác: Â + B̂ + Ĉ = 180°.",
      "Tam giác cân tại A: Hai góc ở đáy B̂ = Ĉ = (180° − Â) ÷ 2.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Tại sao góc ở đáy của một tam giác cân bắt buộc phải là góc nhọn?'",
  },
};
