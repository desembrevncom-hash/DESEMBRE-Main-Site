import { MainSiteProduct } from "@/types/catalog";
import { CatalogProductCard } from "./CatalogProductCard";

interface Props {
  products: MainSiteProduct[];
  onSelect: (product: MainSiteProduct) => void;
}

export function CatalogProductGrid({ products, onSelect }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-8">
        <p className="text-slate-500 font-medium">Không tìm thấy sản phẩm phù hợp.</p>
        <p className="text-xs text-slate-400 mt-1">Vui lòng thử thay đổi từ khóa hoặc bộ lọc danh mục.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
