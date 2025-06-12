import prisma from '../db/PrismaClient';

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      updatedAt: true,
      answers: true,
      questionsReceived: true,
    },
  });
};
