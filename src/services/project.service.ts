/**
 * Project Service
 * Business logic for project management
 */

import type {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
} from '../types/kanban.types.js';
import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage (replace with database in production)
const projects = new Map<string, Project>();

export class ProjectService {
  /**
   * Create a new project
   */
  async createProject(data: CreateProjectDto, ownerId: string): Promise<Project> {
    // Validation
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Project name is required');
    }

    if (data.name.length > 100) {
      throw new Error('Project name must not exceed 100 characters');
    }

    const project: Project = {
      id: uuidv4(),
      name: data.name.trim(),
      description: data.description?.trim(),
      ownerId,
      members: [ownerId], // Owner is automatically a member
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    projects.set(project.id, project);
    logger.info(`Project created: ${project.id} by user ${ownerId}`);

    return project;
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string): Promise<Project | null> {
    const project = projects.get(id);
    return project || null;
  }

  /**
   * Get all projects for a user
   */
  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const userProjects = Array.from(projects.values()).filter(
      (project) => project.ownerId === userId || project.members.includes(userId)
    );

    // Sort by updatedAt descending
    return userProjects.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  /**
   * Update project
   */
  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    const project = projects.get(id);

    if (!project) {
      throw new Error('Project not found');
    }

    // Update fields
    if (data.name !== undefined) {
      if (data.name.trim().length === 0) {
        throw new Error('Project name cannot be empty');
      }
      if (data.name.length > 100) {
        throw new Error('Project name must not exceed 100 characters');
      }
      project.name = data.name.trim();
    }

    if (data.description !== undefined) {
      project.description = data.description.trim();
    }

    project.updatedAt = new Date();
    projects.set(id, project);

    logger.info(`Project updated: ${id}`);
    return project;
  }

  /**
   * Delete project
   */
  async deleteProject(id: string): Promise<void> {
    const project = projects.get(id);

    if (!project) {
      throw new Error('Project not found');
    }

    projects.delete(id);
    logger.info(`Project deleted: ${id}`);
  }

  /**
   * Add member to project
   */
  async addMember(projectId: string, userId: string): Promise<Project> {
    const project = projects.get(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.members.includes(userId)) {
      throw new Error('User is already a member of this project');
    }

    project.members.push(userId);
    project.updatedAt = new Date();
    projects.set(projectId, project);

    logger.info(`User ${userId} added to project ${projectId}`);
    return project;
  }

  /**
   * Remove member from project
   */
  async removeMember(projectId: string, userId: string): Promise<Project> {
    const project = projects.get(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    // Cannot remove the owner
    if (project.ownerId === userId) {
      throw new Error('Cannot remove the project owner');
    }

    const memberIndex = project.members.indexOf(userId);
    if (memberIndex === -1) {
      throw new Error('User is not a member of this project');
    }

    project.members.splice(memberIndex, 1);
    project.updatedAt = new Date();
    projects.set(projectId, project);

    logger.info(`User ${userId} removed from project ${projectId}`);
    return project;
  }

  /**
   * Check if user is member of project
   */
  async isMember(projectId: string, userId: string): Promise<boolean> {
    const project = projects.get(projectId);
    if (!project) {
      return false;
    }
    return project.members.includes(userId);
  }

  /**
   * Check if user is owner of project
   */
  async isOwner(projectId: string, userId: string): Promise<boolean> {
    const project = projects.get(projectId);
    if (!project) {
      return false;
    }
    return project.ownerId === userId;
  }
}

export const projectService = new ProjectService();
