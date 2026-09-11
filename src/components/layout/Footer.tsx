import { Link } from "react-router-dom";
import { DEFAULT_BRANDING } from "@/config/branding";
import { Phone, ExternalLink, ShieldCheck, QrCode } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Identity & Verification Note */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-lg text-white tracking-wider">
                DESÉMBRE
              </span>
              <span className="text-[10px] bg-sky-950 text-sky-400 font-bold px-2 py-0.5 rounded border border-sky-800 tracking-wider">
                VIETNAM OFFICIAL
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Kênh thông tin và xác minh nguồn gốc xuất xứ chính thức của thương hiệu dược mỹ phẩm sinh học DESEMBRE tại Việt Nam. Dữ liệu sản phẩm được đồng bộ trực tiếp từ hệ thống DESEMBRE Partner Hub.
            </p>
            <div className="flex items-center gap-2 text-slate-300 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Phân phối chính ngạch & kiểm định chất lượng tại Việt Nam</span>
            </div>
          </div>

          {/* Quick Official Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              Liên kết chính thức
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/official" className="hover:text-sky-400 transition-colors font-medium">
                  Sản phẩm chính thức
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors font-medium">
                  Trang xác minh QR
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hotline: <strong className="text-white">{DEFAULT_BRANDING.hotline}</strong></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">
              Hệ thống trực thuộc
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={DEFAULT_BRANDING.partner_hub_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white transition-colors"
                >
                  <span>DESEMBRE Partner Hub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={DEFAULT_BRANDING.academy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white transition-colors"
                >
                  <span>DESEMBRE Academy</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
            </ul>
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
