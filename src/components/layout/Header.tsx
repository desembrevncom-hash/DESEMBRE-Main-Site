import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_BRANDING } from "@/config/branding";
import { Menu, X, Phone, ShieldCheck, Sparkles } from "lucide-react";

interface HeaderProps {
  hideMainHeader?: boolean;
}

export function Header({ hideMainHeader }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Hide the white header bar on the homepage "/" or when explicitly requested
  const isHomePage = location.pathname === "/";
  const shouldHideMain = hideMainHeader ?? isHomePage;

  return (
    <header className="sticky top-0 z-40">
      {/* ── 1. Top Dark Utility Bar (Always Visible) ──────────────────────── */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-medium text-slate-200 truncate">
            Cổng thông tin & danh mục sản phẩm chính thức DESEMBRE tại Việt Nam
          </span>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <a
            href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Hotline: <strong className="text-white">{DEFAULT_BRANDING.hotline}</strong></span>
          </a>
        </div>
      </div>

      {/* ── 2. White Navigation Header (Hidden on Homepage "/") ───────────── */}
      {!shouldHideMain && (
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            {/* Logo & Brand Identity */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={DEFAULT_BRANDING.header_logo_url || "/logo.svg"}
                alt={DEFAULT_BRANDING.site_name}
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
                <span className="text-[11px] font-black text-slate-900 tracking-wider uppercase">
                  DESÉMBRE VIETNAM
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Dược mỹ phẩm sinh học chính hãng
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                  location.pathname === "/"
                    ? "text-sky-700 font-bold bg-sky-50"
                    : "text-slate-700 hover:text-sky-700 hover:bg-slate-50"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Sản phẩm chính thức</span>
              </Link>

              <Link
                to="/official"
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                  location.pathname === "/official"
                    ? "text-amber-700 font-bold bg-amber-50"
                    : "text-slate-700 hover:text-amber-700 hover:bg-slate-50"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Xác minh chính hãng</span>
              </Link>
            </nav>

            {/* Action Button: Hotline */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
                className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Hotline: {DEFAULT_BRANDING.hotline}</span>
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
            <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl">
              <nav className="flex flex-col space-y-1.5">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    location.pathname === "/"
                      ? "bg-sky-50 text-sky-800 font-bold"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>Sản phẩm chính thức</span>
                  <Sparkles className="w-4 h-4 text-sky-600" />
                </Link>

                <Link
                  to="/official"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-2.5 px-3 rounded-xl flex items-center justify-between ${
                    location.pathname === "/official"
                      ? "bg-amber-50 text-amber-800 font-bold"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>Xác minh chính hãng</span>
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </Link>
              </nav>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
