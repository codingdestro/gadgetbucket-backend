import { compare, hash } from "bcrypt";

const slatRounds = 10;

export const encPassword = async (password: string) => {
  try {
    const hashedPassword = await hash(password, slatRounds);
    return hashedPassword;
  } catch (error) {
    return null;
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => await compare(password, hashedPassword);
