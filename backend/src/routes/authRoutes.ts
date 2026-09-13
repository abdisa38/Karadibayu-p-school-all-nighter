import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginSchema, forgotPasswordSchema } from '../validation/authValidation.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', authRateLimiter, validateRequest(loginSchema), AuthController.login);
router.post('/forgot-password', authRateLimiter, validateRequest(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/logout', AuthController.logout);
router.get('/session', requireAuth, AuthController.getSession);

export default router;
