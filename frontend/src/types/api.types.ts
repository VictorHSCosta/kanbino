/**
 * API Types
 * TypeScript types for API requests and responses
 */

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

export interface StatusResponse {
  status: string;
  version: string;
  features: {
    frontend: string;
    backend: string;
    styling: string;
  };
}

export interface DataItem {
  id: number;
  name: string;
  type: string;
}

export interface DataResponse {
  message: string;
  items: DataItem[];
  timestamp: string;
}

export interface ApiError {
  error: string;
  message?: string;
  path?: string;
}
