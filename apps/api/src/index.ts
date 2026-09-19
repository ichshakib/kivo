import { app } from './app';
import { ENV } from './config/env';
import logger from './logger/winston.logger';

export const startServer = () => {
  try {
    const server = app.listen(ENV.PORT, () => {
      logger.info(`🚀 Kivo API server running on http://localhost:${ENV.PORT}`);
      logger.info(`🔑 Google Auth Endpoint: http://localhost:${ENV.PORT}/api/auth/google`);
      logger.info(`🩺 Health Check: http://localhost:${ENV.PORT}/api/health`);
    });
    return server;
  } catch (error) {
    logger.error(`Failed to start server: ${String(error)}`);
    process.exit(1);
  }
};

startServer();
