import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { ENV } from './config/env';
import { configurePassport } from './config/passport';
import authRoutes from './routes/auth.routes';

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

  // 4. Session middleware for Passport
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

  // 5. Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // 6. Routes
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'Kivo API',
      version: '1.0.0',
      status: 'online',
      timestamp: new Date().toISOString(),
      auth: {
        googleLogin: '/api/auth/google',
        status: '/api/auth/status',
        me: '/api/auth/me',
      },
    });
  });

  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // Mount Auth Routes
  app.use('/api/auth', authRoutes);

  return app;
}
