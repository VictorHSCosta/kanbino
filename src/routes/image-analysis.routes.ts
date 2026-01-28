/**
 * Image Analysis Routes
 * Routes for image analysis functionality
 */

import { Router } from 'express';
import * as imageAnalysisController from '../controllers/image-analysis.controller.js';
import { uploadAnalysisImage } from '../middleware/upload.config.js';

const router = Router();

/**
 * POST /api/image-analysis/analyze
 * Analyze an uploaded image or image from URL
 *
 * Request body:
 * - For URL: { "imageUrl": "http://...", "analysisType": "full" }
 * - For file: multipart/form-data with field "image" and optional "analysisType"
 *
 * Response: { success: true, data: ImageAnalysisResponse }
 */
router.post('/analyze', uploadAnalysisImage, imageAnalysisController.analyzeImage);

/**
 * GET /api/image-analysis/report/:id
 * Download analysis report as Markdown file
 *
 * Params: id - analysis ID
 * Response: .md file download
 */
router.get('/report/:id', imageAnalysisController.downloadReport);

/**
 * GET /api/image-analysis/history
 * Get analysis history (requires persistence implementation)
 *
 * Response: { success: true, data: AnalysisHistory[] }
 */
router.get('/history', imageAnalysisController.getHistory);

/**
 * DELETE /api/image-analysis/cache
 * Clear analysis cache
 *
 * Response: { success: true, message: "Cache cleared" }
 */
router.delete('/cache', imageAnalysisController.clearCache);

/**
 * GET /api/image-analysis/cache/info
 * Get cache information
 *
 * Response: { success: true, cacheSize: number }
 */
router.get('/cache/info', imageAnalysisController.getCacheInfo);

export default router;
