import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { User } from '../types/user';

export const authController = {
  // 1. Initiate Google OAuth
  googleLogin: (req: Request, res: Response, next: NextFunction) => {
    if (!ENV.GOOGLE.CLIENT_ID || !ENV.GOOGLE.CLIENT_SECRET) {
      res.status(500).json({
        error: 'Google OAuth credentials not configured in server environment (.env).',
        status: 'misconfigured',
      });
      return;
    }
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })(req, res, next);
  },

  // 2. Google OAuth Callback
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
        const format = req.query.format || (req.headers.accept?.includes('application/json') ? 'json' : 'redirect');

        if (format === 'json') {
          return res.json({
            success: true,
            message: 'Successfully authenticated with Google',
            user,
            token,
          });
        }

        // Redirect to Web/Client app with auth token
        const redirectUrl = new URL(ENV.CLIENT_URL);
        redirectUrl.searchParams.set('token', token);
        redirectUrl.searchParams.set('userId', user.id);
        return res.redirect(redirectUrl.toString());
      });
    })(req, res, next);
  },

  // 3. Get Current User Profile
  getMe: (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        authenticated: false,
        user: null,
      });
      return;
    }

    res.json({
      authenticated: true,
      user: req.user,
    });
  },

  // 4. Logout User
  logout: (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session?.destroy((sessionErr) => {
        if (sessionErr) {
          return next(sessionErr);
        }
        res.clearCookie('connect.sid');
        return res.json({
          success: true,
          message: 'Successfully logged out',
        });
      });
    });
  },

  // 5. Auth Service Status
  getStatus: (req: Request, res: Response) => {
    res.json({
      provider: 'google',
      configured: Boolean(ENV.GOOGLE.CLIENT_ID && ENV.GOOGLE.CLIENT_SECRET),
      callbackUrl: ENV.GOOGLE.CALLBACK_URL,
      clientUrl: ENV.CLIENT_URL,
      status: 'ready',
    });
  },
};
