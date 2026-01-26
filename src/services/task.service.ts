/**
 * Task Service
 * Business logic for task and column management
 */

import type {
  Column,
  Task,
  Comment,
  CreateColumnDto,
  CreateTaskDto,
  UpdateTaskDto,
  MoveTaskDto,
  CreateCommentDto,
  TaskPriority,
  TaskStatus,
} from '../types/kanban.types.js';
import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage (replace with database in production)
const columns = new Map<string, Column>();
const tasks = new Map<string, Task>();
const comments = new Map<string, Comment>();

export class TaskService {
  /**
   * Create a new column
   */
  async createColumn(projectId: string, data: CreateColumnDto): Promise<Column> {
    // Validation
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Column name is required');
    }

    if (data.order < 0) {
      throw new Error('Column order must be a positive number');
    }

    const column: Column = {
      id: uuidv4(),
      name: data.name.trim(),
      order: data.order,
      projectId,
      status: data.status,
    };

    columns.set(column.id, column);
    logger.info(`Column created: ${column.id} for project ${projectId}`);

    return column;
  }

  /**
   * Get all columns for a project
   */
  async getColumnsByProject(projectId: string): Promise<Column[]> {
    const projectColumns = Array.from(columns.values()).filter(
      (column) => column.projectId === projectId
    );

    // Sort by order
    return projectColumns.sort((a, b) => a.order - b.order);
  }

  /**
   * Get column by ID
   */
  async getColumnById(id: string): Promise<Column | null> {
    const column = columns.get(id);
    return column || null;
  }

  /**
   * Delete column
   */
  async deleteColumn(id: string): Promise<void> {
    const column = columns.get(id);

    if (!column) {
      throw new Error('Column not found');
    }

    // Delete all tasks in this column
    const columnTasks = Array.from(tasks.values()).filter(
      (task) => task.columnId === id
    );
    columnTasks.forEach((task) => tasks.delete(task.id));

    columns.delete(id);
    logger.info(`Column deleted: ${id}`);
  }

  /**
   * Create a new task
   */
  async createTask(projectId: string, data: CreateTaskDto): Promise<Task> {
    // Validation
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Task title is required');
    }

    if (data.title.length > 200) {
      throw new Error('Task title must not exceed 200 characters');
    }

    if (!data.columnId) {
      throw new Error('Column ID is required');
    }

    // Verify column exists
    const column = columns.get(data.columnId);
    if (!column || column.projectId !== projectId) {
      throw new Error('Invalid column');
    }

    // Get next order in column
    const columnTasks = await this.getTasksByColumn(data.columnId);
    const nextOrder = columnTasks.length > 0 ? Math.max(...columnTasks.map(t => t.order)) + 1 : 0;

    const task: Task = {
      id: uuidv4(),
      title: data.title.trim(),
      description: data.description?.trim(),
      columnId: data.columnId,
      projectId,
      assigneeId: data.assigneeId,
      priority: data.priority,
      status: column.status,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.set(task.id, task);
    logger.info(`Task created: ${task.id} in column ${data.columnId}`);

    return task;
  }

  /**
   * Get all tasks for a column
   */
  async getTasksByColumn(columnId: string): Promise<Task[]> {
    const columnTasks = Array.from(tasks.values()).filter(
      (task) => task.columnId === columnId
    );

    // Sort by order
    return columnTasks.sort((a, b) => a.order - b.order);
  }

  /**
   * Get all tasks for a project
   */
  async getTasksByProject(projectId: string): Promise<Task[]> {
    const projectTasks = Array.from(tasks.values()).filter(
      (task) => task.projectId === projectId
    );

    return projectTasks.sort((a, b) => a.order - b.order);
  }

  /**
   * Get task by ID
   */
  async getTaskById(id: string): Promise<Task | null> {
    const task = tasks.get(id);
    return task || null;
  }

  /**
   * Update task
   */
  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = tasks.get(id);

    if (!task) {
      throw new Error('Task not found');
    }

    // Update fields
    if (data.title !== undefined) {
      if (data.title.trim().length === 0) {
        throw new Error('Task title cannot be empty');
      }
      if (data.title.length > 200) {
        throw new Error('Task title must not exceed 200 characters');
      }
      task.title = data.title.trim();
    }

    if (data.description !== undefined) {
      task.description = data.description.trim();
    }

    if (data.columnId !== undefined) {
      const column = columns.get(data.columnId);
      if (!column) {
        throw new Error('Invalid column');
      }
      task.columnId = data.columnId;
      task.status = column.status;
    }

    if (data.priority !== undefined) {
      task.priority = data.priority;
    }

    if (data.assigneeId !== undefined) {
      task.assigneeId = data.assigneeId;
    }

    if (data.status !== undefined) {
      task.status = data.status;
    }

    task.updatedAt = new Date();
    tasks.set(id, task);

    logger.info(`Task updated: ${id}`);
    return task;
  }

  /**
   * Move task to different column or change order
   */
  async moveTask(taskId: string, data: MoveTaskDto): Promise<Task> {
    const task = tasks.get(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    // Verify target column exists
    const targetColumn = columns.get(data.columnId);
    if (!targetColumn) {
      throw new Error('Target column not found');
    }

    // Get all tasks in target column
    const columnTasks = await this.getTasksByColumn(data.columnId);

    // If moving to same column, adjust orders
    if (task.columnId === data.columnId) {
      // Moving within same column
      const oldOrder = task.order;
      const newOrder = data.order;

      // Adjust orders of other tasks
      columnTasks.forEach((t) => {
        if (t.id !== taskId) {
          if (oldOrder < newOrder) {
            // Moving down: shift tasks between old and new position up
            if (t.order > oldOrder && t.order <= newOrder) {
              t.order -= 1;
              tasks.set(t.id, t);
            }
          } else {
            // Moving up: shift tasks between new and old position down
            if (t.order >= newOrder && t.order < oldOrder) {
              t.order += 1;
              tasks.set(t.id, t);
            }
          }
        }
      });
    } else {
      // Moving to different column
      const oldColumnId = task.columnId;

      // Remove from old column and adjust orders
      const oldColumnTasks = await this.getTasksByColumn(oldColumnId);
      oldColumnTasks.forEach((t) => {
        if (t.order > task.order) {
          t.order -= 1;
          tasks.set(t.id, t);
        }
      });

      // Insert in new column and adjust orders
      columnTasks.forEach((t) => {
        if (t.order >= data.order) {
          t.order += 1;
          tasks.set(t.id, t);
        }
      });

      task.columnId = data.columnId;
      task.status = targetColumn.status;
    }

    task.order = data.order;
    task.updatedAt = new Date();
    tasks.set(taskId, task);

    logger.info(`Task moved: ${taskId} to column ${data.columnId} at order ${data.order}`);
    return task;
  }

  /**
   * Delete task
   */
  async deleteTask(id: string): Promise<void> {
    const task = tasks.get(id);

    if (!task) {
      throw new Error('Task not found');
    }

    // Adjust orders of remaining tasks in column
    const columnTasks = await this.getTasksByColumn(task.columnId);
    columnTasks.forEach((t) => {
      if (t.order > task.order) {
        t.order -= 1;
        tasks.set(t.id, t);
      }
    });

    // Delete all comments
    const taskComments = Array.from(comments.values()).filter(
      (comment) => comment.taskId === id
    );
    taskComments.forEach((comment) => comments.delete(comment.id));

    tasks.delete(id);
    logger.info(`Task deleted: ${id}`);
  }

  /**
   * Assign task to user
   */
  async assignTask(taskId: string, userId?: string): Promise<Task> {
    const task = tasks.get(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.assigneeId = userId;
    task.updatedAt = new Date();
    tasks.set(taskId, task);

    logger.info(`Task ${taskId} assigned to user ${userId || 'unassigned'}`);
    return task;
  }

  /**
   * Add comment to task
   */
  async addComment(taskId: string, userId: string, data: CreateCommentDto): Promise<Comment> {
    // Verify task exists
    const task = tasks.get(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    // Validation
    if (!data.content || data.content.trim().length === 0) {
      throw new Error('Comment content is required');
    }

    if (data.content.length > 1000) {
      throw new Error('Comment must not exceed 1000 characters');
    }

    const comment: Comment = {
      id: uuidv4(),
      taskId,
      userId,
      content: data.content.trim(),
      createdAt: new Date(),
    };

    comments.set(comment.id, comment);
    logger.info(`Comment added: ${comment.id} to task ${taskId}`);

    return comment;
  }

  /**
   * Get all comments for a task
   */
  async getComments(taskId: string): Promise<Comment[]> {
    const taskComments = Array.from(comments.values()).filter(
      (comment) => comment.taskId === taskId
    );

    // Sort by createdAt ascending
    return taskComments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  /**
   * Delete comment
   */
  async deleteComment(id: string, userId: string): Promise<void> {
    const comment = comments.get(id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    // Only the comment author can delete it
    if (comment.userId !== userId) {
      throw new Error('You do not have permission to delete this comment');
    }

    comments.delete(id);
    logger.info(`Comment deleted: ${id}`);
  }
}

export const taskService = new TaskService();
