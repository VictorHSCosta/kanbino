/**
 * Error Handling Middleware
 * Centralized error handling for Express
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

/**
 * Error handler middleware
 */
export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error with context
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    statusCode: err.statusCode,
  });

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse: {
    error: string;
    message?: string;
    details?: any;
    stack?: string;
  } = {
    error: getErrorMessage(statusCode, err.message),
  };

  // Include message in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.message = err.message;
    errorResponse.stack = err.stack;
  } else {
    // In production, include user-friendly message for client errors
    if (statusCode < 500) {
      errorResponse.message = err.message;
    }
  }

  // Include details if available (in development only)
  if (process.env.NODE_ENV === 'development' && err.details) {
    errorResponse.details = err.details;
  }

  res.status(statusCode).json(errorResponse);
}

/**
 * Get user-friendly error message based on status code
 */
function getErrorMessage(statusCode: number, originalMessage?: string): string {
  const messages: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    422: 'Validation Error',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };

  return messages[statusCode] || 'Error';
}

/**
 * Create a validation error
 */
export class ValidationError extends Error implements ApiError {
  statusCode = 422;
  details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

/**
 * Create a not found error
 */
export class NotFoundError extends Error implements ApiError {
  statusCode = 404;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

/**
 * Create an unauthorized error
 */
export class UnauthorizedError extends Error implements ApiError {
  statusCode = 401;

  constructor(message: string = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Create a forbidden error
 */
export class ForbiddenError extends Error implements ApiError {
  statusCode = 403;

  constructor(message: string = 'Access forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/**
 * Create a conflict error
 */
export class ConflictError extends Error implements ApiError {
  statusCode = 409;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
