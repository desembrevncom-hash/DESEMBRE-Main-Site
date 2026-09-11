export interface PublicCatalogVariant {
  id: string;
  product_id: string;
  sku?: string | null;
  channel: "retail" | "salon";
  size_label?: string | null;
  is_active: boolean;
}

export interface PublicProductKnowledge {
  usage_instructions?: string | null;
  benefits?: string | null;
  skin_concerns?: string[];
  warnings?: string | null;
  ingredient_highlights?: string[];
  skin_types?: string[];
  product_characteristics?: string | null;
  highlightPreview?: string[];
  characteristicsPreview?: string[];
  activeIngredientPreview?: string[];
}

export interface MainSiteProduct {
  id: string;
  product_code?: string | null;
  name: string;
  description?: string | null;
  brand_id?: string | null;
  brand_name?: string | null;
  category_id?: string | null;
  category_name?: string | null;
  image_url?: string | null;
  retailVariants: PublicCatalogVariant[];
  salonVariants: PublicCatalogVariant[];
  knowledge?: PublicProductKnowledge | null;
  retailSize?: string | null;
  salonSize?: string | null;
}

export interface MainSiteCategory {
  id: string;
  name: string;
  slug?: string | null;
  brand_id?: string | null;
}

export interface MainSiteBrand {
  id: string;
  name: string;
  code?: string | null;
  slug?: string | null;
}
