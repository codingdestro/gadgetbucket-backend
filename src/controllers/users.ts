import Users from "../models/_users";
type userType = {
  id?: number;
  name: string;
  contact: string;
  password: string;
  address: string;
  balance: number;
};

const createUser = async (user: userType): Promise<Users | null> => {
  try {
    const newUser = await Users.create(user);
    return newUser;
  } catch (error) {
    throw error;
  }
};

const getUser = async (contact: string) => {
  try {
    if (!contact) return null;
    const user = await Users.findOne({
      where: {
        contact: contact,
      },
    });

    return user;
  } catch (error) {
    throw error;
    return null;
  }
};

const deleteUser = async (userId: number) => {
  try {
    const res = await Users.destroy({ where: { id: userId } });
    return res;
  } catch (error) {
    throw error;
  }
};

export { createUser, getUser, deleteUser, userType };
