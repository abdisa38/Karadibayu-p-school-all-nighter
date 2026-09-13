import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export interface DatabaseHealthStatus {
  isConnected: boolean;
  readyState: number;
  stateLabel: string;
  host?: string;
  name?: string;
}

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnecting = false;

  private constructor() {
    this.registerEventHandlers();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private registerEventHandlers(): void {
    mongoose.connection.on('connected', () => {
      logger.info(`MongoDB connection established to: ${mongoose.connection.host}/${mongoose.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error encountered: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Reconnection will be attempted upon database request.');
    });

    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  public async connect(): Promise<void> {
    if (mongoose.connection.readyState === 1 || this.isConnecting) {
      return;
    }

    try {
      this.isConnecting = true;
      logger.info('Initiating MongoDB connection...');

      await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 2,
      });

      this.isConnecting = false;
    } catch (error) {
      this.isConnecting = false;
      const message = error instanceof Error ? error.message : 'Unknown database error';
      logger.error(`MongoDB initial connection failure: ${message}`);
      // Note: We log the error but do not abruptly terminate here so that the health check
      // and system routes can still report degraded database health in development.
    }
  }

  public async disconnect(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
      logger.info('Closing MongoDB connection gracefully...');
      await mongoose.connection.close();
      logger.info('MongoDB connection closed.');
    }
  }

  public getHealth(): DatabaseHealthStatus {
    const stateMap: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized',
    };

    const readyState = mongoose.connection.readyState;

    return {
      isConnected: readyState === 1,
      readyState,
      stateLabel: stateMap[readyState] || 'unknown',
      host: mongoose.connection.host || undefined,
      name: mongoose.connection.name || undefined,
    };
  }
}

export const dbConnection = DatabaseConnection.getInstance();
