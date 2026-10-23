// Ngày 1: Số nguyên: cộng, trừ
export const day01 = {
  day: 1,
  topic: "Số nguyên: cộng, trừ",
  goal: "Phân biệt dấu của số và dấu của phép toán; thành thạo trừ số âm",
  testGoal: "10 câu; mục tiêu ≥ 8/10",
  timeMinutes: 60,
  breakdown: [
    { label: "Nhớ lại kiến thức", time: "10 phút" },
    { label: "Bản chất dấu & phép tính", time: "15 phút" },
    { label: "Luyện có hướng dẫn", time: "20 phút" },
    { label: "Tự kiểm tra 10 câu", time: "10 phút" },
    { label: "Ghi lỗi & Đánh giá", time: "5 phút" },
  ],
  warmup: [
    {
      id: "d01-w01",
      prompt: "Số đối của số −5 là bao nhiêu?",
      choices: [
        { id: "a", text: "5", isCorrect: true, note: "Chính xác! Số đối của số âm là số dương cùng độ lớn." },
        { id: "b", text: "−5", isDistractor: true, note: "Đây là chính nó, không phải số đối." },
        { id: "c", text: "0", isDistractor: true, note: "Chưa đúng." },
      ],
      correctAnswer: "a",
      explanation: "Hai số đối nhau có tổng bằng 0. Số đối của −5 là 5 vì (−5) + 5 = 0.",
    },
    {
      id: "d01-w02",
      prompt: "Tính: −8 + 3 =",
      choices: [
        { id: "a", text: "−11", isDistractor: true, errorCode: "E1", note: "Bạn đã lấy 8 cộng 3 rồi đặt dấu âm. Hãy chú ý hai số khác dấu." },
        { id: "b", text: "−5", isCorrect: true, note: "Chính xác! Ta lấy 8 − 3 = 5 rồi lấy dấu của số có phần độ lớn lớn hơn (dấu âm)." },
        { id: "c", text: "5", isDistractor: true, note: "Nhầm dấu của kết quả." },
      ],
      correctAnswer: "b",
      explanation: "Cộng hai số nguyên khác dấu: Lấy hiệu độ lớn 8 − 3 = 5, lấy dấu của số có độ lớn lớn hơn (−8) nên kết quả là −5.",
      errorCode: "E1",
    },
  ],
  concept: {
    title: "Bản chất: Phân biệt dấu của số và phép toán",
    visualType: "number-line",
    content:
      "Một lỗi kinh điển của học sinh lớp 8 là nhầm lẫn giữa dấu âm của số và phép trừ. Phép toán 'trừ một số âm' thực chất là đảo chiều lùi, biến thành tiến lên phía trước trên trục số.",
    rules: [
      {
        rule: "Trừ số âm = Cộng số đối",
        math: "a − (−b) = a + b",
        note: "Gặp hai dấu trừ liền nhau '− (−', lập tức chuyển thành dấu cộng '+'.",
      },
      {
        rule: "Cộng hai số cùng dấu âm",
        math: "(−a) + (−b) = −(a + b)",
        note: "Nợ thêm nợ thì nợ nhiều hơn. Ví dụ: nợ 3 nghìn rồi nợ thêm 4 nghìn là nợ 7 nghìn: (−3) + (−4) = −7.",
      },
      {
        rule: "Cộng hai số khác dấu",
        math: "(−a) + b",
        note: "Lấy số lớn hơn trừ số bé hơn (theo độ lớn), rồi mang dấu của số có độ lớn lớn hơn.",
      },
    ],
    commonPitfall: "Nhìn thấy −7 − (−4) liền vội vã lấy 7 + 4 = 11 rồi ghi −11. Đó là lỗi sai mã E1!",
  },
  workedExamples: [
    {
      title: "Ví dụ 1: Trừ số âm cơ bản",
      problem: "Tính giá trị biểu thức: A = −7 − (−4)",
      steps: [
        {
          step: 1,
          description: "Nhận diện phép trừ số âm: đổi phép trừ thành phép cộng với số đối.",
          math: "A = −7 + 4",
        },
        {
          step: 2,
          description: "Thực hiện cộng hai số khác dấu: Độ lớn 7 lớn hơn 4, lấy 7 − 4 = 3, giữ dấu âm của 7.",
          math: "A = −3",
        },
      ],
      pitfall: "Lỗi E1: Viết −7 − (−4) = −11 vì cộng gộp 7 với 4.",
      selfCheck: "Thử lại trên trục số: Đứng ở vạch −7, quay ngược lùi 4 bước tức là tiến sang phải 4 bước, đến vạch −3.",
    },
    {
      title: "Ví dụ 2: Biểu thức có nhiều số nguyên",
      problem: "Tính giá trị: B = 12 − (−8) − 15 + (−5)",
      steps: [
        {
          step: 1,
          description: "Chuyển hết các phép trừ số âm thành phép cộng số đối.",
          math: "B = 12 + 8 − 15 + (−5)",
        },
        {
          step: 2,
          description: "Thực hiện từ trái sang phải hoặc gộp các số dương với nhau, số âm với nhau.",
          math: "B = (12 + 8) − (15 + 5) = 20 − 20 = 0",
        },
      ],
      pitfall: "Quên đổi dấu ở số (−8), giữ nguyên là 12 − 8.",
      selfCheck: "Kiểm tra tính đối xứng: 12 + 8 = 20; −15 + (−5) = −20; 20 + (−20) = 0.",
    },
  ],
  guidedPractice: [
    {
      id: "d01-g01",
      prompt: "Tính: −9 − (−6) =",
      choices: [
        { id: "a", text: "−15", isDistractor: true, errorCode: "E1", note: "Bạn quên đổi trừ số âm thành cộng số đối." },
        { id: "b", text: "−3", isCorrect: true, note: "Chính xác! −9 + 6 = −3." },
        { id: "c", text: "3", isDistractor: true, note: "Nhầm dấu của tổng." },
        { id: "d", text: "15", isDistractor: true, note: "Sai hoàn toàn về dấu." },
      ],
      correctAnswer: "b",
      explanation: "−9 − (−6) = −9 + 6 = −3.",
      errorCode: "E1",
      hints: [
        "Bước 1: Hãy đổi phép trừ số âm '− (−6)' thành phép cộng với số đối.",
        "Bước 2: Phép tính trở thành: −9 + 6. Giờ lấy 9 trừ 6.",
        "Bước 3: 9 − 6 = 3, mang dấu âm của −9 nên kết quả là −3.",
      ],
    },
    {
      id: "d01-g02",
      prompt: "Tính: 4 − 10 − (−3) =",
      choices: [
        { id: "a", text: "−9", isDistractor: true, note: "Chưa đúng bước đổi dấu cuối cùng." },
        { id: "b", text: "−3", isCorrect: true, note: "Rất tốt! 4 − 10 = −6, sau đó −6 + 3 = −3." },
        { id: "c", text: "3", isDistractor: true, note: "Nhầm dấu kết quả." },
        { id: "d", text: "−13", isDistractor: true, errorCode: "E1", note: "Quên đổi dấu trừ của −3." },
      ],
      correctAnswer: "b",
      explanation: "4 − 10 − (−3) = (4 − 10) + 3 = −6 + 3 = −3.",
      errorCode: "E1",
      hints: [
        "Thực hiện từ trái sang phải: Tính 4 − 10 trước.",
        "4 − 10 = −6. Biểu thức trở thành: −6 − (−3).",
        "Đổi − (−3) thành + 3: Ta có −6 + 3 = −3.",
      ],
    },
  ],
  independentPractice: [
    {
      id: "d01-p01",
      prompt: "Tính: −12 − (−5) =",
      choices: [
        { id: "a", text: "−17", isDistractor: true, errorCode: "E1" },
        { id: "b", text: "−7", isCorrect: true },
        { id: "c", text: "7", isDistractor: true },
        { id: "d", text: "17", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "−12 − (−5) = −12 + 5 = −7.",
      errorCode: "E1",
    },
    {
      id: "d01-p02",
      prompt: "Tính: 15 − (−8) =",
      choices: [
        { id: "a", text: "7", isDistractor: true, errorCode: "E1" },
        { id: "b", text: "23", isCorrect: true },
        { id: "c", text: "−23", isDistractor: true },
        { id: "d", text: "−7", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "15 − (−8) = 15 + 8 = 23.",
      errorCode: "E1",
    },
    {
      id: "d01-p03",
      prompt: "Tính: −6 + (−9) =",
      choices: [
        { id: "a", text: "−15", isCorrect: true },
        { id: "b", text: "−3", isDistractor: true },
        { id: "c", text: "3", isDistractor: true },
        { id: "d", text: "15", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Cộng hai số âm: −(6 + 9) = −15.",
      errorCode: "E1",
    },
    {
      id: "d01-p04",
      prompt: "Tính: −20 − 14 =",
      choices: [
        { id: "a", text: "−6", isDistractor: true },
        { id: "b", text: "−34", isCorrect: true },
        { id: "c", text: "34", isDistractor: true },
        { id: "d", text: "6", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "−20 − 14 = −20 + (−14) = −34.",
      errorCode: "E1",
    },
    {
      id: "d01-p05",
      prompt: "Tính: 0 − (−18) =",
      choices: [
        { id: "a", text: "−18", isDistractor: true },
        { id: "b", text: "18", isCorrect: true },
        { id: "c", text: "0", isDistractor: true },
        { id: "d", text: " Không xác định", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "0 − (−18) = 0 + 18 = 18.",
      errorCode: "E1",
    },
    {
      id: "d01-p06",
      prompt: "Tính: −7 − (−7) =",
      choices: [
        { id: "a", text: "−14", isDistractor: true, errorCode: "E1" },
        { id: "b", text: "0", isCorrect: true },
        { id: "c", text: "14", isDistractor: true },
        { id: "d", text: "−1", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "−7 − (−7) = −7 + 7 = 0. Hai số đối nhau có tổng bằng 0.",
      errorCode: "E1",
    },
    {
      id: "d01-p07",
      prompt: "Tính: (−11) + 25 =",
      choices: [
        { id: "a", text: "14", isCorrect: true },
        { id: "b", text: "−14", isDistractor: true },
        { id: "c", text: "36", isDistractor: true },
        { id: "d", text: "−36", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "25 − 11 = 14.",
      errorCode: "E1",
    },
    {
      id: "d01-p08",
      prompt: "Tính: 8 − 15 − (−2) =",
      choices: [
        { id: "a", text: "−5", isCorrect: true },
        { id: "b", text: "−9", isDistractor: true, errorCode: "E1" },
        { id: "c", text: "5", isDistractor: true },
        { id: "d", text: "−21", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "8 − 15 = −7; sau đó −7 − (−2) = −7 + 2 = −5.",
      errorCode: "E1",
    },
    {
      id: "d01-p09",
      prompt: "Tìm x biết: x − (−6) = 2",
      choices: [
        { id: "a", text: "x = 8", isDistractor: true },
        { id: "b", text: "x = −4", isCorrect: true },
        { id: "c", text: "x = 4", isDistractor: true },
        { id: "d", text: "x = −8", isDistractor: true },
      ],
      correctAnswer: "b",
      explanation: "x + 6 = 2 ⇒ x = 2 − 6 = −4. Thử lại: −4 − (−6) = −4 + 6 = 2 (Đúng).",
      errorCode: "E1",
    },
    {
      id: "d01-p10",
      prompt: "Tính tổng: S = −1 + 2 − 3 + 4 − 5 + 6",
      choices: [
        { id: "a", text: "3", isCorrect: true },
        { id: "b", text: "−3", isDistractor: true },
        { id: "c", text: "0", isDistractor: true },
        { id: "d", text: "6", isDistractor: true },
      ],
      correctAnswer: "a",
      explanation: "Gộp từng cặp: (−1 + 2) + (−3 + 4) + (−5 + 6) = 1 + 1 + 1 = 3.",
      errorCode: "E1",
    },
  ],
  challenge: {
    title: "Thử thách tư duy: Tìm lỗi sai của bạn An",
    prompt:
      "Bạn An giải bài toán: 'Tính −8 − (−5)'. An làm như sau:\nBước 1: Em thấy có hai dấu trừ nên lấy 8 + 5 = 13.\nBước 2: Vì cả hai số đều có dấu trừ nên kết quả là −13.\nEm hãy giải thích vì sao An làm sai và chỉ ra cách sửa đúng.",
    type: "spot-error",
    rubric: [
      {
        id: "c1",
        label: "Nhận ra lỗi của An trong việc xử lý dấu âm (không thể chỉ đếm dấu trừ để quyết định dấu).",
        tip: "Em hãy xem lại vì sao không thể quyết định dấu của kết quả chỉ bằng cách đếm dấu trừ.",
      },
      {
        id: "c2",
        label: "Giải thích đúng quy tắc trừ một số âm thành cộng số đối (−8 − (−5) = −8 + 5).",
        tip: "Em cần nhớ rằng trừ một số âm tương đương với cộng số đối của số đó.",
      },
      {
        id: "c3",
        label: "Tính và kết luận đúng kết quả −3 (không phải −13).",
        tip: "Hãy tính lại −8 + 5 bằng cách so sánh hai giá trị tuyệt đối. Số nào có giá trị tuyệt đối lớn hơn?",
      },
    ],
    sampleSolution:
      "An đã sai ở hai điểm: (1) Bỏ qua quy tắc dấu khi xử lý phép trừ một số âm; (2) Kết luận −13 chỉ dựa vào việc đếm dấu âm. Quy tắc đúng: Trừ một số âm là cộng số đối: −8 − (−5) = −8 + 5 = −3.",
    pedagogicalSolution: {
      studentCritique: {
        title: "A. Nhận xét bài làm của An",
        points: [
          "An đã bỏ qua quy tắc dấu khi xử lý phép trừ một số âm.",
          "An kết luận −13 chỉ dựa vào việc nhìn thấy dấu âm, thay vì thực hiện đúng phép biến đổi trước khi tính.",
        ],
        explanation:
          "Không thể chỉ đếm số dấu trừ để quyết định dấu của kết quả. Phép tính có dấu trừ trước một số âm là một phép biến đổi toán học cụ thể, không phải là việc gộp các dấu lại với nhau.",
      },
      knowledgeReview: {
        title: "B. Ôn lại kiến thức cần nhớ",
        rule: "Trừ một số cũng chính là cộng với số đối của số đó.",
        concept: "Số đối là gì: Số đối của −5 là 5, vì (−5) + 5 = 0.",
        examples: [
          "7 − 3 = 7 + (−3) = 4",
          "7 − (−3) = 7 + 3 = 10",
          "−8 − (−5) = −8 + 5",
        ],
      },
      stepByStep: {
        title: "C. Giải từng bước chuẩn mực",
        steps: [
          { step: 1, text: "Viết lại phép tính ban đầu: −8 − (−5)" },
          { step: 2, text: "Đổi phép trừ số âm thành phép cộng số đối: −8 + 5" },
          { step: 3, text: "Xét vị trí trên trục số: Bắt đầu từ điểm −8, phép cộng 5 nghĩa là di chuyển 5 đơn vị sang bên phải." },
          { step: 4, text: "Tính kết quả: −8 + 5 = −3" },
        ],
        conclusion: "Đáp án đúng là −3, không phải −13.",
      },
      whyExplanation: {
        title: "D. Giải thích vì sao",
        content:
          "Giá trị tuyệt đối của |−8| = 8 lớn hơn giá trị tuyệt đối của |5| = 5, nên tổng −8 + 5 vẫn mang dấu âm. Ta lấy hiệu hai giá trị tuyệt đối: 8 − 5 = 3, do đó kết quả cuối cùng là −3.",
      },
      followUpCheck: {
        title: "E. Kiểm tra hiểu bài",
        prompt: "Em hãy tự thử sức nhanh: Tính −6 − (−2) =",
        correctAnswer: "-4",
        acceptableAnswers: ["-4", "−4", "- 4", "− 4"],
        explanation:
          "Chính xác! −6 − (−2) = −6 + 2 = −4. Ta đổi trừ (−2) thành cộng 2, sau đó lấy 6 − 2 = 4 và mang dấu âm của −6.",
        commonMistakes: {
          "-8": "Em đang trừ tiếp 2 (−6 − 2 = −8). Hãy nhớ: Trừ cho số âm (−2) phải đổi thành cộng 2!",
          "8": "Dấu chưa chính xác. −6 + 2 phải ra số âm vì |−6| > |2|.",
          "4": "Số âm −6 có giá trị tuyệt đối lớn hơn 2, nên kết quả phải mang dấu âm: −4.",
          "-4": "Chính xác! −6 − (−2) = −6 + 2 = −4.",
        },
      },
    },
  },
  summary: {
    keyTakeaways: [
      "Gặp '− (−a)' luôn viết ngay thành '+ a'.",
      "Cộng hai số cùng dấu: cộng độ lớn và giữ nguyên dấu chung.",
      "Cộng hai số khác dấu: lấy số lớn trừ số bé, mang dấu của số có độ lớn lớn hơn.",
    ],
    explainCheckPrompt: "Em hãy tự nói thành lời: 'Vì sao trừ một số âm lại biến thành cộng số dương?'",
  },
};
