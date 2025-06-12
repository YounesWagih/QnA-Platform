import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Missing UserId' });
    return;
  }

  const user = await UserService.getUserById(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ user });
};

export const getPublicProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) {
    res.status(401).json({ error: 'Missing username' });
    return;
  }

  const user = await UserService.getUserByUsername(username);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({
    username: user.username,
    answers: user.answers.map((answer) => ({
      text: answer.text,
      createAt: answer.createdAt,
      question: answer.question.text,
    })),
  });
};
