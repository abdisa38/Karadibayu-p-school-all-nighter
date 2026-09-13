import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AuthenticatedRequest } from '../types/index.js';
import { UserRole } from '../constants/roles.js';
import { SecurityUtil } from '../utils/security.js';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    // Foundation placeholder: In Phase 2, this queries MongoDB Users collection.
    // For foundation verification, accept standard system administrator credentials or return clean validation.
    if (email === 'admin@karadibayu.edu.et' && password === 'Karadibayu@2026') {
      const userPayload = {
        id: 'usr_admin_001',
        email: 'admin@karadibayu.edu.et',
        role: UserRole.SUPER_ADMIN,
        firstName: 'System',
        lastName: 'Administrator',
        isActive: true,
      };

      const accessToken = SecurityUtil.generateAccessToken(userPayload);
      const refreshToken = SecurityUtil.generateRefreshToken({ id: userPayload.id });

      ApiResponse.success(res, 'Institutional authentication successful', {
        user: userPayload,
        token: accessToken,
        refreshToken,
      });
      return;
    }

    ApiResponse.error(
      res,
      'Invalid institutional credentials. Access denied.',
      401
    );
  }

  public static async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    // Foundation implementation: acknowledge recovery request securely without revealing account existence
    ApiResponse.success(
      res,
      `If an institutional account matches '${email}', recovery instructions have been dispatched to the authorized registrar.`,
      { requestedEmail: email, status: 'DISPATCHED' }
    );
  }

  public static async getSession(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      ApiResponse.error(res, 'No active institutional session found', 401);
      return;
    }

    ApiResponse.success(res, 'Current institutional session retrieved', {
      user: req.user,
    });
  }

  public static async logout(_req: Request, res: Response): Promise<void> {
    ApiResponse.success(res, 'Institutional session terminated successfully');
  }
}
