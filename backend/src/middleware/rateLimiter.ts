import rateLimit from 'express-rate-limit';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HttpStatus } from '../constants/httpStatus.js';

export const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    ApiResponse.error(
      res,
      'Institutional rate limit exceeded. Please wait a few minutes before trying again.',
      HttpStatus.TOO_MANY_REQUESTS
    );
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 authentication attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    ApiResponse.error(
      res,
      'Too many authentication attempts. Account access is temporarily restricted for security.',
      HttpStatus.TOO_MANY_REQUESTS
    );
  },
});
