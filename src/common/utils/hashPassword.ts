import { genSalt, hash } from 'bcryptjs';

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return await hash(plainPassword, salt);
};
