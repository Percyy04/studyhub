import React from "react";
import { ShieldCheck, HardDrive } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-xs text-slate-500 no-print">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="font-semibold text-slate-700">
            Toán 8 Nền Tảng — Lộ trình củng cố 14 ngày
          </div>
          <p className="mt-1 text-slate-400">
            Dành cho học sinh lớp 8 tự học và gia sư đồng hành · Mỗi ngày 60 phút
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
            Lưu cục bộ (LocalStorage)
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
            Bảo mật riêng tư thiết bị
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
