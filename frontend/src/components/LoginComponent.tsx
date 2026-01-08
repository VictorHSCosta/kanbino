/**
 * LoginComponent - Login form component for Kanbino
 *
 * Features:
 * - Email and password validation
 * - Password requirements: minimum 8 characters, maximum 32 characters
 * - Real-time character counter for password field
 * - Show/hide password toggle
 * - Loading state during authentication
 * - Form validation with error messages
 * - Remember me checkbox
 * - Links for password recovery and account creation
 * - Advanced password strength indicator
 * - Keyboard shortcuts (Enter to submit, Escape to clear)
 *
 * @component
 * @example
 * ```tsx
 * <LoginComponent
 *   onLogin={(credentials) => console.log('Login attempt', credentials)}
 *   isLoading={false}
 * />
 * ```
 */

import React, { useState, useEffect } from 'react';
import { LoginCredentials, ValidationErrors } from '../types/auth.types';
import {
  validateEmail,
  validatePasswordLength,
  validatePasswordStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
  getPasswordStrengthTextColor,
} from '../utils/validation';

interface LoginComponentProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin, isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Password requirements
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 32;

  /**
   * Validates form fields using validation utilities
   */
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Email validation
    const emailResult = validateEmail(email);
    if (!emailResult.isValid) {
      newErrors.email = emailResult.message;
    }

    // Password validation
    const passwordResult = validatePasswordLength(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);
    if (!passwordResult.isValid) {
      newErrors.password = passwordResult.message;
    }

    return newErrors;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onLogin({ email, password, rememberMe });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles email input change
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Clear error on change if field was touched
    if (touched.email && errors.email) {
      const result = validateEmail(e.target.value);
      if (!result.isValid) {
        setErrors((prev) => ({ ...prev, email: result.message }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  /**
   * Handles email blur event
   */
  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));

    const result = validateEmail(email);
    if (!result.isValid) {
      setErrors((prev) => ({ ...prev, email: result.message }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  /**
   * Handles password input change
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Prevent typing beyond max length
    if (value.length <= PASSWORD_MAX_LENGTH) {
      setPassword(value);

      // Clear error on change if field was touched
      if (touched.password && errors.password) {
        const result = validatePasswordLength(value, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);
        if (!result.isValid) {
          setErrors((prev) => ({ ...prev, password: result.message }));
        } else {
          setErrors((prev) => ({ ...prev, password: undefined }));
        }
      }
    }
  };

  /**
   * Handles password blur event
   */
  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));

    const result = validatePasswordLength(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);
    if (!result.isValid) {
      setErrors((prev) => ({ ...prev, password: result.message }));
    } else {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  /**
   * Handles keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to clear password
      if (e.key === 'Escape') {
        setPassword('');
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Auto-focus email field on mount
   */
  useEffect(() => {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  /**
   * Calculate password strength for indicator
   */
  const passwordStrength = validatePasswordStrength(password);

  /**
   * Get character counter color based on password length
   */
  const getCounterColor = () => {
    if (password.length === 0) return 'text-gray-400';
    if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
      return 'text-red-500';
    }
    return 'text-green-500';
  };

  /**
   * Check if form is valid
   */
  const isFormValid = () => {
    const emailValid = validateEmail(email).isValid;
    const passwordValid = validatePasswordLength(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH).isValid;
    return emailValid && passwordValid && !isSubmitting && !isLoading;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Kanbino</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Entre na sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              crie uma nova conta
            </a>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="seu@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  maxLength={PASSWORD_MAX_LENGTH}
                  className={`appearance-none block w-full px-3 py-2 pr-24 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={
                    errors.password
                      ? 'password-error'
                      : password.length > 0
                      ? 'password-requirements password-strength'
                      : 'password-requirements'
                  }
                />
                {/* Character Counter and Show Password Toggle */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? (
                      // Eye slash icon
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      // Eye icon
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`text-xs font-medium ${getCounterColor()} pr-2`}
                    aria-live="polite"
                    aria-label={`Contador de caracteres: ${password.length} de ${PASSWORD_MAX_LENGTH}`}
                  >
                    {password.length}/{PASSWORD_MAX_LENGTH}
                  </span>
                </div>
              </div>

              {/* Password Requirements */}
              <p id="password-requirements" className="mt-1 text-xs text-gray-500">
                Mínimo de {PASSWORD_MIN_LENGTH} e máximo de {PASSWORD_MAX_LENGTH} caracteres
              </p>

              {/* Password Error */}
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}

              {/* Password Strength Indicator */}
              {password.length > 0 && !errors.password && passwordStrength.isValid && (
                <div id="password-strength" className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Força da senha</span>
                    <span
                      className={`font-medium ${getPasswordStrengthTextColor(passwordStrength.strength || 0)}`}
                    >
                      {getPasswordStrengthLabel(passwordStrength.strength || 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.strength || 0)}`}
                      style={{
                        width: `${((passwordStrength.strength || 0) / 4) * 100}%`,
                      }}
                    />
                  </div>
                  {passwordStrength.suggestions && passwordStrength.suggestions.length > 0 && (
                    <div className="mt-2 text-xs text-gray-600">
                      <p className="font-medium mb-1">Sugestões para melhorar:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        {passwordStrength.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Implement forgot password functionality
                    console.log('Forgot password clicked');
                  }}
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!isFormValid()}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Ao continuar, você concorda com nossos</p>
          <div className="mt-1 space-x-2">
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Termos de Serviço
            </a>
            <span>e</span>
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
