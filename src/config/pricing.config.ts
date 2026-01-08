/**
 * Pricing Configuration
 * Defines premium pricing structure for Kanbino product
 */

/**
 * Pricing configuration interface
 */
export interface PricingConfig {
  /** Monthly price for premium plan in BRL */
  premiumMonthlyPrice: number;
  /** Currency code (ISO 4217) */
  currency: string;
  /** Locale for price formatting */
  locale: string;
}

/**
 * Load pricing configuration from environment variables
 * @returns Pricing configuration object
 */
function loadPricingConfig(): PricingConfig {
  return {
    premiumMonthlyPrice: parseInt(process.env.PREMIUM_MONTHLY_PRICE || '50', 10),
    currency: process.env.CURRENCY || 'BRL',
    locale: process.env.PRICING_LOCALE || 'pt-BR',
  };
}

/**
 * Export pricing configuration
 */
export const pricingConfig = loadPricingConfig();
