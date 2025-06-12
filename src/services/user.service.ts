import prisma from '../db/PrismaClient';
export const UserService = {
  async getUserById(id: string) {
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
  },
  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username },
      include: {
        answers: {
          include: {
            question: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },
};
