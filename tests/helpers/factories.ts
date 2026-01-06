/**
 * Factory functions for creating test data
 * Uses faker to generate realistic test data
 */

import { faker } from '@faker-js/faker';

/**
 * User factory
 */
export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Create multiple users
 */
export function createUsers(count: number, overrides: Partial<User> = {}): User[] {
  return Array.from({ length: count }, () => createUser(overrides));
}

/**
 * Product factory
 */
export function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 1, max: 1000, dec: 2 })),
    quantity: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Create multiple products
 */
export function createProducts(count: number, overrides: Partial<Product> = {}): Product[] {
  return Array.from({ length: count }, () => createProduct(overrides));
}

/**
 * Error factory
 */
export function createError(overrides: Partial<CustomError> = {}): CustomError {
  return {
    name: faker.word.adjective(),
    message: faker.lorem.sentence(),
    code: faker.string.alphanumeric({ length: 5 }),
    statusCode: faker.number.int({ min: 400, max: 599 }),
    ...overrides,
  };
}

/**
 * API Response factory
 */
export function createApiResponse<T>(data: T, overrides: Partial<ApiResponse<T>> = {}): ApiResponse<T> {
  return {
    success: faker.datatype.boolean(),
    data,
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toISOString(),
    ...overrides,
  };
}

/**
 * Pagination metadata factory
 */
export function createPaginationMetadata(overrides: Partial<PaginationMetadata> = {}): PaginationMetadata {
  return {
    page: faker.number.int({ min: 1, max: 10 }),
    pageSize: faker.number.int({ min: 10, max: 100 }),
    totalItems: faker.number.int({ min: 0, max: 1000 }),
    totalPages: faker.number.int({ min: 1, max: 100 }),
    hasNext: faker.datatype.boolean(),
    hasPrevious: faker.datatype.boolean(),
    ...overrides,
  };
}

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomError extends Error {
  name: string;
  message: string;
  code: string;
  statusCode: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

interface PaginationMetadata {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
