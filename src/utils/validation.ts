/**
 * Validation Utilities
 * Data validation functions for Kanban entities
 */

import type { TaskPriority, TaskStatus } from '../types/kanban.types';

/**
 * Validate project name
 */
export function validateProjectName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Project name is required' };
  }

  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Project name cannot be empty' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Project name must not exceed 100 characters' };
  }

  return { valid: true };
}

/**
 * Validate task title
 */
export function validateTaskTitle(title: string): { valid: boolean; error?: string } {
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Task title is required' };
  }

  const trimmed = title.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Task title cannot be empty' };
  }

  if (trimmed.length > 200) {
    return { valid: false, error: 'Task title must not exceed 200 characters' };
  }

  return { valid: true };
}

/**
 * Validate task description
 */
export function validateTaskDescription(description: string): { valid: boolean; error?: string } {
  if (description && typeof description !== 'string') {
    return { valid: false, error: 'Task description must be a string' };
  }

  if (description && description.trim().length > 1000) {
    return { valid: false, error: 'Task description must not exceed 1000 characters' };
  }

  return { valid: true };
}

/**
 * Validate task priority
 */
export function validatePriority(priority: string): { valid: boolean; error?: string } {
  const validPriorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  if (!priority || typeof priority !== 'string') {
    return { valid: false, error: 'Priority is required' };
  }

  if (!validPriorities.includes(priority as TaskPriority)) {
    return {
      valid: false,
      error: `Priority must be one of: ${validPriorities.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Validate task status
 */
export function validateStatus(status: string): { valid: boolean; error?: string } {
  const validStatuses: TaskStatus[] = ['backlog', 'todo', 'in_progress', 'review', 'done'];

  if (!status || typeof status !== 'string') {
    return { valid: false, error: 'Status is required' };
  }

  if (!validStatuses.includes(status as TaskStatus)) {
    return {
      valid: false,
      error: `Status must be one of: ${validStatuses.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Validate column order
 */
export function validateColumnOrder(order: number): { valid: boolean; error?: string } {
  if (typeof order !== 'number' || isNaN(order)) {
    return { valid: false, error: 'Column order must be a number' };
  }

  if (order < 0) {
    return { valid: false, error: 'Column order must be a positive number' };
  }

  return { valid: true };
}

/**
 * Validate column name
 */
export function validateColumnName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Column name is required' };
  }

  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Column name cannot be empty' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Column name must not exceed 50 characters' };
  }

  return { valid: true };
}

/**
 * Validate comment content
 */
export function validateCommentContent(content: string): { valid: boolean; error?: string } {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Comment content is required' };
  }

  const trimmed = content.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Comment cannot be empty' };
  }

  if (trimmed.length > 1000) {
    return { valid: false, error: 'Comment must not exceed 1000 characters' };
  }

  return { valid: true };
}

/**
 * Validate user ID
 */
export function validateUserId(userId: string): { valid: boolean; error?: string } {
  if (!userId || typeof userId !== 'string') {
    return { valid: false, error: 'User ID is required' };
  }

  if (userId.trim().length === 0) {
    return { valid: false, error: 'User ID cannot be empty' };
  }

  return { valid: true };
}
