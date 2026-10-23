// Ngày 4: Quy đồng, cộng và trừ phân số
export const day04 = {
  day: 4,
  topic: "Quy đồng, cộng và trừ phân số",
  goal: "Tìm mẫu chung nhỏ nhất, quy đồng đúng và thực hiện phép cộng trừ phân số chính xác dấu",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Ôn rút gọn & số đối", time: "10 phút" },
    { label: "Bản chất quy đồng mẫu", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Kế hoạch", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d04-w01",
      prompt: "Bội chung nhỏ nhất (BCNN) của 4 và 6 là số nào?",
      choices: [
        { id: "a", text: "12", isCorrect: true, note: "Chính xác! 12 là số dương nhỏ nhất cùng chia hết cho cả 4 và 6." },
        { id: "b", text: "24", isDistractor: true, note: "24 là bội chung nhưng chưa phải nhỏ nhất (12 nhỏ hơn)." },
        { id: "c", text: "6", isDistractor: true, note: "6 không chia hết cho 4." },
      ],
      correctAnswer: "a",
      explanation: "4 = 2²; 6 = 2 × 3 ⇒ BCNN(4, 6) = 2² × 3 = 12.",
    },
    {
      id: "d04-w02",
      prompt: "Khi cộng hai phân số cùng mẫu số: 2/7 + 3/7 =",
      choices: [
        { id: "a", text: "5/7", isCorrect: true, note: "Chính xác! Giữ nguyên mẫu số 7, cộng hai tử số: 2 + 3 = 5." },
        { id: "b", text: "5/14", isDistractor: true, errorCode: "F2", note: "Lỗi F2: Không được cộng mẫu số với mẫu số!" },
      ],
      correctAnswer: "a",
      explanation: "Muốn cộng hai phân số cùng mẫu: giữ nguyên mẫu, cộng các tử số với nhau.",
      errorCode: "F2",
    },
  ],
  concept: {
    title: "Bản chất: Quy về cùng kích thước miếng bánh",
    visualType: "fraction-addition",
    content:
      "Bạn không thể cộng 1/2 cái bánh (miếng to) với 1/3 cái bánh (miếng vừa) bằng cách lấy 1+1 và 2+3 ra 2/5 được. Muốn cộng được, ta phải cắt nhỏ cả hai cái bánh thành các miếng bằng nhau (mẫu số chung là 6 miếng): 1/2 = 3/6, 1/3 = 2/6. Khi đó 3 miếng + 2 miếng = 5 miếng (5/6 cái bánh).",
    rules: [
      {
        rule: "Quy đồng mẫu số",
        math: "Tìm BCNN làm mẫu số chung (MSC)",
        note: "Nhân cả tử và mẫu của từng phân số với thừa số phụ tương ứng.",
      },
      {
        rule: "Cộng / trừ phân số",
        math: "a/m + b/m = (a + b)/m  và  a/m − b/m = (a − b)/m",
        note: "Chỉ cộng trừ tử số, GIỮ NGUYÊN MẪU SỐ CHUNG.",
      },
      {
        rule: "Tuyệt đối cấm",
        math: "a/b + c/d ≠ (a + c)/(b + d)",
        note: "Đây là lỗi sai F2 phổ biến nhất. Không bao giờ cộng tử với tử, mẫu với mẫu!",
      },
    ],
    commonPitfall: "Lỗi F2: Viết 1/2 + 1/3 = 2/5. Nhìn thấy 1/2 đã là nửa cái bánh (50%), làm sao cộng thêm 1/3 mà lại teo nhỏ lại thành 2/5 (40%) được!",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Cộng hai phân số khác mẫu",
      problem: "Tính: S = 1/2 + 1/3",
      steps: [
        {
          step: 1,
          description: "Tìm mẫu số chung nhỏ nhất của 2 và 3: MSC = 6.",
          math: "BCNN(2, 3) = 6",
        },
        {
          step: 2,
          description: "Quy đồng từng phân số: nhân 1/2 với 3, nhân 1/3 với 2.",
          math: "1/2 = 3/6  và  1/3 = 2/6",
        },
        {
          step: 3,
          description: "Giữ nguyên mẫu số chung 6, cộng hai tử số.",
          math: "S = 3/6 + 2/6 = (3 + 2)/6 = 5/6",
        },
      ],
      pitfall: "Lỗi F2: 1/2 + 1/3 = (1+1)/(2+3) = 2/5.",
      selfCheck: "1/2 = 0.5; 1/3 ≈ 0.333; tổng ≈ 0.833 = 5/6.",
    },
    {
      title: "Ví dụ 2: Trừ phân số có số âm",
      problem: "Tính: T = −3/4 − 1/6",
      steps: [
        {
          step: 1,
          description: "Mẫu số chung của 4 và 6 là 12 (vì 12 chia hết cho cả 4 và 6). Thừa số phụ: 12÷4 = 3; 12÷6 = 2.",
          math: "MSC = 12",
        },
        {
          step: 2,
          description: "Quy đồng: (−3) × 3 / 12 = −9/12; 1 × 2 / 12 = 2/12.",
          math: "T = −9/12 − 2/12",
        },
        {
          step: 3,
          description: "Giữ nguyên mẫu số 12, trừ các tử số: −9 − 2 = −11.",
          math: "T = (−9 − 2)/12 = −11/12",
        },
      ],
      pitfall: "Tính sai dấu ở tử số: lấy −9 − 2 ra −7 (lỗi dấu số nguyên E1).",
      selfCheck: "Nợ 9 phần rồi trừ tiếp 2 phần là nợ 11 phần: −11/12.",
    },
  ],
  guidedPractice: [
    {
      id: "d04-g01",
      prompt: "Tính: 1/2 + 1/3 =",
      choices: [
        { id: "a", text: "2/5", isDistractor: true, errorCode: "F2", note: "Lỗi F2 kinh điển: Bạn đã cộng tử với tử, mẫu với mẫu! Phải quy đồng mẫu chung trước." },
        { id: "b", text: "5/6", isCorrect: true, note: "Chính xác! 3/6 + 2/6 = 5/6 (Ví dụ chuẩn mục 6 AGENTS.md)." },
        { id: "c", text: "1/6", isDistractor: true, note: "Đây là phép trừ 1/2 − 1/3." },
        { id: "d", text: "5/5 = 1", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "b",
      explanation: "1/2 + 1/3 = 3/6 + 2/6 = 5/6. Mẫu chung là 6.",
      errorCode: "F2",
      hints: [
        "Mẫu số 2 và 3 có mẫu số chung nhỏ nhất là bao nhiêu?",
        "Mẫu chung là 6. Hãy đổi: 1/2 = ?/6 và 1/3 = ?/6.",
        "1/2 = 3/6; 1/3 = 2/6. Bây giờ lấy (3 + 2)/6 = 5/6.",
      ],
    },
    {
      id: "d04-g02",
      prompt: "Tính: 3/4 − 5/6 =",
      choices: [
        { id: "a", text: "−1/12", isCorrect: true, note: "Chính xác! MSC = 12. 9/12 − 10/12 = −1/12." },
        { id: "b", text: "1/12", isDistractor: true, note: "Nhầm dấu: 9 − 10 phải ra số âm −1." },
        { id: "c", text: "−2/2 = −1", isDistractor: true, errorCode: "F2", note: "Lỗi F2: Lấy tử trừ tử, mẫu trừ mẫu." },
        { id: "d", text: "−1/2", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "a",
      explanation: "MSC là 12: 3/4 = 9/12; 5/6 = 10/12. 9/12 − 10/12 = −1/12.",
      errorCode: "F2",
      hints: [
        "Mẫu chung của 4 và 6 là 12.",
        "Quy đồng: 3/4 = 9/12 và 5/6 = 10/12.",
        "Tính: (9 − 10)/12 = −1/12.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d04-p01",
      prompt: "Tính: 1/4 + 2/3 =",
      choices: [
        { id: "a", text: "3/7", isDistractor: true, errorCode: "F2" },
        { id: "b", text: "11/12", isCorrect: true },
        { id: "c", text: "11/7", isDistractor: true },
        { id: "d", text: "7/12", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "MSC = 12: 3/12 + 8/12 = 11/12.",
      errorCode: "F2",
    },
    {
      id: "d04-p02",
      prompt: "Tính: 5/6 − 1/2 =",
      choices: [
        { id: "a", text: "1/3", isCorrect: true },
        { id: "b", text: "4/4 = 1", isDistractor: true, errorCode: "F2" },
        { id: "c", text: "2/6", isDistractor: true, note: "Chưa rút gọn tối giản." },
        { id: "d", text: "4/6", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "5/6 − 3/6 = 2/6 = 1/3.",
      errorCode: "F2",
    },
    {
      id: "d04-p03",
      prompt: "Tính: −2/5 + 1/5 =",
      choices: [
        { id: "a", text: "−1/5", isCorrect: true },
        { id: "b", text: "−3/5", isDistractor: true },
        { id: "c", text: "1/5", isDistractor: true },
        { id: "d", text: "−1/10", isDistractor: true, errorCode: "F2" },
      ],
      correctAnswer: "a",
      explanation: "Cùng mẫu số 5: (−2 + 1)/5 = −1/5.",
    },
    {
      id: "d04-p04",
      prompt: "Tính: 2 − 3/4 =",
      choices: [
        { id: "a", text: "5/4", isCorrect: true },
        { id: "b", text: "−1/4", isDistractor: true },
        { id: "c", text: "1/4", isDistractor: true },
        { id: "d", text: "5/2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2 = 8/4; 8/4 − 3/4 = 5/4.",
    },
    {
      id: "d04-p05",
      prompt: "Tính: −1/3 − 1/4 =",
      choices: [
        { id: "a", text: "−7/12", isCorrect: true },
        { id: "b", text: "−1/12", isDistractor: true },
        { id: "c", text: "7/12", isDistractor: true },
        { id: "d", text: "−2/7", isDistractor: true, errorCode: "F2" },
      ],
      correctAnswer: "a",
      explanation: "MSC = 12: −4/12 − 3/12 = (−4 − 3)/12 = −7/12.",
      errorCode: "F2",
    },
    {
      id: "d04-p06",
      prompt: "Tính: 3/8 + (−5/8) =",
      choices: [
        { id: "a", text: "−1/4", isCorrect: true },
        { id: "b", text: "−2/8", isDistractor: true, note: "Chưa rút gọn tối giản." },
        { id: "c", text: "1/4", isDistractor: true },
        { id: "d", text: "−1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "(3 − 5)/8 = −2/8 = −1/4.",
    },
    {
      id: "d04-p07",
      prompt: "Tìm x biết: x − 1/3 = 1/2",
      choices: [
        { id: "a", text: "x = 5/6", isCorrect: true },
        { id: "b", text: "x = 1/6", isDistractor: true },
        { id: "c", text: "x = 2/5", isDistractor: true, errorCode: "F2" },
        { id: "d", text: "x = −1/6", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x = 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
      errorCode: "F2",
    },
    {
      id: "d04-p08",
      prompt: "Tính: 7/15 − 2/5 =",
      choices: [
        { id: "a", text: "1/15", isCorrect: true },
        { id: "b", text: "5/10 = 1/2", isDistractor: true, errorCode: "F2" },
        { id: "c", text: "3/15", isDistractor: true },
        { id: "d", text: "1/5", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "MSC = 15: 7/15 − 6/15 = 1/15.",
      errorCode: "F2",
    },
    {
      id: "d04-p09",
      prompt: "Tính: 1/6 + 1/12 + 1/4 =",
      choices: [
        { id: "a", text: "1/2", isCorrect: true },
        { id: "b", text: "6/12", isDistractor: true, note: "Chưa rút gọn." },
        { id: "c", text: "3/22", isDistractor: true, errorCode: "F2" },
        { id: "d", text: "3/12", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "MSC = 12: 2/12 + 1/12 + 3/12 = 6/12 = 1/2.",
    },
    {
      id: "d04-p10",
      prompt: "Giá trị của biểu thức A = (1/3 − 1/2) + (1/2 − 1/4) là:",
      choices: [
        { id: "a", text: "1/12", isCorrect: true },
        { id: "b", text: "−1/12", isDistractor: true },
        { id: "c", text: "1/6", isDistractor: true },
        { id: "d", text: "5/12", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Bỏ ngoặc gộp lại: 1/3 + (−1/2 + 1/2) − 1/4 = 1/3 − 1/4 = 4/12 − 3/12 = 1/12.",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: So sánh 1/2 + 1/3 với 2/5 bằng thực tế",
    prompt:
      "Một bạn học sinh khẳng định: '1/2 + 1/3 = (1+1)/(2+3) = 2/5 vì cộng tử với tử, mẫu với mẫu là rất tự nhiên'. Không cần dùng bút tính toán quy đồng, em hãy dùng lập luận thực tế để thuyết phục bạn rằng 2/5 chắc chắn là một đáp số vô lý.",
    type: "why",
    rubric: [
      "So sánh số 1/2 với 2/5: chỉ ra rằng 1/2 = 50% hoặc 0.5.",
      "Chỉ ra 2/5 chỉ bằng 40% hoặc 0.4.",
      "Lập luận logic: Khi ta có 1/2 cái bánh và cộng thêm một phần bánh dương (1/3), tổng lượng bánh nhận được phải LỚN HƠN 1/2 cái ban đầu. Nhưng 2/5 lại NHỎ HƠN 1/2, điều này hoàn toàn mâu thuẫn.",
    ],
    sampleSolution:
      "Lập luận đơn giản: 1/2 chiếc bánh tức là 50% chiếc bánh. Nếu ta cộng thêm 1/3 chiếc bánh nữa, tổng số bánh chắc chắn phải nhiều hơn 1/2 cái bánh (lớn hơn 50%). Thế nhưng 2/5 chiếc bánh chỉ là 40% chiếc bánh, tức là ít hơn cả 1/2 cái ban đầu! Không thể có chuyện cộng thêm bánh mà tổng bánh lại bị teo nhỏ đi. Do đó cách tính lấy tử cộng tử, mẫu cộng mẫu là hoàn toàn sai lầm.",
  },
  summary: {
    keyTakeaways: [
      "Khác mẫu BẮT BUỘC phải quy đồng mẫu số chung trước.",
      "Cộng/trừ phân số: chỉ cộng/trừ tử số, giữ nguyên mẫu số chung.",
      "Tuyệt đối không lấy tử cộng tử, mẫu cộng mẫu (Lỗi F2).",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Vì sao không được cộng mẫu số với mẫu số khi cộng hai phân số?'",
  },
};
