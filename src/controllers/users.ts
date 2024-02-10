import Users from "../models/_users";
type userType = {
  id?: number;
  name: string;
  contact: string;
  address: string;
  balance: number;
};

const createUser = async (user: userType): Promise<Users> => {
  try {
    const newUser = await Users.create(user);

    return newUser;
  } catch (error) {
    throw new Error("failed to create or find user!");
  }
};

const getUser = async (contact: string) => {
  try {
    const user = await Users.findOne({
      where: {
        contact: contact,
      },
    });

    return user;
  } catch (error) {
    throw new Error(`failed to get user!`);
    return null;
  }
};

const deleteUser = async (userId: number) => {
  try {
    const res = await Users.destroy({ where: { id: userId } });
    return res;
  } catch (error) {
    return error;
  }
};

export { createUser, getUser, deleteUser, userType };
