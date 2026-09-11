import { Link } from "react-router-dom";
import { DEFAULT_BRANDING } from "@/config/branding";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Phone,
  QrCode,
  Globe,
  Layers,
  GraduationCap,
  Sparkles,
  Building2,
  FileCheck2,
} from "lucide-react";

export function HomePage() {
  // 8 Specified official category chips
  const OFFICIAL_CATEGORIES = [
    { name: "Làm sạch", query: "Làm sạch", count: "Sữa rửa mặt & Tẩy trang" },
    { name: "Toner", query: "Toner", count: "Nước hoa hồng sinh học" },
    { name: "Serum / Ampoule", query: "Serum", count: "Tinh chất tế bào gốc" },
    { name: "Kem dưỡng", query: "Kem dưỡng", count: "Phục hồi & Khóa ẩm" },
    { name: "Mặt nạ", query: "Mặt nạ", count: "Mặt nạ kem & sinh học" },
    { name: "Chống nắng", query: "Chống nắng", count: "Bảo vệ màng tế bào" },
    { name: "Dịch chiết TBG", query: "Dịch chiết", count: "Dưỡng chất chuyên sâu" },
    { name: "Liệu trình Spa/Clinic", query: "Liệu trình", count: "Bộ phác đồ chuyên nghiệp" },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-slate-50/50">
      {/* =========================================================================
          BLOCK 1: OFFICIAL VERIFICATION HERO
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-white pt-14 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-60 h-60 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-sky-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>DESEMBRE VIETNAM — OFFICIAL VERIFICATION</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Xác Minh DESEMBRE Vietnam Chính Thức
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-medium text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Kênh thông tin chính thức dành cho khách hàng, Spa và Clinic kiểm tra sản phẩm DESEMBRE tại Việt Nam.
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Danh mục, hình ảnh và thông tin sản phẩm được đồng bộ từ hệ thống DESEMBRE Partner Hub.
          </p>

          {/* 3 Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Kênh chính thức tại Việt Nam</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Thông tin sản phẩm đã kiểm duyệt</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 backdrop-blur-xs">
              <QrCode className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Dành cho Spa, Clinic và khách hàng kiểm tra QR</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <Link
              to="/official"
              className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-sm px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-900/40 transition-all hover:scale-[1.02]"
            >
              <span>Xem sản phẩm chính thức</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <a
              href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 border border-slate-700 backdrop-blur-md transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Liên hệ xác minh: {DEFAULT_BRANDING.hotline}</span>
            </a>
          </div>

          {/* Small Verification Ecosystem Card */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 text-left shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Hệ Thống Tên Miền Chính Thức
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-semibold">Trang Xác Minh QR</span>
                  <div className="font-mono font-bold text-white text-xs mt-0.5 truncate">
                    www.desembre-vn.com
                  </div>
                </div>

                <a
                  href={DEFAULT_BRANDING.partner_hub_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-sky-500 transition-colors group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 block font-semibold">Partner Hub (Đơn Hàng)</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-sky-400" />
                  </div>
                  <div className="font-mono font-bold text-sky-400 text-xs mt-0.5 truncate">
                    hub.desembre-vn.com
                  </div>
                </a>

                <a
                  href={DEFAULT_BRANDING.academy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500 transition-colors group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 block font-semibold">DESEMBRE Academy</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-purple-400" />
                  </div>
                  <div className="font-mono font-bold text-purple-400 text-xs mt-0.5 truncate">
                    training.desembre-vn.com
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOCK 2: OFFICIAL PRODUCT & TRUST PANEL (Two-Column Layout)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Danh mục sản phẩm chính thức */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Danh mục sản phẩm chính thức
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Hệ thống dòng sản phẩm chuyên nghiệp dành cho Spa, Clinic và tiêu dùng cá nhân.
                  </p>
                </div>
              </div>

              {/* 8 Category Chips / Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
                {OFFICIAL_CATEGORIES.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={`/official?category=${encodeURIComponent(cat.query)}`}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50/80 border border-slate-100 hover:border-sky-200 transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-sky-800 transition-colors">
                        {cat.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 font-medium">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Left CTA */}
            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/official"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm"
              >
                <span>Khám phá danh mục</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Cam kết xác minh */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Cam kết xác minh
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Nguyên tắc hiển thị thông tin minh bạch và trung thực.
                  </p>
                </div>
              </div>

              {/* Specified Bullet List */}
              <ul className="space-y-3.5 pt-1">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Thông tin sản phẩm lấy từ hệ thống dữ liệu chính thức.
                  </span>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Hình ảnh sản phẩm đồng bộ từ DESEMBRE Partner Hub.
                  </span>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Nội dung công khai đã được kiểm duyệt trước khi hiển thị.
                  </span>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Không hiển thị guidebook thô, ghi chú nội bộ hoặc kịch bản bán hàng.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right CTA Links */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row gap-2.5">
              <a
                href={DEFAULT_BRANDING.partner_hub_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
              >
                <span>Partner Hub</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              </a>

              <a
                href={DEFAULT_BRANDING.academy_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
              >
                <span>DESEMBRE Academy</span>
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
