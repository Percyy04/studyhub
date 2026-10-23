"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Send,
  BookOpen,
  CheckSquare,
  Square,
  ArrowRight,
  HelpCircle,
  Award,
  Lightbulb,
} from "lucide-react";
import MathView from "./MathView.jsx";
import { evaluateAnswer, evaluateFollowUp } from "../lib/challengeEvaluator.js";
import {
  getChallengeState,
  saveChallengeState,
  resetChallengeState,
} from "../lib/storage.js";

export function ChallengeSection({ challenge, dayNumber = 1 }) {
  const [userReflection, setUserReflection] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [submittedAt, setSubmittedAt] = useState("");
  const [preliminaryResult, setPreliminaryResult] = useState(null);
  const [selfAssessment, setSelfAssessment] = useState({});
  const [followUpInput, setFollowUpInput] = useState("");
  const [followUpResult, setFollowUpResult] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Khôi phục trạng thái từ LocalStorage khi khởi tạo
  useEffect(() => {
    if (!dayNumber) return;
    const saved = getChallengeState(dayNumber);
    if (saved && saved.submitted && saved.submittedAnswer) {
      setIsSubmitted(true);
      setSubmittedAnswer(saved.submittedAnswer);
      setUserReflection(saved.submittedAnswer);
      setSubmittedAt(saved.submittedAt || "");
      setSelfAssessment(saved.selfAssessment || {});
      setFollowUpInput(saved.followUpAnswer || "");

      // Chấm sơ bộ lại câu trả lời đã lưu
      const evaluated = evaluateAnswer(saved.submittedAnswer, {
        ...challenge,
        day: dayNumber,
      });
      setPreliminaryResult(evaluated);

      // Nếu đã có câu trả lời kiểm tra hiểu bài
      if (saved.followUpAnswer && saved.followUpChecked) {
        const ped = challenge?.pedagogicalSolution?.followUpCheck;
        const res = evaluateFollowUp(saved.followUpAnswer, ped);
        setFollowUpResult(res);
      }
    }
    setIsLoaded(true);
  }, [dayNumber, challenge]);

  if (!challenge) return null;

  // Danh sách tiêu chí Rubric chuẩn hóa
  const rubricList = Array.isArray(challenge.rubric)
    ? challenge.rubric.map((item, idx) => {
        if (typeof item === "string") {
          return { id: `c${idx + 1}`, label: item, tip: "" };
        }
        return {
          id: item.id || `c${idx + 1}`,
          label: item.label || "",
          tip: item.tip || "",
        };
      })
    : [];

  const pedagogical = challenge.pedagogicalSolution;

  // Xử lý nộp câu trả lời
  const handleSubmit = (e) => {
    e?.preventDefault();
    const cleanAnswer = userReflection.trim();
    if (!cleanAnswer) return;

    const evaluated = evaluateAnswer(cleanAnswer, {
      ...challenge,
      day: dayNumber,
    });

    const now = new Date().toISOString();
    setIsSubmitted(true);
    setSubmittedAnswer(cleanAnswer);
    setSubmittedAt(now);
    setPreliminaryResult(evaluated);

    // Lưu vào LocalStorage
    saveChallengeState(dayNumber, {
      submitted: true,
      submittedAnswer: cleanAnswer,
      submittedAt: now,
      selfAssessment: {},
      followUpAnswer: "",
      followUpChecked: false,
    });
  };

  // Xử lý làm lại / chỉnh sửa câu trả lời
  const handleReset = () => {
    setIsSubmitted(false);
    setPreliminaryResult(null);
    setSelfAssessment({});
    setFollowUpInput("");
    setFollowUpResult(null);
    resetChallengeState(dayNumber);
  };

  // Tự đánh giá qua Rubric (học sinh tự tích chọn)
  const toggleSelfCriterion = (criterionId) => {
    if (!isSubmitted) return;
    const nextState = {
      ...selfAssessment,
      [criterionId]: !selfAssessment[criterionId],
    };
    setSelfAssessment(nextState);

    saveChallengeState(dayNumber, {
      submitted: true,
      submittedAnswer,
      submittedAt,
      selfAssessment: nextState,
      followUpAnswer: followUpInput,
      followUpChecked: !!followUpResult,
    });
  };

  // Xử lý kiểm tra câu hỏi hiểu bài (Mục E)
  const handleCheckFollowUp = (e) => {
    e?.preventDefault();
    if (!followUpInput.trim()) return;

    const followUpConfig = pedagogical?.followUpCheck || {};
    const res = evaluateFollowUp(followUpInput, followUpConfig);
    setFollowUpResult(res);

    saveChallengeState(dayNumber, {
      submitted: true,
      submittedAnswer,
      submittedAt,
      selfAssessment,
      followUpAnswer: followUpInput,
      followUpChecked: true,
    });
  };

  // Tính điểm tự đánh giá của học sinh
  const selfPassedCount = rubricList.filter((c) => !!selfAssessment[c.id]).length;
  const totalRubricCount = rubricList.length;

  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 border border-indigo-200 rounded-2xl p-4 sm:p-6 mb-6 shadow-sm">
      {/* Tiêu đề thử thách */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-heading font-extrabold text-lg text-indigo-950">
              {challenge.title}
            </h3>
            <p className="text-xs text-indigo-700/80">
              Phát hiện lỗi sai và lý giải bản chất toán học
            </p>
          </div>
        </div>

        {isSubmitted && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đã nộp bài</span>
          </span>
        )}
      </div>

      {/* Đề bài thử thách */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-indigo-100 shadow-xs text-sm font-medium text-slate-800 leading-relaxed mb-5 whitespace-pre-line">
        <MathView text={challenge.prompt} />
      </div>

      {/* ============================================================ */}
      {/* TRẠNG THÁI A: CHƯA NỘP BÀI                                  */}
      {/* ============================================================ */}
      {!isSubmitted && (
        <div className="space-y-5 animate-fadeIn">
          {/* Ô nhập câu trả lời của học sinh */}
          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-xs">
            <label
              htmlFor="challenge-reflection-input"
              className="block text-xs font-bold text-slate-800 mb-1.5"
            >
              Ghi lại câu trả lời hoặc suy luận của em:
            </label>
            <textarea
              id="challenge-reflection-input"
              rows={4}
              value={userReflection}
              onChange={(e) => setUserReflection(e.target.value)}
              placeholder="Em hãy giải thích: Bạn An đã sai ở bước nào? Vì sao việc lấy 8 + 5 rồi đặt dấu trừ là chưa đúng quy tắc? Phép tính đúng phải sửa lại thế nào?..."
              className="w-full text-sm p-3.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 transition-all placeholder:text-slate-400"
            />
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1.5">
              <span>
                {userReflection.trim().length === 0 ? (
                  <span className="text-amber-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Hãy nhập câu trả lời của em trước khi nhấn nộp bài.
                  </span>
                ) : (
                  <span>Đã viết: {userReflection.trim().length} ký tự</span>
                )}
              </span>
              <span className="text-slate-400 text-[11px]">
                Gợi ý: Chỉ ra lỗi của An → Nêu quy tắc đổi dấu → Tính đáp án đúng.
              </span>
            </div>
          </div>

          {/* Bảng tiêu chí Rubric xem trước (Bị khóa trước khi nộp bài) */}
          {rubricList.length > 0 && (
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Bảng tiêu chí tự kiểm tra (Rubric) — Sẽ mở sau khi nộp:</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                  Chưa mở khóa
                </span>
              </div>
              <div className="space-y-2">
                {rubricList.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex items-start gap-2.5 text-xs text-slate-500 opacity-75 select-none"
                  >
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-600">Tiêu chí {idx + 1}:</strong>{" "}
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-slate-500 italic flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  Sau khi nộp câu trả lời, em sẽ được xem lời giải chi tiết và tự tích điểm theo các tiêu chí trên.
                </span>
              </p>
            </div>
          )}

          {/* Nút nộp bài */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              disabled={userReflection.trim().length === 0}
              onClick={handleSubmit}
              className={`touch-target inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm shadow-md transition-all cursor-pointer ${
                userReflection.trim().length > 0
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-indigo-300"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Nộp câu trả lời & Mở khóa lời giải</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TRẠNG THÁI B: ĐÃ NỘP BÀI                                     */}
      {/* ============================================================ */}
      {isSubmitted && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. KHU VỰC CÂU TRẢ LỜI ĐÃ NỘP */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-indigo-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Câu trả lời của em đã nộp:</span>
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                title="Sửa lại câu trả lời và nộp lại"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại / Chỉnh sửa câu trả lời</span>
              </button>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
              {submittedAnswer}
            </div>
          </div>

          {/* 2. NHẬN XÉT SƠ BỘ TỪ HỆ THỐNG (LOCAL EVALUATOR) */}
          {preliminaryResult && (
            <div className="bg-blue-50/70 p-4 sm:p-5 rounded-xl border border-blue-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-blue-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-blue-600 text-white">
                    <Award className="w-4 h-4" />
                  </span>
                  <h4 className="font-heading font-bold text-sm text-blue-950">
                    Đánh giá sơ bộ của hệ thống (Quy tắc tự động)
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-800 font-medium">
                    Điểm sơ bộ:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-600 text-white">
                    {preliminaryResult.preliminaryScore} / {preliminaryResult.maxScore} tiêu chí
                  </span>
                </div>
              </div>

              {/* Lời nhận xét chung */}
              <p className="text-xs font-semibold text-blue-900 mb-3 leading-relaxed">
                {preliminaryResult.overallFeedback}
              </p>

              {/* Từng tiêu chí phân tích */}
              <div className="space-y-2.5">
                {preliminaryResult.criteriaResults.map((crit, idx) => {
                  const isPass = crit.status === "passed";
                  const isFail = crit.status === "failed";
                  return (
                    <div
                      key={crit.id || idx}
                      className={`p-3 rounded-lg border text-xs leading-relaxed ${
                        isPass
                          ? "bg-emerald-50/90 border-emerald-200 text-emerald-950"
                          : isFail
                          ? "bg-amber-50/90 border-amber-200 text-amber-950"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        {isPass ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : isFail ? (
                          <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        ) : (
                          <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        )}
                        <span className="font-bold">
                          Tiêu chí {idx + 1}: {crit.label}
                        </span>
                      </div>
                      <p className="pl-6 text-[11.5px] opacity-90">{crit.feedback}</p>
                      {!isPass && crit.tip && (
                        <p className="pl-6 mt-1.5 text-[11px] font-medium text-amber-900 flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Gợi ý hoàn thiện: {crit.tip}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-3.5 p-2.5 rounded-lg bg-blue-100/60 border border-blue-200 text-[11px] text-blue-800 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  <strong>Lưu ý:</strong> Điểm sơ bộ trên do máy phân tích tự động để hỗ trợ em. Em hãy đọc lời giải chuẩn bên dưới và tự mình đánh giá lại bài làm qua Rubric nhé!
                </span>
              </div>
            </div>
          )}

          {/* 3. LỜI GIẢI VÀ LẬP LUẬN THAM KHẢO CHUẨN SƯ PHẠM */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-emerald-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
              <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
                <BookOpen className="w-4 h-4" />
              </span>
              <h4 className="font-heading font-extrabold text-base text-emerald-950">
                Lời giải và Lập luận tham khảo chuẩn mực
              </h4>
            </div>

            {/* Nếu có cấu trúc pedagogicalSolution chuyên sâu */}
            {pedagogical ? (
              <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                {/* Mục A: Nhận xét bài làm của An */}
                {pedagogical.studentCritique && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <h5 className="font-bold text-emerald-900 text-sm mb-2">
                      {pedagogical.studentCritique.title}
                    </h5>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-700 mb-2 font-medium">
                      {pedagogical.studentCritique.points?.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                    <p className="text-[11.5px] text-emerald-800 font-semibold italic">
                      {pedagogical.studentCritique.explanation}
                    </p>
                  </div>
                )}

                {/* Mục B: Ôn lại kiến thức cần nhớ */}
                {pedagogical.knowledgeReview && (
                  <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                    <h5 className="font-bold text-indigo-900 text-sm mb-2">
                      {pedagogical.knowledgeReview.title}
                    </h5>
                    <div className="p-2.5 rounded-lg bg-white border border-indigo-200 mb-2 font-bold text-indigo-950 text-xs">
                      Quy tắc: {pedagogical.knowledgeReview.rule}
                    </div>
                    {pedagogical.knowledgeReview.concept && (
                      <p className="text-slate-700 mb-2 font-medium">
                        {pedagogical.knowledgeReview.concept}
                      </p>
                    )}
                    {pedagogical.knowledgeReview.examples && (
                      <div className="space-y-1 text-slate-700">
                        <span className="font-semibold text-indigo-900">Ví dụ:</span>
                        <ul className="list-disc list-inside pl-2 space-y-0.5">
                          {pedagogical.knowledgeReview.examples.map((ex, eIdx) => (
                            <li key={eIdx}>
                              <MathView text={ex} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Mục C: Giải từng bước chuẩn mực */}
                {pedagogical.stepByStep && (
                  <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                    <h5 className="font-bold text-amber-950 text-sm mb-2.5">
                      {pedagogical.stepByStep.title}
                    </h5>
                    <div className="space-y-2 mb-3">
                      {pedagogical.stepByStep.steps?.map((st) => (
                        <div
                          key={st.step}
                          className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-amber-200 font-medium"
                        >
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                            {st.step}
                          </span>
                          <span className="text-slate-800">
                            <MathView text={st.text} />
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{pedagogical.stepByStep.conclusion}</span>
                    </div>
                  </div>
                )}

                {/* Mục D: Giải thích vì sao */}
                {pedagogical.whyExplanation && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <h5 className="font-bold text-slate-900 text-sm mb-1.5">
                      {pedagogical.whyExplanation.title}
                    </h5>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {pedagogical.whyExplanation.content}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback cho các bài học khác nếu có sampleSolution dạng chuỗi */
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {challenge.sampleSolution}
              </div>
            )}
          </div>

          {/* 4. BẢNG TIÊU CHÍ RUBRIC TỰ ĐÁNH GIÁ (INTERACTIVE) */}
          {rubricList.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-indigo-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-indigo-950 flex items-center gap-1.5">
                    <span>✍️ Bảng tự đánh giá của em (Rubric)</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Đối chiếu câu trả lời của em với lời giải trên và tự tích chọn:
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-indigo-900 font-semibold">
                    Điểm tự đánh giá:
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white shadow-xs">
                    {selfPassedCount} / {totalRubricCount} tiêu chí
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {rubricList.map((item, idx) => {
                  const isChecked = !!selfAssessment[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isChecked
                          ? "bg-emerald-50/70 border-emerald-300"
                          : "bg-slate-50/70 border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSelfCriterion(item.id)}
                        className="w-full text-left flex items-start gap-3 cursor-pointer select-none"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <span
                            className={`text-xs font-bold ${
                              isChecked ? "text-emerald-950" : "text-slate-800"
                            }`}
                          >
                            Tiêu chí {idx + 1}: {item.label}
                          </span>
                        </div>
                      </button>

                      {/* Hướng dẫn khi chưa đạt tiêu chí */}
                      {!isChecked && item.tip && (
                        <p className="mt-2 pl-8 text-[11px] text-indigo-800/80 font-medium flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{item.tip}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {selfPassedCount === totalRubricCount && (
                <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Tuyệt vời! Em đã tự đánh giá hoàn thành xuất sắc cả {totalRubricCount} tiêu chí của thử thách tư duy!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 5. CÂU HỎI KIỂM TRA HIỂU BÀI (MỤC E - FOLLOW-UP CHECK) */}
          {pedagogical?.followUpCheck && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-purple-600 text-white">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <h5 className="font-heading font-extrabold text-sm text-purple-950">
                  {pedagogical.followUpCheck.title || "Kiểm tra hiểu bài tức thì"}
                </h5>
              </div>
              <p className="text-xs font-semibold text-slate-700 mb-3">
                {pedagogical.followUpCheck.prompt}
              </p>

              <form
                onSubmit={handleCheckFollowUp}
                className="flex flex-wrap items-center gap-2 mb-3"
              >
                <input
                  type="text"
                  value={followUpInput}
                  onChange={(e) => setFollowUpInput(e.target.value)}
                  placeholder="Nhập kết quả số..."
                  className="w-36 text-xs p-2.5 rounded-xl border border-purple-300 bg-white font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  disabled={!followUpInput.trim()}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Kiểm tra đáp án
                </button>
              </form>

              {followUpResult && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed font-medium border ${
                    followUpResult.isCorrect
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-amber-50 border-amber-200 text-amber-950"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {followUpResult.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chính xác!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Chưa chính xác:</span>
                      </>
                    )}
                  </div>
                  <p>{followUpResult.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChallengeSection;
