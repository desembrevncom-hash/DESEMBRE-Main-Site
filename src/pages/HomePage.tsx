import { useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";
import { CatalogProductGrid } from "@/components/catalog/CatalogProductGrid";
import { ProductDetailModal } from "@/components/catalog/ProductDetailModal";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Layers,
  Package,
  X,
  CheckCircle2,
  Filter,
} from "lucide-react";

// Standard canonical categories list for fast navigation
const STANDARD_CATEGORIES = [
  { id: "all", name: "Tất cả sản phẩm", matchKeyword: "" },
  { id: "lam-sach", name: "Làm sạch da", matchKeyword: "Làm sạch" },
  { id: "toner", name: "Nước hoa hồng / Toner", matchKeyword: "Toner" },
  { id: "serum", name: "Serum / Ampoule", matchKeyword: "Serum" },
  { id: "kem-duong", name: "Kem dưỡng & Phục hồi", matchKeyword: "Kem" },
  { id: "mat-na", name: "Mặt nạ sinh học & kem", matchKeyword: "Mặt nạ" },
  { id: "chong-nang", name: "Chống nắng bảo vệ", matchKeyword: "Chống nắng" },
  { id: "dich-chiet", name: "Dịch chiết & Tế bào gốc", matchKeyword: "Dịch chiết" },
  { id: "lieu-trinh", name: "Liệu trình Spa / Clinic", matchKeyword: "Liệu trình" },
];

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const {
    products,
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct,
  } = usePublicCatalog();

  // Sync category query param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }
  }, [categoryParam, setSelectedCategory]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: catId }, { replace: true });
    }
  };

  // Build merged category list (DB categories + standard list) with product counts
  const categoryNavItems = useMemo(() => {
    // If DB categories are loaded, use them; otherwise fallback to standard
    if (categories.length > 0) {
      const allItem = {
        id: "all",
        name: "Tất cả",
        count: products.length,
      };

      const dbItems = categories.map((cat) => {
        const count = products.filter(
          (p) => p.category_id === cat.id || p.category_name === cat.name
        ).length;
        return {
          id: cat.id,
          name: cat.name,
          count,
        };
      });

      return [allItem, ...dbItems];
    }

    // Fallback standard categories
    return STANDARD_CATEGORIES.map((cat) => {
      if (cat.id === "all") {
        return { id: "all", name: "Tất cả", count: products.length };
      }
      const count = products.filter((p) =>
        p.category_name?.toLowerCase().includes(cat.matchKeyword.toLowerCase())
      ).length;
      return { id: cat.id, name: cat.name, count };
    });
  }, [categories, products]);

  // Client-side filtering taking into account both search query and category
  const displayedProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return products.filter((p) => {
      // 1. Search Query match
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.product_code && p.product_code.toLowerCase().includes(q)) ||
        (p.category_name && p.category_name.toLowerCase().includes(q)) ||
        (p.knowledge?.ingredient_highlights &&
          p.knowledge.ingredient_highlights.some((ing) => ing.toLowerCase().includes(q))) ||
        (p.knowledge?.benefits && p.knowledge.benefits.toLowerCase().includes(q));

      // 2. Category match
      if (selectedCategory === "all") return matchesSearch;

      const matchesCatId = p.category_id === selectedCategory;
      const matchesCatName = p.category_name === selectedCategory;

      // Also check standard matching keywords if standard ID was selected
      const standardCat = STANDARD_CATEGORIES.find((sc) => sc.id === selectedCategory);
      const matchesStandard = standardCat
        ? p.category_name?.toLowerCase().includes(standardCat.matchKeyword.toLowerCase()) ||
          p.name.toLowerCase().includes(standardCat.matchKeyword.toLowerCase())
        : false;

      return matchesSearch && (matchesCatId || matchesCatName || matchesStandard);
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* ── 1. COMPACT HERO SECTION (260px - 320px Desktop) ──────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/90 via-white to-slate-50 border-b border-slate-200/80 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        {/* Soft decorative background glows */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-sky-100/60 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-50/70 blur-2xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-200/80 text-sky-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>DESEMBRE VIETNAM — OFFICIAL PRODUCT CATALOG</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Danh Mục Sản Phẩm DESEMBRE Chính Thức
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Danh mục sản phẩm chính thức tại Việt Nam, hình ảnh và thông tin được đồng bộ từ hệ thống dữ liệu DESEMBRE Partner Hub.
          </p>

          {/* Verification Link Badge */}
          <div className="pt-1 flex items-center justify-center gap-4 text-xs">
            <Link
              to="/official"
              className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Trang xác minh cúp chính hãng (QR Landing)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CATALOG LAYOUT (STICKY SIDEBAR + CONTENT GRID) ───────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── LEFT STICKY SIDEBAR (Desktop Only) ───────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h2 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                    Danh mục sản phẩm
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  ({products.length})
                </span>
              </div>

              {/* Category Nav List (Scrollable if long) */}
              <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                {categoryNavItems.map((cat) => {
                  const isActive =
                    selectedCategory === cat.id ||
                    (cat.id !== "all" &&
                      (selectedCategory === cat.name ||
                        STANDARD_CATEGORIES.find((sc) => sc.id === selectedCategory)?.name === cat.name));

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                        isActive
                          ? "bg-sky-600 text-white font-bold shadow-sm shadow-sky-600/20 translate-x-0.5"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Trust Guarantee Box */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>100% Chính hãng Hàn Quốc</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Đầy đủ công bố mỹ phẩm & tem phụ tiếng Việt hợp quy.
                </p>
              </div>
            </div>
          </aside>

          {/* ── RIGHT MAIN CONTENT AREA ──────────────────────────────────── */}
          <main className="lg:col-span-9 space-y-6">
            {/* Toolbar: Search + Mobile Category Chips + Count */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              {/* Search Bar Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm sản phẩm, công dụng, hoạt chất..."
                  className="w-full pl-11 pr-10 py-3 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200/90 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile / Tablet Horizontal Category Chips */}
              <div className="lg:hidden space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Filter className="w-3.5 h-3.5 text-sky-600" />
                  <span>Danh mục:</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {categoryNavItems.map((cat) => {
                    const isActive =
                      selectedCategory === cat.id ||
                      (cat.id !== "all" && selectedCategory === cat.name);

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.id)}
                        className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                          isActive
                            ? "bg-sky-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isActive ? "bg-white/20 text-white" : "bg-white text-slate-500"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Count & Filter Summary */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500 border-t border-slate-100">
                <span>
                  Hiển thị <strong className="text-slate-900 font-bold">{displayedProducts.length}</strong> sản phẩm chính thức
                </span>
                {(selectedCategory !== "all" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      handleSelectCategory("all");
                    }}
                    className="text-sky-600 hover:text-sky-800 font-semibold"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid Results */}
            {loading ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-slate-200/90 space-y-3 shadow-xs">
                <Package className="w-8 h-8 text-sky-500 animate-pulse mx-auto" />
                <p className="text-slate-600 font-semibold text-sm">
                  Đang nạp danh mục sản phẩm chính hãng...
                </p>
              </div>
            ) : (
              <CatalogProductGrid
                products={displayedProducts}
                onSelect={(prod) => setSelectedProduct(prod)}
                onResetFilters={() => {
                  setSearchQuery("");
                  handleSelectCategory("all");
                }}
              />
            )}
          </main>
        </div>
      </div>

      {/* ── 3. PRODUCT DETAIL MODAL (Public Safe) ─────────────────────────── */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
