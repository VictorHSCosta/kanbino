/**
 * Authentication Types
 * Type definitions for authentication system
 */

export interface AuthUser {
  id: string
  email: string
  displayName: string
  firstName: string
  lastName: string
  photo: string
  provider: 'google' | 'linkedin'
  profileUrl?: string
}

export interface AuthStatusResponse {
  authenticated: boolean
  user: AuthUser | null
}

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (provider: 'google' | 'linkedin') => void
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}
