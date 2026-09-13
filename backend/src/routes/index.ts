import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import systemRoutes from './systemRoutes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/system', systemRoutes);

export default apiRouter;
