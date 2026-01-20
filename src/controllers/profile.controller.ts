/**
 * Profile Controller
 * Handles profile photo upload and profile retrieval
 */

import { Request, Response } from 'express';
import { User } from '../types/auth.types.js';
import { logger } from '../utils/logger.js';
import { getUserById, users } from '../auth/user.service.js';

/**
 * Upload and update profile photo
 */
export function uploadProfilePhoto(req: Request, res: Response): void {
  try {
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
      return;
    }

    const user = req.user as User;

    // Check if file was uploaded
    if (!req.file) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Nenhum arquivo enviado. Selecione uma foto para upload.',
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      res.status(413).json({
        error: 'Payload Too Large',
        message: 'Arquivo muito grande. Tamanho máximo: 5MB.',
      });
      return;
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(415).json({
        error: 'Unsupported Media Type',
        message: 'Tipo de arquivo inválido. Use: JPEG, PNG, WEBP ou GIF.',
      });
      return;
    }

    // Construct public URL for the uploaded photo
    const photoUrl = `/uploads/profile-photos/${req.file.filename}`;

    // Update user in memory storage
    const updatedUser: User = {
      ...user,
      photo: photoUrl,
    };

    users.set(user.id, updatedUser);

    // Update req.user to reflect changes in current session
    req.user = updatedUser;

    logger.info(`Profile photo updated for user: ${user.email}`);

    res.json({
      success: true,
      photoUrl,
      message: 'Foto de perfil atualizada com sucesso!',
    });
  } catch (error) {
    logger.error('Error uploading profile photo:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro ao fazer upload da foto. Tente novamente.',
    });
  }
}

/**
 * Get current user profile
 */
export function getProfile(req: Request, res: Response): void {
  try {
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
      return;
    }

    const user = req.user as User;

    res.json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      provider: user.provider,
      profileUrl: user.profileUrl,
      createdAt: user.createdAt,
    });
  } catch (error) {
    logger.error('Error getting profile:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro ao buscar perfil do usuário.',
    });
  }
}
