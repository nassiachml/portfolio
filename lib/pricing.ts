export type ProjectType = "vitrine" | "ecommerce" | "mobile";

export interface PricingConfig {
  projectType: ProjectType;
  pages: number;
  design: boolean;
  form: boolean;
  auth: boolean;
  payment: boolean;
  admin: boolean;
  delivery: "standard" | "rapide" | "urgent";
}

export const BASE_PRICES: Record<ProjectType, number> = {
  vitrine: 800,
  ecommerce: 1500,
  mobile: 2500,
};

export const DELIVERY_PRICES: Record<string, number> = {
  standard: 0,
  rapide: 300,
  urgent: 600,
};

export const OPTION_PRICES = {
  design: 400,
  form: 150,
  auth: 300,
  payment: 500,
  admin: 600,
};

export const PAGE_PRICE = 50;

export function calculatePrice(config: PricingConfig): number {
  let total = BASE_PRICES[config.projectType];

  // Ajout du prix des pages
  total += config.pages * PAGE_PRICE;

  // Ajout des options
  if (config.design) total += OPTION_PRICES.design;
  if (config.form) total += OPTION_PRICES.form;
  if (config.auth) total += OPTION_PRICES.auth;
  if (config.payment) total += OPTION_PRICES.payment;
  if (config.admin) total += OPTION_PRICES.admin;

  // Ajout du prix du délai
  total += DELIVERY_PRICES[config.delivery];

  return total;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
