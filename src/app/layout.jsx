import "./globals.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export const metadata = {
  title: "Toán 8 Nền Tảng — Lộ trình củng cố 14 ngày",
  description: "Website học Toán 8 từ gốc theo lộ trình 14 ngày, trực quan, dễ hiểu, theo dõi tiến độ và chữa lỗi sai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
