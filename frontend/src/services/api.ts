/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import {
  HealthResponse,
  StatusResponse,
  DataResponse,
  ApiError,
  ProfilePhotoResponse,
  UserProfile,
} from '../types/api.types';
import type {
  Project,
  Task,
  Column,
  Comment,
  CreateProjectDto,
  UpdateProjectDto,
  CreateTaskDto,
  UpdateTaskDto,
  MoveTaskDto,
  CreateCommentDto,
} from '../types/kanban.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        credentials: 'include',
        ...options,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getHealth(): Promise<HealthResponse> {
    return this.fetch<HealthResponse>('/health');
  }

  async getStatus(): Promise<StatusResponse> {
    return this.fetch<StatusResponse>('/status');
  }

  async getData(): Promise<DataResponse> {
    return this.fetch<DataResponse>('/data');
  }

  /**
   * Upload profile photo
   */
  async uploadProfilePhoto(file: File): Promise<ProfilePhotoResponse> {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch(`${this.baseUrl}/profile/photo`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || error.error || 'Failed to upload photo');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to upload profile photo:', error);
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserProfile> {
    return this.fetch<UserProfile>('/profile/me');
  }

  // ==================== Projects ====================

  /**
   * Get all projects for the current user
   */
  async getProjects(): Promise<Project[]> {
    const response = await this.fetch<{ success: boolean; data: Project[] }>('/projects');
    return response.data;
  }

  /**
   * Get a specific project by ID
   */
  async getProject(id: string): Promise<Project> {
    const response = await this.fetch<{ success: boolean; data: Project }>(`/projects/${id}`);
    return response.data;
  }

  /**
   * Create a new project
   */
  async createProject(data: CreateProjectDto): Promise<Project> {
    const response = await this.fetch<{ success: boolean; data: Project }>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  /**
   * Update a project
   */
  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    const response = await this.fetch<{ success: boolean; data: Project }>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<void> {
    await this.fetch(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Add a member to a project
   */
  async addMember(projectId: string, userId: string): Promise<Project> {
    const response = await this.fetch<{ success: boolean; data: Project }>(`/projects/${projectId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    return response.data;
  }

  /**
   * Remove a member from a project
   */
  async removeMember(projectId: string, userId: string): Promise<Project> {
    const response = await this.fetch<{ success: boolean; data: Project }>(`/projects/${projectId}/members/${userId}`, {
      method: 'DELETE',
    });
    return response.data;
  }

  // ==================== Columns ====================

  /**
   * Get all columns for a project
   */
  async getColumns(projectId: string): Promise<Column[]> {
    const response = await this.fetch<{ success: boolean; data: Column[] }>(`/projects/${projectId}/columns`);
    return response.data;
  }

  /**
   * Create a new column
   */
  async createColumn(projectId: string, data: { name: string; status: string; order: number }): Promise<Column> {
    const response = await this.fetch<{ success: boolean; data: Column }>(`/projects/${projectId}/columns`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  /**
   * Delete a column
   */
  async deleteColumn(columnId: string): Promise<void> {
    await this.fetch(`/columns/${columnId}`, {
      method: 'DELETE',
    });
  }

  // ==================== Tasks ====================

  /**
   * Get all tasks for a project
   */
  async getTasks(projectId: string): Promise<Task[]> {
    const response = await this.fetch<{ success: boolean; data: Task[] }>(`/projects/${projectId}/tasks`);
    return response.data;
  }

  /**
   * Get a specific task by ID
   */
  async getTask(id: string): Promise<Task & { comments?: Comment[] }> {
    const response = await this.fetch<{ success: boolean; data: Task & { comments?: Comment[] } }>(`/tasks/${id}`);
    return response.data;
  }

  /**
   * Create a new task
   */
  async createTask(projectId: string, data: CreateTaskDto): Promise<Task> {
    const response = await this.fetch<{ success: boolean; data: Task }>(`/projects/${projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  /**
   * Update a task
   */
  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await this.fetch<{ success: boolean; data: Task }>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  /**
   * Move a task to a different column or change order
   */
  async moveTask(id: string, data: MoveTaskDto): Promise<Task> {
    const response = await this.fetch<{ success: boolean; data: Task }>(`/tasks/${id}/move`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  /**
   * Delete a task
   */
  async deleteTask(id: string): Promise<void> {
    await this.fetch(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Assign a task to a user
   */
  async assignTask(id: string, assigneeId?: string): Promise<Task> {
    const response = await this.fetch<{ success: boolean; data: Task }>(`/tasks/${id}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ assigneeId }),
    });
    return response.data;
  }

  // ==================== Comments ====================

  /**
   * Get all comments for a task
   */
  async getComments(taskId: string): Promise<Comment[]> {
    const response = await this.fetch<{ success: boolean; data: Comment[] }>(`/tasks/${taskId}/comments`);
    return response.data;
  }

  /**
   * Add a comment to a task
   */
  async addComment(taskId: string, data: CreateCommentDto): Promise<Comment> {
    const response = await this.fetch<{ success: boolean; data: Comment }>(`/tasks/${taskId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  /**
   * Delete a comment
   */
  async deleteComment(commentId: string): Promise<void> {
    await this.fetch(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
