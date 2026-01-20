/**
 * Profile Controller
 * Handles user profile photo upload and management
 */

import { Request, Response } from 'express';
import { User } from '../types/auth.types.js';
import { updateUserPhoto, removeUserPhoto } from '../auth/user.service.js';
import { logger } from '../utils/logger.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Upload/update user profile photo
 */
export async function uploadPhoto(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user as User;

    if (!user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'No file uploaded'
      });
      return;
    }

    // Delete old photo if it exists and is a local file
    if (user.photo && user.photo.includes('/uploads/avatars/')) {
      const oldFilename = user.photo.split('/uploads/avatars/')[1];
      const oldPath = path.join(__dirname, '../public/uploads/avatars', oldFilename);

      try {
        await fs.unlink(oldPath);
        logger.info(`Old photo deleted: ${oldPath}`);
      } catch (err) {
        // File might not exist, log and continue
        logger.warn(`Failed to delete old photo: ${oldPath}`, err);
      }
    }

    // Update user photo in storage
    const photoUrl = `/uploads/avatars/${req.file.filename}`;
    const updatedUser = updateUserPhoto(user.id, photoUrl);

    if (!updatedUser) {
      res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
      return;
    }

    // Update req.user to reflect changes
    req.user = updatedUser;

    logger.info(`Photo uploaded for user: ${user.email}`);

    res.json({
      success: true,
      photoUrl,
      message: 'Foto de perfil atualizada com sucesso'
    });
  } catch (error) {
    logger.error('Error uploading photo:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to upload photo'
    });
  }
}

/**
 * Remove user profile photo
 */
export async function deletePhoto(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user as User;

    if (!user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
      return;
    }

    // Delete photo file if it's a local file
    if (user.photo && user.photo.includes('/uploads/avatars/')) {
      const filename = user.photo.split('/uploads/avatars/')[1];
      const filePath = path.join(__dirname, '../public/uploads/avatars', filename);

      try {
        await fs.unlink(filePath);
        logger.info(`Photo file deleted: ${filePath}`);
      } catch (err) {
        // File might not exist, log and continue
        logger.warn(`Failed to delete photo file: ${filePath}`, err);
      }
    }

    // Remove photo reference from user
    const updatedUser = removeUserPhoto(user.id);

    if (!updatedUser) {
      res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
      return;
    }

    // Update req.user to reflect changes
    req.user = updatedUser;

    logger.info(`Photo removed for user: ${user.email}`);

    res.json({
      success: true,
      message: 'Foto de perfil removida com sucesso'
    });
  } catch (error) {
    logger.error('Error deleting photo:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete photo'
    });
  }
}

/**
 * Get user profile data
 */
export function getProfile(req: Request, res: Response): void {
  const user = req.user as User;

  if (!user) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
    return;
  }

  res.json({
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user.photo,
    provider: user.provider,
    profileUrl: user.profileUrl,
    createdAt: user.createdAt
  });
}
