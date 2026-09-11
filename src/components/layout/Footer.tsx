import { DEFAULT_BRANDING } from "@/config/branding";
import { Phone, ExternalLink, ShieldCheck, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          {/* Brand Identity & Verification Note */}
          <div className="space-y-2.5 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-lg text-white tracking-wider">
                DESÉMBRE
              </span>
              <span className="text-[10px] bg-sky-950 text-sky-400 font-bold px-2 py-0.5 rounded border border-sky-800 tracking-wider">
                VIETNAM OFFICIAL
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Kênh thông tin và xác minh nguồn gốc xuất xứ chính thức của thương hiệu dược mỹ phẩm sinh học DESEMBRE tại Việt Nam. Dữ liệu sản phẩm được đồng bộ trực tiếp từ hệ thống dữ liệu DESEMBRE.
            </p>
            <div className="flex items-center gap-2 text-slate-300 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Phân phối chính ngạch & kiểm định chất lượng tại Việt Nam</span>
            </div>
          </div>

          {/* Direct Public Contact Channels */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Hotline: <strong className="text-white">{DEFAULT_BRANDING.hotline}</strong></span>
            </a>

            <a
              href={DEFAULT_BRANDING.zalo_oa_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 text-sky-300 hover:text-white font-semibold text-xs border border-sky-800 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Zalo OA Chính Thức</span>
              <ExternalLink className="w-3 h-3 text-sky-400" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} DESEMBRE VIETNAM. Bản quyền thuộc về đại diện thương hiệu tại Việt Nam.</p>
          <p className="text-slate-600">
            Hệ thống xác minh chính hãng dành cho Spa, Clinic và Quý khách hàng.
          </p>
        </div>
      </div>
    </footer>
  );
}
