import { MainSiteProduct } from "@/types/catalog";
import { CatalogProductCard } from "./CatalogProductCard";
import { PackageSearch } from "lucide-react";

interface Props {
  products: MainSiteProduct[];
  onSelect: (product: MainSiteProduct) => void;
  onResetFilters?: () => void;
}

export function CatalogProductGrid({ products, onSelect, onResetFilters }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <PackageSearch className="w-6 h-6" />
        </div>
        <p className="text-slate-800 font-bold text-base">Không tìm thấy sản phẩm phù hợp</p>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Vui lòng thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-2 text-xs font-bold text-sky-700 hover:text-sky-800 underline underline-offset-2"
          >
            Xem tất cả sản phẩm
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {products.map((product, idx) => (
        <CatalogProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
          priority={idx < 4}
        />
      ))}
    </div>
  );
}
