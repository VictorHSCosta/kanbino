/**
 * Profile Routes
 * Routes for user profile management
 */

import { Router } from 'express';
import {
  uploadPhoto,
  deletePhoto,
  getProfile,
} from '../controllers/profile.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { handleAvatarUpload } from '../middleware/upload.config.js';

const router = Router();

// All routes require authentication
router.use(isAuthenticated);

/**
 * @route   PUT /api/profile/photo
 * @desc    Upload/update user profile photo
 * @access  Private
 */
router.put('/photo', handleAvatarUpload, uploadPhoto);

/**
 * @route   DELETE /api/profile/photo
 * @desc    Remove user profile photo
 * @access  Private
 */
router.delete('/photo', deletePhoto);

/**
 * @route   GET /api/profile
 * @desc    Get user profile data
 * @access  Private
 */
router.get('/', getProfile);

export default router;
