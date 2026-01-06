/**
 * User fixtures for testing
 * Contains valid and invalid user data
 */

import { faker } from '@faker-js/faker';

/**
 * Valid user fixture
 */
export const validUserFixture = {
  id: faker.string.uuid(),
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'SecurePassword123!',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

/**
 * Another valid user for testing multiple users
 */
export const anotherValidUserFixture = {
  id: faker.string.uuid(),
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  password: 'AnotherSecure456!',
  createdAt: new Date('2024-02-01'),
  updatedAt: new Date('2024-02-15'),
};

/**
 * Invalid user fixtures for edge cases
 */
export const invalidUserFixtures = {
  missingEmail: {
    id: faker.string.uuid(),
    name: 'No Email User',
    email: '',
    password: 'Password123!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  missingPassword: {
    id: faker.string.uuid(),
    name: 'No Password User',
    email: 'nopassword@example.com',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  invalidEmail: {
    id: faker.string.uuid(),
    name: 'Invalid Email User',
    email: 'not-an-email',
    password: 'Password123!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  weakPassword: {
    id: faker.string.uuid(),
    name: 'Weak Password User',
    email: 'weak@example.com',
    password: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  shortName: {
    id: faker.string.uuid(),
    name: 'A',
    email: 'shortname@example.com',
    password: 'Password123!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

/**
 * User list for pagination tests
 */
export const userListFixture = Array.from({ length: 15 }, (_, index) => ({
  id: faker.string.uuid(),
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  password: `Password${index + 1}!`,
  createdAt: new Date(`2024-0${(index % 3) + 1}-01`),
  updatedAt: new Date(`2024-0${(index % 3) + 1}-15`),
}));

/**
 * User for creation (without id and dates)
 */
export const userToCreateFixture = {
  name: 'New User',
  email: 'newuser@example.com',
  password: 'NewUserPassword123!',
};

/**
 * User for update
 */
export const userToUpdateFixture = {
  name: 'Updated User',
  email: 'updated@example.com',
};
