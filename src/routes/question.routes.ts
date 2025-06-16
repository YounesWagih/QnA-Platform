import { Router } from 'express';
import { askQuestion, getUnansweredQuestions } from '../controllers/question.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/:username', askQuestion);
router.get('/unanswered', authenticate, getUnansweredQuestions);

export default router;
