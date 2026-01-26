/**
 * Project Controller
 * Handles HTTP requests for project management
 */

import type { Request, Response } from 'express';
import { projectService } from '../services/project.service.js';
import type { CreateProjectDto, UpdateProjectDto } from '../types/kanban.types.js';
import { logger } from '../utils/logger.js';

export class ProjectController {
  /**
   * Create a new project
   */
  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const data: CreateProjectDto = {
        name: req.body.name,
        description: req.body.description,
      };

      const project = await projectService.createProject(data, userId);

      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      logger.error('Error creating project:', error);
      res.status(400).json({
        error: 'Failed to create project',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get all projects for the authenticated user
   */
  async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projects = await projectService.getProjectsByUserId(userId);

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      logger.error('Error fetching projects:', error);
      res.status(500).json({
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get a specific project by ID
   */
  async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.id;

      const project = await projectService.getProjectById(projectId);
      if (!project) {
        res.status(404).json({ error: 'Not found', message: 'Project not found' });
        return;
      }

      // Check if user is a member
      const isMember = await projectService.isMember(projectId, userId);
      if (!isMember) {
        res.status(403).json({ error: 'Forbidden', message: 'You do not have access to this project' });
        return;
      }

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      logger.error('Error fetching project:', error);
      res.status(500).json({
        error: 'Failed to fetch project',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Update a project
   */
  async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.id;
      const data: UpdateProjectDto = req.body;

      // Check if user is the owner
      const isOwner = await projectService.isOwner(projectId, userId);
      if (!isOwner) {
        res.status(403).json({ error: 'Forbidden', message: 'Only the project owner can update the project' });
        return;
      }

      const project = await projectService.updateProject(projectId, data);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      logger.error('Error updating project:', error);
      const statusCode = error instanceof Error && error.message === 'Project not found' ? 404 : 400;
      res.status(statusCode).json({
        error: 'Failed to update project',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.id;

      // Check if user is the owner
      const isOwner = await projectService.isOwner(projectId, userId);
      if (!isOwner) {
        res.status(403).json({ error: 'Forbidden', message: 'Only the project owner can delete the project' });
        return;
      }

      await projectService.deleteProject(projectId);

      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting project:', error);
      const statusCode = error instanceof Error && error.message === 'Project not found' ? 404 : 500;
      res.status(statusCode).json({
        error: 'Failed to delete project',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Add a member to the project
   */
  async addMember(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.id;
      const { userId: newMemberId } = req.body;

      if (!newMemberId) {
        res.status(400).json({ error: 'Bad request', message: 'User ID is required' });
        return;
      }

      // Check if user is the owner
      const isOwner = await projectService.isOwner(projectId, userId);
      if (!isOwner) {
        res.status(403).json({ error: 'Forbidden', message: 'Only the project owner can add members' });
        return;
      }

      const project = await projectService.addMember(projectId, newMemberId);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      logger.error('Error adding member:', error);
      const statusCode = error instanceof Error && error.message === 'Project not found' ? 404 : 400;
      res.status(statusCode).json({
        error: 'Failed to add member',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Remove a member from the project
   */
  async removeMember(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.id;
      const memberIdToRemove = req.params.userId;

      // Check if user is the owner
      const isOwner = await projectService.isOwner(projectId, userId);
      if (!isOwner) {
        res.status(403).json({ error: 'Forbidden', message: 'Only the project owner can remove members' });
        return;
      }

      const project = await projectService.removeMember(projectId, memberIdToRemove);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      logger.error('Error removing member:', error);
      const statusCode = error instanceof Error && error.message === 'Project not found' ? 404 : 400;
      res.status(statusCode).json({
        error: 'Failed to remove member',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export const projectController = new ProjectController();
