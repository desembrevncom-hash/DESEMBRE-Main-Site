import { MainSiteProduct } from "@/types/catalog";
import { CatalogProductImage } from "./CatalogProductImage";
import { DEFAULT_BRANDING } from "@/config/branding";
import { X, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, MessageCircle, Phone, Package } from "lucide-react";

interface Props {
  product: MainSiteProduct | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: Props) {
  if (!product) return null;

  const kn = product.knowledge;
  const ingredients = kn?.ingredient_highlights || [];
  const skinTypes = kn?.skin_types || [];
  const hasVariants = product.retailVariants.length > 0 || product.salonVariants.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left: Product Image & Specifications */}
          <div className="flex flex-col">
            <div className="relative aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden p-6 border border-slate-100 flex items-center justify-center">
              <CatalogProductImage
                src={product.image_url}
                alt={product.name}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            {/* Quick Skin Type Badges */}
            {skinTypes.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {skinTypes.map((st, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
                    {st}
                  </span>
                ))}
              </div>
            )}

            {/* Sizes & Packaging Specifications (No Prices) */}
            {hasVariants && (
              <div className="mt-5 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-sky-600" />
                  Quy cách đóng gói
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.retailVariants.map((v) => (
                    <span
                      key={v.id}
                      className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg shadow-2xs"
                    >
                      Bản Tiêu chuẩn ({v.size_label || "Retail"})
                    </span>
                  ))}
                  {product.salonVariants.map((v) => (
                    <span
                      key={v.id}
                      className="text-xs font-semibold bg-purple-50 border border-purple-200 text-purple-800 px-3 py-1.5 rounded-lg shadow-2xs"
                    >
                      Bản Chuyên nghiệp Salon ({v.size_label || "Salon"})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Info & Description */}
          <div className="flex flex-col space-y-4">
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
                {product.brand_name || "DESEMBRE"} · {product.category_name || "Dược mỹ phẩm"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Description & Characteristics */}
            {(kn?.product_characteristics || product.description) && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  Đặc tính sản phẩm
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3 rounded-xl">
                  {kn?.product_characteristics || product.description}
                </p>
              </div>
            )}

            {/* Benefits */}
            {kn?.benefits && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Công dụng nổi bật
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {kn.benefits}
                </p>
              </div>
            )}

            {/* Key Active Ingredients */}
            {ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                  Thành phần hoạt chất chính
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {ingredients.map((ing, i) => (
                    <span key={i} className="text-xs bg-sky-50 text-sky-900 px-2.5 py-1 rounded-lg border border-sky-100 font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Usage Instructions */}
            {kn?.usage_instructions && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Hướng dẫn sử dụng
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3 rounded-xl">
                  {kn.usage_instructions}
                </p>
              </div>
            )}

            {/* Warnings */}
            {kn?.warnings && (
              <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <p>{kn.warnings}</p>
              </div>
            )}

            {/* Public Consultation CTAs (No Price) */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 mt-auto">
              <a
                href={`tel:${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hotline: {DEFAULT_BRANDING.hotline}</span>
              </a>

              <a
                href={`https://zalo.me/${DEFAULT_BRANDING.hotline.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>Tư vấn qua Zalo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
