"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import { loadState } from "../lib/storage.js";
import { aggregateStats } from "../lib/scoring.js";
import { CURRICULUM } from "../data/curriculum.js";
import { ERROR_TAXONOMY } from "../data/errorTaxonomy.js";
import { detectRecurringErrors } from "../lib/masteryRules.js";

export default function HomePage() {
  const [state, setState] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  if (!mounted || !state) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Đang tải bảng điều khiển...
      </div>
    );
  }

  const stats = aggregateStats(state.days);
  const recurringErrors = detectRecurringErrors(state.days);

  // Xác định ngày học tiếp theo
  let nextDay = 1;
  for (let i = 1; i <= 14; i++) {
    if (!state.days?.[i]?.completed) {
      nextDay = i;
      break;
    }
    if (i === 14) nextDay = 14;
  }
  const nextCurriculum = CURRICULUM[nextDay - 1];

  // Danh sách các ngày cần ôn tập lại sau 2-3 ngày
  const reviewNeededDays = Object.entries(state.days || {})
    .filter(([_, d]) => d.completed && !d.reviewCheck)
    .slice(0, 3);

  // Thống kê lỗi sai thực tế từ học sinh
  const errorCounts = {};
  Object.values(state.days || {}).forEach((d) => {
    (d.errorCodes || []).forEach((c) => {
      errorCounts[c] = (errorCounts[c] || 0) + 1;
    });
  });
  const topErrors = Object.entries(errorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Banner Chào mừng & Slogan */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm mb-3">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tiến độ cá nhân trên thiết bị hiện tại</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight">
            Mỗi ngày vững hơn một chút
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            Học Toán để <strong>hiểu vì sao</strong>, không học vẹt. Lộ trình 14 ngày củng cố nền tảng vững chắc để tự tin chinh phục chương trình Toán lớp 8.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={`/bai-hoc/${nextDay}`}
              className="touch-target inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-heading font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <span>Tiếp tục học: Ngày {nextDay}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/lo-trinh"
              className="touch-target inline-flex items-center gap-2 bg-blue-800/40 hover:bg-blue-800/60 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-all"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Xem lộ trình 14 ngày</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Thẻ Thống kê Cốt lõi */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Buổi đã ghi nhận</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
            {stats.recordedSessions}/14
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(stats.recordedSessions / 14) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Tổng câu đúng / tổng câu</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
            {stats.scoreDisplay}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Mốc đầu vào tham khảo: 7/20 (35%)</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Tỷ lệ đúng</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 mt-1">
            {stats.accuracyDisplay}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Mục tiêu mỗi buổi: ≥ 80%</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Kỹ năng thành thạo</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-blue-600 mt-1">
            {stats.masteredCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Đạt ≥ 8/10 & giải thích rõ</p>
        </div>
      </section>

      {/* Khu vực Lộ trình gợi ý & Nhắc ôn tập */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột chính: Bài học tiếp theo */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Nội dung học tiếp theo
            </h2>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              60 phút
            </span>
          </div>

          <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-50/60 to-slate-50 rounded-2xl border border-blue-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1">
              <span>Ngày {nextDay}</span>
              <span>·</span>
              <span>{nextCurriculum?.category}</span>
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              {nextCurriculum?.topic}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              <strong>Mục tiêu:</strong> {nextCurriculum?.goal}
            </p>
            <div className="mt-4 pt-4 border-t border-blue-200/60 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Kiểm tra gợi ý: {nextCurriculum?.testGoal}
              </span>
              <Link
                href={`/bai-hoc/${nextDay}`}
                className="touch-target inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                <span>Vào học ngay</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Cảnh báo lỗi lặp cần chữa (nếu xuất hiện >= 2 buổi) */}
          {recurringErrors.length > 0 && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-amber-950">
                  <div className="font-bold text-amber-900 text-sm">
                    Lưu ý: Có {recurringErrors.length} mã lỗi lặp lại từ 2 buổi trở lên
                  </div>
                  <p className="mt-1 text-slate-700">
                    Hệ thống sẽ tự động đưa 1–3 câu ôn dạng này vào phần Khởi động buổi sau để giúp em chữa dứt điểm:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recurringErrors.map((re) => {
                      const errInfo = ERROR_TAXONOMY[re.errorCode];
                      return (
                        <span key={re.errorCode} className="inline-flex items-center gap-1 bg-white border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-medium text-amber-900">
                          <span className="font-mono font-bold text-amber-700">{re.errorCode}</span>: {errInfo?.name} ({re.occurrences} buổi)
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cột phụ: Nhắc ôn tập & Kỹ năng cần luyện thêm */}
        <div className="space-y-6">
          {/* Box nhắc ôn tập sau 2-3 ngày */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
              <RotateCcw className="w-4 h-4 text-blue-600" aria-hidden="true" />
              Nhắc ôn tập sau 2–3 ngày
            </h3>
            {reviewNeededDays.length > 0 ? (
              <div className="space-y-2.5">
                {reviewNeededDays.map(([dayNum, dayRec]) => {
                  const currItem = CURRICULUM[parseInt(dayNum, 10) - 1];
                  return (
                    <div key={dayNum} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="font-semibold text-slate-900 flex justify-between">
                        <span>Ngày {dayNum}: {currItem?.topic}</span>
                        <span className="text-blue-600 font-bold">{dayRec.score}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-1">Đã học xong · Cần làm lại 3–5 câu để kiểm tra ghi nhớ bền vững.</p>
                      <Link
                        href={`/bai-hoc/${dayNum}`}
                        className="inline-block mt-2 font-bold text-blue-600 hover:text-blue-800 text-[11px]"
                      >
                        Ôn lại bài này →
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Chưa có bài nào đến hạn ôn tập. Khi em học xong bài mới, lịch ôn 2–3 ngày sẽ hiện ở đây.
              </p>
            )}
          </div>

          {/* Kỹ năng nên luyện thêm từ lỗi thực tế */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-rose-600" aria-hidden="true" />
              Kỹ năng nên luyện thêm
            </h3>
            {topErrors.length > 0 ? (
              <div className="space-y-2">
                {topErrors.map(([code, count]) => {
                  const errInfo = ERROR_TAXONOMY[code];
                  return (
                    <div key={code} className="p-2.5 bg-rose-50/50 rounded-xl border border-rose-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-rose-900">
                        <span>{code} — {errInfo?.name}</span>
                        <span className="text-xs bg-rose-200/70 text-rose-800 px-1.5 py-0.5 rounded font-mono">
                          {count} lần
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{errInfo?.remedy}</p>
                    </div>
                  );
                })}
                <Link
                  href="/so-tay-loi"
                  className="block text-center text-xs font-bold text-rose-600 hover:text-rose-800 pt-1"
                >
                  Mở Sổ tay lỗi sai để luyện bài khắc phục →
                </Link>
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span>Chưa ghi nhận mã lỗi nào cần chữa. Rất tốt!</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
