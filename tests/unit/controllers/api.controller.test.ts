/**
 * Unit tests for API Controller
 */

import { getHealth, getStatus, getData } from '../../../src/controllers/api.controller';
import { Request, Response } from 'express';

describe('API Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    mockRequest = {};
    mockResponse = {
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHealth', () => {
    it('should return health status with correct structure', () => {
      getHealth(mockRequest as Request, mockResponse as Response);

      expect(jsonMock).toHaveBeenCalledTimes(1);

      const response = jsonMock.mock.calls[0][0];
      expect(response).toHaveProperty('status', 'healthy');
      expect(response).toHaveProperty('timestamp');
      expect(response).toHaveProperty('uptime');
      expect(response).toHaveProperty('environment');
    });

    it('should return valid ISO timestamp', () => {
      getHealth(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      expect(response.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('should return positive uptime', () => {
      getHealth(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      expect(response.uptime).toBeGreaterThanOrEqual(0);
      expect(typeof response.uptime).toBe('number');
    });

    it('should return environment from NODE_ENV or default to development', () => {
      const originalEnv = process.env.NODE_ENV;
      delete process.env.NODE_ENV;

      getHealth(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      expect(response.environment).toBe('development');

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('getStatus', () => {
    it('should return status with correct structure', () => {
      getStatus(mockRequest as Request, mockResponse as Response);

      expect(jsonMock).toHaveBeenCalledTimes(1);

      const response = jsonMock.mock.calls[0][0];
      expect(response).toHaveProperty('status', 'running');
      expect(response).toHaveProperty('version');
      expect(response).toHaveProperty('features');
    });

    it('should return version string', () => {
      getStatus(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      expect(response.version).toBe('1.0.0');
      expect(typeof response.version).toBe('string');
    });

    it('should return features object with frontend, backend, and styling', () => {
      getStatus(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      expect(response.features).toHaveProperty('frontend');
      expect(response.features).toHaveProperty('backend');
      expect(response.features).toHaveProperty('styling');

      expect(response.features.frontend).toBe('React + Vite + TypeScript');
      expect(response.features.backend).toBe('Node.js + Express + TypeScript');
      expect(response.features.styling).toBe('Tailwind CSS');
    });
  });

  describe('getData', () => {
    it('should return data with correct structure', () => {
      getData(mockRequest as Request, mockResponse as Response);

      expect(jsonMock).toHaveBeenCalledTimes(1);

      const response = jsonMock.mock.calls[0][0];
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('items');
      expect(response).toHaveProperty('timestamp');
    });

    it('should return array of 5 items', () => {
      getData(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      expect(response.items).toHaveLength(5);
      expect(Array.isArray(response.items)).toBe(true);
    });

    it('should return items with correct structure', () => {
      getData(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];

      response.items.forEach((item: any) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('type');

        expect(typeof item.id).toBe('number');
        expect(typeof item.name).toBe('string');
        expect(typeof item.type).toBe('string');
      });
    });

    it('should return expected items', () => {
      getData(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      const itemNames = response.items.map((item: any) => item.name);

      expect(itemNames).toContain('React');
      expect(itemNames).toContain('Node.js');
      expect(itemNames).toContain('TypeScript');
      expect(itemNames).toContain('Tailwind CSS');
      expect(itemNames).toContain('Vite');
    });

    it('should return valid ISO timestamp', () => {
      getData(mockRequest as Request, mockResponse as Response);

      const response = jsonMock.mock.calls[0][0];
      expect(response.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });
});
