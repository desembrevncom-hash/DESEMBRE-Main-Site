import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { CatalogProductGrid } from "@/components/catalog/CatalogProductGrid";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import { Search, Sparkles, Filter, Package } from "lucide-react";

export function OfficialCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const {
    products,
    filteredProducts,
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct,
  } = usePublicCatalog();

  // Synchronize category query param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, setSelectedCategory]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>DESEMBRE Official Product Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Danh Mục Sản Phẩm Chính Thức
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Hệ thống dược mỹ phẩm sinh học chính hãng phân phối tại Việt Nam dành cho Spa, Clinic và Chuyên gia làm đẹp.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên sản phẩm, mã sản phẩm, công dụng hoặc hoạt chất chính..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Danh mục:
          </span>
          <button
            onClick={() => handleSelectCategory("all")}
            className={`text-xs px-4 py-2 rounded-full font-bold transition-all shrink-0 ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tất cả ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`text-xs px-4 py-2 rounded-full font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-sky-600 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Counter & Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-semibold text-slate-500">
            Hiển thị <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> sản phẩm chính thức
          </span>
        </div>

        {loading ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 space-y-2">
            <Package className="w-8 h-8 text-sky-500 animate-pulse mx-auto" />
            <p className="text-slate-500 font-medium text-sm">Đang đồng bộ danh mục sản phẩm từ hệ thống...</p>
          </div>
        ) : (
          <CatalogProductGrid
            products={filteredProducts}
            onSelect={(prod) => setSelectedProduct(prod)}
          />
        )}
      </div>

      {/* Product Detail Modal (Public-Safe only) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
