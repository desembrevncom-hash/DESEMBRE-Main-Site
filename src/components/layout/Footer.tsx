import { Link } from "react-router-dom";
import { DEFAULT_BRANDING } from "@/config/branding";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <img
              src={DEFAULT_BRANDING.header_logo_url || "/logo.svg"}
              alt={DEFAULT_BRANDING.site_name}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-xs text-slate-400 leading-relaxed">
              DESEMBRE là thương hiệu dược mỹ phẩm sinh học chuẩn chuyên nghiệp số 1 Hàn Quốc, đồng hành cùng hơn 3.000+ Spa, Clinic và Thẩm mỹ viện trên toàn quốc.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Phân phối chính hãng độc quyền tại Việt Nam</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Khám phá</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/san-pham" className="hover:text-sky-400 transition-colors">
                  Danh mục sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/ve-desembre" className="hover:text-sky-400 transition-colors">
                  Về thương hiệu DESEMBRE
                </Link>
              </li>
              <li>
                <Link to="/kien-thuc-da" className="hover:text-sky-400 transition-colors">
                  Kiến thức & Phác đồ điều trị
                </Link>
              </li>
              <li>
                <Link to="/doi-tac" className="hover:text-sky-400 transition-colors">
                  Chính sách đại lý & Spa
                </Link>
              </li>
              <li>
                <Link to="/lien-he" className="hover:text-sky-400 transition-colors">
                  Liên hệ hợp tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Hệ sinh thái</h4>
            <div className="space-y-3">
              <a
                href={DEFAULT_BRANDING.partner_hub_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                    DESEMBRE Partner Hub
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Cổng đặt hàng, quản lý đơn và tài liệu bán hàng cho Spa.
                </p>
              </a>

              <a
                href={DEFAULT_BRANDING.academy_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                    DESEMBRE Academy
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Học viện đào tạo kỹ thuật trị liệu và chuyển giao công nghệ.
                </p>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Liên hệ</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{DEFAULT_BRANDING.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Hotline: {DEFAULT_BRANDING.hotline}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{DEFAULT_BRANDING.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} DESEMBRE VIETNAM. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/ve-desembre" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link to="/doi-tac" className="hover:text-white transition-colors">
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
