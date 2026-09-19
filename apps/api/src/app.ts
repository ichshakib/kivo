import cors from 'cors';
import express, { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import { ENV } from './config/env';
import { configurePassport } from './config/passport';
import morganMiddleware from './logger/morgan.logger';
import router from './routes';
import { errorHandler } from './middlewares/error.middleware';

export function createApp(): Express {
  const app = express();

  // 1. Initialize Passport.js strategy
  configurePassport();

  // 2. CORS configuration (supports credentials for sessions & cross-origin cookies)
  app.use(
    cors({
      origin: [
        ENV.CLIENT_URL,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:8081',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
  );

  // 3. Body Parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 4. HTTP Request Logger (Morgan -> Winston)
  app.use(morganMiddleware);

  // 5. Session middleware for Passport
  app.use(
    session({
      secret: ENV.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: ENV.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
      },
    })
  );

  // 6. Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // 7. Routes (mounted at root and /api)
  app.use('/', router);
  app.use('/api', router);
  app.use('/api/v1', router);

  // 8. Central Error Handling Middleware (must be registered after routes)
  app.use(errorHandler);

  return app;
}

export const app = createApp();
export default app;
