import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AuthenticatedUserContext } from '../types/index.js';

export class SecurityUtil {
  private static readonly SALT_ROUNDS = 12;

  public static async hashPassword(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  public static async comparePassword(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  public static generateAccessToken(payload: AuthenticatedUserContext): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  public static generateRefreshToken(payload: { id: string }): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  public static verifyAccessToken(token: string): AuthenticatedUserContext {
    return jwt.verify(token, env.JWT_SECRET) as AuthenticatedUserContext;
  }

  public static verifyRefreshToken(token: string): { id: string } {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string };
  }
}
