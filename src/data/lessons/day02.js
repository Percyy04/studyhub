// Ngày 2: Nhân, chia số nguyên; thứ tự phép tính
export const day02 = {
  day: 2,
  topic: "Nhân, chia số nguyên; thứ tự phép tính",
  goal: "Nắm vững quy tắc dấu trong phép nhân/chia và thứ tự thực hiện phép tính",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Nhớ lại phép cộng trừ", time: "10 phút" },
    { label: "Quy tắc dấu & thứ tự", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Kế hoạch", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d02-w01",
      prompt: "Tính: (−4) + (−4) + (−4) =",
      choices: [
        { id: "a", text: "−12", isCorrect: true, note: "Chính xác! 3 số −4 cộng lại bằng −12, cũng chính là (−4) × 3." },
        { id: "b", text: "12", isDistractor: true, note: "Cộng các số âm phải ra số âm." },
        { id: "c", text: "0", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "a",
      explanation: "Phép nhân (−4) × 3 bản chất là tổng của 3 số (−4), cho kết quả −12.",
    },
    {
      id: "d02-w02",
      prompt: "Trong biểu thức 10 − 2 × 3, phép tính nào phải thực hiện trước?",
      choices: [
        { id: "a", text: "Phép nhân: 2 × 3", isCorrect: true, note: "Chính xác! Nhân chia trước, cộng trừ sau." },
        { id: "b", text: "Phép trừ: 10 − 2", isDistractor: true, errorCode: "E3", note: "Sai thứ tự! Không được tính từ trái sang phải nếu có phép nhân." },
      ],
      correctAnswer: "a",
      explanation: "Theo thứ tự ưu tiên: nhân và chia phải làm trước cộng và trừ. Do đó 2 × 3 = 6, rồi mới lấy 10 − 6 = 4.",
      errorCode: "E3",
    },
  ],
  concept: {
    title: "Quy tắc dấu nhân chia & Thứ tự ưu tiên",
    visualType: "rule-box",
    content:
      "Quy tắc dấu của phép nhân và phép chia hoàn toàn giống nhau: Cùng dấu cho kết quả DƯƠNG (+), khác dấu cho kết quả ÂM (−). Thứ tự ưu tiên quyết định sự sống còn của bài toán: Ngoặc → Nhân/Chia → Cộng/Trừ.",
    rules: [
      {
        rule: "Nhân/chia hai số cùng dấu (ra Dương)",
        math: "(+) × (+) = (+)  và  (−) × (−) = (+)",
        note: "Ví dụ: (−3) × (−4) = +12. Âm nhân âm BẮT BUỘC ra dương!",
      },
      {
        rule: "Nhân/chia hai số khác dấu (ra Âm)",
        math: "(+) × (−) = (−)  và  (−) × (+) = (−)",
        note: "Ví dụ: (−6) × 2 = −12; (−15) ÷ 3 = −5.",
      },
      {
        rule: "Thứ tự thực hiện phép tính",
        math: "Ngoặc tròn ( ) → Nhân / Chia → Cộng / Trừ",
        note: "Không bao giờ lấy phép cộng hoặc trừ làm trước phép nhân khi không có ngoặc bảo vệ!",
      },
    ],
    commonPitfall: "Nhìn thấy 2 + 3 × 4 liền tiện tay tính 2 + 3 = 5 rồi lấy 5 × 4 = 20. Sai hoàn toàn (Lỗi E3)! Đáp án đúng phải là 2 + 12 = 14.",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Nhân hai số âm và quy tắc dấu",
      problem: "Tính: P = (−5) × (−6) ÷ (−2)",
      steps: [
        {
          step: 1,
          description: "Tính từ trái sang phải. Thực hiện (−5) × (−6): Hai số cùng dấu âm nhân nhau ra DƯƠNG.",
          math: "(−5) × (−6) = 30",
        },
        {
          step: 2,
          description: "Lấy 30 chia cho (−2): Dương chia âm ra ÂM.",
          math: "30 ÷ (−2) = −15",
        },
      ],
      pitfall: "Lỗi E2: Cho rằng âm nhân âm ra âm (−30).",
      selfCheck: "Đếm số thừa số âm: Có 3 thừa số âm (số lẻ) trong tích/thương nên kết quả cuối cùng phải mang dấu âm (−).",
    },
    {
      title: "Ví dụ 2: Phối hợp ngoặc và thứ tự ưu tiên",
      problem: "Tính: Q = 25 − 3 × (4 − 9)",
      steps: [
        {
          step: 1,
          description: "Thực hiện phép tính trong ngoặc trước: 4 − 9 = −5.",
          math: "Q = 25 − 3 × (−5)",
        },
        {
          step: 2,
          description: "Thực hiện phép nhân: 3 × (−5) = −15, hoặc coi là (−3) × (−5) = +15.",
          math: "Q = 25 − (−15) = 25 + 15 = 40",
        },
      ],
      pitfall: "Lấy 25 − 3 = 22 trước rồi nhân, hoặc sai dấu khi trừ số âm.",
      selfCheck: "Ngoặc ra −5. Nhân với −3 ra +15. 25 + 15 = 40.",
    },
  ],
  guidedPractice: [
    {
      id: "d02-g01",
      prompt: "Tính: 2 + 3 × 4 =",
      choices: [
        { id: "a", text: "20", isDistractor: true, errorCode: "E3", note: "Bạn đã tính 2 + 3 = 5 trước! Phải nhân trước cộng." },
        { id: "b", text: "14", isCorrect: true, note: "Chính xác! 3 × 4 = 12, sau đó 2 + 12 = 14." },
        { id: "c", text: "24", isDistractor: true, note: "Chưa đúng." },
        { id: "d", text: "10", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "b",
      explanation: "Theo thứ tự phép tính: nhân trước, cộng sau. 2 + 3 × 4 = 2 + 12 = 14 (Ví dụ chuẩn mục 6 AGENTS.md).",
      errorCode: "E3",
      hints: [
        "Quy tắc vàng: Nhân/chia phải làm trước cộng/trừ.",
        "Hãy giữ nguyên số 2 và dấu +, tính kết quả của 3 × 4 trước.",
        "3 × 4 = 12. Bây giờ lấy 2 + 12.",
      ],
    },
    {
      id: "d02-g02",
      prompt: "Tính: (−3) × (−4) =",
      choices: [
        { id: "a", text: "−12", isDistractor: true, errorCode: "E2", note: "Lỗi E2: Bạn nghĩ có dấu trừ thì kết quả là âm. Nhưng âm nhân âm ra DƯƠNG!" },
        { id: "b", text: "12", isCorrect: true, note: "Chính xác! Hai số cùng dấu âm nhân nhau cho kết quả dương 12." },
        { id: "c", text: "−7", isDistractor: true, note: "Nhầm phép nhân thành phép cộng." },
        { id: "d", text: "7", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "b",
      explanation: "(−3) × (−4) = 12. Hai thừa số cùng dấu luôn cho tích dương (Ví dụ chuẩn mục 6 AGENTS.md).",
      errorCode: "E2",
      hints: [
        "Nhớ câu thần chú: Cùng dấu ra Dương, Khác dấu ra Âm.",
        "Ở đây (−3) và (−4) đều là số âm, tức là CÙNG DẤU.",
        "3 × 4 = 12, cùng dấu nên kết quả là +12.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d02-p01",
      prompt: "Tính: (−6) × 7 =",
      choices: [
        { id: "a", text: "42", isDistractor: true, errorCode: "E2" },
        { id: "b", text: "−42", isCorrect: true },
        { id: "c", text: "−13", isDistractor: true },
        { id: "d", text: "1", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "Khác dấu ra âm: (−6) × 7 = −42.",
      errorCode: "E2",
    },
    {
      id: "d02-p02",
      prompt: "Tính: (−48) ÷ (−6) =",
      choices: [
        { id: "a", text: "−8", isDistractor: true, errorCode: "E2" },
        { id: "b", text: "8", isCorrect: true },
        { id: "c", text: "−7", isDistractor: true },
        { id: "d", text: "7", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "Cùng dấu âm chia nhau ra dương: (−48) ÷ (−6) = 8.",
      errorCode: "E2",
    },
    {
      id: "d02-p03",
      prompt: "Tính: 18 − 8 ÷ 2 =",
      choices: [
        { id: "a", text: "5", isDistractor: true, errorCode: "E3" },
        { id: "b", text: "14", isCorrect: true },
        { id: "c", text: "−14", isDistractor: true },
        { id: "d", text: "13", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "Chia trước trừ sau: 8 ÷ 2 = 4, sau đó 18 − 4 = 14.",
      errorCode: "E3",
    },
    {
      id: "d02-p04",
      prompt: "Tính: (−2) × (−3) × (−4) =",
      choices: [
        { id: "a", text: "24", isDistractor: true, errorCode: "E2" },
        { id: "b", text: "−24", isCorrect: true },
        { id: "c", text: "−9", isDistractor: true },
        { id: "d", text: "12", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "(−2) × (−3) = 6; 6 × (−4) = −24.",
      errorCode: "E2",
    },
    {
      id: "d02-p05",
      prompt: "Tính: 6 + 4 × (−3) =",
      choices: [
        { id: "a", text: "−30", isDistractor: true, errorCode: "E3" },
        { id: "b", text: "−6", isCorrect: true },
        { id: "c", text: "6", isDistractor: true },
        { id: "d", text: "18", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "4 × (−3) = −12; sau đó 6 + (−12) = −6.",
      errorCode: "E3",
    },
    {
      id: "d02-p06",
      prompt: "Tính: (10 − 16) ÷ (−2) =",
      choices: [
        { id: "a", text: "−3", isDistractor: true, errorCode: "E2" },
        { id: "b", text: "3", isCorrect: true },
        { id: "c", text: "2", isDistractor: true },
        { id: "d", text: "−2", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "Ngoặc trước: 10 − 16 = −6; (−6) ÷ (−2) = 3.",
      errorCode: "E2",
    },
    {
      id: "d02-p07",
      prompt: "Tính: (−5) × 0 =",
      choices: [
        { id: "a", text: "0", isCorrect: true },
        { id: "b", text: "−5", isDistractor: true },
        { id: "c", text: "5", isDistractor: true },
        { id: "d", text: "Không xác định", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Bất kỳ số nào nhân với 0 cũng đều bằng 0.",
    },
    {
      id: "d02-p08",
      prompt: "Tính: (−3)² =",
      choices: [
        { id: "a", text: "−9", isDistractor: true, errorCode: "E2" },
        { id: "b", text: "9", isCorrect: true },
        { id: "c", text: "−6", isDistractor: true },
        { id: "d", text: "6", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "(−3)² = (−3) × (−3) = 9 (Lũy thừa bậc chẵn của số âm luôn ra số dương).",
      errorCode: "E2",
    },
    {
      id: "d02-p09",
      prompt: "Tính: 30 − 2 × (5 − 8) =",
      choices: [
        { id: "a", text: "36", isCorrect: true },
        { id: "b", text: "24", isDistractor: true, errorCode: "E1" },
        { id: "c", text: "−84", isDistractor: true, errorCode: "E3" },
        { id: "d", text: "84", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "5 − 8 = −3; 2 × (−3) = −6; 30 − (−6) = 30 + 6 = 36.",
      errorCode: "E3",
    },
    {
      id: "d02-p10",
      prompt: "Tìm x biết: 3x + 15 = 0",
      choices: [
        { id: "a", text: "x = 5", isDistractor: true, errorCode: "E2" },
        { id: "b", text: "x = −5", isCorrect: true },
        { id: "c", text: "x = −15", isDistractor: true },
        { id: "d", text: "x = 3", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "3x = −15 ⇒ x = (−15) ÷ 3 = −5.",
      errorCode: "E2",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Phân biệt (−3)² và −3²",
    prompt:
      "Bạn Bình bấm máy tính ra: (−3)² = 9 nhưng −3² = −9. Bình rất hoang mang và cho rằng máy tính bị lỗi. Em hãy giải thích vì sao hai cách viết này lại ra hai kết quả khác nhau.",
    type: "why",
    rubric: [
      "Giải thích được dấu ngoặc bao phủ cả dấu âm: (−3)² là (−3) nhân (−3) = 9.",
      "Chỉ ra được −3² nghĩa là −(3²): số mũ 2 chỉ áp dụng cho số 3, dấu trừ đứng ngoài, nên −(9) = −9.",
      "Kết luận máy tính tính đúng theo thứ tự ưu tiên của toán học.",
    ],
    sampleSolution:
      "Máy tính hoàn toàn chính xác! Trong (−3)², số mũ 2 áp dụng cho toàn bộ phần trong ngoặc, tức là (−3) × (−3) = 9 (âm × âm = dương). Còn ở −3², theo thứ tự ưu tiên thì lũy thừa làm trước phép lấy số đối, tức là −(3²) = −(3 × 3) = −9.",
  },
  summary: {
    keyTakeaways: [
      "Nhân/chia: Cùng dấu ra DƯƠNG (+), khác dấu ra ÂM (−).",
      "Thứ tự phép tính: Ngoặc → Lũy thừa → Nhân/Chia → Cộng/Trừ.",
      "Chú ý: (−a)² = a² (dương), nhưng −a² = −(a²) (âm).",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Tại sao phép nhân hai số âm lại cho kết quả là một số dương?'",
  },
};
