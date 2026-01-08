/**
 * Subscription Routes
 * API endpoints for subscription management
 */

import { Router } from 'express';
import * as subscriptionController from '../controllers/subscription.controller.js';

const router = Router();

// Create new subscription
router.post('/', subscriptionController.createSubscription);

// Get subscriptions by user ID
router.get('/user/:userId', subscriptionController.getUserSubscriptions);

// Get subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Cancel subscription
router.delete('/:id', subscriptionController.cancelSubscription);

export default router;
