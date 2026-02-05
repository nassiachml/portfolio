export type ProductColor = "blanc" | "noir" | "beige" | "rouge";
export type ProductMaterial = "toile" | "cuir-synthetique" | "cuir-premium";
export type PackagingType = "standard" | "premium";

export interface ProductConfig {
  color: ProductColor;
  size: number;
  material: ProductMaterial;
  logo: boolean;
  text: boolean;
  sole: boolean;
  packaging: PackagingType;
}

export const BASE_PRICE = 120;

export const MATERIAL_PRICES: Record<ProductMaterial, number> = {
  toile: 0,
  "cuir-synthetique": 20,
  "cuir-premium": 40,
};

export const OPTION_PRICES = {
  logo: 15,
  text: 20,
  sole: 25,
};

export const PACKAGING_PRICES: Record<PackagingType, number> = {
  standard: 0,
  premium: 15,
};

export function calculateProductPrice(config: ProductConfig): number {
  let total = BASE_PRICE;

  // Ajout du prix de la matière
  total += MATERIAL_PRICES[config.material];

  // Ajout des options
  if (config.logo) total += OPTION_PRICES.logo;
  if (config.text) total += OPTION_PRICES.text;
  if (config.sole) total += OPTION_PRICES.sole;

  // Ajout du packaging
  total += PACKAGING_PRICES[config.packaging];

  return total;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export const COLOR_HEX: Record<ProductColor, string> = {
  blanc: "#FFFFFF",
  noir: "#000000",
  beige: "#D4C4A8",
  rouge: "#DC2626",
};
