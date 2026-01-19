/**
 * Authentication Middleware
 * Middleware for protecting routes and managing authentication
 */

import { Request, Response, NextFunction } from 'express';
import { passport } from '../auth/index.js';
import { User } from '../types/auth.types.js';

// Extend Express Request type
declare module 'express' {
  interface Request {
    user?: User;
    isAuthenticated(): boolean;
  }
}

// Middleware to check if user is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    error: 'Unauthorized',
    message: 'Authentication required',
  });
}

// Optional authentication - returns user data if authenticated
export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated && req.isAuthenticated()) {
    req.user = req.user as User;
  }
  next();
}

// Initialize Passport
export function initializePassport(): ReturnType<typeof passport.initialize> {
  return passport.initialize();
}

// Passport session
export function passportSession(): ReturnType<typeof passport.session> {
  return passport.session();
}
