import morgan from 'morgan';
import { Request, Response } from 'express';
import { logger } from '../utils/logger.js';

const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: morganStream,
    skip: (req: Request, _res: Response) => {
      // Skip logging health checks in verbose spamming situations if needed, but for now log all
      return false;
    },
  }
);
