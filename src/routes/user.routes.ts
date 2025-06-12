import { Router } from 'express';
import { getMe, getPublicProfile } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticate, getMe);
router.get('/:username', getPublicProfile);

export default router;
