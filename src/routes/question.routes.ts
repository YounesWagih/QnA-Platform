
import { Router } from 'express';
import { askQuestion } from '../controllers/question.controller';

const router = Router();

router.post('/:username', askQuestion);

export default router;
