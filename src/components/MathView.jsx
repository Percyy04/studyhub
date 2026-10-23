"use client";

import React from "react";

/**
 * Component hiển thị công thức toán học ngữ nghĩa, tự động phát hiện phân số a/b và ký hiệu chuẩn
 */
export function MathView({ text = "", className = "" }) {
  if (!text) return null;

  // Xử lý chuỗi công thức thành các tokens
  // Định dạng phân số dạng (\d+)/(\d+) hoặc -(\d+)/(\d+)
  const parts = [];
  const regex = /(-?\d+)\/(\d+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push({
      type: "fraction",
      num: match[1].replace("-", "−"),
      den: match[2],
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  const formatText = (str) => {
    return str
      .replace(/-/g, "−")
      .replace(/\*/g, "×")
      .replace(/:/g, "÷");
  };

  return (
    <span className={`inline-flex items-center flex-wrap gap-1 font-mono tracking-tight ${className}`}>
      {parts.map((p, idx) => {
        if (typeof p === "string") {
          return <span key={idx}>{formatText(p)}</span>;
        }
        return (
          <span key={idx} className="math-fraction">
            <span className="math-num">{p.num}</span>
            <span className="math-den">{p.den}</span>
          </span>
        );
      })}
    </span>
  );
}

export default MathView;
