import { getUser } from "../controllers/users";
import Users from "../models/_users";

export const isUserExists = async (contact: string): Promise<Users | null> => {
  const user = await getUser(contact);
  return user ? user : null;
};
