import prisma from '../db/PrismaClient';

export const AnswerService = {
  async answerQuestion(questionId: string, text: string, userId: string) {
    return await prisma.answer.create({
      data: {
        text,
        questionId,
        authorId: userId,
      },
    });
  },

  async findQuestionToAnswer(questionId: string) {
    return await prisma.question.findUnique({
      where: { id: questionId },
      include: { answer: true },
    });
  },
};
