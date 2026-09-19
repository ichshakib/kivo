import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      'API service is healthy'
    )
  );
});
