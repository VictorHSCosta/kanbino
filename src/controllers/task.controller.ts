/**
 * Task Controller
 * Handles HTTP requests for task and column management
 */

import type { Request, Response } from 'express';
import { taskService } from '../services/task.service.js';
import type { CreateColumnDto, CreateTaskDto, UpdateTaskDto, MoveTaskDto, CreateCommentDto } from '../types/kanban.types.js';
import { logger } from '../utils/logger.js';

export class TaskController {
  /**
   * Create a new column
   */
  async createColumn(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.projectId;
      const data: CreateColumnDto = req.body;

      const column = await taskService.createColumn(projectId, data);

      res.status(201).json({
        success: true,
        data: column,
      });
    } catch (error) {
      logger.error('Error creating column:', error);
      res.status(400).json({
        error: 'Failed to create column',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get all columns for a project
   */
  async getColumns(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.projectId;

      const columns = await taskService.getColumnsByProject(projectId);

      res.status(200).json({
        success: true,
        data: columns,
      });
    } catch (error) {
      logger.error('Error fetching columns:', error);
      res.status(500).json({
        error: 'Failed to fetch columns',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Delete a column
   */
  async deleteColumn(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const columnId = req.params.columnId;

      await taskService.deleteColumn(columnId);

      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting column:', error);
      const statusCode = error instanceof Error && error.message === 'Column not found' ? 404 : 500;
      res.status(statusCode).json({
        error: 'Failed to delete column',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Create a new task
   */
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.projectId;
      const data: CreateTaskDto = req.body;

      const task = await taskService.createTask(projectId, data);

      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      logger.error('Error creating task:', error);
      res.status(400).json({
        error: 'Failed to create task',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get all tasks for a project
   */
  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const projectId = req.params.projectId;

      const tasks = await taskService.getTasksByProject(projectId);

      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      logger.error('Error fetching tasks:', error);
      res.status(500).json({
        error: 'Failed to fetch tasks',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get a specific task by ID
   */
  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const taskId = req.params.id;

      const task = await taskService.getTaskById(taskId);
      if (!task) {
        res.status(404).json({ error: 'Not found', message: 'Task not found' });
        return;
      }

      const comments = await taskService.getComments(taskId);

      res.status(200).json({
        success: true,
        data: {
          ...task,
          comments,
        },
      });
    } catch (error) {
      logger.error('Error fetching task:', error);
      res.status(500).json({
        error: 'Failed to fetch task',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Update a task
   */
  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const taskId = req.params.id;
      const data: UpdateTaskDto = req.body;

      const task = await taskService.updateTask(taskId, data);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      logger.error('Error updating task:', error);
      const statusCode = error instanceof Error && error.message === 'Task not found' ? 404 : 400;
      res.status(statusCode).json({
        error: 'Failed to update task',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Move a task to different column or change order
   */
  async moveTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const taskId = req.params.id;
      const data: MoveTaskDto = req.body;

      const task = await taskService.moveTask(taskId, data);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      logger.error('Error moving task:', error);
      const statusCode = error instanceof Error && error.message === 'Task not found' ? 404 : 400;
      res.status(statusCode).json({
        error: 'Failed to move task',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Delete a task
   */
  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const taskId = req.params.id;

      await taskService.deleteTask(taskId);

      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting task:', error);
      const statusCode = error instanceof Error && error.message === 'Task not found' ? 404 : 500;
      res.status(statusCode).json({
        error: 'Failed to delete task',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Assign a task to a user
   */
  async assignTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const taskId = req.params.id;
      const { assigneeId } = req.body;

      const task = await taskService.assignTask(taskId, assigneeId);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      logger.error('Error assigning task:', error);
      const statusCode = error instanceof Error && error.message === 'Task not found' ? 404 : 400;
      res.status(statusCode).json({
        error: 'Failed to assign task',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Add a comment to a task
   */
  async addComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const taskId = req.params.id;
      const data: CreateCommentDto = req.body;

      const comment = await taskService.addComment(taskId, userId, data);

      res.status(201).json({
        success: true,
        data: comment,
      });
    } catch (error) {
      logger.error('Error adding comment:', error);
      const statusCode = error instanceof Error && error.message === 'Task not found' ? 404 : 400;
      res.status(statusCode).json({
        error: 'Failed to add comment',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get all comments for a task
   */
  async getComments(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const taskId = req.params.id;

      const comments = await taskService.getComments(taskId);

      res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      logger.error('Error fetching comments:', error);
      res.status(500).json({
        error: 'Failed to fetch comments',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Delete a comment
   */
  async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      const commentId = req.params.commentId;

      await taskService.deleteComment(commentId, userId);

      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting comment:', error);
      const statusCode = error instanceof Error && error.message === 'Comment not found' ? 404 : 403;
      res.status(statusCode).json({
        error: 'Failed to delete comment',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export const taskController = new TaskController();
