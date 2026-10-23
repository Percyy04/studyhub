// Ngày 11: Phương trình có ngoặc
export const day11 = {
  day: 11,
  topic: "Phương trình có ngoặc",
  goal: "Thực hiện phép toán tương đương ở cả hai vế (cân bằng), bỏ ngoặc, thu gọn, tìm x và thử lại",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Ôn thu gọn biểu thức", time: "10 phút" },
    { label: "Mô hình cán cân thăng bằng", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d11-w01",
      prompt: "Một cán cân đang thăng bằng. Nếu ta thêm 5kg vào đĩa cân bên trái, muốn giữ cân thăng bằng ta phải làm gì?",
      choices: [
        { id: "a", text: "Thêm đúng 5kg vào đĩa cân bên phải", isCorrect: true, note: "Chính xác! Thao tác như nhau ở cả hai đĩa thì cân tiếp tục thăng bằng." },
        { id: "b", text: "Bớt 5kg ở đĩa bên phải", isDistractor: true, note: "Như vậy cân sẽ bị nghiêng lệch gấp đôi!" },
        { id: "c", text: "Không cần làm gì", isDistractor: true, note: "Cân sẽ bị lệch ngay." },
      ],
      correctAnswer: "a",
      explanation: "Phương trình là cán cân thăng bằng: Bất cứ phép tính nào thực hiện ở vế trái thì BẮT BUỘC phải làm tương tự ở vế phải.",
    },
    {
      id: "d11-w02",
      prompt: "Để tìm x trong x + 7 = 12, cách làm chuẩn là:",
      choices: [
        { id: "a", text: "Trừ 7 ở CẢ HAI VẾ: x + 7 − 7 = 12 − 7 ⇒ x = 5", isCorrect: true, note: "Chính xác! Đây là bản chất giúp hai vế luôn giữ nguyên sự bằng nhau." },
        { id: "b", text: "Lấy 12 + 7 = 19", isDistractor: true, errorCode: "X1", note: "Lỗi X1: Chuyển vế nhưng không đổi dấu!" },
      ],
      correctAnswer: "a",
      explanation: "x + 7 − 7 = 12 − 7 ⇒ x = 5. Trừ cùng một số 7 ở hai vế.",
      errorCode: "X1",
    },
  ],
  concept: {
    title: "Bản chất: Cán cân thăng bằng hai vế",
    visualType: "balance-scale",
    content:
      "Quy tắc dân gian thường dạy học sinh học vẹt 'chuyển vế đổi dấu', dẫn tới học sinh rất hay quên đổi dấu (Lỗi X1). Bản chất toán học đích thực là: PHÉP BIẾN ĐỔI TƯƠNG ĐƯƠNG GIỮ CÂN BẰNG. Muốn triệt tiêu một hạng tử ở vế này, hãy thực hiện phép toán ngược lại ở CẢ HAI VẾ.",
    rules: [
      {
        rule: "1. Thêm/bớt cùng một số ở cả hai vế",
        math: "A = B ⇔ A + c = B + c  và  A − c = B − c",
        note: "Muốn mất +5 ở vế trái, trừ 5 ở cả hai vế. Đó là lý do vì sao +5 chuyển sang vế kia thành −5.",
      },
      {
        rule: "2. Nhân/chia cùng một số khác 0 ở cả hai vế",
        math: "A = B ⇔ A × k = B × k  và  A ÷ k = B ÷ k (k ≠ 0)",
        note: "Muốn tìm x khi có 3x = 12, ta chia cả hai vế cho 3: 3x ÷ 3 = 12 ÷ 3 ⇒ x = 4.",
      },
      {
        rule: "Quy trình 4 bước giải phương trình",
        math: "Bỏ ngoặc → Thu gọn 2 vế → Dồn biến x về 1 vế → Tìm x & Thử lại",
        note: "Sau khi tìm ra x, luôn thay ngược lại vào đề bài ban đầu để tự kiểm tra.",
      },
    ],
    commonPitfall: "Lỗi X1: Chuyển vế mà quên đổi dấu (ví dụ: x + 4 = 10 biến thành x = 10 + 4 = 14 thay vì 10 − 4 = 6).",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Phương trình có một ngoặc",
      problem: "Giải phương trình: 2(x − 3) = 10",
      steps: [
        { step: 1, description: "Phân phối 2 vào ngoặc ở vế trái: 2 × x − 2 × 3 = 2x − 6.", math: "2x − 6 = 10" },
        { step: 2, description: "Muốn triệt tiêu −6 ở vế trái, ta CỘNG 6 vào cả hai vế.", math: "2x − 6 + 6 = 10 + 6 ⇒ 2x = 16" },
        { step: 3, description: "Chia cả hai vế cho 2 để tìm x.", math: "x = 16 ÷ 2 = 8" },
      ],
      pitfall: "Lỗi A1: Phân phối thiếu 2x − 3 = 10, hoặc lỗi X1: 2x = 10 − 6.",
      selfCheck: "Thử lại: Vế trái với x = 8 là 2(8 − 3) = 2 × 5 = 10 = Vế phải. Phương trình đúng!",
    },
    {
      title: "Ví dụ 2: Phương trình có ngoặc ở cả hai vế",
      problem: "Giải phương trình: 3(x + 1) = 5(x − 1) + 2",
      steps: [
        { step: 1, description: "Bỏ ngoặc ở cả hai vế bằng phép phân phối.", math: "3x + 3 = 5x − 5 + 2" },
        { step: 2, description: "Thu gọn vế phải: −5 + 2 = −3.", math: "3x + 3 = 5x − 3" },
        { step: 3, description: "Dồn biến x sang một vế (trừ 3x ở cả hai vế) và dồn số sang vế kia (cộng 3 ở cả hai vế).", math: "3 + 3 = 5x − 3x ⇒ 6 = 2x" },
        { step: 4, description: "Chia cả hai vế cho 2.", math: "x = 3" },
      ],
      pitfall: "Nhầm dấu khi chuyển hạng tử giữa hai vế.",
      selfCheck: "Thử x = 3: Vế trái 3(3+1)=12. Vế phải 5(3−1)+2 = 10+2=12. Khớp 100%!",
    },
  ],
  guidedPractice: [
    {
      id: "d11-g01",
      prompt: "Tìm x biết: 3(x + 2) = 15",
      choices: [
        { id: "a", text: "x = 3", isCorrect: true, note: "Chính xác! 3x + 6 = 15 ⇒ 3x = 9 ⇒ x = 3." },
        { id: "b", text: "x = 5", isDistractor: true, note: "Bạn quên bước trừ 6 sau khi chia." },
        { id: "c", text: "x = 7", isDistractor: true, errorCode: "X1", note: "Lỗi X1: Chuyển 6 sang thành cộng: 15 + 6 = 21." },
        { id: "d", text: "x = 1", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "3x + 6 = 15 ⇒ 3x = 15 − 6 = 9 ⇒ x = 3.",
      errorCode: "X1",
      hints: [
        "Bước 1: Phân phối 3 vào ngoặc: 3x + 6 = 15.",
        "Bước 2: Trừ 6 ở cả hai vế: 3x = 15 − 6 = 9.",
        "Bước 3: Chia cả hai vế cho 3: x = 9 ÷ 3 = 3.",
      ],
    },
    {
      id: "d11-g02",
      prompt: "Tìm x biết: 5 − (x − 3) = 2",
      choices: [
        { id: "a", text: "x = 6", isCorrect: true, note: "Chính xác! 5 − x + 3 = 2 ⇒ 8 − x = 2 ⇒ x = 6." },
        { id: "b", text: "x = 0", isDistractor: true, errorCode: "A2", note: "Lỗi A2: Quên đổi dấu −3 thành +3 khi bỏ ngoặc: 5 − x − 3 = 2 ⇒ 2 − x = 2." },
        { id: "c", text: "x = 4", isDistractor: true },
        { id: "d", text: "x = −6", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "5 − x + 3 = 2 ⇒ 8 − x = 2 ⇒ x = 8 − 2 = 6.",
      errorCode: "A2",
      hints: [
        "Bỏ ngoặc có dấu trừ trước: 5 − x + 3 = 2.",
        "Thu gọn số ở vế trái: 5 + 3 = 8. Ta có 8 − x = 2.",
        "8 trừ mấy bằng 2? x = 6.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d11-p01",
      prompt: "Tìm x biết: 4(x − 1) = 16",
      choices: [
        { id: "a", text: "x = 5", isCorrect: true },
        { id: "b", text: "x = 3", isDistractor: true },
        { id: "c", text: "x = 4", isDistractor: true },
        { id: "d", text: "x = 17/4", isDistractor: true, errorCode: "A1" },
      ],
      correctAnswer: "a",
      explanation: "4x − 4 = 16 ⇒ 4x = 20 ⇒ x = 5.",
    },
    {
      id: "d11-p02",
      prompt: "Tìm x biết: 2x + 7 = 1",
      choices: [
        { id: "a", text: "x = −3", isCorrect: true },
        { id: "b", text: "x = 4", isDistractor: true, errorCode: "X1" },
        { id: "c", text: "x = 3", isDistractor: true },
        { id: "d", text: "x = −4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2x = 1 − 7 = −6 ⇒ x = −6 ÷ 2 = −3.",
      errorCode: "X1",
    },
    {
      id: "d11-p03",
      prompt: "Tìm x biết: 10 − 3(x + 1) = 1",
      choices: [
        { id: "a", text: "x = 2", isCorrect: true },
        { id: "b", text: "x = 4", isDistractor: true },
        { id: "c", text: "x = −2", isDistractor: true },
        { id: "d", text: "x = 3", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "10 − 3x − 3 = 1 ⇒ 7 − 3x = 1 ⇒ 3x = 6 ⇒ x = 2.",
    },
    {
      id: "d11-p04",
      prompt: "Tìm x biết: 2(x + 3) = x + 10",
      choices: [
        { id: "a", text: "x = 4", isCorrect: true },
        { id: "b", text: "x = 7", isDistractor: true, errorCode: "A1" },
        { id: "c", text: "x = 16", isDistractor: true },
        { id: "d", text: "x = 2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2x + 6 = x + 10 ⇒ 2x − x = 10 − 6 ⇒ x = 4.",
    },
    {
      id: "d11-p05",
      prompt: "Tìm x biết: −2(x − 5) = 8",
      choices: [
        { id: "a", text: "x = 1", isCorrect: true },
        { id: "b", text: "x = 9", isDistractor: true },
        { id: "c", text: "x = −1", isDistractor: true },
        { id: "d", text: "x = 4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "x − 5 = 8 ÷ (−2) = −4 ⇒ x = −4 + 5 = 1.",
    },
    {
      id: "d11-p06",
      prompt: "Tìm x biết: 3(x − 1) − 2(x + 2) = 0",
      choices: [
        { id: "a", text: "x = 7", isCorrect: true },
        { id: "b", text: "x = 1", isDistractor: true },
        { id: "c", text: "x = −1", isDistractor: true },
        { id: "d", text: "x = −7", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "3x − 3 − 2x − 4 = 0 ⇒ x − 7 = 0 ⇒ x = 7.",
    },
    {
      id: "d11-p07",
      prompt: "Tìm x biết: 7x − (2x + 5) = 15",
      choices: [
        { id: "a", text: "x = 4", isCorrect: true },
        { id: "b", text: "x = 2", isDistractor: true, errorCode: "A2" },
        { id: "c", text: "x = 5", isDistractor: true },
        { id: "d", text: "x = 3", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "7x − 2x − 5 = 15 ⇒ 5x − 5 = 15 ⇒ 5x = 20 ⇒ x = 4.",
      errorCode: "A2",
    },
    {
      id: "d11-p08",
      prompt: "Tìm x biết: 4x = 2(x + 6)",
      choices: [
        { id: "a", text: "x = 6", isCorrect: true },
        { id: "b", text: "x = 3", isDistractor: true },
        { id: "c", text: "x = 12", isDistractor: true },
        { id: "d", text: "x = 4", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "4x = 2x + 12 ⇒ 2x = 12 ⇒ x = 6.",
    },
    {
      id: "d11-p09",
      prompt: "Tìm x biết: 2(3x − 1) = 5(x + 2) − 4",
      choices: [
        { id: "a", text: "x = 8", isCorrect: true },
        { id: "b", text: "x = 6", isDistractor: true },
        { id: "c", text: "x = 4", isDistractor: true },
        { id: "d", text: "x = 10", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "6x − 2 = 5x + 10 − 4 ⇒ 6x − 2 = 5x + 6 ⇒ x = 8.",
    },
    {
      id: "d11-p10",
      prompt: "Phương trình 2(x + 1) = 2x + 2 có bao nhiêu nghiệm?",
      choices: [
        { id: "a", text: "Vô số nghiệm (đúng với mọi x)", isCorrect: true },
        { id: "b", text: "Vô nghiệm", isDistractor: true },
        { id: "c", text: "1 nghiệm x = 0", isDistractor: true },
        { id: "d", text: "1 nghiệm x = 2", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "2x + 2 = 2x + 2 ⇔ 0x = 0. Phương trình này luôn đúng với mọi giá trị của x.",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Phê phán quy tắc 'chuyển vế đổi dấu'",
    prompt:
      "Nhiều học sinh học vẹt câu: 'Chuyển vế đổi dấu' nhưng không hiểu vì sao dấu lại đổi, dẫn đến hay làm sai như: '2x = 6 ⇒ x = 6 − 2 = 4 (chuyển số 2 sang đổi thành trừ 2)'.\nEm hãy dùng mô hình cán cân thăng bằng để giải thích rõ cho bạn: Tại sao trong 2x = 6 thì phải chia cho 2, chứ không phải trừ 2?",
    type: "why",
    rubric: [
      "Chỉ ra mối liên hệ giữa 2 và x trong 2x là phép NHÂN (2 nhân x).",
      "Sử dụng nguyên lý cân bằng: Muốn triệt tiêu thừa số nhân 2 để chỉ còn lại x, ta phải thực hiện phép toán ngược lại là CHIA cho 2 ở cả hai đĩa cân.",
      "Chỉ ra sai lầm của bạn là nhầm giữa phép nhân (hệ số) với phép cộng (số hạng).",
    ],
    sampleSolution:
      "Bạn đã nhầm lẫn tai hại giữa PHÉP CỘNG và PHÉP NHÂN!\n- Trong biểu thức x + 2 = 6, số 2 là một số hạng của phép cộng. Muốn mất +2, ta trừ 2 ở cả hai vế: x = 6 − 2 = 4.\n- Còn trong biểu thức 2x = 6, số 2 là THỪA SỐ của phép nhân (2 nhân x). Trên đĩa cân, có 2 hộp quà giống hệt nhau nặng tổng cộng 6kg. Muốn biết 1 hộp quà nặng bao nhiêu, ta phải CHIA ĐỀU số cân ở cả hai đĩa cho 2, tức là x = 6 ÷ 2 = 3kg!\nNếu bạn lấy 6 − 2 = 4 là bạn đang trừ bớt 2kg chứ không phải tìm khối lượng của 1 hộp quà. Vì thế, nguyên lý chuẩn là 'thực hiện phép toán ngược ở cả hai vế'!",
  },
  summary: {
    keyTakeaways: [
      "Phương trình là cán cân: Bất cứ phép biến đổi nào cũng phải thực hiện giống hệt nhau ở cả 2 vế.",
      "Muốn triệt tiêu phép cộng thì trừ; muốn triệt tiêu phép nhân thì chia.",
      "Sau khi tìm ra x, luôn thay lại vào đề bài để tự kiểm tra.",
    ],
    explainCheckPrompt: "Em hãy tự giải thích: 'Tại sao phép toán chuyển vế đổi dấu thực chất là cộng hoặc trừ cùng một số ở cả hai vế?'",
  },
};
