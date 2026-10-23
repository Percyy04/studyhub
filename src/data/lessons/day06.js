// Ngày 6: Ôn trộn số nguyên và phân số
export const day06 = {
  day: 6,
  topic: "Ôn trộn số nguyên và phân số",
  goal: "Chọn đúng quy tắc tính toán cho số nguyên và phân số, không làm theo cảm tính",
  testGoal: "12 câu; mục tiêu ≥ 10/12",
  timeMinutes: 60,
  breakdown: [
    { label: "Nhận diện 4 phép tính", time: "10 phút" },
    { label: "Bẫy cảm tính & quy tắc chọn lọc", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "15 phút" },
    { label: "Tự kiểm tra 12 câu", time: "15 phút" },
    { label: "Ghi lỗi & Kế hoạch", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d06-w01",
      prompt: "Phép tính nào BẮT BUỘC phải quy đồng mẫu số?",
      choices: [
        { id: "a", text: "1/3 + 2/5", isCorrect: true, note: "Chính xác! Phép cộng trừ phân số khác mẫu phải quy đồng." },
        { id: "b", text: "(1/3) × (2/5)", isDistractor: true, note: "Phép nhân chỉ cần lấy tử nhân tử, mẫu nhân mẫu." },
        { id: "c", text: "(1/3) ÷ (2/5)", isDistractor: true, note: "Phép chia đổi thành nhân nghịch đảo, không cần quy đồng." },
      ],
      correctAnswer: "a",
      explanation: "Chỉ có phép CỘNG và TRỪ phân số khác mẫu mới phải quy đồng mẫu số chung. Phép nhân và chia không quy đồng.",
    },
    {
      id: "d06-w02",
      prompt: "Số nguyên −3 khi viết dưới dạng phân số có mẫu là 1 là:",
      choices: [
        { id: "a", text: "−3/1", isCorrect: true, note: "Chính xác! Mọi số nguyên a đều bằng a/1." },
        { id: "b", text: "1/(−3)", isDistractor: true, note: "Đây là số nghịch đảo, không phải chính nó." },
      ],
      correctAnswer: "a",
      explanation: "a = a/1. Để kết hợp số nguyên với phân số, coi số nguyên như phân số có mẫu số là 1.",
    },
  ],
  concept: {
    title: "Bản đồ tư duy: Chọn đúng quy tắc, không làm theo cảm tính",
    visualType: "flow-chart",
    content:
      "Khi gặp một bài toán hỗn hợp gồm cả số nguyên và phân số, học sinh hay mắc bẫy 'làm theo cảm tính' (nhìn số nào thuận mắt thì tính trước, hoặc nhầm lẫn giữa quy tắc cộng và quy tắc nhân).",
    rules: [
      {
        rule: "1. Thấy phép CỘNG / TRỪ phân số",
        math: "Khác mẫu ⇒ PHẢI QUY ĐỒNG MẪU CHUNG",
        note: "Quy đồng xong giữ nguyên mẫu, cộng trừ các tử số có chú ý dấu số nguyên.",
      },
      {
        rule: "2. Thấy phép NHÂN phân số",
        math: "Tử nhân Tử, Mẫu nhân Mẫu",
        note: "TUYỆT ĐỐI KHÔNG QUY ĐỒNG MẪU. Hãy rút gọn chéo trước.",
      },
      {
        rule: "3. Thấy phép CHIA phân số",
        math: "Nhân với phân số nghịch đảo",
        note: "Đảo ngược số chia rồi nhân bình thường.",
      },
      {
        rule: "4. Thứ tự phép tính ưu tiên",
        math: "( ) ngoặc → Nhân/Chia → Cộng/Trừ",
        note: "Luôn đặt câu hỏi: 'Bài này có phép nhân/chia không? Có ngoặc không?'.",
      },
    ],
    commonPitfall: "Trộn lẫn quy tắc: Đi quy đồng mẫu cho phép nhân, hoặc lấy tử cộng tử mẫu cộng mẫu cho phép cộng!",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Phối hợp phép nhân và phép trừ",
      problem: "Tính: K = 1/2 − 3/4 × (−2/3)",
      steps: [
        {
          step: 1,
          description: "Nhận diện thứ tự phép tính: Có phép trừ và phép nhân, phải làm PHÉP NHÂN trước.",
          math: "3/4 × (−2/3) = −( (3 × 2) / (4 × 3) ) = −2/4 = −1/2",
        },
        {
          step: 2,
          description: "Thay vào biểu thức ban đầu và đổi trừ số âm thành cộng số đối.",
          math: "K = 1/2 − (−1/2) = 1/2 + 1/2",
        },
        {
          step: 3,
          description: "Cộng hai phân số cùng mẫu.",
          math: "K = 2/2 = 1",
        },
      ],
      pitfall: "Lấy 1/2 − 3/4 trước rồi mới nhân (Lỗi E3 - Sai thứ tự phép tính).",
      selfCheck: "Nhân trước: 3/4 × (−2/3) = −1/2. Sau đó 1/2 − (−1/2) = 1/2 + 1/2 = 1.",
    },
    {
      title: "Ví dụ 2: Biểu thức có dấu ngoặc tròn",
      problem: "Tính: H = (1/3 − 5/6) ÷ (−1/2)",
      steps: [
        {
          step: 1,
          description: "Thực hiện phép tính trong ngoặc trước: Quy đồng mẫu chung 6.",
          math: "1/3 − 5/6 = 2/6 − 5/6 = −3/6 = −1/2",
        },
        {
          step: 2,
          description: "Thực hiện phép chia: Lấy kết quả trong ngoặc chia cho (−1/2).",
          math: "H = (−1/2) ÷ (−1/2)",
        },
        {
          step: 3,
          description: "Một số chia cho chính nó luôn bằng 1; âm chia âm ra dương.",
          math: "H = 1",
        },
      ],
      pitfall: "Quên đổi dấu khi trừ phân số trong ngoặc.",
      selfCheck: "(−1/2) × (−1/2)⁻¹ = 1.",
    },
  ],
  guidedPractice: [
    {
      id: "d06-g01",
      prompt: "Tính: 3/5 + 2/5 × (−3) =",
      choices: [
        { id: "a", text: "−3", isDistractor: true, errorCode: "E3", note: "Bạn đã tính 3/5 + 2/5 = 1 trước rồi nhân −3! Phải nhân trước cộng." },
        { id: "b", text: "−3/5", isCorrect: true, note: "Chính xác! 2/5 × (−3) = −6/5; sau đó 3/5 + (−6/5) = −3/5." },
        { id: "c", text: "3/5", isDistractor: true, note: "Nhầm dấu." },
        { id: "d", text: "−9/5", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "b",
      explanation: "Nhân trước: 2/5 × (−3) = −6/5. Cộng sau: 3/5 + (−6/5) = −3/5.",
      errorCode: "E3",
      hints: [
        "Có phép cộng và phép nhân: Phép nào làm trước?",
        "Tính 2/5 × (−3) = −6/5.",
        "Tính 3/5 + (−6/5) = (3 − 6)/5 = −3/5.",
      ],
    },
    {
      id: "d06-g02",
      prompt: "Tính: (1/4 − 3/4) ÷ 1/2 =",
      choices: [
        { id: "a", text: "−1", isCorrect: true, note: "Chính xác! 1/4 − 3/4 = −2/4 = −1/2. Sau đó (−1/2) ÷ (1/2) = −1." },
        { id: "b", text: "1", isDistractor: true, note: "Sai dấu kết quả." },
        { id: "c", text: "−1/4", isDistractor: true, errorCode: "F3", note: "Bạn quên đảo ngược phân số 1/2 khi chia." },
        { id: "d", text: "−2", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "a",
      explanation: "Ngoặc trước: 1/4 − 3/4 = −2/4 = −1/2. Chia nghịch đảo: (−1/2) × 2 = −1.",
      errorCode: "F3",
      hints: [
        "Ngoặc trước: 1/4 − 3/4 = −2/4 = −1/2.",
        "Biểu thức thành: (−1/2) ÷ (1/2).",
        "(−1/2) × 2 = −1.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d06-p01",
      prompt: "Tính: −4 + 2/3 =",
      choices: [
        { id: "a", text: "−10/3", isCorrect: true },
        { id: "b", text: "−2/3", isDistractor: true },
        { id: "c", text: "10/3", isDistractor: true },
        { id: "d", text: "−14/3", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "−4 = −12/3; −12/3 + 2/3 = −10/3.",
      errorCode: "F2",
    },
    {
      id: "d06-p02",
      prompt: "Tính: 5/6 − (−1/3) =",
      choices: [
        { id: "a", text: "7/6", isCorrect: true },
        { id: "b", text: "1/2", isDistractor: true, errorCode: "E1" },
        { id: "c", text: "4/3", isDistractor: true },
        { id: "d", text: "6/9 = 2/3", isDistractor: true, errorCode: "F2" },
      ],
      correctAnswer: "a",
      explanation: "5/6 + 1/3 = 5/6 + 2/6 = 7/6.",
      errorCode: "E1",
    },
    {
      id: "d06-p03",
      prompt: "Tính: (−3/8) × 4 =",
      choices: [
        { id: "a", text: "−3/2", isCorrect: true },
        { id: "b", text: "3/2", isDistractor: true },
        { id: "c", text: "−12/32", isDistractor: true, note: "Chỉ nhân tử, không nhân cả mẫu!" },
        { id: "d", text: "−3/32", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(−3 × 4)/8 = −12/8 = −3/2.",
    },
    {
      id: "d06-p04",
      prompt: "Tính: 3/5 ÷ (−6) =",
      choices: [
        { id: "a", text: "−1/10", isCorrect: true },
        { id: "b", text: "−10", isDistractor: true },
        { id: "c", text: "1/10", isDistractor: true },
        { id: "d", text: "−18/5", isDistractor: true, errorCode: "F3" },
      ],
      correctAnswer: "a",
      explanation: "3/5 × (−1/6) = −3/30 = −1/10.",
      errorCode: "F3",
    },
    {
      id: "d06-p05",
      prompt: "Tính: 2 − 3 × 1/4 =",
      choices: [
        { id: "a", text: "5/4", isCorrect: true },
        { id: "b", text: "−1/4", isDistractor: true, errorCode: "E3" },
        { id: "c", text: "1/4", isDistractor: true },
        { id: "d", text: "11/4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Nhân trước: 3 × 1/4 = 3/4; sau đó 2 − 3/4 = 8/4 − 3/4 = 5/4.",
      errorCode: "E3",
    },
    {
      id: "d06-p06",
      prompt: "Tính: (1/2 − 1/3) × 6 =",
      choices: [
        { id: "a", text: "1", isCorrect: true },
        { id: "b", text: "0", isDistractor: true },
        { id: "c", text: "6/5", isDistractor: true, errorCode: "F2" },
        { id: "d", text: "2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "1/2 − 1/3 = 1/6; sau đó 1/6 × 6 = 1.",
    },
    {
      id: "d06-p07",
      prompt: "Tính: −7/10 + 2/5 − (−1/2) =",
      choices: [
        { id: "a", text: "1/5", isCorrect: true },
        { id: "b", text: "−1/5", isDistractor: true },
        { id: "c", text: "0", isDistractor: true },
        { id: "d", text: "4/5", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "MSC = 10: −7/10 + 4/10 + 5/10 = (−7 + 4 + 5)/10 = 2/10 = 1/5.",
      errorCode: "E1",
    },
    {
      id: "d06-p08",
      prompt: "Tìm x biết: x ÷ 2/3 = −9",
      choices: [
        { id: "a", text: "x = −6", isCorrect: true },
        { id: "b", text: "x = −27/2", isDistractor: true, errorCode: "F3" },
        { id: "c", text: "x = 6", isDistractor: true },
        { id: "d", text: "x = −13.5", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x = (−9) × (2/3) = −18/3 = −6.",
      errorCode: "F3",
    },
    {
      id: "d06-p09",
      prompt: "Tính: (−2)³ × (1/4) =",
      choices: [
        { id: "a", text: "−2", isCorrect: true },
        { id: "b", text: "2", isDistractor: true, errorCode: "E2" },
        { id: "c", text: "−1/2", isDistractor: true },
        { id: "d", text: "1/2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(−2)³ = −8; (−8) × 1/4 = −2.",
      errorCode: "E2",
    },
    {
      id: "d06-p10",
      prompt: "Tính: (3/4 − 1) ÷ (1/2 − 1) =",
      choices: [
        { id: "a", text: "1/2", isCorrect: true },
        { id: "b", text: "−1/2", isDistractor: true },
        { id: "c", text: "2", isDistractor: true },
        { id: "d", text: "1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Tử số: 3/4 − 1 = −1/4. Mẫu số: 1/2 − 1 = −1/2. (−1/4) ÷ (−1/2) = (−1/4) × (−2) = 2/4 = 1/2.",
    },
    {
      id: "d06-p11",
      prompt: "Tính hợp lý: 5/9 × 7/11 + 5/9 × 4/11 =",
      choices: [
        { id: "a", text: "5/9", isCorrect: true },
        { id: "b", text: "1", isDistractor: true },
        { id: "c", text: "35/99", isDistractor: true },
        { id: "d", text: "55/99", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Đặt 5/9 làm thừa số chung: 5/9 × (7/11 + 4/11) = 5/9 × 11/11 = 5/9 × 1 = 5/9.",
    },
    {
      id: "d06-p12",
      prompt: "Giá trị của biểu thức M = 1 − 1/2 + 1/2 − 1/3 + 1/3 − 1/4 là:",
      choices: [
        { id: "a", text: "3/4", isCorrect: true },
        { id: "b", text: "1/4", isDistractor: true },
        { id: "c", text: "1", isDistractor: true },
        { id: "d", text: "0", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Các cặp đối nhau triệt tiêu: (−1/2 + 1/2) = 0; (−1/3 + 1/3) = 0. Còn lại: 1 − 1/4 = 3/4.",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: So sánh hai cách tính",
    prompt:
      "Để tính biểu thức: A = 12 × (1/3 − 1/4)\nBạn Minh tính: Trong ngoặc trước, 1/3 − 1/4 = 1/12, sau đó 12 × 1/12 = 1.\nBạn Nam tính: Nhân phân phối số 12 vào: 12 × 1/3 − 12 × 1/4 = 4 − 3 = 1.\nHãy nhận xét về tính đúng đắn của hai cách làm và cho biết cách nào tính nhẩm nhanh hơn khi số trong ngoặc phức tạp.",
    type: "compare-ways",
    rubric: [
      "Khẳng định cả hai bạn đều làm ĐÚNG và cùng ra kết quả 1.",
      "Chỉ ra cơ sở toán học của bạn Minh (thứ tự ngoặc trước) và bạn Nam (tính chất phân phối của phép nhân với phép trừ).",
      "Đánh giá cách của Nam thường tính nhẩm nhanh và tránh phân số to khi số ngoài ngoặc chia hết cho các mẫu số trong ngoặc.",
    ],
    sampleSolution:
      "Cả hai bạn đều làm hoàn toàn ĐÚNG!\n- Minh tuân thủ thứ tự ưu tiên cơ bản: ngoặc trước, nhân sau.\n- Nam vận dụng tính chất phân phối: a(b − c) = ab − ac.\nCách của Nam rất thông minh và thường tính nhanh hơn trong trường hợp thừa số bên ngoài (12) chia hết cho các mẫu số trong ngoặc (3 và 4), giúp triệt tiêu mẫu ngay lập tức và đưa bài toán về các số nguyên đơn giản (4 − 3 = 1) mà không cần quy đồng mẫu số phức tạp.",
  },
  summary: {
    keyTakeaways: [
      "Cộng/trừ phân số: Bắt buộc quy đồng. Nhân/chia phân số: Tuyệt đối không quy đồng.",
      "Thứ tự phép tính: Luôn kiểm tra phép nhân/chia và ngoặc trước.",
      "Tận dụng tính chất phân phối để tính nhẩm nhanh khi thích hợp.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Khi nào nên tính trong ngoặc trước, khi nào nên nhân phân phối vào ngoặc?'",
  },
};
