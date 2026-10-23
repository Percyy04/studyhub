"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";
import MathView from "./MathView.jsx";

export function StepByStepCard({ example, index = 0 }) {
  const [visibleStep, setVisibleStep] = useState(1);
  const totalSteps = example.steps?.length || 0;

  const handleNextStep = () => {
    if (visibleStep < totalSteps) {
      setVisibleStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setVisibleStep(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-heading font-bold text-base text-blue-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
            {index + 1}
          </span>
          {example.title}
        </h4>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          Bước {visibleStep} / {totalSteps}
        </span>
      </div>

      {/* Đề bài */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 mb-4">
        <MathView text={example.problem} />
      </div>

      {/* Danh sách các bước giải */}
      <div className="space-y-3 mb-4">
        {example.steps?.slice(0, visibleStep).map((s) => (
          <div
            key={s.step}
            className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/40 text-sm animate-fadeIn"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                {s.step}
              </span>
              <span className="font-medium text-slate-800">{s.description}</span>
            </div>
            <div className="pl-7 font-mono font-bold text-blue-950 text-base py-1">
              <MathView text={s.math} />
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng các bước */}
      <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
        {visibleStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="touch-target inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <span>Xem bước tiếp theo (Bước {visibleStep + 1})</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="touch-target inline-flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Xem lại từ đầu</span>
          </button>
        )}
      </div>

      {/* Điểm dễ sai & Cách tự kiểm tra (hiện khi đã xem hết bước) */}
      {visibleStep >= totalSteps && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
          {example.pitfall && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-rose-900 block mb-0.5">Điểm học sinh hay sai:</span>
                <span className="text-slate-700">{example.pitfall}</span>
              </div>
            </div>
          )}
          {example.selfCheck && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-bold text-emerald-900 block mb-0.5">Cách tự kiểm tra lại:</span>
                <span className="text-slate-700">{example.selfCheck}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StepByStepCard;
