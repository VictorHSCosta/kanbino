/**
 * Validation Middleware
 * Request validation using Zod schemas
 */

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { logger } from '../utils/logger.js';

/**
 * Validation error response format
 */
interface ValidationError {
  field: string;
  message: string;
}

/**
 * Create validation middleware for a given Zod schema
 * Validates request body, params, or query
 */
export function validate(schema: ZodSchema, property: 'body' | 'params' | 'query' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate the specified property
      const validatedData = schema.parse(req[property]);

      // Replace the property with validated data
      req[property] = validatedData as any;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors for user-friendly response
        const validationErrors: ValidationError[] = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn(`Validation failed for ${property}:`, validationErrors);

        res.status(400).json({
          error: 'Bad Request',
          message: 'Dados de entrada inválidos',
          validationErrors,
        });
      } else {
        logger.error('Unexpected validation error:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Erro ao validar dados',
        });
      }
    }
  };
}

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(req: Request, res: Response, next: NextFunction): void {
  const sanitize = (value: any): any => {
    if (typeof value === 'string') {
      // Remove HTML tags and escape special characters
      return value
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .trim();
    }

    if (Array.isArray(value)) {
      return value.map(sanitize);
    }

    if (typeof value === 'object' && value !== null) {
      const sanitized: any = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          sanitized[key] = sanitize(value[key]);
        }
      }
      return sanitized;
    }

    return value;
  };

  // Sanitize body
  if (req.body) {
    req.body = sanitize(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitize(req.query);
  }

  next();
}
