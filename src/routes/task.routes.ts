/**
 * Task Routes
 * REST API endpoints for task and column management
 */

import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

// All task routes require authentication
router.use(isAuthenticated);

/**
 * @route   POST /api/projects/:projectId/columns
 * @desc    Create a new column in a project
 * @access  Private
 */
router.post('/:projectId/columns', taskController.createColumn.bind(taskController));

/**
 * @route   GET /api/projects/:projectId/columns
 * @desc    Get all columns for a project
 * @access  Private
 */
router.get('/:projectId/columns', taskController.getColumns.bind(taskController));

/**
 * @route   DELETE /api/columns/:columnId
 * @desc    Delete a column
 * @access  Private
 */
router.delete('/columns/:columnId', taskController.deleteColumn.bind(taskController));

/**
 * @route   POST /api/projects/:projectId/tasks
 * @desc    Create a new task in a project
 * @access  Private
 */
router.post('/:projectId/tasks', taskController.createTask.bind(taskController));

/**
 * @route   GET /api/projects/:projectId/tasks
 * @desc    Get all tasks for a project
 * @access  Private
 */
router.get('/:projectId/tasks', taskController.getTasks.bind(taskController));

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a specific task by ID
 * @access  Private
 */
router.get('/tasks/:id', taskController.getTaskById.bind(taskController));

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put('/tasks/:id', taskController.updateTask.bind(taskController));

/**
 * @route   PATCH /api/tasks/:id/move
 * @desc    Move a task to different column or change order
 * @access  Private
 */
router.patch('/tasks/:id/move', taskController.moveTask.bind(taskController));

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete('/tasks/:id', taskController.deleteTask.bind(taskController));

/**
 * @route   PATCH /api/tasks/:id/assign
 * @desc    Assign a task to a user
 * @access  Private
 */
router.patch('/tasks/:id/assign', taskController.assignTask.bind(taskController));

/**
 * @route   POST /api/tasks/:id/comments
 * @desc    Add a comment to a task
 * @access  Private
 */
router.post('/tasks/:id/comments', taskController.addComment.bind(taskController));

/**
 * @route   GET /api/tasks/:id/comments
 * @desc    Get all comments for a task
 * @access  Private
 */
router.get('/tasks/:id/comments', taskController.getComments.bind(taskController));

/**
 * @route   DELETE /api/comments/:commentId
 * @desc    Delete a comment
 * @access  Private (comment author only)
 */
router.delete('/comments/:commentId', taskController.deleteComment.bind(taskController));

export default router;
