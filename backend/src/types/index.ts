import { Request } from 'express';
import { UserRoleType } from '../constants/roles.js';

export interface ApiResponseEnvelope<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    timestamp: string;
    [key: string]: unknown;
  };
  errors?: unknown;
}

export interface AuthenticatedUserContext {
  id: string;
  email: string;
  role: UserRoleType;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUserContext;
}
