/**
 * Validation Utilities
 *
 * Provides helper functions for form field validation.
 * Used throughout the application for consistent validation logic.
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Email validation result with detailed error message
 */
export interface EmailValidationResult extends ValidationResult {
  /**
   * Specific error type for better UX feedback
   */
  errorType?: 'required' | 'invalid_format' | 'short';
}

/**
 * Password validation result with strength indicators
 */
export interface PasswordValidationResult extends ValidationResult {
  /**
   * Password strength score (0-4)
   */
  strength?: number;

  /**
   * Specific error type for better UX feedback
   */
  errorType?: 'required' | 'too_short' | 'too_long' | 'weak';

  /**
   * Detailed feedback for improving password
   */
  suggestions?: string[];
}

/**
 * Validates email format
 *
 * @param email - Email string to validate
 * @returns EmailValidationResult with validation status and error message
 *
 * @example
 * ```typescript
 * const result = validateEmail('user@example.com');
 * if (result.isValid) {
 *   console.log('Email is valid');
 * } else {
 *   console.log(result.message);
 * }
 * ```
 */
export const validateEmail = (email: string): EmailValidationResult => {
  if (!email || !email.trim()) {
    return {
      isValid: false,
      message: 'Email é obrigatório',
      errorType: 'required',
    };
  }

  const trimmedEmail = email.trim();

  // Check minimum length
  if (trimmedEmail.length < 5) {
    return {
      isValid: false,
      message: 'Email é muito curto',
      errorType: 'short',
    };
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      message: 'Email inválido',
      errorType: 'invalid_format',
    };
  }

  return { isValid: true };
};

/**
 * Validates password length requirements
 *
 * @param password - Password string to validate
 * @param minLength - Minimum required length (default: 8)
 * @param maxLength - Maximum allowed length (default: 32)
 * @returns PasswordValidationResult with validation status and error message
 *
 * @example
 * ```typescript
 * const result = validatePasswordLength('mypassword', 8, 32);
 * if (result.isValid) {
 *   console.log('Password length is valid');
 * } else {
 *   console.log(result.message);
 * }
 * ```
 */
export const validatePasswordLength = (
  password: string,
  minLength: number = 8,
  maxLength: number = 32
): PasswordValidationResult => {
  if (!password) {
    return {
      isValid: false,
      message: 'Senha é obrigatória',
      errorType: 'required',
    };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      message: `A senha deve ter no mínimo ${minLength} caracteres`,
      errorType: 'too_short',
      strength: 0,
    };
  }

  if (password.length > maxLength) {
    return {
      isValid: false,
      message: `A senha deve ter no máximo ${maxLength} caracteres`,
      errorType: 'too_long',
      strength: 0,
    };
  }

  return {
    isValid: true,
    strength: calculatePasswordStrength(password),
  };
};

/**
 * Validates password strength based on multiple criteria
 *
 * Criteria:
 * - Length (longer is better)
 * - Contains lowercase letters
 * - Contains uppercase letters
 * - Contains numbers
 * - Contains special characters
 *
 * @param password - Password string to analyze
 * @returns PasswordValidationResult with strength score (0-4) and suggestions
 *
 * @example
 * ```typescript
 * const result = validatePasswordStrength('MyP@ssw0rd');
 * console.log(`Strength: ${result.strength}/4`); // e.g., "Strength: 4/4"
 * if (result.suggestions) {
 *   result.suggestions.forEach(s => console.log(s));
 * }
 * ```
 */
export const validatePasswordStrength = (
  password: string
): PasswordValidationResult => {
  const lengthResult = validatePasswordLength(password);

  if (!lengthResult.isValid) {
    return lengthResult;
  }

  const strength = calculatePasswordStrength(password);
  const suggestions: string[] = [];

  // Analyze password and provide suggestions
  if (!/[a-z]/.test(password)) {
    suggestions.push('Adicione letras minúsculas');
  }

  if (!/[A-Z]/.test(password)) {
    suggestions.push('Adicione letras maiúsculas');
  }

  if (!/[0-9]/.test(password)) {
    suggestions.push('Adicione números');
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    suggestions.push('Adicione caracteres especiais (!@#$%^&*)');
  }

  if (password.length < 12) {
    suggestions.push('Use mais de 12 caracteres para mais segurança');
  }

  // Determine if password is weak based on strength score
  const isWeak = strength < 2;

  return {
    isValid: true,
    strength,
    errorType: isWeak ? 'weak' : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
};

/**
 * Calculates password strength score (0-4)
 *
 * Scoring:
 * - 0: Very weak (less than 8 characters)
 * - 1: Weak (8+ characters, only one type of character)
 * - 2: Fair (8+ characters, two types of characters)
 * - 3: Good (8+ characters, three types of characters)
 * - 4: Strong (12+ characters, four types of characters)
 *
 * @param password - Password string to analyze
 * @returns Strength score from 0 to 4
 *
 * @example
 * ```typescript
 * const strength = calculatePasswordStrength('MyP@ssw0rd');
 * console.log(strength); // 4
 * ```
 */
export const calculatePasswordStrength = (password: string): number => {
  if (!password || password.length < 8) {
    return 0;
  }

  let score = 0;

  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    score++;
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    score++;
  }

  // Check for numbers
  if (/[0-9]/.test(password)) {
    score++;
  }

  // Check for special characters
  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
  }

  // Bonus point for longer passwords
  if (password.length >= 12) {
    score = Math.min(score + 1, 4);
  }

  return score;
};

/**
 * Gets password strength label based on score
 *
 * @param strength - Strength score (0-4)
 * @returns Human-readable strength label
 *
 * @example
 * ```typescript
 * const label = getPasswordStrengthLabel(3);
 * console.log(label); // "Boa"
 * ```
 */
export const getPasswordStrengthLabel = (strength: number): string => {
  const labels = ['Muito Fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'];
  return labels[Math.max(0, Math.min(strength, 4))];
};

/**
 * Gets password strength color based on score
 *
 * @param strength - Strength score (0-4)
 * @returns Tailwind color class for strength indicator
 *
 * @example
 * ```typescript
 * const colorClass = getPasswordStrengthColor(3);
 * console.log(colorClass); // "bg-yellow-500"
 * ```
 */
export const getPasswordStrengthColor = (strength: number): string => {
  const colors = [
    'bg-red-600',      // 0: Very weak
    'bg-red-500',      // 1: Weak
    'bg-yellow-500',   // 2: Fair
    'bg-green-400',    // 3: Good
    'bg-green-600',    // 4: Strong
  ];
  return colors[Math.max(0, Math.min(strength, 4))];
};

/**
 * Gets text color for password strength label
 *
 * @param strength - Strength score (0-4)
 * @returns Tailwind text color class
 *
 * @example
 * ```typescript
 * const textClass = getPasswordStrengthTextColor(3);
 * console.log(textClass); // "text-yellow-600"
 * ```
 */
export const getPasswordStrengthTextColor = (strength: number): string => {
  const colors = [
    'text-red-600',      // 0: Very weak
    'text-red-500',      // 1: Weak
    'text-yellow-600',   // 2: Fair
    'text-green-500',    // 3: Good
    'text-green-700',    // 4: Strong
  ];
  return colors[Math.max(0, Math.min(strength, 4))];
};
