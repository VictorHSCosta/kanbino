/**
 * Product Controller
 * Handles HTTP requests for products and pricing
 */

import { Request, Response } from 'express';
import * as productService from '../services/product.service.js';

/**
 * Get all available products
 * @route GET /api/products
 */
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAvailableProducts();

    res.json({
      success: true,
      data: products,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get product by ID
 * @route GET /api/products/:id
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    res.json({
      success: true,
      data: product,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get premium pricing information
 * @route GET /api/products/premium/pricing
 */
export const getPricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const pricingInfo = await productService.getPricingInfo();

    res.json({
      success: true,
      data: pricingInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing information',
      timestamp: new Date().toISOString(),
    });
  }
};
