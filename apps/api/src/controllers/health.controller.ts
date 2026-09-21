import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { testDatabaseConnection } from '../config/database';
import { ENV } from '../config/env';

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  let dbStatus: { connected: boolean; latencyMs?: number; error?: string } = {
    connected: false,
  };

  if (ENV.DATABASE.URL) {
    dbStatus = await testDatabaseConnection();
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: {
          configured: Boolean(ENV.DATABASE.URL),
          connected: dbStatus.connected,
          latencyMs: dbStatus.latencyMs,
          error: dbStatus.error,
        },
      },
      'API service is healthy'
    )
  );
});
