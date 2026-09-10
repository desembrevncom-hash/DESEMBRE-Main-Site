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
  CheckCircle2,
  Package,
} from "lucide-react";

export function HomePage() {
  const { products, categories, loading, selectedProduct, setSelectedProduct } = usePublicCatalog();

  // Featured 8 products
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Brand Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        {/* Glow effect background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>DESEMBRE VIETNAM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            DESEMBRE Vietnam
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-100 to-sky-300">
            Dược mỹ phẩm sinh học chuyên nghiệp từ Hàn Quốc
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Giải pháp trị liệu và chăm sóc da sinh học chuyên sâu chuẩn y khoa dành cho hệ thống Spa, Clinic, Thẩm mỹ viện và Đối tác làm đẹp trên toàn quốc.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/official"
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:scale-105"
            >
              <span>Khám phá sản phẩm chính thức</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={DEFAULT_BRANDING.partner_hub_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md transition-all"
            >
              <span>Đăng nhập Partner Hub</span>
              <ExternalLink className="w-4 h-4 text-sky-300" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Brand Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              Thương hiệu & Nguồn gốc
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Khoa Học Da Liễu Sinh Học Từ Hyunjin C&T
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              DESEMBRE là thương hiệu dược mỹ phẩm sinh học chuyên nghiệp hàng đầu thuộc tập đoàn Hyunjin C&T Hàn Quốc. Với triết lý tôn trọng cơ chế tự phục hồi của làn da, DESEMBRE kết hợp các thành phần tự nhiên quý hiếm cùng công nghệ sinh học tế bào gốc thực vật.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sản phẩm được thiết kế chuẩn mực cho các liệu trình chăm sóc da chuyên sâu tại Spa, Clinic và hỗ trợ duy trì làn da khỏe mạnh tại nhà.
            </p>
          </div>

          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Đặc tính vượt trội của DESEMBRE
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Công nghệ chiết xuất sinh học thân thiện với cấu trúc màng tế bào da.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Không cồn gây hại, không paraben, an toàn và lành tính cho mọi loại da.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Đa dạng quy cách từ bán lẻ (Retail) đến chuyên nghiệp (Salon 1000ml).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Product Category Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              Dòng sản phẩm
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Danh Mục Sản Phẩm Chuyên Sâu
            </h2>
          </div>
          <Link
            to="/official"
            className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
          >
            <span>Tất cả sản phẩm</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {(categories.length > 0 ? categories : [
            { id: "CLEANSER", name: "Làm sạch" },
            { id: "TONER", name: "Toner & Cân bằng" },
            { id: "SERUM", name: "Serum & Tinh chất" },
            { id: "CREAM", name: "Kem dưỡng" },
            { id: "CREAM MASK", name: "Mặt nạ kem" },
            { id: "PROTECTION CARE", name: "Chống nắng & Bảo vệ" },
            { id: "AMPOULE", name: "Dịch chiết TBG" },
            { id: "THERAPY TREATMENT / SET", name: "Set trị liệu chuyên sâu" },
          ]).map((cat) => (
            <Link
              key={cat.id}
              to={`/official?category=${encodeURIComponent(cat.id)}`}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium mt-1 inline-flex items-center gap-1">
                  Xem chi tiết <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
              Sản phẩm chính thức
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Sản Phẩm Tiêu Biểu Được Tin Dùng
            </h2>
          </div>
          <Link
            to="/official"
            className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
          >
            <span>Xem danh mục đầy đủ</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-400 font-medium text-sm">Đang tải sản phẩm từ hệ thống...</p>
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

      {/* 5. Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Cam kết chất lượng
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Giá Trị DESEMBRE Mang Lại
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm">100% Chính Hãng</h3>
              <p className="text-xs text-slate-400">Nhập khẩu chính ngạch trực tiếp từ Hàn Quốc có đầy đủ công bố.</p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm">Chuẩn Spa & Clinic</h3>
              <p className="text-xs text-slate-400">Công thức chuyên biệt tối ưu hiệu quả trị liệu tại cơ sở chuyên nghiệp.</p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm">Tư Vấn Chuyên Nghiệp</h3>
              <p className="text-xs text-slate-400">Đội ngũ chuyên viên đào tạo phác đồ và hỗ trợ kỹ thuật tận tâm.</p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm">Dành Cho Đối Tác</h3>
              <p className="text-xs text-slate-400">Chính sách ưu đãi và đồng hành phát triển cùng đối tác làm đẹp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dual Portal CTA Section */}
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
