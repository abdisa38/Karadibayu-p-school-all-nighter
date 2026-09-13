import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { dbConnection } from '../config/database.js';
import { env } from '../config/env.js';

export class HealthController {
  public static checkHealth(_req: Request, res: Response): void {
    const dbHealth = dbConnection.getHealth();
    const uptimeSeconds = process.uptime();
    const memoryUsage = process.memoryUsage();

    const isSystemHealthy = dbHealth.isConnected;

    const payload = {
      status: isSystemHealthy ? 'HEALTHY' : 'DEGRADED',
      name: 'Karadibayu Primary School Management System API',
      version: '1.0.0',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(uptimeSeconds),
        formatted: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${Math.floor(uptimeSeconds % 60)}s`,
      },
      database: dbHealth,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: {
          rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
          heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        },
      },
    };

    ApiResponse.success(
      res,
      isSystemHealthy
        ? 'Institutional API and Database operational'
        : 'Institutional API operational; Database connection degraded',
      payload
    );
  }
}
