import { compare } from 'bcryptjs';

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword);
};
