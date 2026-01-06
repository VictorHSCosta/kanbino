/**
 * Main entry point for the Kanbino application
 *
 * This file initializes and starts the application.
 * It serves as the main entry point when running the application.
 */

import { logger } from './utils/logger.js';
import { config } from './config/index.js';
import { startServer } from './server.js';

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

    // Start HTTP server
    await startServer();

    logger.info('Kanbino application started successfully!');

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
