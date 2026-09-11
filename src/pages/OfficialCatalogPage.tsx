import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_BRANDING } from "@/config/branding";
import {
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Menu,
  X,
  Globe,
} from "lucide-react";

// ─── Upload final looping video to: public/videos/desembre-official-hero.mp4 ───
const OFFICIAL_HERO_VIDEO_URL = "/videos/desembre-official-hero.mp4";
const OFFICIAL_HERO_FALLBACK_IMG = "/images/desembre-trophy-award.jpg";

export function OfficialCatalogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── Safe autoplay guard ─────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const attemptPlay = () => {
      video.play().catch(() => {
        // Silently swallow — browser may block autoplay
      });
    };

    // If paused unexpectedly (e.g. browser throttle), retry
    const handlePause = () => {
      if (!video.ended) attemptPlay();
    };

    const handleError = () => {
      setVideoFailed(true);
    };

    attemptPlay();
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col font-sans text-slate-100 select-none"
      style={{
        width: "100vw",
        minHeight: "100vh",
        height: "100vh",
        background: "linear-gradient(180deg, #05070d 0%, #0b1020 48%, #101827 100%)",
      }}
    >
      {/* ── 1. BACKGROUND MEDIA LAYER ─────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        {/* Video — primary */}
        {!videoFailed && (
          <video
            ref={videoRef}
            src={OFFICIAL_HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 42%" }}
          />
        )}

        {/* Static image — fallback when video fails / not yet uploaded */}
        <img
          src={OFFICIAL_HERO_FALLBACK_IMG}
          alt="DESEMBRE Vietnam Official"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 42%",
            // Show only when video not loaded
            opacity: videoFailed ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          loading="eager"
        />

        {/* Always-visible dim base when video is loading (prevents flash) */}
        {!videoFailed && (
          <img
            src={OFFICIAL_HERO_FALLBACK_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover -z-[1]"
            style={{ objectPosition: "center 42%", opacity: 0.9 }}
            loading="eager"
          />
        )}
      </div>

      {/* ── 2. OVERLAY LAYERS ─────────────────────────────────────────────── */}
      {/* Soft edge vignette — subtle, keeps top visual clean */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 38%, transparent 32%, rgba(3, 7, 18, 0.55) 100%)",
        }}
      />

      {/* Bottom gradient — primary readability layer for hero text */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 38%, rgba(3, 7, 18, 0.78) 72%, rgba(3, 7, 18, 0.98) 100%)",
        }}
      />

      {/* ── 3. TOP NAVBAR ─────────────────────────────────────────────────── */}
      <header
        className="relative z-20 w-full flex items-center justify-between shrink-0"
        style={{
          padding: "clamp(14px, 2.8vw, 26px) clamp(20px, 5.5vw, 72px)",
        }}
      >
        {/* Logo left */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-amber-300 shadow-sm group-hover:bg-white/20 transition-all">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-sm sm:text-[15px] tracking-wider text-white group-hover:text-amber-300 transition-colors">
              DESÉMBRE
            </span>
            <span className="text-[9px] tracking-widest text-slate-400 font-semibold uppercase mt-0.5">
              Vietnam Official
            </span>
          </div>
        </Link>

        {/* Desktop nav — right */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          <Link
            to="/"
            className="text-xs sm:text-[13px] font-medium text-slate-200 hover:text-white transition-colors"
          >
            Trang chủ
          </Link>

          <a
            href={DEFAULT_BRANDING.partner_hub_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-[13px] font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
          >
            Partner Hub
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <a
            href={DEFAULT_BRANDING.academy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-[13px] font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
          >
            Academy
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          {/* Glassy pill button */}
          <a
            href={DEFAULT_BRANDING.partner_hub_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/18 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            Đăng nhập Partner
            <ExternalLink className="w-3 h-3 text-amber-300" />
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10 backdrop-blur-md transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile slide-down drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[68px] left-4 right-4 z-30 bg-slate-950/96 border border-slate-800 backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-200 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              Trang chủ xác minh
            </Link>
            <a
              href={DEFAULT_BRANDING.partner_hub_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-200 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center justify-between transition-colors"
            >
              DESEMBRE Partner Hub
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
            <a
              href={DEFAULT_BRANDING.academy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-200 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 flex items-center justify-between transition-colors"
            >
              DESEMBRE Academy
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-800">
            <a
              href={DEFAULT_BRANDING.partner_hub_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Đăng nhập Partner Hub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ── 4. HERO CONTENT — bottom-anchored ─────────────────────────────── */}
      {/*
        Key: flex-1 + flex-col + justify-end pushes this block to the bottom.
        margin-top: auto + justify-end = content sits at floor of viewport.
      */}
      <main
        className="relative z-20 flex-1 flex flex-col justify-end items-center text-center w-full"
        style={{
          paddingLeft: "clamp(20px, 6vw, 96px)",
          paddingRight: "clamp(20px, 6vw, 96px)",
          paddingBottom: "clamp(48px, 8vh, 88px)",
        }}
      >
        <div
          className="flex flex-col items-center gap-3 sm:gap-4 w-full"
          style={{ maxWidth: "780px" }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/10 text-amber-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.13em] backdrop-blur-md shadow-lg">
            <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
            <span>DESEMBRE VIETNAM — OFFICIAL VERIFICATION</span>
          </div>

          {/* Headline */}
          <h1
            className="font-black text-white"
            style={{
              fontSize: "clamp(42px, 7vw, 88px)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            }}
          >
            Xác Minh Mỹ Phẩm
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400">
              DESEMBRE Chính Hãng
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-slate-200 font-medium leading-relaxed"
            style={{
              fontSize: "clamp(13px, 1.8vw, 17px)",
              maxWidth: "640px",
            }}
          >
            Kênh thông tin chính thức giúp khách hàng, Spa và Clinic kiểm tra sản phẩm DESEMBRE tại Việt Nam.
          </p>

          {/* Secondary note */}
          <p
            className="text-slate-400 font-normal leading-relaxed"
            style={{ fontSize: "clamp(11px, 1.2vw, 13px)", maxWidth: "560px" }}
          >
            Danh mục, hình ảnh và thông tin sản phẩm được đồng bộ từ hệ thống DESEMBRE Partner Hub.
          </p>

          {/* CTA button */}
          <div className="pt-1 w-full flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl font-extrabold text-slate-950 shadow-2xl shadow-amber-500/25 transition-all hover:scale-[1.04] active:scale-95"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #eab308 100%)",
                padding: "clamp(12px, 1.4vh, 16px) clamp(28px, 4vw, 48px)",
                fontSize: "clamp(12px, 1.4vw, 15px)",
              }}
            >
              Xem danh mục chính thức
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Verification domain line */}
          <div className="flex items-center gap-1.5 text-slate-500" style={{ fontSize: "11px" }}>
            <Globe className="w-3 h-3 shrink-0" />
            <span>Website xác minh:</span>
            <span className="font-mono text-slate-400">www.desembre-vn.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
