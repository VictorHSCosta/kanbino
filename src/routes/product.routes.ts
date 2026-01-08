/**
 * Product Routes
 * API endpoints for products and pricing
 */

import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';

const router = Router();

// Get all available products
router.get('/', productController.getProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Get premium pricing information
router.get('/premium/pricing', productController.getPricing);

export default router;
