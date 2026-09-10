import { Link } from "react-router-dom";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { DEFAULT_BRANDING } from "@/config/branding";
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  ExternalLink,
  Layers,
  HeartHandshake,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

export function HomePage() {
  const { products, loading, selectedProduct, setSelectedProduct } = usePublicCatalog();

  // Featured 8 products
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Brand Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        {/* Glow effect background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chuyên gia Dược Mỹ Phẩm Sinh Học Hàn Quốc</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Giải Pháp Chăm Sóc & Phục Hồi Da <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400">
              Chuẩn Chuyên Nghiệp Spa & Clinic
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Ứng dụng công nghệ sinh học tiên tiến từ Hàn Quốc, DESEMBRE cung cấp hệ thống sản phẩm trị liệu chuyên sâu an toàn, hiệu quả vượt trội cho hơn 3.000+ Spa và cơ sở thẩm mỹ trên toàn quốc.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/san-pham"
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:scale-105"
            >
              <span>Khám phá sản phẩm</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={DEFAULT_BRANDING.partner_hub_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md transition-all"
            >
              <span>Dành cho Đại lý / Spa (Hub)</span>
              <ExternalLink className="w-4 h-4 text-sky-300" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars / Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">100% Công Nghệ Sinh Học</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Chiết xuất tự nhiên quý hiếm kết hợp công nghệ tế bào gốc thực vật, mang lại khả năng tái tạo tế bào da mà không gây kích ứng.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Phác Đồ Độc Quyền Spa</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hệ thống liệu trình trị liệu chuyên sâu: Oxy Peel, Gold Therapy, Magnetic Therapy giúp nâng cao hiệu quả trị liệu tại Spa.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">3.000+ Đối Tác Tin Dùng</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Đồng hành cùng hệ thống Spa, Thẩm mỹ viện và Bệnh viện da liễu hàng đầu Việt Nam suốt hơn một thập kỷ.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              Sản phẩm tiêu biểu
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Dược Mỹ Phẩm Được Ưa Chuộng Nhất
            </h2>
          </div>
          <Link
            to="/san-pham"
            className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
          >
            <span>Xem tất cả sản phẩm</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-slate-400 font-medium text-sm">Đang tải danh mục sản phẩm...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p, idx) => (
              <CatalogProductCard
                key={p.id}
                product={p}
                onSelect={(selected) => setSelectedProduct(selected)}
                priority={idx < 4}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Dual Ecosystem Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Partner Hub Promo */}
          <div className="bg-gradient-to-br from-slate-900 to-sky-950 text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">DESEMBRE Partner Hub</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hệ thống portal thông minh dành riêng cho chủ Spa, Thẩm mỹ viện & Nhà phân phối. Tra cứu bảng giá sỉ, tạo báo giá tự động, quản lý đơn hàng và tải tài liệu phác đồ.
              </p>
            </div>
            <div className="pt-8 relative z-10">
              <a
                href={DEFAULT_BRANDING.partner_hub_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md"
              >
                <span>Truy cập Partner Hub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Academy Promo */}
          <div className="bg-gradient-to-br from-slate-900 to-purple-950 text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">DESEMBRE Academy</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Học viện đào tạo kỹ thuật viên chuẩn Hàn Quốc. Tham gia các khóa học chuyên sâu, chuyển giao kỹ thuật trị liệu da liễu và nhận chứng chỉ chính quy.
              </p>
            </div>
            <div className="pt-8 relative z-10">
              <a
                href={DEFAULT_BRANDING.academy_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md"
              >
                <span>Khám phá các khóa học</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
