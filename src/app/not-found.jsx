import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center py-20 px-4">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl font-black mb-6 border border-amber-200">
        404
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-3">
        Không tìm thấy trang này
      </h1>
      <p className="text-slate-600 text-sm leading-relaxed mb-8">
        Địa chỉ bài học hoặc trang bạn đang tìm không tồn tại, hoặc bài học đã được sắp xếp lại trong lộ trình 14 ngày.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Về trang chủ
        </Link>
        <Link
          href="/lo-trinh"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
        >
          <Compass className="w-4 h-4" />
          Xem lộ trình 14 ngày
        </Link>
      </div>
    </div>
  );
}
