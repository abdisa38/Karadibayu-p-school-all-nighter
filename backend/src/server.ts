import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { dbConnection } from './config/database.js';
import { logger } from './utils/logger.js';
import { requestLogger } from './middleware/requestLogger.js';
import { generalRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ApiError } from './utils/ApiError.js';
import apiRouter from './routes/index.js';

const app = express();

// Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS Configuration
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

// Request Parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser());

// Request Telemetry & Rate Limiting
app.use(requestLogger);
app.use('/api', generalRateLimiter);

// Mount Versioned API Routes
app.use('/api/v1', apiRouter);

// Catch 404 for Unmatched Routes
app.all('*', (req, _res, next) => {
  next(ApiError.notFound(`Institutional API resource not found at [${req.method}] ${req.originalUrl}`));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Server Lifecycle Management
const startServer = async () => {
  // Connect to Database
  await dbConnection.connect();

  const server = app.listen(env.PORT, () => {
    logger.info('===========================================================');
    logger.info('  KARADIBAYU PRIMARY SCHOOL MANAGEMENT SYSTEM - API CORE  ');
    logger.info(`  Server running in [${env.NODE_ENV}] mode on port: ${env.PORT}`);
    logger.info(`  Base API URL: http://localhost:${env.PORT}/api/v1`);
    logger.info(`  Health Endpoint: http://localhost:${env.PORT}/api/v1/health`);
    logger.info('===========================================================');
  });

  const handleTermination = async (signal: string) => {
    logger.info(`Received ${signal}. Initiating graceful shutdown sequence...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      await dbConnection.disconnect();
      logger.info('Process terminated cleanly.');
      process.exit(0);
    });

    // Force exit if hanging
    setTimeout(() => {
      logger.error('Graceful shutdown timeout exceeded. Forcing termination.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleTermination('SIGTERM'));
  process.on('SIGINT', () => handleTermination('SIGINT'));

  process.on('unhandledRejection', (reason: unknown) => {
    logger.error('CRITICAL: Unhandled Promise Rejection detected:', { reason });
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('CRITICAL: Uncaught Exception detected:', { error: error.message, stack: error.stack });
    process.exit(1);
  });
};

startServer().catch((err) => {
  logger.error('Failed to initialize institutional backend service:', err);
  process.exit(1);
});

export default app;
