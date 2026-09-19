import { Router } from 'express';
import healthRouter from './health.route';
import authRouter from './auth.routes';
import { ApiResponse } from '../utils/ApiResponse';

const router = Router();

router.get('/', (_req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        name: 'Kivo API',
        version: '1.0.0',
        status: 'online',
        timestamp: new Date().toISOString(),
        endpoints: {
          health: '/api/health',
          googleLogin: '/api/auth/google',
          authStatus: '/api/auth/status',
          me: '/api/auth/me',
        },
      },
      'Welcome to Kivo API'
    )
  );
});

// Mount modular sub-routes
router.use('/health', healthRouter);
router.use('/auth', authRouter);

export default router;
export { router };
