import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_BRANDING } from "@/config/branding";
import { Menu, X, ExternalLink, Phone, ShieldCheck } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-slate-200">
            Cổng xác minh thông tin chính thức DESEMBRE tại Việt Nam
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <a
            href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Hotline: <strong className="text-white">{DEFAULT_BRANDING.hotline}</strong></span>
          </a>
          <a
            href={DEFAULT_BRANDING.academy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors font-medium flex items-center gap-1 text-slate-400"
          >
            <span>DESEMBRE Academy</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={DEFAULT_BRANDING.header_logo_url || "/logo.svg"}
            alt={DEFAULT_BRANDING.site_name}
            className="h-9 md:h-10 w-auto object-contain"
          />
          <div className="hidden lg:flex flex-col border-l border-slate-200 pl-3">
            <span className="text-[11px] font-black text-slate-900 tracking-wider uppercase">
              Official Portal
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Xác minh nguồn gốc & dữ liệu
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            to="/official"
            className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              location.pathname === "/official"
                ? "text-sky-700 font-bold border-b-2 border-sky-600 pb-1"
                : "text-slate-700 hover:text-sky-700"
            }`}
          >
            <span>Sản phẩm chính thức</span>
          </Link>

          <a
            href={DEFAULT_BRANDING.partner_hub_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors flex items-center gap-1"
          >
            <span>Partner Hub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={DEFAULT_BRANDING.academy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors flex items-center gap-1"
          >
            <span>Academy</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </nav>

        {/* Action Button: Hotline / Partner Hub */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
            className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>{DEFAULT_BRANDING.hotline}</span>
          </a>

          <a
            href={DEFAULT_BRANDING.partner_hub_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-950 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span>Đăng nhập Partner</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-950 rounded-lg"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/official"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-xl flex items-center justify-between ${
                location.pathname === "/official"
                  ? "bg-sky-50 text-sky-800 font-bold"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              <span>Sản phẩm chính thức</span>
              <ShieldCheck className="w-4 h-4 text-sky-600" />
            </Link>

            <a
              href={DEFAULT_BRANDING.partner_hub_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold py-2.5 px-3 text-slate-800 hover:bg-slate-50 rounded-xl flex items-center justify-between"
            >
              <span>Partner Hub (Cổng đặt hàng)</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href={DEFAULT_BRANDING.academy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold py-2.5 px-3 text-slate-800 hover:bg-slate-50 rounded-xl flex items-center justify-between"
            >
              <span>DESEMBRE Academy</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
              className="w-full bg-slate-100 text-slate-800 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 text-center border border-slate-200"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Hotline hỗ trợ: {DEFAULT_BRANDING.hotline}</span>
            </a>

            <a
              href={DEFAULT_BRANDING.partner_hub_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-950 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 text-center"
            >
              <span>Đăng nhập Partner Hub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
