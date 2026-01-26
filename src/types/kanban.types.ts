/**
 * Kanban Types
 * Type definitions for project management and task tracking
 */

import type { User } from './auth.types.js';

// Task priority levels
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// Task status
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';

// Project entity
export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[]; // Array of user IDs
  createdAt: Date;
  updatedAt: Date;
}

// Column entity (for organizing tasks in a board)
export interface Column {
  id: string;
  name: string;
  order: number;
  projectId: string;
  status: TaskStatus;
}

// Task entity
export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  projectId: string;
  assigneeId?: string;
  priority: TaskPriority;
  status: TaskStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Comment entity
export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// Extended task with relations
export interface TaskWithRelations extends Task {
  assignee?: User;
  comments?: Comment[];
  column?: Column;
}

// Extended project with relations
export interface ProjectWithRelations extends Project {
  owner?: User;
  membersData?: User[];
  columns?: Column[];
  tasks?: Task[];
}

// Create DTOs
export interface CreateProjectDto {
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}

export interface CreateColumnDto {
  name: string;
  status: TaskStatus;
  order: number;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  columnId: string;
  priority: TaskPriority;
  assigneeId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  columnId?: string;
  priority?: TaskPriority;
  assigneeId?: string;
  status?: TaskStatus;
}

export interface MoveTaskDto {
  columnId: string;
  order: number;
}

export interface CreateCommentDto {
  content: string;
}

// Response DTOs
export interface ProjectResponse {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  projectId: string;
  assigneeId?: string;
  priority: TaskPriority;
  status: TaskStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnResponse {
  id: string;
  name: string;
  order: number;
  projectId: string;
  status: TaskStatus;
}
