/**
 * Authentication Controller
 * Handles all authentication-related endpoints
 */

import { Request, Response } from 'express';
import { passport } from '../auth/index.js';
import { User } from '../types/auth.types.js';
import { logger } from '../utils/logger.js';

// Initiate Google authentication
export function googleAuth(req: Request, res: Response, next: any): void {
  const authenticator = passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
  });

  authenticator(req, res, next);
}

// Initiate LinkedIn authentication
export function linkedinAuth(req: Request, res: Response, next: any): void {
  const authenticator = passport.authenticate('linkedin', {
    scope: ['r_liteprofile', 'r_emailaddress'],
  });

  authenticator(req, res, next);
}

// Google OAuth callback
export const googleCallback = passport.authenticate('google', {
  successRedirect: '/api/auth/success',
  failureRedirect: '/api/auth/failure',
});

// LinkedIn OAuth callback
export const linkedinCallback = passport.authenticate('linkedin', {
  successRedirect: '/api/auth/success',
  failureRedirect: '/api/auth/failure',
});

// Success redirect handler
export function authSuccess(req: Request, res: Response): void {
  const user = req.user as User;

  logger.info(`User authenticated: ${user.email} via ${user.provider}`);

  // In production, redirect to frontend
  res.redirect('/dashboard');
}

// Failure redirect handler
export function authFailure(req: Request, res: Response): void {
  logger.warn('Authentication failed');

  res.status(401).json({
    error: 'Authentication Failed',
    message: 'Failed to authenticate with provider',
  });
}

// Get current user
export function getCurrentUser(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'No user session',
    });
    return;
  }

  const user = req.user as User;

  res.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      provider: user.provider,
      profileUrl: user.profileUrl,
    },
  });
}

// Logout
export function logout(req: Request, res: Response): void {
  const user = req.user as User;

  req.logout((err) => {
    if (err) {
      logger.error('Logout error:', err);
      return res.status(500).json({
        error: 'Logout Failed',
        message: 'Failed to logout',
      });
    }

    logger.info(`User logged out: ${user?.email}`);

    res.json({
      message: 'Logged out successfully',
    });
  });
}

// Check authentication status
export function checkAuth(req: Request, res: Response): void {
  const isAuthenticated = req.isAuthenticated && req.isAuthenticated();

  res.json({
    authenticated: isAuthenticated,
    user: isAuthenticated ? req.user : null,
  });
}
