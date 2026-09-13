import { Response } from 'express';
import { ApiResponseEnvelope } from '../types/index.js';
import { HttpStatus, HttpStatusCode } from '../constants/httpStatus.js';

export class ApiResponse {
  public static success<T>(
    res: Response,
    message = 'Operation successful',
    data?: T,
    statusCode: HttpStatusCode = HttpStatus.OK,
    meta?: Record<string, unknown>
  ): Response<ApiResponseEnvelope<T>> {
    const responsePayload: ApiResponseEnvelope<T> = {
      success: true,
      statusCode,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };

    return res.status(statusCode).json(responsePayload);
  }

  public static created<T>(
    res: Response,
    message = 'Resource created successfully',
    data?: T,
    meta?: Record<string, unknown>
  ): Response<ApiResponseEnvelope<T>> {
    return this.success(res, message, data, HttpStatus.CREATED, meta);
  }

  public static error(
    res: Response,
    message = 'An unexpected error occurred',
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errors?: unknown
  ): Response<ApiResponseEnvelope<null>> {
    const responsePayload: ApiResponseEnvelope<null> = {
      success: false,
      statusCode,
      message,
      errors,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return res.status(statusCode).json(responsePayload);
  }
}
