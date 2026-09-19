import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { users } from '../config/passport';
import { User } from '../types/user';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  // 1. Check Passport session authentication
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // 2. Fallback: Check JWT token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; email: string };
        const user = users.get(decoded.id);
        if (user) {
          req.user = user;
          return next();
        }
      } catch {
        res.status(401).json({
          error: 'Invalid or expired authentication token',
          status: 'unauthorized',
        });
        return;
      }
    }
  }

  res.status(401).json({
    error: 'Authentication required. Please sign in via Google OAuth.',
    status: 'unauthorized',
    loginUrl: '/api/auth/google',
  });
}
