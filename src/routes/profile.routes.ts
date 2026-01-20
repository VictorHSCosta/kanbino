/**
 * Profile Routes
 * Routes for profile management
 */

import { Router } from 'express';
import * as profileController from '../controllers/profile.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { uploadProfilePhoto } from '../middleware/upload.config.js';

const router = Router();

// All profile routes require authentication
router.use(isAuthenticated);

/**
 * POST /api/profile/photo
 * Upload and update profile photo
 */
router.post('/photo', uploadProfilePhoto, profileController.uploadProfilePhoto);

/**
 * GET /api/profile/me
 * Get current user profile
 */
router.get('/me', profileController.getProfile);

export default router;
