"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Clock,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Award,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { getLesson } from "../../../data/lessons/index.js";
import { CURRICULUM } from "../../../data/curriculum.js";
import { loadState, saveDayProgress, logErrorToNotebook } from "../../../lib/storage.js";
import { parseScore, calculateAccuracy } from "../../../lib/scoring.js";
import { evaluateMastery } from "../../../lib/masteryRules.js";
import QuestionCard from "../../../components/QuestionCard.jsx";
import StepByStepCard from "../../../components/StepByStepCard.jsx";
import VisualDiagram from "../../../components/VisualDiagram.jsx";
import ChallengeSection from "../../../components/ChallengeSection.jsx";
import MathView from "../../../components/MathView.jsx";

const TABS = [
  { id: "muc-tieu", label: "1. Mục tiêu", icon: Clock },
  { id: "khoi-dong", label: "2. Khởi động", icon: HelpCircle },
  { id: "hoc-hieu", label: "3. Học hiểu", icon: BookOpen },
  { id: "vi-du", label: "4. Ví dụ", icon: Sparkles },
  { id: "huong-dan", label: "5. Luyện hướng dẫn", icon: Lightbulb },
  { id: "tu-luyen", label: "6. Tự luyện", icon: Award },
  { id: "thu-thach", label: "7. Thử thách", icon: Sparkles },
  { id: "tong-ket", label: "8. Tổng kết", icon: CheckCircle2 },
];

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const dayNumber = parseInt(params.day, 10);

  const lesson = getLesson(dayNumber);
  const curriculumMeta = CURRICULUM[dayNumber - 1];

  const [activeTab, setActiveTab] = useState("muc-tieu");
  const [answers, setAnswers] = useState({});
  const [hintsUsedTotal, setHintsUsedTotal] = useState(0);
  const [studentExplain, setStudentExplain] = useState("");
  const [independenceChoice, setIndependenceChoice] = useState("Tự làm độc lập");
  const [canExplainChoice, setCanExplainChoice] = useState("Có, giải thích rõ");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [appState, setAppState] = useState(null);

  useEffect(() => {
    const s = loadState();
    setAppState(s);
    const existingDay = s.days?.[dayNumber];
    if (existingDay) {
      if (existingDay.independence) setIndependenceChoice(existingDay.independence);
      if (existingDay.canExplain) setCanExplainChoice(existingDay.canExplain);
    }
  }, [dayNumber]);

  if (!lesson || !curriculumMeta) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Không tìm thấy bài học ngày {dayNumber}</h2>
        <Link href="/lo-trinh" className="mt-4 inline-block text-blue-600 underline">Quay lại lộ trình</Link>
      </div>
    );
  }

  // Xử lý khi học sinh trả lời một câu hỏi trong phần Tự luyện hoặc Luyện hướng dẫn
  const handleAnswerQuestion = (questionId, choiceId, hintsUsed) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choiceId,
    }));

    if (hintsUsed > 0) {
      setHintsUsedTotal((prev) => prev + hintsUsed);
    }

    // Ghi nhận vào Sổ tay lỗi nếu trả lời sai
    const qObj = [...(lesson.independentPractice || []), ...(lesson.guidedPractice || [])].find((q) => q.id === questionId);
    if (qObj && choiceId !== qObj.correctAnswer) {
      const selectedChoice = qObj.choices?.find((c) => c.id === choiceId);
      logErrorToNotebook({
        day: dayNumber,
        errorCode: selectedChoice?.errorCode || qObj.errorCode || "E1",
        prompt: qObj.prompt,
        studentAnswer: selectedChoice?.text || choiceId,
        correctAnswer: qObj.choices?.find((c) => c.id === qObj.correctAnswer)?.text || qObj.correctAnswer,
      });
    }
  };

  // Tính điểm tự luyện
  const totalPracticeQuestions = lesson.independentPractice?.length || 0;
  const answeredCount = Object.keys(answers).filter((id) =>
    lesson.independentPractice?.some((q) => q.id === id)
  ).length;

  const correctPracticeCount = lesson.independentPractice?.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length || 0;

  const currentScoreStr = `${correctPracticeCount}/${totalPracticeQuestions}`;
  const accuracyRate = calculateAccuracy(correctPracticeCount, totalPracticeQuestions);

  // Đánh giá mastery
  const masteryEval = evaluateMastery({
    scoreStr: currentScoreStr,
    independence: independenceChoice,
    canExplain: canExplainChoice,
    hintsUsed: hintsUsedTotal,
  });

  // Hoàn thành buổi học và lưu vào LocalStorage
  const handleCompleteLesson = () => {
    const errorCodes = [];
    lesson.independentPractice?.forEach((q) => {
      const choiceId = answers[q.id];
      if (choiceId && choiceId !== q.correctAnswer) {
        const choice = q.choices?.find((c) => c.id === choiceId);
        if (choice?.errorCode) errorCodes.push(choice.errorCode);
      }
    });

    saveDayProgress(dayNumber, {
      completed: true,
      completedAt: new Date().toISOString(),
      actualDate: new Date().toISOString().split("T")[0],
      score: currentScoreStr,
      correctCount: correctPracticeCount,
      totalCount: totalPracticeQuestions,
      accuracy: accuracyRate,
      independence: independenceChoice,
      mastery: masteryEval.level,
      canExplain: canExplainChoice,
      hintsUsedTotal,
      errorCodes: Array.from(new Set(errorCodes)),
      notes: studentExplain ? `Học sinh tự giải thích: ${studentExplain}` : "",
    });

    setSavedSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header thanh điều hướng */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/lo-trinh"
          className="touch-target inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh sách 14 ngày</span>
        </Link>
        <div className="flex items-center gap-2">
          {dayNumber > 1 && (
            <Link
              href={`/bai-hoc/${dayNumber - 1}`}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              ← Ngày {dayNumber - 1}
            </Link>
          )}
          {dayNumber < 14 && (
            <Link
              href={`/bai-hoc/${dayNumber + 1}`}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              Ngày {dayNumber + 1} →
            </Link>
          )}
        </div>
      </div>

      {/* Tiêu đề bài học */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wide">
          <span>Ngày {dayNumber} / 14</span>
          <span>·</span>
          <span>{curriculumMeta.category}</span>
        </div>
        <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mt-1">
          {lesson.topic}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
          <strong>Trọng tâm:</strong> {lesson.goal}
        </p>
      </div>

      {/* Tabs điều hướng 8 bước trong bài */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none no-print border-b border-slate-200">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`touch-target px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Nội dung từng Tab */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm">
        {/* TAB 1: MỤC TIÊU & KHUNG GIỜ 60 PHÚT */}
        {activeTab === "muc-tieu" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Mục tiêu buổi học hôm nay
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                {lesson.goal}
              </p>
            </div>

            <div>
              <h3 className="font-heading font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Khung phân bổ 60 phút tham khảo (Linh hoạt theo nhịp học của em)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {lesson.breakdown?.map((b, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full inline-block mb-1">
                      {b.time}
                    </span>
                    <div className="text-xs font-medium text-slate-700">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab("khoi-dong")}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <span>Bắt đầu Khởi động</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: KHỞI ĐỘNG & NHỚ LẠI */}
        {activeTab === "khoi-dong" && (
          <div className="space-y-5">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-1">
                Khởi động / Nhớ lại kiến thức nền
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                1–3 câu hỏi ngắn giúp não bộ kích hoạt kiến thức cũ trước khi học bài mới.
              </p>
            </div>

            {lesson.warmup?.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={idx}
                onAnswer={handleAnswerQuestion}
                userSelected={answers[q.id]}
                showResultImmediate={true}
              />
            ))}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveTab("muc-tieu")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Quay lại Mục tiêu
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hoc-hieu")}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <span>Sang phần Học hiểu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: GIẢI THÍCH DỄ HIỂU (CONCEPT) */}
        {activeTab === "hoc-hieu" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-2">
                {lesson.concept?.title}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {lesson.concept?.content}
              </p>
            </div>

            {/* Sơ đồ trực quan tương tác SVG */}
            {lesson.concept?.visualType && (
              <VisualDiagram type={lesson.concept.visualType} />
            )}

            {/* Bảng các quy tắc cốt lõi */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-sm text-slate-800">
                Các quy tắc cần ghi nhớ:
              </h3>
              {lesson.concept?.rules?.map((r, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-xs text-blue-900 mb-1">{r.rule}</div>
                  <div className="font-mono text-sm font-bold text-slate-900 py-1">
                    <MathView text={r.math} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{r.note}</p>
                </div>
              ))}
            </div>

            {/* Điểm dễ sai cần tránh */}
            {lesson.concept?.commonPitfall && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900">
                <span className="font-bold block mb-1">Cảnh báo ngộ nhận thường gặp:</span>
                <p className="text-slate-700">{lesson.concept.commonPitfall}</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveTab("khoi-dong")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Quay lại Khởi động
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vi-du")}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <span>Xem Ví dụ từng bước</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: VÍ DỤ TỪNG BƯỚC */}
        {activeTab === "vi-du" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-1">
                Ví dụ mẫu từng bước (Tương tác)
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Bấm vào nút <strong>"Xem bước tiếp theo"</strong> để theo dõi từng phép biến đổi và hiểu rõ vì sao lại làm như vậy.
              </p>
            </div>

            {lesson.workedExamples?.map((ex, idx) => (
              <StepByStepCard key={idx} example={ex} index={idx} />
            ))}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveTab("hoc-hieu")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Quay lại Học hiểu
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("huong-dan")}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <span>Luyện tập có hướng dẫn</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: LUYỆN TẬP CÓ HƯỚNG DẪN */}
        {activeTab === "huong-dan" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-1">
                Luyện tập có hướng dẫn (Mở gợi ý 3 nấc)
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Nếu chưa chắc chắn, em có thể bấm <strong>"Mở gợi ý"</strong> để được trợ giúp từng nấc mà không bị lộ ngay đáp án.
              </p>
            </div>

            {lesson.guidedPractice?.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={idx}
                onAnswer={handleAnswerQuestion}
                userSelected={answers[q.id]}
                showResultImmediate={true}
              />
            ))}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveTab("vi-du")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Quay lại Ví dụ
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tu-luyen")}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <span>Vào Tự luyện (Chấm điểm)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: TỰ LUYỆN (CHẤM ĐIỂM) */}
        {activeTab === "tu-luyen" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div>
                <h2 className="font-heading font-bold text-base text-blue-950">
                  Bài tự luyện kiểm tra: {totalPracticeQuestions} câu
                </h2>
                <p className="text-xs text-slate-600">
                  Mục tiêu đạt ít nhất {curriculumMeta.targetScore}/{totalPracticeQuestions} câu đúng (≥ 80%).
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Đã làm: {answeredCount}/{totalPracticeQuestions}</span>
                <span className="font-heading font-extrabold text-lg text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">
                  {currentScoreStr} ({accuracyRate}%)
                </span>
              </div>
            </div>

            {lesson.independentPractice?.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={idx}
                onAnswer={handleAnswerQuestion}
                userSelected={answers[q.id]}
                showResultImmediate={true}
              />
            ))}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveTab("huong-dan")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Quay lại Luyện hướng dẫn
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("thu-thach")}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <span>Sang Thử thách tư duy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: THỬ THÁCH TƯ DUY */}
        {activeTab === "thu-thach" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-1">
                Thử thách tư duy: Trả lời câu hỏi "Vì sao?"
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Toán học không chỉ là tính toán ra số, mà là khả năng lý giải và phát hiện lỗi sai.
              </p>
            </div>

            <ChallengeSection challenge={lesson.challenge} dayNumber={dayNumber} />

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveTab("tu-luyen")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Quay lại Tự luyện
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tong-ket")}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <span>Tổng kết & Đánh giá buổi học</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 8: TỔNG KẾT & ĐÁNH GIÁ THÀNH THẠO */}
        {activeTab === "tong-ket" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Tổng kết buổi học Ngày {dayNumber}
              </h2>
            </div>

            {/* Thẻ ghi nhớ cốt lõi */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 mb-2">3 điều cốt lõi cần nhớ:</div>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                {lesson.summary?.keyTakeaways?.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Câu hỏi kiểm tra khả năng giải thích quy tắc */}
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-xs">
              <label className="font-bold text-blue-950 block mb-1.5">
                {lesson.summary?.explainCheckPrompt}
              </label>
              <textarea
                rows={3}
                value={studentExplain}
                onChange={(e) => setStudentExplain(e.target.value)}
                placeholder="Em giải thích bằng ngôn từ của mình..."
                className="w-full p-3 rounded-lg border border-blue-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Đánh giá mức độ tự làm & giải thích của người dạy/học sinh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mức độ tự làm:</label>
                <select
                  value={independenceChoice}
                  onChange={(e) => setIndependenceChoice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option>Tự làm độc lập</option>
                  <option>Cần gợi ý</option>
                  <option>Cần hướng dẫn từng bước</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Khả năng giải thích quy tắc:</label>
                <select
                  value={canExplainChoice}
                  onChange={(e) => setCanExplainChoice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option>Có, giải thích rõ</option>
                  <option>Một phần / cần nhắc</option>
                  <option>Chưa giải thích được</option>
                </select>
              </div>
            </div>

            {/* Thẻ gợi ý quyết định sư phạm (Mastery Recommendation) */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              masteryEval.shouldAdvance
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : "bg-amber-50 border-amber-200 text-amber-950"
            }`}>
              <div className="font-bold text-sm mb-1 flex items-center gap-2">
                <span>Khuyến nghị chuyển bài: {masteryEval.level}</span>
                <span className="text-xs bg-white px-2 py-0.5 rounded border border-current font-normal">
                  Điểm: {currentScoreStr}
                </span>
              </div>
              <p>{masteryEval.recommendation}</p>
            </div>

            {/* Nút Hoàn thành buổi học */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500">
                {savedSuccess ? "✓ Đã lưu tiến độ trên thiết bị này" : "Bấm nút dưới đây để ghi nhận hoàn thành"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCompleteLesson}
                  className="touch-target px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  {savedSuccess ? "Cập nhật tiến độ" : "Đánh dấu hoàn thành buổi học"}
                </button>
                {dayNumber < 14 && (
                  <Link
                    href={`/bai-hoc/${dayNumber + 1}`}
                    className="touch-target px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-bold text-xs rounded-xl transition-all"
                  >
                    Sang Ngày {dayNumber + 1} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
