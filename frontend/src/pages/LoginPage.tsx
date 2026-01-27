/**
 * Login Page
 * Modern login page with social authentication
 */

import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../components/Logo';
import { LoginButton } from '../components/LoginButton';

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (provider: 'google' | 'linkedin') => {
    login(provider);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Login Card */}
        <main className="bg-white rounded-2xl shadow-xl p-8" role="main">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
            <p className="text-gray-500 mt-2">
              Faça login para acessar o Kanbino
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3" role="group" aria-label="Opções de login social">
            <LoginButton
              provider="google"
              onClick={() => handleLogin('google')}
            />
            <LoginButton
              provider="linkedin"
              onClick={() => handleLogin('linkedin')}
            />
          </div>

          {/* Divider */}
          <div className="relative my-6" role="separator" aria-orientation="horizontal">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400">
                Ou continue com
              </span>
            </div>
          </div>

          {/* Email/Password Form (Placeholder for future implementation) */}
          <form className="space-y-4 mb-6" onSubmit={(e) => e.preventDefault()}>
            <fieldset disabled className="space-y-4">
              <legend className="sr-only">Formulário de login</legend>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="seu@email.com"
                  disabled
                  aria-describedby="email-hint"
                />
                <span id="email-hint" className="sr-only">
                  Campo de email desabilitado. Use as opções de login social acima.
                </span>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  disabled
                  aria-describedby="password-hint"
                />
                <span id="password-hint" className="sr-only">
                  Campo de senha desabilitado. Use as opções de login social acima.
                </span>
              </div>
              <button
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
                type="submit"
              >
                Entrar
              </button>
            </fieldset>
          </form>

          {/* Footer Links */}
          <nav className="text-center text-sm space-y-2" aria-label="Links auxiliares">
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
            >
              Esqueceu sua senha?
            </a>
            <div className="text-gray-500">
              Não tem uma conta?{' '}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
              >
                Criar conta
              </a>
            </div>
          </nav>
        </main>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Ao fazer login, você concorda com nossos{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
