/**
 * LoginPage Component
 * Beautiful login page with OAuth authentication
 */

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoginPage() {
  const { login, error, clearError } = useAuth();
  const [providerLoading, setProviderLoading] = useState<string | null>(null);

  const handleLogin = async (provider: 'google' | 'linkedin') => {
    try {
      clearError();
      setProviderLoading(provider);
      login(provider);
    } catch (err) {
      setProviderLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up hover:shadow-2xl transition-shadow duration-300">
          {/* Header */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-indigo-600 mb-2">
                Kanbino
              </h1>
              <p className="text-gray-600 text-sm">
                Gerencie seus projetos de forma inteligente
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <p className="text-center text-gray-700 text-sm">
                Entre com sua conta para acessar o Kanbino
              </p>
            </div>

            {/* Login Buttons */}
            <div className="space-y-3">
              {/* Google Login Button */}
              <button
                onClick={() => handleLogin('google')}
                disabled={!!providerLoading}
                className="w-full relative bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Continuar com Google"
              >
                <div className="flex items-center justify-center">
                  {providerLoading === 'google' ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span>Continuar com Google</span>
                    </>
                  )}
                </div>
              </button>

              {/* LinkedIn Login Button */}
              <button
                onClick={() => handleLogin('linkedin')}
                disabled={!!providerLoading}
                className="w-full relative bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Continuar com LinkedIn"
              >
                <div className="flex items-center justify-center">
                  {providerLoading === 'linkedin' ? (
                    <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>Continuar com LinkedIn</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">
                  acesso seguro e criptografado
                </span>
              </div>
            </div>

            {/* Footer Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Ao continuar, você concorda com nossos
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                >
                  Termos de Uso
                </a>
                <span className="text-gray-400">e</span>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                >
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Protegido por reCAPTCHA e sujeito à
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 ml-1 transition-colors duration-200"
            >
              Política de Privacidade
            </a>
            {' '}
            e
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 ml-1 transition-colors duration-200"
            >
              Termos de Serviço
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
