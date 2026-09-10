import { MainSiteProduct } from "@/types/catalog";
import { CatalogProductImage } from "./CatalogProductImage";
import { formatCurrencyVND } from "@/lib/utils";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface Props {
  product: MainSiteProduct;
  onSelect: (product: MainSiteProduct) => void;
  priority?: boolean;
}

export function CatalogProductCard({ product, onSelect, priority = false }: Props) {
  const primaryPrice = product.retailPrice || product.salonPrice;
  const ingredients = product.knowledge?.activeIngredientPreview || [];
  const shortBenefit = product.knowledge?.benefits || product.description || "";

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden p-6">
        <CatalogProductImage
          src={product.image_url}
          alt={product.name}
          priority={priority}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
        />

        {/* Brand & Category badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-sky-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
            {product.brand_name || "DESEMBRE"}
          </span>
          {product.category_name && (
            <span className="bg-slate-100/90 backdrop-blur-sm text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {product.category_name}
            </span>
          )}
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug line-clamp-2 group-hover:text-sky-600 transition-colors mb-2">
          {product.name}
        </h3>

        {/* Short Benefit / Description */}
        {shortBenefit && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {shortBenefit}
          </p>
        )}

        {/* Active Ingredients Preview */}
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4 mt-auto pt-2">
            {ingredients.slice(0, 3).map((ing, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-medium bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md border border-sky-100/60"
              >
                <Sparkles className="w-2.5 h-2.5 text-sky-500 shrink-0" />
                <span className="truncate max-w-[120px]">{ing}</span>
              </span>
            ))}
          </div>
        )}

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            {primaryPrice ? (
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Giá niêm yết</span>
                <span className="font-bold text-slate-900 text-sm md:text-base">
                  {formatCurrencyVND(primaryPrice)}
                </span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-slate-400">Liên hệ báo giá</span>
            )}
          </div>

          <button className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-sky-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
