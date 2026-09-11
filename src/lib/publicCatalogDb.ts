import { supabase } from "@/integrations/supabase/client";
import type {
  MainSiteProduct,
  MainSiteCategory,
  MainSiteBrand,
  PublicCatalogVariant,
  PublicProductKnowledge,
} from "@/types/catalog";

export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs = 8000,
  timeoutMsg = "Database query timed out",
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`[Timeout ${timeoutMs}ms] ${timeoutMsg}`));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

export interface PublicCatalogDataResult {
  products: MainSiteProduct[];
  categories: MainSiteCategory[];
  brands: MainSiteBrand[];
}

export async function fetchMainSiteCatalog(): Promise<PublicCatalogDataResult> {
  return withTimeout(
    (async () => {
      // 1. Fetch Brands
      const { data: brandsData, error: brandsError } = await supabase
        .from("product_brands")
        .select("id, name, code, slug")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (brandsError) console.warn("[MainSiteCatalog] Brands query warning:", brandsError);
      const brands = brandsData || [];
      const brandMap = new Map(brands.map((b) => [b.id, b]));

      // 2. Fetch Categories
      const { data: categoriesData, error: catError } = await supabase
        .from("product_categories")
        .select("id, name, slug, brand_id")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      if (catError) console.warn("[MainSiteCatalog] Categories query warning:", catError);
      const categories = categoriesData || [];
      const categoryMap = new Map(categories.map((c) => [c.id, c]));

      // 3. Fetch Products (Active only)
      const { data: productsData, error: prodError } = await supabase
        .from("catalog_products")
        .select("id, brand_id, category_id, product_code, name, description, image_url, status, sort_order")
        .eq("status", "active")
        .order("sort_order", { ascending: true })
        .order("product_code", { ascending: true });

      if (prodError) console.warn("[MainSiteCatalog] Products query warning:", prodError);
      const rawProducts = productsData || [];

      if (rawProducts.length === 0) {
        return {
          products: [],
          categories,
          brands,
        };
      }

      const activeProductIds = rawProducts.map((p) => p.id);

      // 4. Fetch Variants (Without Price fields for public privacy)
      const [retailRes, salonRes] = await Promise.all([
        supabase
          .from("catalog_product_variants")
          .select("id, product_id, sku, channel, size_label, is_active")
          .eq("channel", "retail")
          .eq("is_active", true)
          .in("product_id", activeProductIds),
        supabase
          .from("catalog_product_variants")
          .select("id, product_id, sku, channel, size_label, is_active")
          .eq("channel", "salon")
          .eq("is_active", true)
          .in("product_id", activeProductIds),
      ]);

      const retailVariants = (retailRes.data || []) as PublicCatalogVariant[];
      const salonVariants = (salonRes.data || []) as PublicCatalogVariant[];

      const retailByProduct = new Map<string, PublicCatalogVariant[]>();
      retailVariants.forEach((v) => {
        const list = retailByProduct.get(v.product_id) || [];
        list.push(v);
        retailByProduct.set(v.product_id, list);
      });

      const salonByProduct = new Map<string, PublicCatalogVariant[]>();
      salonVariants.forEach((v) => {
        const list = salonByProduct.get(v.product_id) || [];
        list.push(v);
        salonByProduct.set(v.product_id, list);
      });

      // 5. Fetch Public Knowledge (Strictly approved + is_public = true)
      const { data: pkData } = await supabase
        .from("product_knowledge")
        .select(
          "product_id, catalog_product_id, product_characteristics, usage_instructions, benefits, skin_concerns, warnings, ingredient_highlights, skin_types, is_public, qa_status",
        )
        .eq("is_active", true)
        .eq("is_public", true)
        .eq("qa_status", "approved");

      const knowledgeMap = new Map<string, PublicProductKnowledge>();
      if (pkData) {
        pkData.forEach((row: any) => {
          const item: PublicProductKnowledge = {
            usage_instructions: row.usage_instructions || null,
            benefits: row.benefits || null,
            skin_concerns: Array.isArray(row.skin_concerns) ? row.skin_concerns : [],
            warnings: row.warnings || null,
            ingredient_highlights: Array.isArray(row.ingredient_highlights)
              ? row.ingredient_highlights
              : [],
            skin_types: Array.isArray(row.skin_types) ? row.skin_types : [],
            product_characteristics: row.product_characteristics || null,
            activeIngredientPreview: Array.isArray(row.ingredient_highlights)
              ? row.ingredient_highlights.slice(0, 3)
              : [],
            characteristicsPreview: row.product_characteristics
              ? [row.product_characteristics.split("\n")[0].slice(0, 120)]
              : [],
          };
          if (row.product_id != null) knowledgeMap.set(String(row.product_id), item);
          if (row.catalog_product_id) knowledgeMap.set(String(row.catalog_product_id), item);
        });
      }

      // 6. Combine (Without any price fields)
      const products: MainSiteProduct[] = rawProducts.map((p) => {
        const brand = brandMap.get(p.brand_id);
        const cat = p.category_id ? categoryMap.get(p.category_id) : undefined;
        const retList = retailByProduct.get(p.id) || [];
        const salList = salonByProduct.get(p.id) || [];

        const primaryRetail = retList[0];
        const primarySalon = salList[0];

        const codeKey = p.product_code ? String(p.product_code).trim() : "";
        const idKey = String(p.id).trim();
        const kn = (codeKey && knowledgeMap.get(codeKey)) || knowledgeMap.get(idKey) || null;

        return {
          id: p.id,
          product_code: p.product_code,
          name: p.name,
          description: p.description,
          brand_id: p.brand_id,
          brand_name: brand?.name || "DESEMBRE",
          category_id: p.category_id,
          category_name: cat?.name || "Chăm sóc da",
          image_url: p.image_url || null,
          retailVariants: retList,
          salonVariants: salList,
          retailSize: primaryRetail?.size_label ?? null,
          salonSize: primarySalon?.size_label ?? null,
          knowledge: kn,
        };
      });

      return {
        products,
        categories,
        brands,
      };
    })(),
    8000,
    "fetchMainSiteCatalog timed out after 8s",
  );
}
