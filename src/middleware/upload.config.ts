/**
 * Upload Configuration
 * Multer middleware for handling file uploads (avatar images)
 */

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/avatars');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-randombytes.ext
    const uniqueSuffix = `${Date.now()}-${randomBytes(6).toString('hex')}`;
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${uniqueSuffix}${ext}`);
  }
});

// File filter to accept only images
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo inválido. Apenas JPEG, PNG e WebP são permitidos.'));
  }
};

// Configure multer middleware
export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file at a time
  }
}).single('avatar');

// Wrapper to handle multer errors
export const handleAvatarUpload = (req: any, res: any, next: any) => {
  uploadAvatar(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'Arquivo muito grande. Tamanho máximo: 5MB',
          code: 'LIMIT_FILE_SIZE'
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          error: 'Apenas um arquivo permitido',
          code: 'LIMIT_FILE_COUNT'
        });
      }
      return res.status(400).json({
        error: 'Erro no upload',
        details: err.message
      });
    } else if (err) {
      // Other errors (like file filter)
      return res.status(400).json({
        error: err.message || 'Erro ao processar arquivo'
      });
    }

    next();
  });
};
