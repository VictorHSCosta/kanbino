/**
 * API response fixtures
 */

import { faker } from '@faker-js/faker';

/**
 * Successful API response
 */
export const successApiResponseFixture = {
  success: true,
  data: {
    message: 'Operation completed successfully',
  },
  message: 'Success',
  timestamp: new Date().toISOString(),
};

/**
 * Error API response
 */
export const errorApiResponseFixture = {
  success: false,
  error: {
    code: 'INTERNAL_ERROR',
    message: 'An internal error occurred',
    details: [],
  },
  message: 'Error',
  timestamp: new Date().toISOString(),
};

/**
 * Validation error response
 */
export const validationErrorResponseFixture = {
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    details: [
      {
        field: 'email',
        message: 'Email is required',
      },
      {
        field: 'password',
        message: 'Password must be at least 8 characters',
      },
    ],
  },
  message: 'Validation Error',
  timestamp: new Date().toISOString(),
};

/**
 * Not found error response
 */
export const notFoundErrorResponseFixture = {
  success: false,
  error: {
    code: 'NOT_FOUND',
    message: 'Resource not found',
    details: [],
  },
  message: 'Not Found',
  timestamp: new Date().toISOString(),
};

/**
 * Unauthorized error response
 */
export const unauthorizedErrorResponseFixture = {
  success: false,
  error: {
    code: 'UNAUTHORIZED',
    message: 'Authentication required',
    details: [],
  },
  message: 'Unauthorized',
  timestamp: new Date().toISOString(),
};

/**
 * Paginated response fixture
 */
export function createPaginatedResponseFixture<T>(
  data: T[],
  page: number = 1,
  pageSize: number = 10,
  totalItems: number = data.length
) {
  return {
    success: true,
    data,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      hasNext: page * pageSize < totalItems,
      hasPrevious: page > 1,
    },
    message: 'Success',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Rate limit error response
 */
export const rateLimitErrorResponseFixture = {
  success: false,
  error: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests',
    details: {
      retryAfter: 60,
    },
  },
  message: 'Rate Limit Exceeded',
  timestamp: new Date().toISOString(),
};
