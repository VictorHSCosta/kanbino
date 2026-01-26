/**
 * Kanban Types
 * TypeScript types for Kanban board on the frontend
 */

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
  members: string[];
  createdAt: string;
  updatedAt: string;
}

// Column entity
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
  createdAt: string;
  updatedAt: string;
}

// Comment entity
export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  userName?: string;
  userPhoto?: string;
  content: string;
  createdAt: string;
}

// User reference
export interface UserInfo {
  id: string;
  displayName: string;
  photo?: string;
  email: string;
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

// Extended task with relations
export interface TaskWithDetails extends Task {
  assignee?: UserInfo;
  comments?: Comment[];
  column?: Column;
}

// Extended project
export interface ProjectWithDetails extends Project {
  owner?: UserInfo;
  membersData?: UserInfo[];
  columns?: Column[];
  tasks?: Task[];
}
