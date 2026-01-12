/**
 * Authentication Types
 * Type definitions for OAuth authentication with Google and LinkedIn
 */

export type AuthProvider = 'google' | 'linkedin';

export interface User {
  id: string;
  providerId: string; // ID from Google or LinkedIn
  provider: AuthProvider;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  photo?: string;
  profileUrl?: string; // Specific for LinkedIn
  createdAt: Date;
}

export interface ExpressSession {
  passport: {
    user: User;
  };
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: Array<{
    value: string;
    verified: boolean;
  }>;
  photos: Array<{
    value: string;
  }>;
  provider: string;
  _json: any;
}

export interface LinkedInProfile {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: Array<{
    value: string;
    verified: boolean;
  }>;
  photos: Array<{
    value: string;
  }>;
  profileUrl?: string; // LinkedIn profile URL
  provider: string;
  _json: any;
}
