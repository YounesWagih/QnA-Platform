import { Request, Response } from 'express';
import prisma from '../db/PrismaClient';
import { QuestionService } from '../services/question.service';

export const askQuestion = async (req: Request, res: Response) => {
  const { username } = req.params;
  let text: string = req.body.text;
  text = text.trim();
  if (text.length === 0) {
    res.status(404).json({ error: `Question musn't be empty` });
    return;
  }
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const question = await QuestionService.create(text, user.id);

  res.status(201).json({ message: 'Question sent', question });
};
