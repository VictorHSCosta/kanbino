/**
 * Subscription Controller
 * Handles HTTP requests for subscription management
 */

import { Request, Response } from 'express';
import * as subscriptionService from '../services/subscription.service.js';

/**
 * Create a new subscription
 * @route POST /api/subscriptions
 */
export const createSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, billingPeriod } = req.body;

    // Basic validation
    if (!userId || !productId) {
      res.status(400).json({
        success: false,
        error: 'userId and productId are required',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const subscription = await subscriptionService.createSubscription(
      userId,
      productId,
      billingPeriod || 'monthly'
    );

    res.status(201).json({
      success: true,
      data: subscription,
      message: 'Subscription created successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create subscription',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get subscriptions by user ID
 * @route GET /api/subscriptions/user/:userId
 */
export const getUserSubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const subscriptions = await subscriptionService.getSubscriptionsByUserId(userId);

    res.json({
      success: true,
      data: subscriptions,
      count: subscriptions.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscriptions',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Get subscription by ID
 * @route GET /api/subscriptions/:id
 */
export const getSubscriptionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionService.getSubscriptionById(id);

    if (!subscription) {
      res.status(404).json({
        success: false,
        error: 'Subscription not found',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    res.json({
      success: true,
      data: subscription,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription',
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Cancel subscription
 * @route DELETE /api/subscriptions/:id
 */
export const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionService.cancelSubscription(id);

    if (!subscription) {
      res.status(404).json({
        success: false,
        error: 'Subscription not found',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    res.json({
      success: true,
      data: subscription,
      message: 'Subscription canceled successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription',
      timestamp: new Date().toISOString(),
    });
  }
};
