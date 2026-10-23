"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, ArrowRight, AlertCircle, Compass } from "lucide-react";
import { loadState } from "../../lib/storage.js";
import { CURRICULUM } from "../../data/curriculum.js";

export default function RoadmapPage() {
  const [state, setState] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  if (!mounted || !state) {
    return <div className="py-20 text-center text-slate-400 text-sm">Đang tải lộ trình...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header trang lộ trình */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 flex items-center gap-2">
            <Compass className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Lộ trình 14 ngày củng cố Toán 8
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Học tuần tự từng bước, giải quyết dứt điểm các lỗ hổng từ lớp 6–7 để sẵn sàng cho Toán lớp 8
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Xong: {Object.values(state.days || {}).filter((d) => d.completed).length}/14 buổi
          </span>
        </div>
      </div>

      {/* Danh sách 14 Ngày */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CURRICULUM.map((item) => {
          const dayData = state.days?.[item.day] || {};
          const isDone = !!dayData.completed;
          const score = dayData.score;
          const mastery = dayData.mastery;

          // Xác định tag trạng thái
          let statusText = "Chưa học";
          let statusStyle = "bg-slate-100 text-slate-600 border-slate-200";

          if (isDone) {
            statusText = mastery || "Đã hoàn thành";
            statusStyle =
              mastery === "Thành thạo" || mastery === "Vững bền"
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : mastery === "Có thể chuyển"
                ? "bg-blue-100 text-blue-800 border-blue-300"
                : "bg-amber-100 text-amber-800 border-amber-300";
          } else if (score) {
            statusText = "Đang học";
            statusStyle = "bg-blue-50 text-blue-700 border-blue-200";
          }

          // Kiểm tra kiến thức tiên quyết
          const missingPrereqs = (item.prerequisiteDays || []).filter(
            (pDay) => !state.days?.[pDay]?.completed
          );
          const hasWarning = missingPrereqs.length > 0 && !isDone;

          return (
            <div
              key={item.day}
              className={`p-5 rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between ${
                isDone
                  ? "border-emerald-200 hover:border-emerald-300 shadow-sm"
                  : "border-slate-200 hover:border-blue-300 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-heading font-extrabold text-xs flex items-center justify-center">
                      {item.day}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${statusStyle}`}>
                    {statusText}
                  </span>
                </div>

                <h2 className="font-heading font-bold text-base text-slate-900 mt-1">
                  {item.topic}
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  <strong>Mục tiêu:</strong> {item.goal}
                </p>

                {hasWarning && (
                  <div className="mt-2.5 p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Khuyến nghị nên hoàn thành Ngày {missingPrereqs.join(", ")} trước bài này.</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.timeMinutes}’
                  </span>
                  {score && (
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Điểm: {score}
                    </span>
                  )}
                </div>

                <Link
                  href={`/bai-hoc/${item.day}`}
                  className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  <span>{isDone ? "Học lại / Xem bài" : "Vào học"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
