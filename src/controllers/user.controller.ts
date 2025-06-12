import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { getUser } from '../services/user.service';

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Missing UserId' });
    return;
  }

  const user = await getUser(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ user });
};
