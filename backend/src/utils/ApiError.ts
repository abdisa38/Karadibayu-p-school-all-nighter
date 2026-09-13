import { HttpStatus, HttpStatusCode } from '../constants/httpStatus.js';

export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errors?: unknown,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  public static badRequest(message = 'Bad request', errors?: unknown): ApiError {
    return new ApiError(message, HttpStatus.BAD_REQUEST, errors);
  }

  public static unauthorized(message = 'Unauthorized access', errors?: unknown): ApiError {
    return new ApiError(message, HttpStatus.UNAUTHORIZED, errors);
  }

  public static forbidden(message = 'Access forbidden', errors?: unknown): ApiError {
    return new ApiError(message, HttpStatus.FORBIDDEN, errors);
  }

  public static notFound(message = 'Resource not found', errors?: unknown): ApiError {
    return new ApiError(message, HttpStatus.NOT_FOUND, errors);
  }

  public static conflict(message = 'Resource conflict', errors?: unknown): ApiError {
    return new ApiError(message, HttpStatus.CONFLICT, errors);
  }

  public static unprocessable(message = 'Unprocessable entity', errors?: unknown): ApiError {
    return new ApiError(message, HttpStatus.UNPROCESSABLE_ENTITY, errors);
  }

  public static internal(message = 'Internal server error', errors?: unknown): ApiError {
    return new ApiError(message, HttpStatus.INTERNAL_SERVER_ERROR, errors, false);
  }
}
