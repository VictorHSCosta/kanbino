/**
 * Upload Configuration
 * Multer middleware for handling file uploads
 */

import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'src/public/uploads/profile-photos/');
  },
  filename: (_req, file, cb) => {
    // Generate unique filename: timestamp-randombytes-originalname
    const uniqueSuffix = `${Date.now()}-${randomBytes(6).toString('hex')}`;
    const ext = path.extname(file.originalname);
    cb(null, `profile-${uniqueSuffix}${ext}`);
  },
});

// File filter to accept only images
const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas (JPEG, PNG, WEBP, GIF).'));
  }
};

// Configure upload middleware
export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Only one file at a time
  },
});

// Export single file uploader for profile photos
export const uploadProfilePhoto = uploadMiddleware.single('photo');
