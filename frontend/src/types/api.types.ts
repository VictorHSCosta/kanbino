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

/**
 * Profile Types
 */

export type AuthProvider = 'google' | 'linkedin';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  photo?: string;
  provider: AuthProvider;
  profileUrl?: string;
  createdAt: Date;
}

export interface UpdatePhotoResponse {
  success: boolean;
  photoUrl: string;
  message: string;
}

export interface DeletePhotoResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse {
  authenticated: boolean;
  user?: UserProfile;
}
