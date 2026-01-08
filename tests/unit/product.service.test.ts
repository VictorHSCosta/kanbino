/**
 * Unit tests for Product Service
 */

import * as productService from '../../src/services/product.service';

describe('ProductService', () => {
  describe('getAvailableProducts', () => {
    it('should return array with 2 products', async () => {
      const products = await productService.getAvailableProducts();
      expect(products).toHaveLength(2);
      expect(products).toEqual(expect.any(Array));
    });

    it('should return Free and Premium products', async () => {
      const products = await productService.getAvailableProducts();
      const types = products.map(p => p.type);
      expect(types).toContain('FREE');
      expect(types).toContain('PREMIUM');
    });

    it('should have Premium product with price 5000 (R$ 50,00 in cents)', async () => {
      const products = await productService.getAvailableProducts();
      const premiumProduct = products.find(p => p.type === 'PREMIUM');
      expect(premiumProduct?.price).toBe(5000);
    });

    it('should have Premium product with monthly billing period', async () => {
      const products = await productService.getAvailableProducts();
      const premiumProduct = products.find(p => p.type === 'PREMIUM');
      expect(premiumProduct?.billingPeriod).toBe('monthly');
    });
  });

  describe('getProductById', () => {
    it('should return product for valid ID', async () => {
      const product = await productService.getProductById('1');
      expect(product).not.toBeNull();
      expect(product?.id).toBe('1');
    });

    it('should return null for invalid ID', async () => {
      const product = await productService.getProductById('999');
      expect(product).toBeNull();
    });

    it('should return Premium product with ID 2', async () => {
      const product = await productService.getProductById('2');
      expect(product?.type).toBe('PREMIUM');
      expect(product?.price).toBe(5000);
    });
  });

  describe('getPremiumProduct', () => {
    it('should return Premium product', async () => {
      const product = await productService.getPremiumProduct();
      expect(product).not.toBeNull();
      expect(product?.type).toBe('PREMIUM');
    });

    it('should have price of 50 BRL', async () => {
      const product = await productService.getPremiumProduct();
      expect(product?.price).toBe(5000); // 50.00 in cents
      expect(product?.currency).toBe('BRL');
    });
  });

  describe('formatPrice', () => {
    it('should format 5000 cents as R$ 50,00', () => {
      const formatted = productService.formatPrice(5000, 'BRL', 'pt-BR');
      expect(formatted).toBe('R$ 50,00');
    });

    it('should format 0 cents as R$ 0,00', () => {
      const formatted = productService.formatPrice(0, 'BRL', 'pt-BR');
      expect(formatted).toBe('R$ 0,00');
    });

    it('should format 10000 cents as R$ 100,00', () => {
      const formatted = productService.formatPrice(10000, 'BRL', 'pt-BR');
      expect(formatted).toBe('R$ 100,00');
    });

    it('should use default currency and locale if not provided', () => {
      const formatted = productService.formatPrice(5000);
      expect(formatted).toContain('R$');
    });
  });

  describe('getPricingInfo', () => {
    it('should return pricing information with premium price 50', async () => {
      const pricingInfo = await productService.getPricingInfo();
      expect(pricingInfo.premiumMonthlyPrice).toBe(50);
    });

    it('should return BRL as currency', async () => {
      const pricingInfo = await productService.getPricingInfo();
      expect(pricingInfo.currency).toBe('BRL');
    });

    it('should return formatted price', async () => {
      const pricingInfo = await productService.getPricingInfo();
      expect(pricingInfo.formattedPrice).toContain('R$');
      expect(pricingInfo.formattedPrice).toContain('50');
    });

    it('should return pt-BR as locale', async () => {
      const pricingInfo = await productService.getPricingInfo();
      expect(pricingInfo.locale).toBe('pt-BR');
    });
  });
});
