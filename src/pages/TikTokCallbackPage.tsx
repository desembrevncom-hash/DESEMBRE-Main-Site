import { useSearchParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Lock,
} from "lucide-react";

export function TikTokCallbackPage() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error");
  const code = searchParams.get("code");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-12 selection:bg-amber-500/30 selection:text-amber-200">
      <div className="max-w-lg w-full">
        {/* Verification Success View */}
        {success && (
          <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Kết nối TikTok thành công!</h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Tài khoản TikTok doanh nghiệp của Désembre Việt Nam đã được xác thực an toàn. Mã token đã được lưu trữ bảo mật phục vụ quy trình xuất bản NLD.
            </p>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-left mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Trạng thái ủy quyền:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AUTHORIZED
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Quyền xuất bản:</span>
                <span className="text-amber-300 font-mono text-[11px]">user.info.basic, video.publish</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Bảo mật Credentials:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Zero Secrets Exposed
                </span>
              </div>
            </div>

            <Link
              to="/tiktok"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Vào TikTok Studio Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Verification Error View */}
        {error && (
          <div className="bg-slate-900/80 border border-rose-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/20">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Ủy quyền chưa hoàn tất</h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Quá trình cấp quyền từ TikTok trả về phản hồi không hợp lệ hoặc đã bị hủy bởi người dùng:
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-900/50 text-xs text-rose-300 font-mono mb-6 break-words">
              {decodeURIComponent(error)}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/api/tiktok/auth"
                className="inline-flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Thử kết nối lại</span>
              </a>
              <Link
                to="/tiktok"
                className="inline-flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                <span>Về trang TikTok Hub</span>
              </Link>
            </div>
          </div>
        )}

        {/* Direct Access / Pending View */}
        {!success && !error && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h1 className="text-xl font-bold text-white mb-2">TikTok OAuth Callback Endpoint</h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Đây là endpoint tiếp nhận phản hồi ủy quyền chính thức từ TikTok dành riêng cho Désembre Việt Nam:
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 break-all mb-6">
              https://www.desembre-vn.com/tiktok-callback
            </div>

            <Link
              to="/tiktok"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              <span>Truy cập TikTok Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
