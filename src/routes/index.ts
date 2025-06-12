import express from 'express';
import authRouter from './auth.routes';
import userRouter from '../routes/user.routes';
import questionRouter from '../routes/question.routes';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/questions', questionRouter);
export default router;
