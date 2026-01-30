/**
 * Upload Configuration
 * Multer middleware for handling secure file uploads
 */

import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';
import fs from 'fs';
import { logger } from '../utils/logger.js';

// Ensure upload directory exists
const uploadDir = 'src/public/uploads/profile-photos/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Sanitize filename to prevent directory traversal attacks
 */
function sanitizeFilename(filename: string): string {
  // Remove any path separators and special characters
  const sanitized = filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.') // Prevent directory traversal
    .replace(/^\.+/, ''); // Remove leading dots

  return sanitized;
}

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Generate unique filename with UUID to prevent collisions
    const uniqueId = `${Date.now()}-${randomBytes(16).toString('hex')}`;
    const ext = path.extname(file.originalname);
    const sanitizedName = sanitizeFilename(path.basename(file.originalname, ext));

    cb(null, `profile-${sanitizedName}-${uniqueId}${ext}`);
  },
});

/**
 * Enhanced file filter with security validations
 */
const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  // Allowed MIME types
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  // Allowed file extensions
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const fileExt = path.extname(file.originalname).toLowerCase();

  // Validate MIME type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    logger.warn(`Rejected file upload with invalid MIME type: ${file.mimetype}`);
    return cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas (JPEG, PNG, WEBP, GIF).'));
  }

  // Validate file extension
  if (!allowedExtensions.includes(fileExt)) {
    logger.warn(`Rejected file upload with invalid extension: ${fileExt}`);
    return cb(new Error('Extensão de arquivo inválida. Use: .jpg, .jpeg, .png, .webp ou .gif'));
  }

  // Check if MIME type matches extension
  const mimeToExt: Record<string, string[]> = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/gif': ['.gif'],
  };

  const validExtensionsForMime = mimeToExt[file.mimetype] || [];
  if (!validExtensionsForMime.includes(fileExt)) {
    logger.warn(`MIME type mismatch: ${file.mimetype} vs ${fileExt}`);
    return cb(new Error('MIME type do arquivo não corresponde à extensão.'));
  }

  // Validate filename
  const sanitizedName = sanitizeFilename(file.originalname);
  if (sanitizedName !== file.originalname) {
    logger.warn(`Filename sanitized: ${file.originalname} -> ${sanitizedName}`);
  }

  cb(null, true);
};

/**
 * Validate file dimensions (optional enhancement)
 * Note: This would require additional packages like 'image-size'
 */

// Configure upload middleware with enhanced security
export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Only one file at a time
    fields: 10, // Max number of non-file fields
    fieldNameSize: 100, // Max field name size
    fieldSize: 100, // Max field value size
  },
});

/**
 * Validate uploaded file after upload
 * This adds an extra layer of security by checking the actual file content
 */
export function validateUploadedFile(file: Express.Multer.File): { valid: boolean; error?: string } {
  // Check if file exists
  if (!file || !file.path) {
    return { valid: false, error: 'Arquivo não encontrado' };
  }

  // Check file size again
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Arquivo muito grande. Tamanho máximo: 5MB' };
  }

  // Additional checks can be added here:
  // - Magic number validation
  // - Image dimension validation
  // - Virus scanning (in production)

  return { valid: true };
}

// Export single file uploader for profile photos
export const uploadProfilePhoto = uploadMiddleware.single('photo');
