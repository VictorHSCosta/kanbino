/**
 * Common mocks for testing
 */

/**
 * Mock logger
 */
export const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
};

/**
 * Mock database connection
 */
export const mockDatabase = {
  connect: jest.fn(),
  disconnect: jest.fn(),
  query: jest.fn(),
  transaction: jest.fn(),
};

/**
 * Mock external API client
 */
export const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

/**
 * Mock cache
 */
export const mockCache = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  clear: jest.fn(),
};

/**
 * Mock event emitter
 */
export const mockEventEmitter = {
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  once: jest.fn(),
};

/**
 * Get mock function that returns a value
 */
export function mockResolvedValue<T>(value: T): jest.MockedFunction<() => Promise<T>> {
  return jest.fn().mockResolvedValue(value) as jest.MockedFunction<() => Promise<T>>;
}

/**
 * Get mock function that rejects with an error
 */
export function mockRejectedValue(error: Error): jest.MockedFunction<() => Promise<never>> {
  return jest.fn().mockRejectedValue(error) as jest.MockedFunction<() => Promise<never>>;
}
