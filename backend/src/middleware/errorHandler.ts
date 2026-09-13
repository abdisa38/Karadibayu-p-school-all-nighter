import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HttpStatus } from '../constants/httpStatus.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    logger.warn(`Operational Error [${err.statusCode}] at ${req.method} ${req.url}: ${err.message}`);
    ApiResponse.error(res, err.message, err.statusCode, err.errors);
    return;
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
      code: e.code,
    }));
    logger.warn(`Validation Error at ${req.method} ${req.url}: ${JSON.stringify(formattedErrors)}`);
    ApiResponse.error(
      res,
      'Request validation failed',
      HttpStatus.UNPROCESSABLE_ENTITY,
      formattedErrors
    );
    return;
  }

  // Handle Mongoose / MongoDB specific errors
  if (typeof err === 'object' && err !== null) {
    const errorObj = err as Record<string, unknown>;
    
    // Duplicate key error (E11000)
    if (errorObj.code === 11000) {
      const duplicateField = Object.keys((errorObj.keyValue as Record<string, unknown>) || {})[0] || 'field';
      const message = `A record with this ${duplicateField} already exists`;
      ApiResponse.error(res, message, HttpStatus.CONFLICT);
      return;
    }

    // JWT Verification error
    if (errorObj.name === 'JsonWebTokenError') {
      ApiResponse.error(res, 'Invalid authentication token', HttpStatus.UNAUTHORIZED);
      return;
    }

    if (errorObj.name === 'TokenExpiredError') {
      ApiResponse.error(res, 'Authentication token has expired', HttpStatus.UNAUTHORIZED);
      return;
    }
  }

  // Generic unhandled exceptions
  const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
  const errorStack = err instanceof Error ? err.stack : undefined;

  logger.error(`Unhandled Exception at ${req.method} ${req.url}: ${errorMessage}`, {
    stack: errorStack,
  });

  const responseMessage =
    env.NODE_ENV === 'production'
      ? 'An internal server error occurred. Please contact institutional support.'
      : errorMessage;

  ApiResponse.error(
    res,
    responseMessage,
    HttpStatus.INTERNAL_SERVER_ERROR,
    env.NODE_ENV === 'development' ? { stack: errorStack } : undefined
  );
};
