/**
 * Profile Validators
 * Zod schemas for profile-related input validation
 */

import { z } from 'zod';

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  email: z.string().email('Email inválido').optional(),
  profileUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

/**
 * User ID parameter schema
 */
export const userIdParamSchema = z.object({
  userId: z.string().min(1, 'ID do usuário é obrigatório'),
});

export type UserIdParam = z.infer<typeof userIdParamSchema>;

/**
 * Query parameter schemas
 */
export const paginationQuerySchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
  sort: z.enum(['createdAt', 'displayName', 'email']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
