// Quản lý LocalStorage an toàn với schema validation, migration và sao lưu JSON/CSV

const STORAGE_KEY_V2 = "math8_learning_tracker_v2";
const STORAGE_KEY_V1 = "pearl_math_tracker_v1";

export const initialDayState = () => ({
  completed: false,
  completedAt: "",
  actualDate: "",
  score: "",
  independence: "", // "Tự làm độc lập" | "Cần gợi ý" | "Cần hướng dẫn từng bước"
  mastery: "",      // "Chưa vững" | "Đang hình thành" | "Có thể chuyển" | "Vững bền"
  canExplain: "",   // "Có, giải thích rõ" | "Một phần / cần nhắc" | "Chưa giải thích được"
  reviewCheck: "",  // Điểm kiểm tra lại sau 2-3 ngày
  errorCodes: [],   // Mảng các mã lỗi ['E1', 'F2']
  errorsNote: "",   // Ghi chép quan sát lỗi
  notes: "",        // Ghi chú của người dạy
  nextPlan: "",     // Kế hoạch cải thiện
  hintsUsedCount: 0,
  history: [],      // Lịch sử các lần làm bài
});

export const initialAppState = () => ({
  version: 2,
  studentName: "Bạn học",
  days: {},
  errorNotebook: [], // [{ id, day, errorCode, prompt, studentAnswer, correctAnswer, date, resolved }]
  globalNotes: "",
  tutorOverrides: {},
});

/**
 * Đọc dữ liệu từ LocalStorage có xử lý lỗi và migration từ v1
 */
export function loadState() {
  if (typeof window === "undefined") return initialAppState();

  try {
    const rawV2 = localStorage.getItem(STORAGE_KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (parsed && typeof parsed === "object") {
        return {
          ...initialAppState(),
          ...parsed,
          days: parsed.days || {},
          errorNotebook: parsed.errorNotebook || [],
        };
      }
    }

    // Kiểm tra migration từ dữ liệu v1 của file HTML cũ nếu có
    const rawV1 = localStorage.getItem(STORAGE_KEY_V1);
    if (rawV1) {
      const parsedV1 = JSON.parse(rawV1);
      const migratedDays = {};
      if (parsedV1.days && typeof parsedV1.days === "object") {
        Object.entries(parsedV1.days).forEach(([d, record]) => {
          migratedDays[d] = {
            ...initialDayState(),
            actualDate: record.date || "",
            score: record.score || "",
            independence: record.independence || "",
            mastery: record.mastery || "",
            canExplain: record.explain || "",
            reviewCheck: record.review || "",
            errorCodes: record.codes || [],
            errorsNote: record.errors || "",
            notes: record.notes || "",
            nextPlan: record.next || "",
            completed: !!(record.date || record.score || record.notes),
          };
        });
      }

      const migrated = {
        ...initialAppState(),
        days: migratedDays,
        globalNotes: parsedV1.globalNotes || "",
      };
      saveState(migrated);
      return migrated;
    }
  } catch (error) {
    console.error("Lỗi khi đọc LocalStorage:", error);
  }

  return initialAppState();
}

/**
 * Lưu dữ liệu an toàn vào LocalStorage
 */
export function saveState(state) {
  if (typeof window === "undefined") return false;
  try {
    const serialized = JSON.stringify({
      ...state,
      version: 2,
      lastSaved: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_V2, serialized);
    return true;
  } catch (error) {
    console.error("Lỗi khi ghi LocalStorage:", error);
    return false;
  }
}

/**
 * Lưu tiến độ của một ngày cụ thể
 */
export function saveDayProgress(dayNumber, dayData) {
  const current = loadState();
  const existingDay = current.days[dayNumber] || initialDayState();
  current.days[dayNumber] = {
    ...existingDay,
    ...dayData,
  };
  saveState(current);
  return current;
}

/**
 * Ghi nhận một lỗi sai vào Sổ tay lỗi
 */
export function logErrorToNotebook({ day, errorCode, prompt, studentAnswer, correctAnswer }) {
  const current = loadState();
  const newError = {
    id: `err-${day}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    day,
    errorCode,
    prompt,
    studentAnswer: String(studentAnswer || ""),
    correctAnswer: String(correctAnswer || ""),
    dateOccurred: new Date().toISOString().split("T")[0],
    resolved: false,
    resolvedAt: null,
  };

  current.errorNotebook = [newError, ...(current.errorNotebook || [])];
  saveState(current);
  return newError;
}

/**
 * Đánh dấu một lỗi trong sổ tay đã được khắc phục
 */
export function resolveNotebookError(errorId) {
  const current = loadState();
  current.errorNotebook = (current.errorNotebook || []).map((err) =>
    err.id === errorId
      ? { ...err, resolved: true, resolvedAt: new Date().toISOString().split("T")[0] }
      : err
  );
  saveState(current);
  return current;
}

/**
 * Đọc trạng thái bài Thử thách tư duy của một ngày
 */
export function getChallengeState(dayNumber) {
  const current = loadState();
  const day = current.days?.[dayNumber] || {};
  return {
    submitted: !!day.challengeSubmitted,
    submittedAnswer: day.challengeAnswer || "",
    submittedAt: day.challengeSubmittedAt || "",
    selfAssessment: day.challengeSelfAssessment || {},
    followUpAnswer: day.challengeFollowUpAnswer || "",
    followUpChecked: !!day.challengeFollowUpChecked,
  };
}

/**
 * Lưu trạng thái bài Thử thách tư duy khi học sinh nộp hoặc tự đánh giá
 */
export function saveChallengeState(dayNumber, challengeData = {}) {
  const current = loadState();
  const existingDay = current.days?.[dayNumber] || initialDayState();
  current.days[dayNumber] = {
    ...existingDay,
    challengeSubmitted: !!challengeData.submitted,
    challengeAnswer: challengeData.submittedAnswer ?? existingDay.challengeAnswer ?? "",
    challengeSubmittedAt: challengeData.submittedAt || existingDay.challengeSubmittedAt || new Date().toISOString(),
    challengeSelfAssessment: challengeData.selfAssessment ?? existingDay.challengeSelfAssessment ?? {},
    challengeFollowUpAnswer: challengeData.followUpAnswer ?? existingDay.challengeFollowUpAnswer ?? "",
    challengeFollowUpChecked: challengeData.followUpChecked ?? existingDay.challengeFollowUpChecked ?? false,
  };
  saveState(current);
  return current;
}

/**
 * Đặt lại trạng thái bài Thử thách tư duy khi học sinh bấm "Làm lại / Sửa bài"
 */
export function resetChallengeState(dayNumber) {
  const current = loadState();
  const existingDay = current.days?.[dayNumber] || initialDayState();
  current.days[dayNumber] = {
    ...existingDay,
    challengeSubmitted: false,
    challengeSubmittedAt: "",
    challengeSelfAssessment: {},
    challengeFollowUpChecked: false,
  };
  saveState(current);
  return current;
}

/**
 * Tạo tệp tải về JSON
 */
export function exportBackupJson(state) {
  const payload = {
    app: "Toan 8 Nen Tang 14 Ngay",
    version: 2,
    exportedAt: new Date().toISOString(),
    ...state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  downloadBlob(blob, `toan8-14-ngay-backup-${new Date().toISOString().slice(0, 10)}.json`);
}

/**
 * Tạo tệp tải về CSV (UTF-8 BOM hỗ trợ tiếng Việt trên Excel)
 */
export function exportToCsv(state, curriculumPlan = []) {
  const headers = [
    "Ngày",
    "Chủ đề",
    "Ngày học thực tế",
    "Điểm số",
    "Tự làm",
    "Mức độ thành thạo",
    "Giải thích quy tắc",
    "Ôn lại sau 2-3 ngày",
    "Mã lỗi",
    "Lỗi quan sát",
    "Ghi chú sư phạm",
    "Kế hoạch buổi sau",
  ];

  const rows = [headers];

  curriculumPlan.forEach((planItem, idx) => {
    const day = idx + 1;
    const d = state.days?.[day] || {};
    rows.push([
      `Ngày ${day}`,
      planItem.topic || "",
      d.actualDate || "",
      d.score || "",
      d.independence || "",
      d.mastery || "",
      d.canExplain || "",
      d.reviewCheck || "",
      (d.errorCodes || []).join("; "),
      d.errorsNote || "",
      d.notes || "",
      d.nextPlan || "",
    ]);
  });

  const csvContent =
    "\uFEFF" +
    rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, `toan8-14-ngay-bao-cao-${new Date().toISOString().slice(0, 10)}.csv`);
}

function downloadBlob(blob, filename) {
  if (typeof window === "undefined") return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
