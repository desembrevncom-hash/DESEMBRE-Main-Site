export interface BrandSettings {
  id: string;
  site_name: string;
  header_logo_url: string | null;
  logo_mark_url: string | null;
  favicon_url: string | null;
  apple_touch_icon_url: string | null;
  hotline: string;
  email: string;
  address: string;
  partner_hub_url: string;
  academy_url: string;
  zalo_oa_url: string;
}

export const DEFAULT_BRANDING: BrandSettings = {
  id: "default",
  site_name: "DESEMBRE VIETNAM",
  header_logo_url: "/logo.svg",
  logo_mark_url: "/favicon.png",
  favicon_url: "/favicon.png",
  apple_touch_icon_url: "/favicon.png",
  hotline: "0333 60 26 26",
  email: "contact@desembre-vn.com",
  address: "Tầng 5, Tòa nhà Desembre, Hà Nội, Việt Nam",
  partner_hub_url: import.meta.env.VITE_PARTNER_HUB_URL || "https://hub.desembre-vn.com",
  academy_url: import.meta.env.VITE_ACADEMY_URL || "https://training.desembre-vn.com",
  zalo_oa_url: "https://oa.zalo.me/4334213079675481491",
};
