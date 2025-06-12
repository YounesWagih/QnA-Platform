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
};
