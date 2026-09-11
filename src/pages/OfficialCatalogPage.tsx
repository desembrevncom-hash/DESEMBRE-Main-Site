import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
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
            "radial-gradient(ellipse 100% 80% at 50% 38%, transparent 32%, rgba(3, 7, 18, 0.5) 100%)",
        }}
      />

      {/* Bottom gradient — primary readability layer for hero text */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 42%, rgba(3, 7, 18, 0.72) 74%, rgba(3, 7, 18, 0.96) 100%)",
        }}
      />

      {/* ── 3. TOP NAVBAR (Minimal Public Navigation) ──────────────────────── */}
      <header
        className="relative z-20 w-full flex items-center justify-between shrink-0"
        style={{
          padding: "clamp(12px, 2.2vw, 22px) clamp(20px, 5.5vw, 72px)",
        }}
      >
        {/* Logo left */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-amber-300 shadow-sm group-hover:bg-white/20 transition-all">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-xs sm:text-sm tracking-wider text-white group-hover:text-amber-300 transition-colors">
              DESÉMBRE
            </span>
            <span className="text-[8.5px] sm:text-[9px] tracking-widest text-slate-400 font-semibold uppercase mt-0.5">
              Vietnam Official
            </span>
          </div>
        </Link>

        {/* Desktop nav — right: Minimal Public Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all"
          >
            Trang chủ
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10 backdrop-blur-md transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile slide-down drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-4 right-4 z-30 bg-slate-950/96 border border-slate-800 backdrop-blur-xl rounded-2xl p-3.5 space-y-2 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-200 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              Trang chủ xác minh
            </Link>
          </nav>
        </div>
      )}

      {/* ── 4. HERO CONTENT — refined & bottom-anchored ───────────────────── */}
      <main
        className="relative z-20 flex-1 flex flex-col justify-end items-center text-center w-full"
        style={{
          paddingLeft: "clamp(20px, 5vw, 80px)",
          paddingRight: "clamp(20px, 5vw, 80px)",
          paddingBottom: "clamp(36px, 5.5vh, 64px)",
        }}
      >
        <div
          className="flex flex-col items-center gap-2.5 sm:gap-3.5 w-full"
          style={{ maxWidth: "680px" }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-amber-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur-md shadow-md">
            <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
            <span>DESEMBRE VIETNAM — OFFICIAL VERIFICATION</span>
          </div>

          {/* Refined Headline */}
          <h1
            className="font-extrabold text-white tracking-tight"
            style={{
              fontSize: "clamp(30px, 4.2vw, 56px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
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
            className="text-slate-200/90 font-medium leading-relaxed"
            style={{
              fontSize: "clamp(12px, 1.4vw, 15px)",
              maxWidth: "560px",
            }}
          >
            Kênh thông tin chính thức giúp khách hàng, Spa và Clinic kiểm tra sản phẩm DESEMBRE tại Việt Nam.
          </p>

          {/* Secondary note */}
          <p
            className="text-slate-400/80 font-normal leading-relaxed"
            style={{ fontSize: "clamp(10px, 1.1vw, 12px)", maxWidth: "480px" }}
          >
            Danh mục, hình ảnh và thông tin sản phẩm được đồng bộ từ hệ thống dữ liệu chính thức DESEMBRE.
          </p>

          {/* Compact Primary CTA button */}
          <div className="pt-0.5 w-full flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.03] active:scale-95 h-11 px-6 sm:px-7"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #eab308 100%)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
              }}
            >
              <span>Xem danh mục chính thức</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Verification domain line */}
          <div className="flex items-center gap-1.5 text-slate-500/90" style={{ fontSize: "10.5px" }}>
            <Globe className="w-3 h-3 shrink-0" />
            <span>Website xác minh:</span>
            <span className="font-mono text-slate-400">www.desembre-vn.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
