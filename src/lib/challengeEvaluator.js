/**
 * challengeEvaluator.js
 * Bộ đánh giá câu trả lời thử thách tư duy bằng thuật toán local.
 * Hoàn toàn không gọi API AI, không phát sinh chi phí, bảo mật trên client.
 */

/**
 * Chuẩn hóa chuỗi văn bản toán học tiếng Việt
 */
export function normalizeMathText(text) {
  if (!text || typeof text !== "string") return "";

  return text
    // Chuẩn hóa các loại dấu trừ thành dấu trừ tiêu chuẩn '-'
    .replace(/[−–—]/g, "-")
    // Chuẩn hóa các loại dấu nhân
    .replace(/[×*]/g, "x")
    // Chuẩn hóa dấu chia
    .replace(/[÷:]/g, "/")
    // Chuẩn hóa khoảng trắng quanh toán tử và dấu ngoặc
    .replace(/\s*([+\-x/=:<>()])\s*/g, " $1 ")
    // Xóa khoảng trắng thừa
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Loại bỏ dấu tiếng Việt (hỗ trợ kiểm tra từ khóa không phân biệt dấu)
 */
export function removeVietnameseAccents(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

/**
 * Bộ kiểm tra quy tắc Ngày 1: Phân tích lỗi bạn An (-8 - (-5))
 */
function evaluateDay01(answer, normalized, noAccents) {
  const criteriaResults = [];

  // ==========================================
  // TIÊU CHÍ 1: Nhận ra lỗi của An trong việc xử lý dấu âm
  // ==========================================
  const positiveAnErrorTerms = [
    "an sai",
    "ban an sai",
    "sai o buoc 1",
    "sai buoc 1",
    "buoc 1 sai",
    "buoc 2 sai",
    "sai o buoc 2",
    "khong duoc dem dau",
    "khong the dem dau",
    "dem dau tru la sai",
    "nhin thay hai dau tru",
    "khong the lay 8 + 5",
    "khong phai lay 8 + 5",
    "lay 8 + 5 la sai",
    "8 + 5 = 13 la sai",
    "khong phai cong 8 voi 5",
    "nham phep tinh",
    "nham quy tac dau",
    "nham dau",
    "khong phai ket qua -13",
    "khong phai -13",
    "-13 la sai",
    "ra -13 la sai",
    "an bo qua quy tac",
    "bo qua dau",
    "hai dau tru lien nhau khong phai cong 8",
  ];

  const praiseAnCorrectTerms = [
    "an dung",
    "an lam dung",
    "an giai dung",
    "an khong sai",
    "-13 la dung",
    "ket qua -13 la dung",
    "an dung roi",
  ];

  const praisesAn = praiseAnCorrectTerms.some((t) => noAccents.includes(t));
  const identifiesAnError = positiveAnErrorTerms.some((t) => noAccents.includes(t));

  let c1Status = "uncertain";
  let c1Feedback = "";
  let c1Tip = "Em hãy xem lại vì sao không thể quyết định dấu của kết quả chỉ bằng cách đếm dấu trừ.";

  if (praisesAn) {
    c1Status = "failed";
    c1Feedback = "Em cần xem lại: Bạn An làm sai chứ không phải đúng. Việc chỉ nhìn thấy hai dấu trừ rồi lấy 8 + 5 = 13 và gán dấu trừ thành −13 là không đúng quy tắc.";
  } else if (identifiesAnError) {
    c1Status = "passed";
    c1Feedback = "Rất tốt! Em đã phát hiện chính xác bạn An sai khi tự ý lấy 8 + 5 và chỉ dựa vào việc đếm dấu trừ để kết luận kết quả âm.";
  } else if (normalized.length < 10) {
    c1Status = "failed";
    c1Feedback = "Câu trả lời quá ngắn. Em hãy giải thích rõ bạn An đã nhầm lẫn ở bước nào hoặc sai về quy tắc gì nhé.";
  } else {
    c1Status = "uncertain";
    c1Feedback = "Chưa đủ căn cứ xác nhận: Em cần nêu rõ hơn việc bạn An sai ở chỗ nào (ví dụ: An lấy 8 + 5 = 13 là sai, hay việc chỉ đếm dấu trừ là sai).";
  }

  criteriaResults.push({
    id: "c1",
    index: 0,
    label: "Nhận ra lỗi của An trong việc xử lý dấu âm (không thể chỉ đếm dấu trừ để quyết định dấu).",
    status: c1Status,
    feedback: c1Feedback,
    tip: c1Tip,
  });

  // ==========================================
  // TIÊU CHÍ 2: Giải thích đúng quy tắc trừ một số âm thành cộng số đối
  // ==========================================
  const positiveRuleTerms = [
    "cong so doi",
    "cong voi so doi",
    "so doi",
    "so doi cua - 5",
    "so doi cua 5",
    "so doi cua am 5",
    "tru so am thanh cong",
    "tru so am la cong",
    "tru cho so am thanh cong",
    "tru am thanh cong",
    "tru am 5 thanh cong 5",
    "doi dau tru thanh cong",
    "doi tru thanh cong",
    "bien thanh phep cong",
    "hai dau tru lien nhau thanh cong",
    "hai dau tru thanh cong",
    "tru tru thanh cong",
    "- 8 + 5",
    "(-8) + 5",
    "-8+5",
    "am 8 cong 5",
  ];

  const falseRuleTerms = [
    "tru so am la tru tiep",
    "hai dau tru van la tru",
    "tru tru thanh tru",
  ];

  const hasFalseRule = falseRuleTerms.some((t) => noAccents.includes(t));
  const hasRule = positiveRuleTerms.some((t) => noAccents.includes(t) || normalized.includes(t));

  let c2Status = "uncertain";
  let c2Feedback = "";
  let c2Tip = "Em cần nhớ rằng trừ một số âm tương đương với cộng số đối của số đó.";

  if (hasFalseRule) {
    c2Status = "failed";
    c2Feedback = "Quy tắc chưa chính xác: Trừ một số âm không phải là tiếp tục trừ. Quy tắc chuẩn là: Trừ một số chính là cộng với số đối của số đó.";
  } else if (hasRule) {
    c2Status = "passed";
    c2Feedback = "Chính xác! Em đã nêu đúng quy tắc biến đổi: Phép trừ cho số âm (−5) phải được đổi thành cộng với số đối của nó (+5), tức là −8 + 5.";
  } else {
    c2Status = "failed";
    c2Feedback = "Chưa nêu rõ quy tắc: Em cần chỉ ra phép tính −8 − (−5) cần được đổi thành phép cộng số đối nào.";
  }

  criteriaResults.push({
    id: "c2",
    index: 1,
    label: "Giải thích đúng quy tắc trừ một số âm thành cộng số đối (−8 − (−5) = −8 + 5).",
    status: c2Status,
    feedback: c2Feedback,
    tip: c2Tip,
  });

  // ==========================================
  // TIÊU CHÍ 3: Tính và kết luận đúng kết quả −3
  // ==========================================
  const hasMinusThree =
    /(?:^|[^\d])-\s*3(?!\d)/.test(normalized) ||
    /am 3(?!\d)/.test(noAccents) ||
    /bang - 3/.test(normalized) ||
    /ra - 3/.test(normalized) ||
    /= - 3/.test(normalized);

  const claimsPositiveThreeOnly =
    /\bket qua la 3\b/.test(noAccents) ||
    /\bdap an la 3\b/.test(noAccents) ||
    /\bbang 3\b/.test(noAccents);

  let c3Status = "uncertain";
  let c3Feedback = "";
  let c3Tip = "Hãy tính lại −8 + 5 bằng cách so sánh hai giá trị tuyệt đối. Số nào có giá trị tuyệt đối lớn hơn?";

  if (claimsPositiveThreeOnly && !hasMinusThree) {
    c3Status = "failed";
    c3Feedback = "Chưa chính xác về dấu: Kết quả không phải là 3 dương. Vì |−8| = 8 lớn hơn |5| = 5 nên kết quả mang dấu âm: −3.";
  } else if (hasMinusThree) {
    c3Status = "passed";
    c3Feedback = "Chính xác! Em đã tính và kết luận đúng đáp án của bài toán là −3.";
  } else {
    c3Status = "failed";
    c3Feedback = "Chưa có kết quả đúng: Em chưa ghi rõ kết quả cuối cùng sau khi sửa lại là bao nhiêu (đáp án đúng là −3).";
  }

  criteriaResults.push({
    id: "c3",
    index: 2,
    label: "Tính và kết luận đúng kết quả −3.",
    status: c3Status,
    feedback: c3Feedback,
    tip: c3Tip,
  });

  return criteriaResults;
}

/**
 * Bộ kiểm tra quy tắc chung cho các ngày học khác (Fallback thông minh)
 */
function evaluateGeneric(answer, normalized, noAccents, rubricList) {
  return rubricList.map((criterion, idx) => {
    const label = typeof criterion === "string" ? criterion : criterion.label || `Tiêu chí ${idx + 1}`;
    const tip = typeof criterion === "object" && criterion.tip ? criterion.tip : "Hãy đọc kỹ lời giải tham khảo để đối chiếu và tự kiểm tra lại nhé.";

    // Phân tích từ khóa từ nhãn của rubric
    const labelClean = removeVietnameseAccents(label.toLowerCase());
    const words = labelClean
      .replace(/[(),:.\-–—]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !["duoc", "dung", "trong", "phai", "thanh", "khong"].includes(w));

    let matchCount = 0;
    words.forEach((w) => {
      if (noAccents.includes(w)) matchCount++;
    });

    const matchRatio = words.length > 0 ? matchCount / words.length : 0;

    let status = "uncertain";
    let feedback = "";

    if (normalized.length < 15) {
      status = "uncertain";
      feedback = "Câu trả lời còn ngắn để hệ thống nhận diện đầy đủ lập luận.";
    } else if (matchRatio >= 0.45) {
      status = "passed";
      feedback = "Hệ thống ghi nhận câu trả lời của em có đề cập đến ý cốt lõi của tiêu chí này.";
    } else {
      status = "uncertain";
      feedback = "Chưa đủ cơ sở để khẳng định. Em hãy tự đối chiếu kỹ với lời giải tham khảo bên dưới nhé.";
    }

    return {
      id: `c${idx + 1}`,
      index: idx,
      label,
      status,
      feedback,
      tip,
    };
  });
}

/**
 * Hàm đánh giá chính: evaluateAnswer
 * @param {string} answer - Nội dung học sinh nhập
 * @param {object} challengeConfig - Cấu hình thử thách từ dữ liệu bài học
 * @returns {object} Kết quả phân tích sơ bộ có cấu trúc
 */
export function evaluateAnswer(answer, challengeConfig = {}) {
  const raw = String(answer || "");
  const trimmed = raw.trim();

  if (!trimmed) {
    return {
      isEvaluated: false,
      isEmpty: true,
      preliminaryScore: 0,
      maxScore: 3,
      criteriaResults: [],
      overallFeedback: "Vui lòng nhập câu trả lời trước khi nộp bài.",
      suggestions: ["Hãy viết suy nghĩ và cách giải thích của em vào ô trả lời trước khi nộp."],
    };
  }

  const normalized = normalizeMathText(trimmed);
  const noAccents = removeVietnameseAccents(normalized);

  const rubricList = Array.isArray(challengeConfig.rubric) ? challengeConfig.rubric : [];
  const day = challengeConfig.day || 1;

  let criteriaResults = [];

  // Sử dụng bộ đánh giá chuyên sâu theo từng bài tập
  if (day === 1 || challengeConfig.type === "spot-error") {
    criteriaResults = evaluateDay01(trimmed, normalized, noAccents);
  } else {
    criteriaResults = evaluateGeneric(trimmed, normalized, noAccents, rubricList);
  }

  // Đếm số tiêu chí passed
  const passedCount = criteriaResults.filter((c) => c.status === "passed").length;
  const maxScore = criteriaResults.length;

  // Lời nhận xét tổng quan mang tính sư phạm
  let overallFeedback = "";
  if (passedCount === maxScore) {
    overallFeedback = "Xuất sắc! Lập luận của em rất chặt chẽ, nhận diện đúng lỗi và nêu rõ quy tắc toán học.";
  } else if (passedCount > 0) {
    overallFeedback = `Khá tốt! Em đã chỉ ra được ${passedCount}/${maxScore} ý quan trọng. Hãy đọc thêm lời giải tham khảo để hoàn thiện các ý còn lại nhé.`;
  } else {
    overallFeedback = "Em đã nỗ lực suy nghĩ và viết câu trả lời! Hãy xem kỹ lời giải chi tiết và đối chiếu theo Rubric bên dưới để nắm vững bản chất.";
  }

  const suggestions = criteriaResults
    .filter((c) => c.status !== "passed")
    .map((c) => c.tip)
    .filter(Boolean);

  return {
    isEvaluated: true,
    isEmpty: false,
    submittedAnswer: trimmed,
    submittedAt: new Date().toISOString(),
    preliminaryScore: passedCount,
    maxScore,
    criteriaResults,
    overallFeedback,
    suggestions,
  };
}

/**
 * Đánh giá câu hỏi kiểm tra nhanh (Follow-up Check ở Mục E)
 * @param {string} userAnswer - Câu trả lời người dùng nhập
 * @param {object} followUpConfig - Cấu hình câu hỏi
 */
export function evaluateFollowUp(userAnswer, followUpConfig = {}) {
  const norm = normalizeMathText(userAnswer || "").replace(/\s+/g, "");

  const correct = followUpConfig.correctAnswer || "-4";
  const acceptable = (followUpConfig.acceptableAnswers || ["-4", "- 4"]).map((a) =>
    normalizeMathText(a).replace(/\s+/g, "")
  );

  const isCorrect = norm === correct.replace(/\s+/g, "") || acceptable.includes(norm);

  const commonMistakes = followUpConfig.commonMistakes || {
    "-8": "Em đang trừ tiếp 2 (−6 − 2 = −8). Hãy nhớ: Trừ cho số âm (−2) phải đổi thành cộng 2!",
    "8": "Dấu chưa chính xác. −6 + 2 phải ra số âm vì giá trị tuyệt đối |−6| > |2|.",
    "4": "Số âm −6 có giá trị tuyệt đối lớn hơn 2, nên kết quả phải mang dấu âm: −4.",
    "-4": "Chính xác! −6 − (−2) = −6 + 2 = −4.",
  };

  let specificTip = "";
  if (commonMistakes[norm]) {
    specificTip = commonMistakes[norm];
  }

  return {
    isCorrect,
    userAnswer: norm,
    feedback: isCorrect
      ? "Chính xác! Ta đổi phép trừ số âm thành cộng số đối: −6 − (−2) = −6 + 2 = −4."
      : specificTip ||
        "Chưa chính xác. Em hãy nhớ quy tắc: Trừ (−2) đổi thành cộng 2: Ta có −6 + 2 = −4.",
    explanation: followUpConfig.explanation || "−6 − (−2) = −6 + 2 = −4.",
  };
}
