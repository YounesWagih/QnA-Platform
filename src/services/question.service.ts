import prisma from '../db/PrismaClient';

export const QuestionService = {
  async create(text: string, recipientId: string) {
    return await prisma.question.create({
      data: {
        text,
        recipientId,
      },
    });
  },
  async getUnansweredQuestionsById(id: string) {
    return await prisma.question.findMany({
      where: {
        recipientId: id,
        answer: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  },
};
