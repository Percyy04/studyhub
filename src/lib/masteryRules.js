// Thuật toán đánh giá mức độ thành thạo và gợi ý điều phối sư phạm theo AGENTS.md

import { parseScore } from "./scoring.js";

export const MASTERY_LEVELS = {
  NOT_SOLID: "Chưa vững",
  DEVELOPING: "Đang hình thành",
  READY_TO_ADVANCE: "Có thể chuyển",
  SOLID_RETAINED: "Vững bền",
};

/**
 * Đánh giá mức độ thành thạo dựa trên điểm số, tính độc lập và khả năng giải thích
 * @param {Object} params
 * @param {string} params.scoreStr - Chuỗi điểm (ví dụ: "8/10")
 * @param {string} params.independence - "Tự làm độc lập" | "Cần gợi ý" | "Cần hướng dẫn từng bước"
 * @param {string} params.canExplain - "Có, giải thích rõ" | "Một phần / cần nhắc" | "Chưa giải thích được"
 * @param {number} params.hintsUsed - Số lần mở gợi ý
 * @param {string} [params.reviewScoreStr] - Điểm ôn tập sau 2-3 ngày (nếu có)
 */
export function evaluateMastery({ scoreStr, independence, canExplain, hintsUsed = 0, reviewScoreStr = "" }) {
  const parsed = parseScore(scoreStr);
  if (!parsed) {
    return {
      level: "Chưa đánh giá",
      tagColor: "slate",
      recommendation: "Hãy hoàn thành bài kiểm tra hoặc nhập điểm để nhận đánh giá sư phạm.",
      shouldAdvance: false,
    };
  }

  const [correct, total] = parsed;
  const rate = correct / total;

  // Kiểm tra bài ôn sau 2-3 ngày nếu có
  const parsedReview = parseScore(reviewScoreStr);
  if (parsedReview && (parsedReview[0] / parsedReview[1]) >= 0.8 && rate >= 0.8) {
    return {
      level: MASTERY_LEVELS.SOLID_RETAINED,
      tagColor: "emerald",
      recommendation: "Tuyệt vời! Kiến thức đã vững bền và được nhớ lại tốt sau 2–3 ngày. Hãy chuyển sang nội dung mới và tăng dần bài vận dụng.",
      shouldAdvance: true,
    };
  }

  // < 60%
  if (rate < 0.6) {
    return {
      level: MASTERY_LEVELS.NOT_SOLID,
      tagColor: "rose",
      recommendation: "Chưa vững: Học sinh cần được hướng dẫn lại bằng ví dụ đơn giản và luyện thêm 5–8 câu cùng dạng trước khi chuyển bài.",
      shouldAdvance: false,
    };
  }

  // 60% - 79% hoặc dùng nhiều gợi ý
  if (rate < 0.8 || independence === "Cần hướng dẫn từng bước" || hintsUsed >= 3) {
    return {
      level: MASTERY_LEVELS.DEVELOPING,
      tagColor: "amber",
      recommendation: "Đang hình thành: Tiếp tục luyện tập có hướng dẫn và trộn xen kẽ bài cũ vào phần khởi động buổi sau.",
      shouldAdvance: false,
    };
  }

  // >= 80%
  const isIndependent = independence === "Tự làm độc lập";
  const canExplainWell = canExplain === "Có, giải thích rõ";

  if (isIndependent && canExplainWell) {
    return {
      level: MASTERY_LEVELS.READY_TO_ADVANCE,
      tagColor: "blue",
      recommendation: "Đạt chuẩn! Học sinh tự trình bày tốt và giải thích được quy tắc cốt lõi. Có thể chuyển sang bài tiếp theo (vẫn giữ lịch ôn lại sau 2–3 ngày).",
      shouldAdvance: true,
    };
  }

  return {
    level: MASTERY_LEVELS.DEVELOPING,
    tagColor: "amber",
    recommendation: "Điểm số đạt ngưỡng (≥ 8/10), nhưng học sinh vẫn còn phụ thuộc vào gợi ý hoặc chưa giải thích rõ quy tắc. Khuyến nghị kiểm tra thêm khả năng tự diễn đạt trước khi chuyển bài.",
    shouldAdvance: false,
  };
}

/**
 * Quét toàn bộ lịch sử 14 ngày để tìm các mã lỗi lặp lại từ 2 buổi trở lên
 * @param {Object} daysData - Đối tượng state.days
 * @returns {Array<{ errorCode: string, occurrences: number, days: number[] }>}
 */
export function detectRecurringErrors(daysData = {}) {
  const codeStats = {};

  Object.entries(daysData).forEach(([dayNum, dayRecord]) => {
    const codes = dayRecord?.errorCodes || [];
    codes.forEach((code) => {
      if (!codeStats[code]) {
        codeStats[code] = { errorCode: code, occurrences: 0, days: [] };
      }
      codeStats[code].occurrences++;
      codeStats[code].days.push(parseInt(dayNum, 10));
    });
  });

  return Object.values(codeStats).filter((item) => item.occurrences >= 2);
}
