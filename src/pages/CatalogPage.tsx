import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { CatalogProductGrid } from "@/components/catalog/CatalogProductGrid";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { Search, Filter, Sparkles } from "lucide-react";

export function CatalogPage() {
  const {
    products,
    filteredProducts,
    categories,
    brands,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedProduct,
    setSelectedProduct,
  } = usePublicCatalog();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Danh mục sản phẩm chính hãng</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hệ Thống Sản Phẩm DESEMBRE
        </h1>
        <p className="text-sm text-slate-500">
          Khám phá trọn bộ dược mỹ phẩm sinh học chuẩn chuyên nghiệp, đáp ứng toàn diện mọi nhu cầu trị liệu và chăm sóc da tại Spa & Clinic.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm theo tên, công dụng, thành phần hoặc mã sản phẩm..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Danh mục:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-colors shrink-0 ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tất cả ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-sky-600 text-white font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-semibold text-slate-500">
            Hiển thị <strong className="text-slate-900">{filteredProducts.length}</strong> sản phẩm
          </span>
        </div>

        {loading ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-400 font-medium">Đang tải danh mục sản phẩm từ hệ thống...</p>
          </div>
        ) : (
          <CatalogProductGrid
            products={filteredProducts}
            onSelect={(prod) => setSelectedProduct(prod)}
          />
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
