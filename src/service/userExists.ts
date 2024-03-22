import { getUser } from "../controllers/users";
import Users from "../models/_users";

export const isUserExists = async (email: string): Promise<Users | null> => {
  const user = await getUser(email);
  return user ? user : null;
};
