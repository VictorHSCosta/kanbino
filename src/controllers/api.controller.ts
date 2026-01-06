/**
 * API Controller
 * Handles all API requests and responses
 */

import { Request, Response } from 'express';

export const getHealth = (req: Request, res: Response): void => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
};

export const getStatus = (req: Request, res: Response): void => {
  res.json({
    status: 'running',
    version: '1.0.0',
    features: {
      frontend: 'React + Vite + TypeScript',
      backend: 'Node.js + Express + TypeScript',
      styling: 'Tailwind CSS',
    },
  });
};

export const getData = (req: Request, res: Response): void => {
  res.json({
    message: 'Data from backend',
    items: [
      { id: 1, name: 'React', type: 'frontend' },
      { id: 2, name: 'Node.js', type: 'backend' },
      { id: 3, name: 'TypeScript', type: 'language' },
      { id: 4, name: 'Tailwind CSS', type: 'styling' },
      { id: 5, name: 'Vite', type: 'build-tool' },
    ],
    timestamp: new Date().toISOString(),
  });
};
