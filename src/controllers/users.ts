import Users from "../models/_users";
type userType = {
  id?: number;
  name: string;
  contact: string;
  address: string;
  balance: number;
};

const createUser = async (user: userType) => {
  try {
    const newUser = await Users.create(user);
    return newUser;
  } catch (error) {
    return error;
  }
};

const getUser = async (userId: number) => {
  try {
    const user = await Users.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    return error;
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

export { createUser, getUser, deleteUser };
