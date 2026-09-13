import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiError } from '../utils/ApiError.js';
import { SecurityUtil } from '../utils/security.js';

export const requireAuth = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  try {
    let token: string | undefined;

    // Check Bearer authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      // Fallback to HTTP-only cookie if provided
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw ApiError.unauthorized('Authentication token required. Please sign in.');
    }

    const decoded = SecurityUtil.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
