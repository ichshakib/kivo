import { app } from './app';
import { ENV } from './config/env';
import { testDatabaseConnection } from './config/database';
import logger from './logger/winston.logger';

export const startServer = () => {
  try {
    const server = app.listen(ENV.PORT, async () => {
      logger.info(`🚀 Kivo API server running on http://localhost:${ENV.PORT}`);
      logger.info(`🔑 Google Auth Endpoint: http://localhost:${ENV.PORT}/api/auth/google`);
      logger.info(`🤖 AI Endpoints: http://localhost:${ENV.PORT}/api/ai`);
      logger.info(`🩺 Health Check: http://localhost:${ENV.PORT}/api/health`);

      if (ENV.DATABASE.URL) {
        const dbStatus = await testDatabaseConnection();
        if (dbStatus.connected) {
          logger.info(`🗄️ PostgreSQL database connected successfully (${dbStatus.latencyMs}ms)`);
        } else {
          logger.warn(`⚠️ PostgreSQL connection warning: ${dbStatus.error}`);
        }
      }
    });
    return server;
  } catch (error) {
    logger.error(`Failed to start server: ${String(error)}`);
    process.exit(1);
  }
};

startServer();
