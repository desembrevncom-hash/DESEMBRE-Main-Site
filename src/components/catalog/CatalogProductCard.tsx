import { MainSiteProduct } from "@/types/catalog";
import { CatalogProductImage } from "./CatalogProductImage";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  product: MainSiteProduct;
  onSelect: (product: MainSiteProduct) => void;
  priority?: boolean;
}

export function CatalogProductCard({ product, onSelect, priority = false }: Props) {
  const primarySize = product.retailSize || product.salonSize;

  // Extract up to 2 clean benefit bullets
  const rawBenefits = product.knowledge?.benefits || "";
  const benefitBullets = rawBenefits
    ? rawBenefits
        .split(/\n|•|- |\* /)
        .map((b) => b.trim())
        .filter((b) => b.length > 3)
        .slice(0, 2)
    : [];

  // Extract up to 3 ingredient highlight chips (name before ':' or '(')
  const rawIngredients = product.knowledge?.ingredient_highlights || [];
  const cleanIngredients = rawIngredients
    .map((ing) => ing.split(/[:(]/)[0].trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-slate-200/80 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer h-full"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden p-5 sm:p-6 border-b border-slate-100 flex items-center justify-center">
        <CatalogProductImage
          src={product.image_url}
          alt={product.name}
          priority={priority}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Brand & Category Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
            {product.brand_name || "DESEMBRE"}
          </span>
          {product.category_name && (
            <span className="bg-sky-50 text-sky-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-sky-200/60 shadow-xs">
              {product.category_name}
            </span>
          )}
        </div>

        {/* Variant Size Badge top-right */}
        {primarySize && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white/90 backdrop-blur-xs text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
              {primarySize}
            </span>
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-3">
          {/* Product Name (Bold / Uppercase) */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-tight leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors">
            {product.name}
          </h3>

          {/* Section: ĐIỂM NỔI BẬT (Max 2 bullets) */}
          {benefitBullets.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Điểm nổi bật
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {benefitBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: HOẠT CHẤT CHÍNH (Max 3 chips) */}
          {cleanIngredients.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Hoạt chất chính
              </span>
              <div className="flex flex-wrap gap-1">
                {cleanIngredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/80 truncate max-w-[130px]"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-sky-500 shrink-0" />
                    <span className="truncate">{ing}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Area: Size & CTA Action (No Price) */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-[11px] font-medium text-slate-400">
            {product.category_name || "Chăm sóc da sinh học"}
          </span>

          {/* CTA: Xem chi tiết */}
          <button className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 group-hover:bg-sky-600 group-hover:text-white px-3.5 py-2 rounded-xl transition-all duration-200">
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
