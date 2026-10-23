"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Award,
  Download,
  Upload,
  Printer,
  Save,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  loadState,
  saveState,
  saveDayProgress,
  exportBackupJson,
  exportToCsv,
  initialDayState,
} from "../../lib/storage.js";
import { CURRICULUM } from "../../data/curriculum.js";
import { ERROR_LIST } from "../../data/errorTaxonomy.js";
import { aggregateStats, parseScore } from "../../lib/scoring.js";
import { evaluateMastery } from "../../lib/masteryRules.js";

export default function TutorWorkspacePage() {
  const [state, setState] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [form, setForm] = useState(initialDayState());
  const [globalNotes, setGlobalNotes] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const s = loadState();
    setState(s);
    setGlobalNotes(s.globalNotes || "");
    loadDayIntoForm(1, s);
  }, []);

  const loadDayIntoForm = (dayNum, currentState) => {
    const d = currentState?.days?.[dayNum] || initialDayState();
    setForm({
      ...initialDayState(),
      ...d,
      errorCodes: d.errorCodes || [],
    });
    setSaveStatus("");
  };

  const handleSelectDay = (dayNum) => {
    setCurrentDay(dayNum);
    loadDayIntoForm(dayNum, state);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleErrorCode = (code) => {
    setForm((prev) => {
      const current = prev.errorCodes || [];
      const updated = current.includes(code)
        ? current.filter((c) => c !== code)
        : [...current, code];
      return { ...prev, errorCodes: updated };
    });
  };

  const handleSaveDay = () => {
    if (form.score && !parseScore(form.score)) {
      alert("Điểm số chưa đúng định dạng. Hãy nhập dạng như: 8/10 hoặc 16/20");
      return;
    }

    const updatedState = saveDayProgress(currentDay, {
      ...form,
      completed: !!(form.actualDate || form.score || form.notes),
    });
    setState(updatedState);
    setSaveStatus("Đã lưu thành công!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleClearCurrentDay = () => {
    if (confirm(`Xóa ghi nhận của Ngày ${currentDay}?`)) {
      const newState = { ...state };
      delete newState.days[currentDay];
      saveState(newState);
      setState(newState);
      loadDayIntoForm(currentDay, newState);
    }
  };

  const handleSaveGlobalNotes = () => {
    const newState = { ...state, globalNotes };
    saveState(newState);
    setState(newState);
    alert("Đã lưu ghi chú dài hạn trên thiết bị này.");
  };

  const handleResetAll = () => {
    if (
      confirm(
        "CẢNH BÁO: Xóa toàn bộ dữ liệu 14 ngày và nhật ký trên thiết bị này?\nHãy xuất file JSON sao lưu trước nếu cần giữ dữ liệu!"
      )
    ) {
      const fresh = { version: 2, studentName: "Bạn học", days: {}, errorNotebook: [], globalNotes: "" };
      saveState(fresh);
      setState(fresh);
      setGlobalNotes("");
      loadDayIntoForm(1, fresh);
      setCurrentDay(1);
    }
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (!parsed || typeof parsed !== "object" || !parsed.days) {
          throw new Error("Invalid structure");
        }
        if (confirm("Nhập bản sao lưu và thay thế dữ liệu hiện tại trên thiết bị này?")) {
          saveState(parsed);
          setState(parsed);
          setGlobalNotes(parsed.globalNotes || "");
          loadDayIntoForm(currentDay, parsed);
          alert("Đã nhập dữ liệu sao lưu thành công!");
        }
      } catch (err) {
        alert("Tệp JSON sao lưu không hợp lệ hoặc bị hỏng.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  if (!state) {
    return <div className="py-20 text-center text-slate-400 text-sm">Đang tải không gian gia sư...</div>;
  }

  const currItem = CURRICULUM[currentDay - 1];
  const stats = aggregateStats(state.days);

  // Đánh giá quyết định sư phạm tự động
  const decision = evaluateMastery({
    scoreStr: form.score,
    independence: form.independence,
    canExplain: form.canExplain,
    reviewScoreStr: form.reviewCheck,
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Công cụ sao lưu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 no-print">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" aria-hidden="true" />
            Không gian Theo dõi & Điều chỉnh Sư phạm
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gia sư và người dạy ghi nhận tiến độ, đánh giá mức độ độc lập, ghi chú và xuất báo cáo
          </p>
        </div>

        {/* Nút hành động sao lưu */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => exportBackupJson(state)}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-slate-700 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Xuất JSON</span>
          </button>
          <button
            type="button"
            onClick={() => exportToCsv(state, CURRICULUM)}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-slate-700 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Xuất CSV</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-slate-700 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>In / Lưu PDF</span>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="touch-target inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-blue-700 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Nhập sao lưu</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJson}
            accept=".json,application/json"
            className="hidden"
          />
        </div>
      </div>

      {/* Bảng tóm tắt chỉ số */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm print-page">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500">Buổi đã ghi nhận</span>
            <div className="font-heading font-extrabold text-xl text-slate-900 mt-0.5">{stats.recordedSessions}/14</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500">Tổng câu đúng / câu</span>
            <div className="font-heading font-extrabold text-xl text-slate-900 mt-0.5">{stats.scoreDisplay}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500">Tỷ lệ chính xác</span>
            <div className="font-heading font-extrabold text-xl text-emerald-600 mt-0.5">{stats.accuracyDisplay}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500">Kỹ năng thành thạo</span>
            <div className="font-heading font-extrabold text-xl text-blue-600 mt-0.5">{stats.masteredCount}</div>
          </div>
        </div>
      </section>

      {/* Bộ chọn Ngày & Form chỉnh sửa nhật ký buổi học */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Danh sách 14 buổi bên trái */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm no-print">
          <h2 className="font-heading font-bold text-sm text-slate-900 mb-3">14 Buổi học</h2>
          <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
            {CURRICULUM.map((item) => {
              const d = state.days?.[item.day] || {};
              const isActive = currentDay === item.day;
              const hasData = !!(d.actualDate || d.score || d.notes);

              return (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => handleSelectDay(item.day)}
                  className={`touch-target w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isActive
                      ? "border-blue-600 bg-blue-50/80 font-bold text-blue-950 ring-1 ring-blue-500"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="truncate">
                    <span className="font-bold">Ngày {item.day}: </span>
                    <span>{item.topic}</span>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 font-mono text-[11px]">
                    {d.score && <span className="text-blue-700 font-semibold">{d.score}</span>}
                    {hasData && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Form chi tiết buổi học bên phải */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-5">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase">Buổi {currentDay} / 14</div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900 mt-0.5">
                Ngày {currentDay}: {currItem?.topic}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Mục tiêu: {currItem?.goal}</p>
            </div>
            {saveStatus && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                {saveStatus}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Ngày học thực tế:</label>
              <input
                type="date"
                value={form.actualDate || ""}
                onChange={(e) => handleFormChange("actualDate", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Số câu đúng / tổng câu (Ví dụ: 8/10):</label>
              <input
                type="text"
                placeholder="8/10"
                value={form.score || ""}
                onChange={(e) => handleFormChange("score", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mức độ tự làm:</label>
              <select
                value={form.independence || ""}
                onChange={(e) => handleFormChange("independence", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="">Chưa đánh giá</option>
                <option>Tự làm độc lập</option>
                <option>Cần gợi ý</option>
                <option>Cần hướng dẫn từng bước</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mức độ thành thạo:</label>
              <select
                value={form.mastery || ""}
                onChange={(e) => handleFormChange("mastery", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="">Chưa đánh giá</option>
                <option>Chưa vững</option>
                <option>Đang hình thành</option>
                <option>Có thể chuyển</option>
                <option>Vững bền</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Có giải thích được quy tắc?</label>
              <select
                value={form.canExplain || ""}
                onChange={(e) => handleFormChange("canExplain", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="">Chưa kiểm tra</option>
                <option>Có, giải thích rõ</option>
                <option>Một phần / cần nhắc</option>
                <option>Chưa giải thích được</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Ôn lại sau 2–3 ngày (Ví dụ: 4/5 đúng):</label>
              <input
                type="text"
                placeholder="4/5 đúng, tự làm"
                value={form.reviewCheck || ""}
                onChange={(e) => handleFormChange("reviewCheck", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            {/* Danh mục mã lỗi gặp trong buổi */}
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1.5">
                Mã lỗi quan sát được trong buổi học (chọn tất cả nếu có):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ERROR_LIST.map((err) => {
                  const isChecked = (form.errorCodes || []).includes(err.code);
                  return (
                    <label
                      key={err.code}
                      onClick={() => handleToggleErrorCode(err.code)}
                      className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-rose-50 border-rose-300 text-rose-900 font-bold ring-1 ring-rose-200"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-rose-600 pointer-events-none"
                      />
                      <span className="font-mono text-xs">{err.code}</span>
                      <span className="text-[11px] truncate">{err.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Ghi chú của người dạy:</label>
              <textarea
                rows={2}
                value={form.notes || ""}
                onChange={(e) => handleFormChange("notes", e.target.value)}
                placeholder="Điểm mạnh, lỗi sai cần lưu ý, nhịp học, ví dụ cần dạy lại..."
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Kế hoạch cải thiện buổi tiếp theo:</label>
              <textarea
                rows={2}
                value={form.nextPlan || ""}
                onChange={(e) => handleFormChange("nextPlan", e.target.value)}
                placeholder="5 bài trừ số âm, yêu cầu trình bày từng bước, ôn lại phân số..."
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Gợi ý quyết định sư phạm */}
          <div className="mt-5 p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950">
            <div className="font-bold text-sm mb-1 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span>Gợi ý quyết định sư phạm: {decision.level}</span>
            </div>
            <p>{decision.recommendation}</p>
          </div>

          {/* Nút lưu & Điều hướng ngày */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDay}
                className="touch-target inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu buổi học</span>
              </button>
              <button
                type="button"
                onClick={handleClearCurrentDay}
                className="touch-target px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
              >
                Xóa ghi nhận ngày này
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentDay === 1}
                onClick={() => handleSelectDay(currentDay - 1)}
                className="touch-target px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Ngày trước</span>
              </button>
              <button
                type="button"
                disabled={currentDay === 14}
                onClick={() => handleSelectDay(currentDay + 1)}
                className="touch-target px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <span>Ngày tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bảng tổng hợp 14 ngày cho Gia sư & In báo cáo */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm print-page">
        <h2 className="font-heading font-bold text-base text-slate-900 mb-3">
          Bảng tổng hợp tiến độ 14 ngày
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Ngày</th>
                <th className="py-2.5 px-3">Nội dung</th>
                <th className="py-2.5 px-3">Ngày học</th>
                <th className="py-2.5 px-3">Điểm số</th>
                <th className="py-2.5 px-3">Tự làm</th>
                <th className="py-2.5 px-3">Thành thạo</th>
                <th className="py-2.5 px-3">Mã lỗi</th>
                <th className="py-2.5 px-3">Kế hoạch cải thiện</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CURRICULUM.map((item) => {
                const d = state.days?.[item.day] || {};
                return (
                  <tr key={item.day} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-bold text-slate-800">{item.day}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{item.topic}</td>
                    <td className="py-2.5 px-3 text-slate-500">{d.actualDate || "—"}</td>
                    <td className="py-2.5 px-3 font-bold text-blue-700">{d.score || "—"}</td>
                    <td className="py-2.5 px-3 text-slate-700">{d.independence || "—"}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        d.mastery === "Thành thạo" || d.mastery === "Vững bền"
                          ? "bg-emerald-100 text-emerald-800"
                          : d.mastery === "Có thể chuyển"
                          ? "bg-blue-100 text-blue-800"
                          : d.mastery
                          ? "bg-amber-100 text-amber-800"
                          : "text-slate-400"
                      }`}>
                        {d.mastery || "—"}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-rose-700 font-semibold">
                      {(d.errorCodes || []).join(", ") || "—"}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">
                      {d.nextPlan || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bảng tổng hợp tần suất mã lỗi */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm print-page">
        <h2 className="font-heading font-bold text-base text-slate-900 mb-3">
          Bảng tổng hợp tần suất mã lỗi sai
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Mã</th>
                <th className="py-2.5 px-3">Lỗi thường gặp</th>
                <th className="py-2.5 px-3">Ví dụ sai</th>
                <th className="py-2.5 px-3">Cách sửa / Nhắc nhớ</th>
                <th className="py-2.5 px-3 text-center">Số buổi xuất hiện</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ERROR_LIST.map((err) => {
                const count = Object.values(state.days || {}).filter((d) =>
                  (d.errorCodes || []).includes(err.code)
                ).length;
                return (
                  <tr key={err.code} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-mono font-bold text-rose-700">{err.code}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{err.name}</td>
                    <td className="py-2.5 px-3 text-rose-600 line-through">{err.wrongExample}</td>
                    <td className="py-2.5 px-3 text-slate-700">{err.remedy}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        count >= 2
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : count === 1
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {count} buổi
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ghi chú dài hạn & Quản lý thiết bị */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm no-print">
        <h2 className="font-heading font-bold text-base text-slate-900 mb-2">
          Ghi chú chung / Điều chỉnh lộ trình
        </h2>
        <p className="text-xs text-slate-500 mb-3">
          Ghi lại các đánh giá dài hạn, lịch học hoặc nội dung gia sư cần tập trung thêm.
        </p>
        <textarea
          rows={3}
          value={globalNotes}
          onChange={(e) => setGlobalNotes(e.target.value)}
          placeholder="Ví dụ: Phân số cần thêm 1 buổi luyện; học sinh đã tiến bộ vượt bậc ở quy tắc dấu số nguyên..."
          className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white text-slate-800 mb-3"
        />
        <div className="flex items-center justify-between flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSaveGlobalNotes}
            className="touch-target px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Lưu ghi chú dài hạn
          </button>
          <button
            type="button"
            onClick={handleResetAll}
            className="touch-target px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa toàn bộ dữ liệu trên thiết bị này</span>
          </button>
        </div>
      </section>
    </div>
  );
}
