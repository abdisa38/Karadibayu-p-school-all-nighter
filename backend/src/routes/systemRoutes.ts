import { Router } from 'express';
import { SystemController } from '../controllers/systemController.js';

const router = Router();

router.get('/profile', SystemController.getSchoolProfile);

export default router;
