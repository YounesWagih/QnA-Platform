import prisma from '../db/PrismaClient';
import { comparePassword, hashPassword } from '../utils/hash';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (email: string, username: string, password: string) => {
  const exist = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (exist) throw new Error('Email or username already token');

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashed,
    },
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new Error('Invalid Email or password');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Invalid Email or password');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  return { token, user };
};
