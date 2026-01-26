/**
 * Project Routes
 * REST API endpoints for project management
 */

import { Router } from 'express';
import { projectController } from '../controllers/project.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

// All project routes require authentication
router.use(isAuthenticated);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
router.post('/', projectController.createProject.bind(projectController));

/**
 * @route   GET /api/projects
 * @desc    Get all projects for the authenticated user
 * @access  Private
 */
router.get('/', projectController.getProjects.bind(projectController));

/**
 * @route   GET /api/projects/:id
 * @desc    Get a specific project by ID
 * @access  Private (members only)
 */
router.get('/:id', projectController.getProjectById.bind(projectController));

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private (owner only)
 */
router.put('/:id', projectController.updateProject.bind(projectController));

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (owner only)
 */
router.delete('/:id', projectController.deleteProject.bind(projectController));

/**
 * @route   POST /api/projects/:id/members
 * @desc    Add a member to the project
 * @access  Private (owner only)
 */
router.post('/:id/members', projectController.addMember.bind(projectController));

/**
 * @route   DELETE /api/projects/:id/members/:userId
 * @desc    Remove a member from the project
 * @access  Private (owner only)
 */
router.delete('/:id/members/:userId', projectController.removeMember.bind(projectController));

export default router;
