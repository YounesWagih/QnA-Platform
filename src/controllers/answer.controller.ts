import { Request, Response } from 'express';
import { AnswerService } from '../services/answers.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const answerQuestion = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  let questionId = +req.params.questionId;
  let { text } = req.body;

  if (isNaN(questionId)) {
    res.status(404).json({ error: 'question Id must be number' });
    return;
  }

  if (!userId) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  text = text?.trim();
  if (!text) {
    res.status(404).json({ error: 'text can not be empty' });
    return;
  }

  const question = await AnswerService.findQuestionToAnswer(questionId);
  console.log(question);
  if (!question) {
    res.status(404).json({ error: 'Question not found' });
    return;
  }
  if (question.recipientId !== userId) {
    res.status(404).json({ error: 'not your question' });
    return;
  }
  if (question.answer) {
    res.status(404).json({ error: 'question already answered' });
    return;
  }

  const answer = await AnswerService.answerQuestion(questionId, text, userId);

  res.status(201).json({ message: 'Answer submitted', answer });
};
