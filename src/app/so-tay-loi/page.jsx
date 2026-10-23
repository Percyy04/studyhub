"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, AlertCircle, RotateCcw, Filter, Check } from "lucide-react";
import { loadState, resolveNotebookError, saveState } from "../../lib/storage.js";
import { ERROR_TAXONOMY, ERROR_LIST } from "../../data/errorTaxonomy.js";
import MathView from "../../components/MathView.jsx";

// Ngân hàng câu hỏi mẫu tương tự để luyện khắc phục lỗi
const REMEDY_QUESTIONS = {
  E1: [
    { prompt: "Tính: −10 − (−3) =", choices: ["−7", "−13", "7", "13"], correct: "−7", explanation: "−10 − (−3) = −10 + 3 = −7." },
    { prompt: "Tính: 5 − (−8) =", choices: ["13", "−3", "−13", "3"], correct: "13", explanation: "5 − (−8) = 5 + 8 = 13." },
  ],
  E2: [
    { prompt: "Tính: (−4) × (−6) =", choices: ["24", "−24", "−10", "10"], correct: "24", explanation: "Âm nhân âm ra dương: (−4) × (−6) = 24." },
    { prompt: "Tính: (−30) ÷ (−5) =", choices: ["6", "−6", "−5", "5"], correct: "6", explanation: "Cùng dấu âm chia nhau ra dương: 6." },
  ],
  E3: [
    { prompt: "Tính: 3 + 4 × 5 =", choices: ["23", "35", "−23", "20"], correct: "23", explanation: "Nhân trước: 4 × 5 = 20; 3 + 20 = 23." },
    { prompt: "Tính: 20 − 10 ÷ 2 =", choices: ["15", "5", "−15", "10"], correct: "15", explanation: "Chia trước: 10 ÷ 2 = 5; 20 − 5 = 15." },
  ],
  F1: [
    { prompt: "Rút gọn phân số 8/12 về tối giản:", choices: ["2/3", "4/6", "1/2", "3/4"], correct: "2/3", explanation: "Chia cả tử và mẫu cho 4: 8/12 = 2/3." },
  ],
  F2: [
    { prompt: "Tính: 1/3 + 1/6 =", choices: ["1/2", "2/9", "3/6", "2/6"], correct: "1/2", explanation: "MSC = 6: 2/6 + 1/6 = 3/6 = 1/2." },
    { prompt: "Tính: 3/4 − 1/2 =", choices: ["1/4", "2/2 = 1", "1/2", "−1/4"], correct: "1/4", explanation: "3/4 − 2/4 = 1/4." },
  ],
  F3: [
    { prompt: "Tính: 1/2 ÷ 3/4 =", choices: ["2/3", "3/8", "4/6", "3/2"], correct: "2/3", explanation: "1/2 × 4/3 = 4/6 = 2/3." },
  ],
  A1: [
    { prompt: "Khai triển: 4(x + 2) =", choices: ["4x + 8", "4x + 2", "6x", "x + 8"], correct: "4x + 8", explanation: "4 × x + 4 × 2 = 4x + 8." },
  ],
  A2: [
    { prompt: "Bỏ ngoặc: −(2x − 5) =", choices: ["−2x + 5", "−2x − 5", "2x − 5", "2x + 5"], correct: "−2x + 5", explanation: "Đổi dấu cả 2x thành −2x và −5 thành +5." },
  ],
  A3: [
    { prompt: "Thu gọn: 3x + 4x =", choices: ["7x", "7x²", "12x", "7"], correct: "7x", explanation: "(3 + 4)x = 7x." },
  ],
  X1: [
    { prompt: "Tìm x: x + 6 = 10", choices: ["x = 4", "x = 16", "x = −4", "x = 60"], correct: "x = 4", explanation: "x = 10 − 6 = 4." },
  ],
  H1: [
    { prompt: "Hai góc kề bù có một góc bằng 80°, góc còn lại bằng:", choices: ["100°", "10°", "80°", "90°"], correct: "100°", explanation: "180° − 80° = 100°." },
  ],
};

export default function ErrorNotebookPage() {
  const [state, setState] = useState(null);
  const [selectedCodeFilter, setSelectedCodeFilter] = useState("ALL");
  const [practicingErrorId, setPracticingErrorId] = useState(null);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceFeedback, setPracticeFeedback] = useState(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) {
    return <div className="py-20 text-center text-slate-400 text-sm">Đang tải sổ tay lỗi...</div>;
  }

  const errorNotebook = state.errorNotebook || [];

  const filteredErrors = selectedCodeFilter === "ALL"
    ? errorNotebook
    : errorNotebook.filter((err) => err.errorCode === selectedCodeFilter);

  const resolvedCount = errorNotebook.filter((e) => e.resolved).length;

  const handleStartPractice = (err) => {
    setPracticingErrorId(err.id);
    setPracticeAnswer("");
    setPracticeFeedback(null);
  };

  const handleVerifyPractice = (err, qObj, selectedChoice) => {
    const isRight = selectedChoice === qObj.correct;
    setPracticeAnswer(selectedChoice);
    if (isRight) {
      setPracticeFeedback({ success: true, text: "Chính xác! Lỗi đã được đánh dấu là ĐÃ KHẮC PHỤC thành công!" });
      const updated = resolveNotebookError(err.id);
      setState(updated);
    } else {
      setPracticeFeedback({ success: false, text: `Chưa đúng. Đáp án chuẩn là ${qObj.correct}. Giải thích: ${qObj.explanation}` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header trang sổ tay lỗi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-rose-600" aria-hidden="true" />
            Sổ tay lỗi sai & Chữa lỗi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ghi nhận các câu đã làm nhầm, xem vì sao sai và làm bài tập tương tự để chuyển trạng thái sang <strong>Đã khắc phục</strong>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Đã khắc phục: {resolvedCount}/{errorNotebook.length}
          </span>
        </div>
      </div>

      {/* Bảng tra cứu 11 mã lỗi chuẩn E1 - H1 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h2 className="font-heading font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          Lọc theo danh mục 11 mã lỗi chuẩn:
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCodeFilter("ALL")}
            className={`touch-target px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCodeFilter === "ALL"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Tất cả ({errorNotebook.length})
          </button>
          {ERROR_LIST.map((e) => {
            const count = errorNotebook.filter((err) => err.errorCode === e.code).length;
            const isSelected = selectedCodeFilter === e.code;
            return (
              <button
                key={e.code}
                type="button"
                onClick={() => setSelectedCodeFilter(e.code)}
                className={`touch-target px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? "bg-rose-600 text-white shadow-sm"
                    : count > 0
                    ? "bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
                    : "bg-slate-50 text-slate-400 border border-slate-200"
                }`}
              >
                <span className="font-mono font-bold">{e.code}</span>
                <span>{e.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Danh sách lỗi trong sổ tay */}
      <div className="space-y-4">
        {filteredErrors.length > 0 ? (
          filteredErrors.map((err) => {
            const errInfo = ERROR_TAXONOMY[err.errorCode];
            const isPracticing = practicingErrorId === err.id;
            const remedyQ = REMEDY_QUESTIONS[err.errorCode]?.[0];

            return (
              <div
                key={err.id}
                className={`p-5 rounded-2xl border transition-all bg-white shadow-sm ${
                  err.resolved ? "border-emerald-200 bg-emerald-50/15" : "border-rose-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                      {err.errorCode}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{errInfo?.name}</span>
                    <span className="text-xs text-slate-400">· Ngày {err.day}</span>
                  </div>
                  <div>
                    {err.resolved ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đã khắc phục
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Cần luyện khắc phục
                      </span>
                    )}
                  </div>
                </div>

                {/* So sánh Câu đã làm sai vs Đáp án đúng */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs mb-3 space-y-2">
                  <div className="font-semibold text-slate-900">
                    <span className="text-slate-500">Đề bài: </span>
                    <MathView text={err.prompt} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                    <div className="text-rose-700">
                      <strong>Em đã chọn: </strong>
                      <span className="line-through">{err.studentAnswer}</span>
                    </div>
                    <div className="text-emerald-700">
                      <strong>Đáp án đúng: </strong>
                      <span>{err.correctAnswer}</span>
                    </div>
                  </div>
                </div>

                {/* Hướng dẫn khắc phục sư phạm */}
                <div className="text-xs text-slate-700 mb-3 bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-950">Cách sửa / nhắc nhớ: </span>
                  {errInfo?.remedy}
                </div>

                {/* Khu vực Luyện khắc phục */}
                {!err.resolved && (
                  <div className="pt-2 border-t border-slate-100">
                    {!isPracticing ? (
                      <button
                        type="button"
                        onClick={() => handleStartPractice(err)}
                        className="touch-target inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Làm câu tương tự để khắc phục lỗi</span>
                      </button>
                    ) : (
                      <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-xs space-y-3">
                        <div className="font-bold text-blue-950 flex items-center justify-between">
                          <span>Câu luyện khắc phục dạng {err.errorCode}:</span>
                          <button
                            type="button"
                            onClick={() => setPracticingErrorId(null)}
                            className="text-slate-400 hover:text-slate-700 font-normal"
                          >
                            Đóng
                          </button>
                        </div>
                        {remedyQ ? (
                          <div>
                            <div className="text-sm font-semibold text-slate-900 mb-3">
                              <MathView text={remedyQ.prompt} />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {remedyQ.choices.map((choice, cIdx) => (
                                <button
                                  key={cIdx}
                                  type="button"
                                  onClick={() => handleVerifyPractice(err, remedyQ, choice)}
                                  className="touch-target p-2 rounded-lg border border-slate-200 bg-white hover:border-blue-500 font-semibold text-slate-800 text-center cursor-pointer"
                                >
                                  <MathView text={choice} />
                                </button>
                              ))}
                            </div>
                            {practiceFeedback && (
                              <div className={`mt-3 p-2.5 rounded-lg text-xs font-medium ${
                                practiceFeedback.success ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
                              }`}>
                                {practiceFeedback.text}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-slate-500">Mở bài Ngày {err.day} để làm lại phần Tự luyện.</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <div className="font-bold text-slate-800 text-base">Sổ tay lỗi sạch bóng!</div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Không có lỗi nào cần khắc phục trong mục này. Khi em làm bài tập và lỡ trả lời sai, các câu hỏi sẽ tự động được lưu vào đây để em ôn tập lại.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
