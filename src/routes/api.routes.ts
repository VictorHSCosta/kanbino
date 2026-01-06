/**
 * API routes
 * All API endpoints are registered here
 */

import { Router, Request, Response } from 'express';
import * as apiController from '../controllers/api.controller.js';

const router = Router();

// Health check
router.get('/health', apiController.getHealth);

// Status endpoint
router.get('/status', apiController.getStatus);

// Example data endpoint
router.get('/data', apiController.getData);

export default router;
