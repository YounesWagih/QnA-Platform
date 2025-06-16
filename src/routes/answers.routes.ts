import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { answerQuestion } from '../controllers/answer.controller';

const router = Router();

router.post('/:questionId', authenticate, answerQuestion);

export default router;
