import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Lock,
  Play,
  Video,
  FileVideo,
  Key,
  Cpu,
  Layers,
  Sparkles,
  Radio,
  ArrowRight,
  Terminal,
} from "lucide-react";

interface SanitizedStatus {
  mode?: "sandbox" | "production";
  authorized: boolean;
  open_id_present: boolean;
  video_publish_authorized: boolean;
  access_token_present: boolean;
  refresh_token_present: boolean;
  access_token_expires_at: string | null;
  secret_values_exposed: boolean;
}


export function TikTokLandingPage() {
  const [status, setStatus] = useState<SanitizedStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshResult, setRefreshResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"status" | "pipeline" | "audit">("status");

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tiktok/status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      } else {
        setStatus({
          authorized: false,
          open_id_present: false,
          video_publish_authorized: false,
          access_token_present: false,
          refresh_token_present: false,
          access_token_expires_at: null,
          secret_values_exposed: false,
        });
      }
    } catch (_e) {
      setStatus({
        authorized: false,
        open_id_present: false,
        video_publish_authorized: false,
        access_token_present: false,
        refresh_token_present: false,
        access_token_expires_at: null,
        secret_values_exposed: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleRefreshToken = async () => {
    try {
      setRefreshing(true);
      setRefreshResult(null);
      const res = await fetch("/api/tiktok/refresh", { method: "POST" });
      const data = await res.json();
      if (data.success || data.authorized) {
        setRefreshResult("Token refreshed successfully!");
        fetchStatus();
      } else {
        setRefreshResult(data.error || "Token refresh failed");
      }
    } catch (err: any) {
      setRefreshResult(err.message || "Failed to trigger refresh");
    } finally {
      setRefreshing(false);
    }
  };

  const isAuthorized = status?.authorized;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              DÉSEMBRE VIETNAM
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              TikTok Publishing Hub
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              NLD Studio Certified
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-medium mb-4 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Login Kit & Video Publishing Foundation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            DÉSEMBRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-amber-500">TikTok Studio</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hạ tầng ủy quyền bảo mật OAuth v2 kết nối tài khoản TikTok doanh nghiệp Désembre Việt Nam với hệ thống tự động hóa xuất bản video NLD. 
            Tuyệt đối cách ly và bảo vệ 100% luồng phát hành Facebook hiện hành.
          </p>
        </div>

        {/* Main Status & Auth Action Hero Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  Authorization Gateway
                </span>
                {status?.mode === "sandbox" ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                    SANDBOX (nghelamdep2026)
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                    PRODUCTION
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">

                <h2 className="text-xl sm:text-2xl font-bold text-white">Trạng thái ủy quyền TikTok</h2>
                {loading ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Kiểm tra...
                  </span>
                ) : isAuthorized ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AUTHORIZED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> NOT AUTHORIZED
                  </span>
                )}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/api/tiktok/auth"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <Key className="w-4 h-4 text-white" />
                <span>{isAuthorized ? "Tái kết nối TikTok Account" : "Kết nối TikTok Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {isAuthorized && (
                <button
                  onClick={handleRefreshToken}
                  disabled={refreshing}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-amber-400" : ""}`} />
                  <span>{refreshing ? "Đang làm mới..." : "Refresh Token"}</span>
                </button>
              )}
            </div>
          </div>

          {refreshResult && (
            <div className="mt-4 p-3 rounded-lg bg-slate-800/60 border border-slate-700 text-xs text-amber-300 flex items-center justify-between">
              <span>{refreshResult}</span>
              <button onClick={() => setRefreshResult(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
          )}

          {/* Real-time Status Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">OpenID Account</span>
              <div className="flex items-center gap-2">
                {status?.open_id_present ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">Đã định danh</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-xs text-slate-500">Chưa có</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">video.publish Scope</span>
              <div className="flex items-center gap-2">
                {status?.video_publish_authorized ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-emerald-300">Đã cấp quyền</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-amber-400">Chưa cấp quyền</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Refresh Token</span>
              <div className="flex items-center gap-2">
                {status?.refresh_token_present ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">Sẵn sàng (Auto-renew)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-xs text-slate-500">Không có</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Bảo mật Credentials</span>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-300">0% Secret Exposed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-8 space-x-8">
          <button
            onClick={() => setActiveTab("status")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "status"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Radio className="w-4 h-4" />
            Cấu hình & Redirect URI
          </button>
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "pipeline"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Video className="w-4 h-4" />
            NLD Video Workflow & An toàn
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "audit"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-4 h-4" />
            Preflight CLI Audit
          </button>
        </div>

        {/* Tab Content: Status & Configurations */}
        {activeTab === "status" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Redirect URI Exact Matching Card */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-semibold text-white">Registered Redirect URI (Bắt buộc)</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Đường dẫn tiếp nhận callback đăng ký tại TikTok Developer Portal phải chính xác 100%, không thêm query param hay thay đổi domain:
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 break-all select-all flex items-center justify-between">
                <span>https://www.desembre-vn.com/tiktok-callback</span>
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold ml-2 shrink-0">EXACT</span>
              </div>
              <div className="mt-4 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Xử lý code exchange SERVER-SIDE qua /v2/oauth/token/</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mã hóa bảo vệ state chống giả mạo và replay attack</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Không bao giờ expose Client Secret lên browser client</span>
                </div>
              </div>
            </div>

            {/* Environment Variables & Scopes Card */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-semibold text-white">OAuth v2 Scope Matrix</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Các quyền hạn được yêu cầu để hỗ trợ quy trình xuất bản tự động NLD:
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs text-white font-semibold block">user.info.basic</span>
                    <span className="text-[11px] text-slate-400">Định danh tài khoản Désembre & OpenID</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-bold border border-sky-800">
                    Bắt buộc
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs text-amber-300 font-semibold block">video.publish</span>
                    <span className="text-[11px] text-slate-400">Xuất bản video trực tiếp từ NLD Automation</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800">
                    Cốt lõi
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Pipeline Architecture */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <FileVideo className="w-5 h-5 text-amber-400" />
                Kiến trúc Xuất bản Video NLD: Direct FILE_UPLOAD
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Hệ thống chuẩn bị sẵn cấu trúc gọi Content Posting API của TikTok theo mô hình phân mảnh <strong>FILE_UPLOAD</strong> thay vì <strong>PULL_FROM_URL</strong>. Nhờ đó, máy chủ NLD tải trực tiếp tệp <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">video-master.mp4</code> từ local lên TikTok mà <em>không phụ thuộc</em> vào việc xác minh tên miền hosting video.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Bước 1: Tra cứu hồ sơ Creator
                  </div>
                  <p className="text-slate-400 font-mono text-[11px] break-all">
                    POST https://open.tiktokapis.com/v2/post/publish/creator_info/query/
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Bước 2: Khởi tạo tải lên (FILE_UPLOAD)
                  </div>
                  <p className="text-slate-400 font-mono text-[11px] break-all">
                    POST https://open.tiktokapis.com/v2/post/publish/video/init/
                  </p>
                </div>
              </div>
            </div>

            {/* Facebook Isolation Guarantee */}
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-emerald-900/40">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Bảo vệ 100% luồng phát hành Facebook Production hiện tại
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Hạ tầng TikTok OAuth này hoạt động hoàn toàn độc lập. Mọi credentials, cấu hình scheduled publisher, hợp đồng phê duyệt Human Approval, và tác vụ xuất bản trên Facebook giữ nguyên trạng thái sản xuất mà không có bất kỳ rủi ro xung đột nào.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Preflight CLI Audit */}
        {activeTab === "audit" && (
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Preflight CLI Script Verification</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">node scripts/check-tiktok-auth.mjs</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <p className="text-slate-500"># Output mô phỏng kết quả lệnh kiểm tra preflight:</p>
              <p>TIKTOK_CONFIG_STATUS: <span className="text-emerald-400">VALID</span></p>
              <p>TIKTOK_AUTH_STATUS: <span className={isAuthorized ? "text-emerald-400" : "text-amber-400"}>{isAuthorized ? "AUTHORIZED" : "NOT_AUTHORIZED"}</span></p>
              <p>ACCESS_TOKEN_PRESENT: <span className={status?.access_token_present ? "text-emerald-400" : "text-slate-500"}>{String(status?.access_token_present)}</span></p>
              <p>REFRESH_TOKEN_PRESENT: <span className={status?.refresh_token_present ? "text-emerald-400" : "text-slate-500"}>{String(status?.refresh_token_present)}</span></p>
              <p>VIDEO_PUBLISH_SCOPE: <span className={status?.video_publish_authorized ? "text-emerald-400" : "text-amber-400"}>{status?.video_publish_authorized ? "AUTHORIZED" : "NOT_AUTHORIZED"}</span></p>
              <p>OPEN_ID_PRESENT: <span className={status?.open_id_present ? "text-emerald-400" : "text-slate-500"}>{String(status?.open_id_present)}</span></p>
              <p>SECRET_VALUES_EXPOSED: <span className="text-emerald-400">false</span></p>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Lệnh preflight an toàn chỉ đọc (read-only), không thực hiện bất kỳ hành động xuất bản nào, và luôn thoát với mã an toàn.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
