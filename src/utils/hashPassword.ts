import { compare, hash } from "bcrypt";

const slatRounds = 10;

export const encPassword = async (password: string) => {
  try {
    const hashedPassword = await hash(password, slatRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => {
  try {
    const result = await compare(password, hashedPassword);
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};
