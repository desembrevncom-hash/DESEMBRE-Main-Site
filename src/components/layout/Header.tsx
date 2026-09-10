import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DEFAULT_BRANDING } from "@/config/branding";
import { Menu, X, ExternalLink, Phone, Sparkles } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm", path: "/san-pham" },
    { name: "Về DESEMBRE", path: "/ve-desembre" },
    { name: "Kiến thức da", path: "/kien-thuc-da" },
    { name: "Dành cho đối tác", path: "/doi-tac" },
    { name: "Liên hệ", path: "/lien-he" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-medium">Dược mỹ phẩm sinh học chuẩn chuyên nghiệp Hàn Quốc</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <a
            href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-sky-400" />
            <span>Hotline: {DEFAULT_BRANDING.hotline}</span>
          </a>
          <a
            href={DEFAULT_BRANDING.academy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors font-medium flex items-center gap-1"
          >
            <span>Desembre Academy</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={DEFAULT_BRANDING.header_logo_url || "/logo.svg"}
            alt={DEFAULT_BRANDING.site_name}
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-sky-600 font-bold border-b-2 border-sky-600 pb-1"
                    : "text-slate-600 hover:text-sky-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Partner Hub */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={DEFAULT_BRANDING.partner_hub_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span>Cổng Đối Tác (Hub)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 animate-fade-in shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 px-3 rounded-lg ${
                  location.pathname === link.path
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={DEFAULT_BRANDING.partner_hub_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-sky-600 text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 text-center"
            >
              <span>Đăng nhập Partner Hub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={DEFAULT_BRANDING.academy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-100 text-slate-800 font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 text-center"
            >
              <span>Desembre Training Academy</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
