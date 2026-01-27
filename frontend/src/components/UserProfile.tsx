/**
 * User Profile Component
 * Displays user information in the dashboard
 */

import React from 'react';
import { AuthUser } from '../types/auth.types';

interface UserProfileProps {
  user: AuthUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const getProviderBadgeColor = (provider: string) => {
    switch (provider) {
      case 'google':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'linkedin':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.photo ? (
          <img
            src={user.photo}
            alt={`Foto de ${user.displayName}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
            {user.firstName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.displayName}
        </p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>

      {/* Provider Badge */}
      <div className="flex-shrink-0">
        <span
          className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
            ${getProviderBadgeColor(user.provider)}
          `}
        >
          {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
        </span>
      </div>
    </div>
  );
}
