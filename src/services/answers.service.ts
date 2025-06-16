import prisma from '../db/PrismaClient';

export const AnswerService = {
  async answerQuestion(questionId: number, text: string, userId: number) {
    return await prisma.answer.create({
      data: {
        text,
        questionId,
        authorId: userId,
      },
    });
  },

  async findQuestionToAnswer(questionId: number) {
    return await prisma.question.findUnique({
      where: { id: questionId },
      include: { answer: true },
    });
  },
};
