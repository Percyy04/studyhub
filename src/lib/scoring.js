// Tiện ích tính điểm, chuẩn hóa tỷ lệ và tổng hợp dữ liệu học tập

/**
 * Phân tích chuỗi điểm số dạng "8/10" hoặc "16/20"
 * @param {string} scoreStr
 * @returns {[number, number] | null} [correct, total]
 */
export function parseScore(scoreStr) {
  if (!scoreStr || typeof scoreStr !== "string") return null;
  const match = scoreStr.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  const correct = parseInt(match[1], 10);
  const total = parseInt(match[2], 10);
  if (total <= 0 || correct > total || correct < 0) return null;
  return [correct, total];
}

/**
 * Tính phần trăm chính xác (0 - 100)
 */
export function calculateAccuracy(correct, total) {
  if (!total || total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Định dạng tỷ lệ thành chuỗi phần trăm
 */
export function formatPercentage(rate) {
  if (rate === null || rate === undefined || isNaN(rate)) return "—";
  return `${Math.round(rate)}%`;
}

/**
 * Tổng hợp điểm số từ dữ liệu ngày học
 * @param {Object} daysData - Đối tượng { [dayId]: dayObject }
 */
export function aggregateStats(daysData = {}) {
  let recordedSessions = 0;
  let totalCorrect = 0;
  let totalQuestions = 0;
  let masteredCount = 0;

  for (let day = 1; day <= 14; day++) {
    const dayRecord = daysData[day];
    if (!dayRecord) continue;

    const hasActivity = !!(
      dayRecord.actualDate ||
      dayRecord.score ||
      dayRecord.completed ||
      dayRecord.notes ||
      (dayRecord.errorCodes && dayRecord.errorCodes.length > 0)
    );

    if (hasActivity) {
      recordedSessions++;
    }

    const parsed = parseScore(dayRecord.score);
    if (parsed) {
      totalCorrect += parsed[0];
      totalQuestions += parsed[1];
    }

    if (dayRecord.mastery === "Thành thạo" || dayRecord.mastery === "Vững bền") {
      masteredCount++;
    }
  }

  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : null;

  return {
    recordedSessions,
    totalSessions: 14,
    totalCorrect,
    totalQuestions,
    scoreDisplay: totalQuestions > 0 ? `${totalCorrect}/${totalQuestions}` : "—",
    accuracyDisplay: accuracy !== null ? `${accuracy}%` : "—",
    accuracyNumeric: accuracy || 0,
    masteredCount,
  };
}
