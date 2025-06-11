import bcrypt from 'bcrypt';

const SALT_ROUND = 10;

export const hashPassword = async (plain: string) => {
  return bcrypt.hash(plain, SALT_ROUND);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
