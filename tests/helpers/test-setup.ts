/**
 * Test setup helper
 * Provides common setup functionality for tests
 */

import { faker } from '@faker-js/faker';

/**
 * Setup test environment
 */
export function setupTestEnvironment(): void {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.LOG_LEVEL = 'error';
}

/**
 * Cleanup test environment
 */
export function cleanupTestEnvironment(): void {
  // Clear all mocks
  jest.clearAllMocks();

  // Reset modules
  jest.resetModules();
}

/**
 * Generate a random test ID
 */
export function generateTestId(): string {
  return faker.string.uuid();
}

/**
 * Create a test delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Setup test database (placeholder)
 */
export async function setupTestDatabase(): Promise<void> {
  // Implement database setup if needed
  // Example: connect to in-memory database
}

/**
 * Cleanup test database (placeholder)
 */
export async function cleanupTestDatabase(): Promise<void> {
  // Implement database cleanup if needed
  // Example: close database connection
}
