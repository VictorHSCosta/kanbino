/**
 * Main entry point for the Kanbino application
 *
 * This file initializes and starts the application.
 * It serves as the main entry point when running the application.
 */

import { logger } from './utils/logger.js';
import { config } from './config/index.js';

/**
 * Main application function
 */
async function main(): Promise<void> {
  try {
    logger.info('Starting Kanbino application...');

    // Log environment
    logger.info(`Environment: ${config.env}`);
    logger.info(`Node version: ${process.version}`);
    logger.info(`Port: ${config.port}`);

    // TODO: Initialize your application logic here
    // Examples:
    // - Connect to database
    // - Start HTTP server
    // - Initialize message queues
    // - Setup cron jobs

    logger.info('Kanbino application started successfully!');

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received. Closing application gracefully...');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT signal received. Closing application gracefully...');
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Start the application
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

export { main };
