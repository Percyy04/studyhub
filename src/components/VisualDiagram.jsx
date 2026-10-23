"use client";

import React, { useState } from "react";

export function VisualDiagram({ type = "number-line" }) {
  const [sliderVal, setSliderVal] = useState(4);

  if (type === "number-line") {
    // Trục số từ -10 đến 5
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
        <div className="text-sm font-semibold text-blue-900 mb-2 flex items-center justify-between">
          <span>Minh họa trực quan: Trừ số âm là tiến sang phải trên trục số</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">−7 − (−{sliderVal}) = −7 + {sliderVal} = { -7 + sliderVal }</span>
        </div>
        <div className="overflow-x-auto py-2">
          <svg viewBox="0 0 600 120" className="w-full max-w-[600px] mx-auto text-slate-700">
            {/* Đường trục số */}
            <line x1="30" y1="70" x2="570" y2="70" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
            </defs>
            {/* Vạch số từ -10 đến 5 */}
            {Array.from({ length: 16 }, (_, i) => {
              const val = -10 + i;
              const x = 50 + i * 33;
              const isStart = val === -7;
              const isEnd = val === -7 + sliderVal;
              return (
                <g key={val}>
                  <line x1={x} y1="63" x2={x} y2="77" stroke="#94a3b8" strokeWidth="2" />
                  <text x={x} y="95" textAnchor="middle" fontSize="12" fill={isStart ? "#dc2626" : isEnd ? "#059669" : "#64748b"} fontWeight={isStart || isEnd ? "bold" : "normal"}>
                    {val}
                  </text>
                  {isStart && (
                    <circle cx={x} cy="70" r="5" fill="#dc2626" />
                  )}
                  {isEnd && (
                    <circle cx={x} cy="70" r="5" fill="#059669" />
                  )}
                </g>
              );
            })}
            {/* Cung tên di chuyển từ -7 sang phải */}
            <path
              d={`M ${50 + 3 * 33} 60 Q ${50 + (3 + sliderVal / 2) * 33} 25 ${50 + (3 + sliderVal) * 33} 60`}
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeDasharray="4"
            />
            <text x={50 + (3 + sliderVal / 2) * 33} y="22" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">
              + {sliderVal} bước (trừ −{sliderVal})
            </text>
          </svg>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
          <span>Kéo thử để quan sát bước nhảy:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={sliderVal}
            onChange={(e) => setSliderVal(parseInt(e.target.value, 10))}
            className="w-36 accent-blue-600 cursor-pointer"
          />
          <span className="font-semibold text-slate-800">+{sliderVal} bước</span>
        </div>
      </div>
    );
  }

  if (type === "fraction-addition" || type === "fraction-model") {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
        <div className="text-sm font-semibold text-amber-900 mb-2">
          Minh họa cắt bánh: 1/2 + 1/3 = 3/6 + 2/6 = 5/6 (Quy về cùng 6 miếng)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <div className="font-semibold text-slate-800 mb-1">1/2 cái bánh = 3/6</div>
            <div className="h-6 flex rounded overflow-hidden border border-slate-300">
              <div className="w-1/2 bg-blue-500 text-white flex items-center justify-center font-bold">1/2</div>
              <div className="w-1/2 bg-slate-100"></div>
            </div>
            <div className="mt-1 text-slate-500">Cắt làm 6: lấy 3 miếng</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <div className="font-semibold text-slate-800 mb-1">1/3 cái bánh = 2/6</div>
            <div className="h-6 flex rounded overflow-hidden border border-slate-300">
              <div className="w-1/3 bg-emerald-500 text-white flex items-center justify-center font-bold">1/3</div>
              <div className="w-2/3 bg-slate-100"></div>
            </div>
            <div className="mt-1 text-slate-500">Cắt làm 6: lấy 2 miếng</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <div className="font-semibold text-slate-800 mb-1">Tổng cộng: 3/6 + 2/6 = 5/6</div>
            <div className="h-6 flex rounded overflow-hidden border border-slate-300">
              <div className="w-[50%] bg-blue-500 text-white flex items-center justify-center text-[10px]">3/6</div>
              <div className="w-[33.33%] bg-emerald-500 text-white flex items-center justify-center text-[10px]">2/6</div>
              <div className="w-[16.67%] bg-slate-100"></div>
            </div>
            <div className="mt-1 text-emerald-700 font-semibold">Tổng: 5 miếng (5/6)</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "balance-scale") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
        <div className="text-sm font-semibold text-blue-900 mb-2">
          Mô hình cán cân: Thực hiện cùng một phép toán ở cả 2 vế
        </div>
        <div className="flex items-center justify-center py-2">
          <svg viewBox="0 0 320 110" className="w-full max-w-[320px] text-slate-700">
            {/* Trụ cân */}
            <path d="M 160 30 L 160 90 L 140 100 L 180 100 Z" fill="#94a3b8" />
            <circle cx="160" cy="30" r="6" fill="#3b82f6" />
            {/* Đòn cân ngang (thăng bằng) */}
            <line x1="40" y1="30" x2="280" y2="30" stroke="#1e3a8a" strokeWidth="4" />
            {/* Đĩa cân trái */}
            <line x1="60" y1="30" x2="60" y2="65" stroke="#64748b" strokeWidth="2" />
            <rect x="25" y="65" width="70" height="8" rx="3" fill="#cbd5e1" />
            <rect x="35" y="45" width="22" height="20" rx="3" fill="#3b82f6" />
            <text x="46" y="59" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">x</text>
            <rect x="62" y="45" width="22" height="20" rx="3" fill="#60a5fa" />
            <text x="73" y="59" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">+3</text>
            {/* Đĩa cân phải */}
            <line x1="260" y1="30" x2="260" y2="65" stroke="#64748b" strokeWidth="2" />
            <rect x="225" y="65" width="70" height="8" rx="3" fill="#cbd5e1" />
            <rect x="245" y="42" width="30" height="23" rx="3" fill="#059669" />
            <text x="260" y="58" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">10</text>
          </svg>
        </div>
        <div className="text-xs text-center text-slate-600 mt-1">
          Muốn tìm <span className="font-bold text-blue-700">x</span>, ta bớt 3 ở CẢ HAI ĐĨA CÂN: <span className="font-mono font-semibold">x + 3 − 3 = 10 − 3 ⇒ x = 7</span>.
        </div>
      </div>
    );
  }

  if (type === "area-model") {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 my-4">
        <div className="text-sm font-semibold text-purple-900 mb-2">
          Mô hình diện tích: a(b + c) = ab + ac
        </div>
        <div className="max-w-[340px] mx-auto border-2 border-purple-400 rounded flex h-20 text-xs font-semibold text-white my-2">
          <div className="w-1/2 bg-purple-600 flex flex-col items-center justify-center border-r-2 border-white">
            <span>Chiều dài b</span>
            <span className="text-[13px] font-bold">Diện tích = a × b</span>
          </div>
          <div className="w-1/2 bg-purple-500 flex flex-col items-center justify-center">
            <span>Chiều dài c</span>
            <span className="text-[13px] font-bold">Diện tích = a × c</span>
          </div>
        </div>
        <div className="text-xs text-center text-purple-800">
          Chiều rộng a nhân với tổng chiều dài (b + c) bằng tổng 2 diện tích nhỏ ghép lại!
        </div>
      </div>
    );
  }

  if (type === "geometry-diagram") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 my-4">
        <div className="text-sm font-semibold text-emerald-900 mb-2">
          Hình học trực quan: Góc kề bù (180°) và Tam giác cân
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
          <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
            <div className="text-xs font-semibold text-slate-700 mb-1">Hai góc kề bù: ∠1 + ∠2 = 180°</div>
            <svg viewBox="0 0 200 90" className="w-48 mx-auto">
              {/* Đường thẳng đáy */}
              <line x1="10" y1="70" x2="190" y2="70" stroke="#334155" strokeWidth="2.5" />
              {/* Tia xiên ở giữa */}
              <line x1="100" y1="70" x2="150" y2="15" stroke="#059669" strokeWidth="2.5" />
              {/* Cung góc 1 */}
              <path d="M 60 70 A 40 40 0 0 1 125 42" fill="none" stroke="#2563eb" strokeWidth="2" />
              <text x="80" y="55" fontSize="11" fill="#2563eb" fontWeight="bold">65°</text>
              {/* Cung góc 2 */}
              <path d="M 125 42 A 40 40 0 0 1 140 70" fill="none" stroke="#d97706" strokeWidth="2" />
              <text x="145" y="60" fontSize="11" fill="#d97706" fontWeight="bold">115°</text>
              <circle cx="100" cy="70" r="3" fill="#334155" />
            </svg>
            <div className="text-[11px] text-slate-500 mt-1">Ghép lại thành đường thẳng (góc bẹt)</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
            <div className="text-xs font-semibold text-slate-700 mb-1">Tam giác cân tại A: AB = AC, B̂ = Ĉ</div>
            <svg viewBox="0 0 160 90" className="w-40 mx-auto">
              <polygon points="80,10 20,80 140,80" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
              <text x="80" y="8" fontSize="10" textAnchor="middle" fontWeight="bold">A</text>
              <text x="12" y="86" fontSize="10" textAnchor="middle" fontWeight="bold">B</text>
              <text x="148" y="86" fontSize="10" textAnchor="middle" fontWeight="bold">C</text>
              {/* Vạch bằng nhau ở cạnh bên */}
              <line x1="47" y1="43" x2="53" y2="47" stroke="#059669" strokeWidth="2" />
              <line x1="107" y1="47" x2="113" y2="43" stroke="#059669" strokeWidth="2" />
              {/* Cung hai góc đáy */}
              <path d="M 35 74 A 15 15 0 0 1 40 80" fill="none" stroke="#2563eb" strokeWidth="2" />
              <path d="M 120 80 A 15 15 0 0 1 125 74" fill="none" stroke="#2563eb" strokeWidth="2" />
            </svg>
            <div className="text-[11px] text-slate-500 mt-1">B̂ = Ĉ = (180° − Â) ÷ 2</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default VisualDiagram;
