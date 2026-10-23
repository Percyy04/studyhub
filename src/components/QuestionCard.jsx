"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, HelpCircle, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import MathView from "./MathView.jsx";
import { ERROR_TAXONOMY } from "../data/errorTaxonomy.js";

export function QuestionCard({
  question,
  index = 0,
  onAnswer,
  userSelected = null,
  showResultImmediate = true,
  disabled = false,
}) {
  const [selectedChoice, setSelectedChoice] = useState(userSelected);
  const [currentHintLevel, setCurrentHintLevel] = useState(0); // 0: closed, 1, 2, 3
  const [showFullExplanation, setShowFullExplanation] = useState(false);

  const handleSelect = (choiceId) => {
    if (disabled) return;
    setSelectedChoice(choiceId);
    if (onAnswer) {
      onAnswer(question.id, choiceId, currentHintLevel);
    }
  };

  const isSubmitted = selectedChoice !== null;
  const isCorrect = selectedChoice === question.correctAnswer;
  const selectedObj = question.choices?.find((c) => c.id === selectedChoice);
  const matchedError = selectedObj?.errorCode ? ERROR_TAXONOMY[selectedObj.errorCode] : null;

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-200 bg-white shadow-sm mb-4 ${
      isSubmitted && showResultImmediate
        ? isCorrect
          ? "border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/20"
          : "border-rose-300 ring-1 ring-rose-200 bg-rose-50/20"
        : "border-slate-200 hover:border-blue-300"
    }`}>
      {/* Header câu hỏi */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
            Câu {index + 1}
          </span>
          {question.skill && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {question.skill}
            </span>
          )}
        </div>
        {isSubmitted && showResultImmediate && (
          <div className="flex items-center gap-1.5 font-semibold text-xs">
            {isCorrect ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                Chính xác!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                <XCircle className="w-4 h-4 text-rose-600" aria-hidden="true" />
                Cần xem lại
              </span>
            )}
          </div>
        )}
      </div>

      {/* Đề bài */}
      <div className="text-base font-medium text-slate-900 mb-4 leading-relaxed">
        <MathView text={question.prompt} />
      </div>

      {/* Danh sách lựa chọn (Touch target >= 44px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        {question.choices?.map((choice) => {
          const isThisSelected = selectedChoice === choice.id;
          const isThisCorrect = choice.id === question.correctAnswer;

          let btnStyle = "border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-800";
          let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";

          if (isSubmitted && showResultImmediate) {
            if (isThisCorrect) {
              btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400";
              badgeStyle = "bg-emerald-600 text-white border-emerald-600";
            } else if (isThisSelected && !isThisCorrect) {
              btnStyle = "border-rose-400 bg-rose-50 text-rose-950 font-medium ring-1 ring-rose-300";
              badgeStyle = "bg-rose-500 text-white border-rose-500";
            } else {
              btnStyle = "border-slate-100 text-slate-400 bg-slate-50/50 opacity-60";
            }
          } else if (isThisSelected) {
            btnStyle = "border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-2 ring-blue-500";
            badgeStyle = "bg-blue-600 text-white border-blue-600";
          }

          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice.id)}
              disabled={disabled}
              className={`touch-target w-full text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold uppercase border ${badgeStyle}`}>
                  {choice.id}
                </span>
                <span className="text-sm">
                  <MathView text={choice.text} />
                </span>
              </div>
              {isSubmitted && showResultImmediate && (
                <div>
                  {isThisCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />}
                  {isThisSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Phản hồi sư phạm khi trả lời sai hoặc đúng */}
      {isSubmitted && showResultImmediate && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          {selectedObj?.note && (
            <p className={`text-xs p-2.5 rounded-lg mb-2 ${isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900 border border-amber-200"}`}>
              {selectedObj.note}
            </p>
          )}

          {/* Cảnh báo mã lỗi sư phạm nếu chọn phương án nhiễu điển hình */}
          {matchedError && !isCorrect && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-2 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs text-rose-900">
                <div className="font-bold flex items-center gap-1.5">
                  <span className="bg-rose-200 text-rose-800 px-1.5 py-0.5 rounded text-[11px] font-mono">{matchedError.code}</span>
                  {matchedError.name}
                </div>
                <div className="mt-1 text-slate-700"><strong>Cách chữa:</strong> {matchedError.remedy}</div>
              </div>
            </div>
          )}

          {/* Lời giải thích chi tiết */}
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800">Giải thích chi tiết: </span>
            <MathView text={question.explanation} />
          </div>
        </div>
      )}

      {/* Gợi ý theo nấc (Hint Accordion) dành cho bài luyện có hướng dẫn */}
      {question.hints && question.hints.length > 0 && !isCorrect && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentHintLevel((prev) => (prev > 0 ? 0 : 1))}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>{currentHintLevel === 0 ? "Mở gợi ý hướng dẫn" : "Đóng gợi ý"}</span>
              {currentHintLevel === 0 ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
            {currentHintLevel > 0 && (
              <span className="text-[11px] text-slate-500">Nấc {currentHintLevel}/{question.hints.length}</span>
            )}
          </div>

          {currentHintLevel > 0 && (
            <div className="mt-2 space-y-2 bg-blue-50/60 p-3 rounded-xl border border-blue-200 text-xs">
              {question.hints.slice(0, currentHintLevel).map((hint, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 text-slate-800">
                  <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {hIdx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-blue-950">Gợi ý {hIdx + 1}: </span>
                    <MathView text={hint} />
                  </div>
                </div>
              ))}
              {currentHintLevel < question.hints.length && (
                <button
                  type="button"
                  onClick={() => setCurrentHintLevel((prev) => prev + 1)}
                  className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                >
                  Xem gợi ý sâu hơn (Nấc {currentHintLevel + 1}) →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
