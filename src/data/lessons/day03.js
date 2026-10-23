// Ngày 3: Phân số bằng nhau, rút gọn
export const day03 = {
  day: 3,
  topic: "Phân số bằng nhau, rút gọn",
  goal: "Hiểu bản chất phân số bằng nhau, tìm ước chung và rút gọn về phân số tối giản",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Ôn phép chia số nguyên", time: "10 phút" },
    { label: "Bản chất phân số bằng nhau", time: "15 phút" },
    { label: "Luyện rút gọn có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d03-w01",
      prompt: "Ước chung lớn nhất (ƯCLN) của 12 và 18 là số nào?",
      choices: [
        { id: "a", text: "6", isCorrect: true, note: "Chính xác! 12 và 18 cùng chia hết cho 1, 2, 3, 6; lớn nhất là 6." },
        { id: "b", text: "3", isDistractor: true, note: "3 là ước chung nhưng chưa phải lớn nhất (vẫn chia được cho 6)." },
        { id: "c", text: "2", isDistractor: true, note: "2 là ước chung nhưng chưa phải lớn nhất." },
      ],
      correctAnswer: "a",
      explanation: "12 = 6 × 2; 18 = 6 × 3. Vậy ƯCLN(12, 18) = 6.",
    },
    {
      id: "d03-w02",
      prompt: "Nếu ta nhân cả tử và mẫu của phân số 2/5 với 3 thì được phân số nào?",
      choices: [
        { id: "a", text: "6/15", isCorrect: true, note: "Chính xác! (2 × 3) / (5 × 3) = 6/15." },
        { id: "b", text: "6/5", isDistractor: true, note: "Bạn chỉ nhân tử số mà quên nhân mẫu số." },
        { id: "c", text: "2/15", isDistractor: true, note: "Bạn chỉ nhân mẫu số mà quên nhân tử số." },
      ],
      correctAnswer: "a",
      explanation: "Khi nhân cả tử và mẫu với cùng một số khác 0, giá trị của phân số không thay đổi: 2/5 = 6/15.",
    },
  ],
  concept: {
    title: "Bản chất: Chia bánh và Phân số tối giản",
    visualType: "fraction-model",
    content:
      "Một chiếc bánh chia làm 9 phần lấy 6 phần cũng chính là chiếc bánh chia làm 3 phần lấy 2 phần. Rút gọn phân số không làm thay đổi giá trị của nó, mà chỉ làm cho các con số trở nên đơn giản và dễ hiểu nhất.",
    rules: [
      {
        rule: "Tính chất cơ bản của phân số",
        math: "a/b = (a ÷ m) / (b ÷ m) với m ∈ ƯC(a, b)",
        note: "Bắt buộc phải chia CẢ TỬ VÀ MẪU cho CÙNG MỘT SỐ m khác 0.",
      },
      {
        rule: "Phân số tối giản",
        math: "ƯCLN(|tử|, |mẫu|) = 1",
        note: "Khi tử và mẫu không còn ước chung nào khác ngoài 1 và −1 thì phân số đã tối giản.",
      },
      {
        rule: "Xử lý dấu âm trong phân số",
        math: "(−a)/b = a/(−b) = −(a/b)",
        note: "Quy ước chuẩn: luôn đưa dấu âm lên trên tử số hoặc đặt trước phân số.",
      },
    ],
    commonPitfall: "Lỗi F1: Rút gọn tùy tiện không chia cùng một số (ví dụ: lấy 6/9 viết thành 3/6 vì trừ bớt 3 ở cả tử và mẫu). Nhớ: Rút gọn là phép CHIA, tuyệt đối không phải phép TRỪ!",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Rút gọn phân số chuẩn",
      problem: "Rút gọn phân số 6/9 về dạng tối giản",
      steps: [
        {
          step: 1,
          description: "Tìm ước chung lớn nhất của tử số (6) và mẫu số (9).",
          math: "ƯCLN(6, 9) = 3",
        },
        {
          step: 2,
          description: "Chia đồng thời cả tử số và mẫu số cho 3.",
          math: "6/9 = (6 ÷ 3) / (9 ÷ 3) = 2/3",
        },
      ],
      pitfall: "Lỗi F1: Viết 6/9 = 3/6 hoặc lấy tử trừ mẫu.",
      selfCheck: "Kiểm tra nhân chéo: 6 × 3 = 18 và 9 × 2 = 18. Tích chéo bằng nhau chứng minh 6/9 = 2/3.",
    },
    {
      title: "Ví dụ 2: Rút gọn phân số có dấu âm",
      problem: "Rút gọn phân số: (−24) / 36",
      steps: [
        {
          step: 1,
          description: "Tìm ước chung lớn nhất của 24 và 36: ƯCLN(24, 36) = 12.",
          math: "24 = 12 × 2; 36 = 12 × 3",
        },
        {
          step: 2,
          description: "Chia cả tử và mẫu cho 12, giữ nguyên dấu âm ở tử số.",
          math: "(−24) / 36 = (−24 ÷ 12) / (36 ÷ 12) = −2/3",
        },
      ],
      pitfall: "Làm mất dấu âm khi chia.",
      selfCheck: "(−2) × 36 = −72; 3 × (−24) = −72.",
    },
  ],
  guidedPractice: [
    {
      id: "d03-g01",
      prompt: "Rút gọn phân số 6/9 về tối giản ta được:",
      choices: [
        { id: "a", text: "3/6", isDistractor: true, errorCode: "F1", note: "Lỗi F1: Bạn đã lấy 6 − 3 và 9 − 3. Rút gọn phải là phép CHIA cả tử và mẫu cho cùng một ước chung!" },
        { id: "b", text: "2/3", isCorrect: true, note: "Chính xác! Chia cả tử và mẫu cho 3 được 2/3 (Ví dụ chuẩn mục 6 AGENTS.md)." },
        { id: "c", text: "1/3", isDistractor: true, note: "Chưa đúng." },
        { id: "d", text: "3/2", isDistractor: true, note: "Bạn đã bị đảo ngược tử và mẫu." },
      ],
      correctAnswer: "b",
      explanation: "6/9 = (6 ÷ 3)/(9 ÷ 3) = 2/3. Chia cả tử và mẫu cho ước chung 3.",
      errorCode: "F1",
      hints: [
        "6 và 9 cùng chia hết cho số nào lớn hơn 1?",
        "Cả 6 và 9 đều chia hết cho 3.",
        "Lấy 6 ÷ 3 = 2, và 9 ÷ 3 = 3. Phân số là 2/3.",
      ],
    },
    {
      id: "d03-g02",
      prompt: "Phân số nào dưới đây bằng phân số −3/4?",
      choices: [
        { id: "a", text: "−9/12", isCorrect: true, note: "Chính xác! Nhân cả tử và mẫu với 3: (−3×3)/(4×3) = −9/12." },
        { id: "b", text: "9/12", isDistractor: true, note: "Sai dấu! Số ban đầu là âm, phân số này là dương." },
        { id: "c", text: "−6/7", isDistractor: true, note: "Bạn đã cộng 3 vào mẫu số thay vì nhân." },
        { id: "d", text: "3/(−4)", isDistractor: true, note: "Cũng bằng −3/4 nhưng hãy tìm phân số mở rộng −9/12." },
      ],
      correctAnswer: "a",
      explanation: "Nhân cả tử và mẫu với 3: (−3) × 3 / (4 × 3) = −9/12.",
      errorCode: "F1",
      hints: [
        "Kiểm tra tính chất nhân cả tử và mẫu với cùng một số.",
        "Nếu nhân tử với 3: (−3) × 3 = −9.",
        "Thì mẫu cũng phải nhân với 3: 4 × 3 = 12. Vậy ta được −9/12.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d03-p01",
      prompt: "Rút gọn phân số 15/25 về tối giản:",
      choices: [
        { id: "a", text: "3/5", isCorrect: true },
        { id: "b", text: "1/5", isDistractor: true },
        { id: "c", text: "5/3", isDistractor: true },
        { id: "d", text: "3/10", isDistractor: true, errorCode: "F1" },
      ],
      correctAnswer: "a",
      explanation: "Chia cả tử và mẫu cho 5: 15/25 = 3/5.",
      errorCode: "F1",
    },
    {
      id: "d03-p02",
      prompt: "Rút gọn phân số 18/24 về tối giản:",
      choices: [
        { id: "a", text: "9/12", isDistractor: true, note: "Chưa tối giản hoàn toàn (vẫn còn chia hết cho 3)." },
        { id: "b", text: "3/4", isCorrect: true },
        { id: "c", text: "2/3", isDistractor: true },
        { id: "d", text: "6/8", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "Chia cả tử và mẫu cho 6: 18/24 = 3/4.",
      errorCode: "F1",
    },
    {
      id: "d03-p03",
      prompt: "Rút gọn phân số (−14)/21 về tối giản:",
      choices: [
        { id: "a", text: "−2/3", isCorrect: true },
        { id: "b", text: "2/3", isDistractor: true },
        { id: "c", text: "−7/10", isDistractor: true, errorCode: "F1" },
        { id: "d", text: "−2/7", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Chia cả tử và mẫu cho 7: (−14) ÷ 7 = −2; 21 ÷ 7 = 3. Kết quả là −2/3.",
      errorCode: "F1",
    },
    {
      id: "d03-p04",
      prompt: "Tìm số nguyên x biết: x/15 = 2/5",
      choices: [
        { id: "a", text: "x = 6", isCorrect: true },
        { id: "b", text: "x = 10", isDistractor: true },
        { id: "c", text: "x = 4", isDistractor: true },
        { id: "d", text: "x = 3", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Mẫu số từ 5 lên 15 là nhân 3, vậy tử số x = 2 × 3 = 6.",
    },
    {
      id: "d03-p05",
      prompt: "Phân số nào sau đây ĐÃ LÀ phân số tối giản?",
      choices: [
        { id: "a", text: "7/21", isDistractor: true },
        { id: "b", text: "8/15", isCorrect: true },
        { id: "c", text: "9/27", isDistractor: true },
        { id: "d", text: "14/22", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "8 và 15 có ƯCLN là 1 (không có ước chung nào khác 1) nên 8/15 đã tối giản.",
    },
    {
      id: "d03-p06",
      prompt: "Rút gọn phân số: (−20)/(−35) =",
      choices: [
        { id: "a", text: "4/7", isCorrect: true },
        { id: "b", text: "−4/7", isDistractor: true },
        { id: "c", text: "2/3", isDistractor: true },
        { id: "d", text: "−2/3", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Âm chia âm ra dương: (−20)/(−35) = 20/35 = 4/7.",
      errorCode: "E2",
    },
    {
      id: "d03-p07",
      prompt: "Rút gọn biểu thức có nhân tử chung: (3 × 5)/(3 × 7) =",
      choices: [
        { id: "a", text: "5/7", isCorrect: true },
        { id: "b", text: "15/7", isDistractor: true },
        { id: "c", text: "5/21", isDistractor: true },
        { id: "d", text: "1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Triệt tiêu thừa số 3 ở cả tử và mẫu, còn lại 5/7.",
    },
    {
      id: "d03-p08",
      prompt: "Tìm phân số bằng với phân số 4/−7 và có mẫu dương:",
      choices: [
        { id: "a", text: "−4/7", isCorrect: true },
        { id: "b", text: "4/7", isDistractor: true },
        { id: "c", text: "−7/4", isDistractor: true },
        { id: "d", text: "7/4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Đưa dấu âm lên tử: 4/(−7) = −4/7.",
    },
    {
      id: "d03-p09",
      prompt: "Rút gọn phân số 100/250 về tối giản:",
      choices: [
        { id: "a", text: "2/5", isCorrect: true },
        { id: "b", text: "1/2", isDistractor: true },
        { id: "c", text: "4/10", isDistractor: true },
        { id: "d", text: "5/2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Chia cả tử và mẫu cho 50: 100/250 = 2/5.",
      errorCode: "F1",
    },
    {
      id: "d03-p10",
      prompt: "Phân số bằng với 3/4 và có tổng của tử và mẫu bằng 28 là:",
      choices: [
        { id: "a", text: "12/16", isCorrect: true },
        { id: "b", text: "9/19", isDistractor: true },
        { id: "c", text: "15/13", isDistractor: true },
        { id: "d", text: "6/22", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Tổng số phần là 3 + 4 = 7 phần. Mỗi phần là 28 ÷ 7 = 4. Tử là 3 × 4 = 12, mẫu là 4 × 4 = 16. Phân số là 12/16.",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Rút gọn biểu thức chứa phép cộng",
    prompt:
      "Bạn Lan rút gọn biểu thức sau: (2 + 4)/(2 + 6).\nLan gạch bỏ số 2 ở cả tử và mẫu: (2 + 4)/(2 + 6) = 4/6 = 2/3.\nKết quả tình cờ đúng (vì 6/8 = 3/4, à không, 6/8 = 3/4 khác 2/3!). Lan làm đúng hay sai? Vì sao không được 'gạch bỏ' số hạng trong phép cộng?",
    type: "why",
    rubric: [
      "Khẳng định rõ ràng: Lan làm hoàn toàn SAI.",
      "Chỉ ra phép tính đúng: (2 + 4)/(2 + 6) = 6/8 = 3/4.",
      "Giải thích nguyên lý: Chỉ được triệt tiêu THỪA SỐ CHUNG trong phép nhân, tuyệt đối không được triệt tiêu SỐ HẠNG trong phép cộng.",
    ],
    sampleSolution:
      "Lan làm SAI hoàn toàn về mặt bản chất toán học! Phép tính đúng là: (2 + 4)/(2 + 6) = 6/8 = 3/4. Tính chất rút gọn phân số là chia CẢ TỬ VÀ MẪU cho cùng một số (tức là triệt tiêu thừa số chung của tích). Trong phép cộng, số 2 chỉ là một số hạng, không phải thừa số chung của cả tử số, nên không được gạch bỏ.",
  },
  summary: {
    keyTakeaways: [
      "Rút gọn phân số là chia CẢ TỬ VÀ MẪU cho cùng một ước chung.",
      "Tuyệt đối không trừ bớt hay gạch bỏ số hạng trong phép cộng.",
      "Phân số tối giản là khi tử và mẫu không còn ước chung nào lớn hơn 1.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Tại sao khi nhân hay chia cả tử và mẫu cho cùng một số thì phân số mới vẫn bằng phân số cũ?'",
  },
};
