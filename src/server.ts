/**
 * Express server configuration
 * HTTP server setup with middleware and routes
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/task.routes.js';
import { logger } from './utils/logger.js';
import { config } from './config/index.js';
import { initializePassport, passportSession } from './middleware/auth.middleware.js';
import { initializeSession } from './middleware/session.config.js';
import { passport } from './auth/index.js';
import { errorHandler } from './middleware/error.middleware.js';

export function createServer(): Application {
  const app: Application = express();

  // Middleware
  app.use(cors({
    origin: config.env === 'production'
      ? ['https://yourdomain.com']  // Add production domains
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize session and Passport
  if (config.google || config.linkedin) {
    initializeSession(app);
    app.use(initializePassport());
    app.use(passportSession());
  }

  // Request logging middleware
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  // API Routes
  app.use('/api', apiRoutes);

  // Auth routes
  app.use('/api/auth', authRoutes);

  // Profile routes
  app.use('/api/profile', profileRoutes);

  // Project routes
  app.use('/api/projects', projectRoutes);

  // Task routes
  app.use('/api/projects', taskRoutes);

  // Serve static files (uploads)
  app.use('/uploads', express.static('src/public/uploads'));

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.env,
    });
  });

  // Serve static files in production (React build)
  if (config.env === 'production') {
    app.use(express.static('frontend/dist'));

    // SPA fallback
    app.get('*', (req: Request, res: Response) => {
      res.sendFile('index.html', { root: 'frontend/dist' });
    });
  }

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      path: req.path,
    });
  });

  // Error handler
  app.use((err: Error, req: Request, res: Response, next: any) => {
    logger.error('Error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: config.env === 'development' ? err.message : undefined,
    });
  });

  return app;
}

export async function startServer(): Promise<void> {
  const app = createServer();

  return new Promise((resolve, reject) => {
    const server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
      logger.info(`Environment: ${config.env}`);
      logger.info(`API available at http://localhost:${config.port}/api`);
      resolve();
    });

    server.on('error', (error) => {
      logger.error('Failed to start server:', error);
      reject(error);
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info('Shutting down server...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  });
}
