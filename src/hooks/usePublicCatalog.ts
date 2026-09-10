import { useState, useEffect, useMemo, useCallback } from "react";
import type { MainSiteProduct, MainSiteCategory, MainSiteBrand } from "@/types/catalog";
import { fetchMainSiteCatalog } from "@/lib/publicCatalogDb";

export function usePublicCatalog() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<MainSiteProduct[]>([]);
  const [categories, setCategories] = useState<MainSiteCategory[]>([]);
  const [brands, setBrands] = useState<MainSiteBrand[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  // Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<MainSiteProduct | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMainSiteCatalog();
      setProducts(res.products);
      setCategories(res.categories);
      setBrands(res.brands);
    } catch (err: any) {
      console.warn("[usePublicCatalog] Error loading catalog:", err);
      setError(err?.message || "Không thể tải danh mục sản phẩm");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const queryNorm = useMemo(() => searchQuery.toLowerCase().trim(), [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !queryNorm ||
        p.name.toLowerCase().includes(queryNorm) ||
        (p.description && p.description.toLowerCase().includes(queryNorm)) ||
        (p.category_name && p.category_name.toLowerCase().includes(queryNorm)) ||
        (p.product_code && p.product_code.toLowerCase().includes(queryNorm));

      const matchesCat =
        selectedCategory === "all" ||
        p.category_id === selectedCategory ||
        p.category_name === selectedCategory;

      const matchesBrand =
        selectedBrand === "all" ||
        p.brand_id === selectedBrand ||
        p.brand_name === selectedBrand;

      return matchesSearch && matchesCat && matchesBrand;
    });
  }, [products, queryNorm, selectedCategory, selectedBrand]);

  return {
    loading,
    error,
    products,
    filteredProducts,
    categories,
    brands,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedProduct,
    setSelectedProduct,
    reload: loadData,
  };
}
