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
      <div className="min-h-screen bg-tech-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tech-secondary mx-auto"></div>
          <p className="mt-4 text-tech-textMuted">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-tech-gradient flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-tech-surface rounded-lg shadow-lg shadow-blue-900/20 border border-tech-surfaceLight p-8">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-tech-error"
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
            <h2 className="mt-4 text-xl font-semibold text-white">Erro</h2>
            <p className="mt-2 text-tech-textMuted">{error}</p>
            <button
              onClick={onBack}
              className="mt-6 w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-tech-primary to-tech-secondary hover:from-tech-primary/90 hover:to-tech-secondary/90 transition-all duration-300"
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
    <div className="min-h-screen bg-tech-gradient py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm font-medium text-tech-secondary hover:text-tech-primary transition-colors"
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
          <div className="mb-6 p-4 bg-tech-success/10 border border-tech-success/30 rounded-lg">
            <div className="flex">
              <svg
                className="h-5 w-5 text-tech-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-3 text-sm font-medium text-tech-success">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {/* Profile card */}
        <div className="bg-tech-surface rounded-lg shadow-lg shadow-blue-900/20 border border-tech-surfaceLight overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-tech-primary to-tech-accent px-6 py-8">
            <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
            <p className="text-tech-textMuted mt-1">Gerencie suas informações</p>
          </div>

          <div className="p-6">
            {/* Photo section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Foto de Perfil</h2>
              <ProfilePhotoUploader
                currentPhoto={user.photo}
                onPhotoUpdated={handlePhotoUpdated}
              />
            </div>

            {/* User info section */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                Informações Pessoais
              </h2>
              <div className="bg-tech-surfaceLight/30 rounded-lg p-6 space-y-4 border border-tech-surfaceLight">
                <div>
                  <p className="text-sm font-medium text-tech-textMuted">Nome Completo</p>
                  <p className="mt-1 text-lg font-medium text-tech-text">
                    {user.displayName}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-tech-textMuted">Nome</p>
                    <p className="mt-1 text-tech-text">{user.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-tech-textMuted">Sobrenome</p>
                    <p className="mt-1 text-tech-text">{user.lastName}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-tech-textMuted">Email</p>
                  <p className="mt-1 text-tech-text">{user.email}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-tech-textMuted">Provedor</p>
                    <p className="mt-1 capitalize text-tech-text">{user.provider}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-tech-textMuted">Membro desde</p>
                    <p className="mt-1 text-tech-text">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {user.profileUrl && (
                  <div>
                    <p className="text-sm font-medium text-tech-textMuted">Perfil do LinkedIn</p>
                    <a
                      href={user.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-tech-secondary hover:text-tech-primary"
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
