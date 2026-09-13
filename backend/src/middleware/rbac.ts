import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { UserRoleType, RoleHierarchy } from '../constants/roles.js';
import { ApiError } from '../utils/ApiError.js';

export const authorizeRoles = (...allowedRoles: UserRoleType[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('User identity not authenticated.'));
    }

    const hasRole = allowedRoles.includes(req.user.role);
    if (!hasRole) {
      return next(
        ApiError.forbidden(
          `Access denied. Role '${req.user.role}' is not authorized for this academic resource.`
        )
      );
    }

    next();
  };
};

export const requireMinRole = (minimumRole: UserRoleType) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('User identity not authenticated.'));
    }

    const userRank = RoleHierarchy[req.user.role] || 0;
    const requiredRank = RoleHierarchy[minimumRole] || 0;

    if (userRank < requiredRank) {
      return next(
        ApiError.forbidden(
          `Insufficient institutional privilege. Minimum role required: ${minimumRole}.`
        )
      );
    }

    next();
  };
};
