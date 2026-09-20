import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { User } from '../types/user';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import logger from '../logger/winston.logger';

export const authController = {
  // 1. Mobile Google Auth endpoint
  mobileGoogleLogin: asyncHandler(async (req: Request, res: Response) => {
    const { user, idToken } = req.body;

    logger.info(
      `[Auth] Mobile Google Sign-In: ${JSON.stringify(
        {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          photo: user?.photo,
          hasIdToken: Boolean(idToken),
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )}`
    );

    const token = jwt.sign(
      {
        id: user?.id || 'mobile-user',
        email: user?.email || '',
        name: user?.name || '',
      },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: user || { id: 'mobile-user', email: user?.email, name: user?.name },
          token,
        },
        'Mobile Google login logged and authenticated successfully'
      )
    );
  }),

  // 2. Initiate Google OAuth (Web/Browser)
  googleLogin: (req: Request, res: Response, next: NextFunction) => {
    if (!ENV.GOOGLE.CLIENT_ID || !ENV.GOOGLE.CLIENT_SECRET) {
      return next(
        new ApiError(500, 'Google OAuth credentials not configured in server environment (.env).')
      );
    }
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })(req, res, next);
  },

  // 3. Google OAuth Callback (Web/Browser)
  googleCallback: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', (err: Error | null, user: User | false) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect(`${ENV.CLIENT_URL}/login?error=auth_failed`);
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        logger.info(
          `[Auth] Web Google OAuth callback: ${JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            timestamp: new Date().toISOString(),
          })}`
        );

        // Generate JWT token for cross-platform / mobile app clients
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          ENV.JWT_SECRET,
          { expiresIn: '7d' }
        );

        // Check if request expects JSON (e.g. mobile app with headers or query param)
        const format =
          req.query.format ||
          (req.headers.accept?.includes('application/json') ? 'json' : 'redirect');

        if (format === 'json') {
          return res.status(200).json(
            new ApiResponse(
              200,
              {
                user,
                token,
              },
              'Successfully authenticated with Google'
            )
          );
        }

        // Redirect to Web/Client app with auth token
        const redirectUrl = new URL(ENV.CLIENT_URL);
        redirectUrl.searchParams.set('token', token);
        redirectUrl.searchParams.set('userId', user.id);
        return res.redirect(redirectUrl.toString());
      });
    })(req, res, next);
  },

  // 4. Get Current User Profile
  getMe: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized: No active session');
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          authenticated: true,
          user: req.user,
        },
        'Current user retrieved successfully'
      )
    );
  }),

  // 5. Logout User
  logout: (req: Request, res: Response, next: NextFunction) => {
    const userIdentifier =
      req.user || req.body?.user || req.body?.email || req.body?.userId || 'Mobile/Web Client';

    logger.info(
      `[Auth] Account logged out: ${JSON.stringify({
        user: userIdentifier,
        timestamp: new Date().toISOString(),
      })}`
    );

    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session?.destroy((sessionErr) => {
        if (sessionErr) {
          return next(sessionErr);
        }
        res.clearCookie('connect.sid');
        return res.status(200).json(new ApiResponse(200, null, 'Successfully logged out'));
      });
    });
  },

  // 5. Auth Service Status
  getStatus: asyncHandler(async (_req: Request, res: Response) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          provider: 'google',
          configured: Boolean(ENV.GOOGLE.CLIENT_ID && ENV.GOOGLE.CLIENT_SECRET),
          callbackUrl: ENV.GOOGLE.CALLBACK_URL,
          clientUrl: ENV.CLIENT_URL,
          status: 'ready',
        },
        'Auth service status retrieved'
      )
    );
  }),
};
