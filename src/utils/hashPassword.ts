import { compare, hash } from "bcrypt";

const saltRounds = 10;

export const encryptPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => await compare(password, hashedPassword);
