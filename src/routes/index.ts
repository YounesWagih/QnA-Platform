import express from 'express';
import authRouter from './auth.routes';
import userRouter from '../routes/user.routes';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
export default router;
