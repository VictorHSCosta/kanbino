/**
 * Profile Page
 * Displays user profile and allows photo upload
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { UserProfile } from '../types/api.types';
import ProfilePhotoUploader from '../components/ProfilePhotoUploader';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await apiService.getProfile();
      setUser(profile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar perfil';
      setError(errorMessage);

      // If unauthorized, user should log in
      if (errorMessage.includes('Unauthorized') || errorMessage.includes('401')) {
        setError('Você precisa estar autenticado para acessar esta página.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpdated = (photoUrl: string) => {
    if (user) {
      setUser({ ...user, photo: photoUrl });
      setSuccessMessage('Foto de perfil atualizada com sucesso!');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-rose-100">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Erro</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={onBack}
              className="mt-6 w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </button>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-accent-50 border-2 border-accent-200 rounded-xl">
            <div className="flex">
              <svg
                className="h-5 w-5 text-accent-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-3 text-sm font-medium text-accent-800">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {/* Profile card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
            <p className="text-purple-100 mt-1">Gerencie suas informações</p>
          </div>

          <div className="p-6">
            {/* Photo section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Foto de Perfil</h2>
              <ProfilePhotoUploader
                currentPhoto={user.photo}
                onPhotoUpdated={handlePhotoUpdated}
              />
            </div>

            {/* User info section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informações Pessoais
              </h2>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 space-y-4 border border-primary-100">
                <div>
                  <p className="text-sm font-medium text-primary-700">Nome Completo</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {user.displayName}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary-700">Nome</p>
                    <p className="mt-1 text-gray-900">{user.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-700">Sobrenome</p>
                    <p className="mt-1 text-gray-900">{user.lastName}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-primary-700">Email</p>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary-700">Provedor</p>
                    <p className="mt-1 capitalize text-gray-900">{user.provider}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-700">Membro desde</p>
                    <p className="mt-1 text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {user.profileUrl && (
                  <div>
                    <p className="text-sm font-medium text-primary-700">Perfil do LinkedIn</p>
                    <a
                      href={user.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-primary-600 hover:text-primary-500 font-medium"
                    >
                      {user.profileUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
