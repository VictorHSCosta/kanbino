/**
 * Authentication Routes
 * Routes for OAuth authentication with Google and LinkedIn
 */

import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// ===== GOOGLE OAUTH =====
// Initiate Google login
router.get('/google', authController.googleAuth);

// Google callback
router.get('/google/callback', authController.googleCallback);

// ===== LINKEDIN OAUTH =====
// Initiate LinkedIn login
router.get('/linkedin', authController.linkedinAuth);

// LinkedIn callback
router.get('/linkedin/callback', authController.linkedinCallback);

// ===== COMMON ENDPOINTS =====
// Check authentication status
router.get('/status', authController.checkAuth);

// Get current user
router.get('/me', authController.getCurrentUser);

// Logout
router.post('/logout', authController.logout);

// Success redirect (internal)
router.get('/success', authController.authSuccess);

// Failure redirect (internal)
router.get('/failure', authController.authFailure);

export default router;
