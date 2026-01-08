/**
 * Unit tests for Pricing Configuration
 */

import { pricingConfig } from '../../src/config/pricing.config';

describe('PricingConfig', () => {
  describe('default values', () => {
    it('should have premiumMonthlyPrice of 50', () => {
      expect(pricingConfig.premiumMonthlyPrice).toBe(50);
    });

    it('should have currency as BRL', () => {
      expect(pricingConfig.currency).toBe('BRL');
    });

    it('should have locale as pt-BR', () => {
      expect(pricingConfig.locale).toBe('pt-BR');
    });
  });

  describe('configuration structure', () => {
    it('should export pricingConfig object', () => {
      expect(pricingConfig).toBeDefined();
      expect(typeof pricingConfig).toBe('object');
    });

    it('should have all required properties', () => {
      expect(pricingConfig).toHaveProperty('premiumMonthlyPrice');
      expect(pricingConfig).toHaveProperty('currency');
      expect(pricingConfig).toHaveProperty('locale');
    });

    it('should have numeric premiumMonthlyPrice', () => {
      expect(typeof pricingConfig.premiumMonthlyPrice).toBe('number');
    });

    it('should have string currency and locale', () => {
      expect(typeof pricingConfig.currency).toBe('string');
      expect(typeof pricingConfig.locale).toBe('string');
    });
  });
});
