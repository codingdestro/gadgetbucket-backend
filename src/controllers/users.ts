import Users from "../models/_users";
import { isUserExists } from "../service/userExists";
import { createToken, verifyToken } from "../service/token";
import { Request, Response } from "express";
import { UserType } from "../utils/types";

const getUser = async (email: string) => {
  if (!email) return null;
  const user = await Users.findOne({
    where: {
      email,
    },
  });

  return user;
};

export const deleteUser = async (userId: string) => {
  const res = await Users.destroy({ where: { id: userId } });
  return res;
};

const signin = async (req: Request, res: Response) => {
  try {
    const user: UserType = req.body;

    const newUser = await Users.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    res.json({
      msg: "new user created",
      token: createToken(newUser.toJSON().id),
    });
  } catch (error) {
    res.json({
      msg: "user could't create or found",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { contact, password } = req.body;

    if (!contact || !password) {
      res.json({
        msg: "username or contact or password not found!",
      });
      return;
    }

    const user = await isUserExists(contact);

    if (user === null) {
      res.json({
        msg: "user does not exits create an account first!",
      });
      return;
    }
    res.json({
      msg: "logged in",
      token: createToken(user.toJSON().id),
    });
  } catch (error) {
    console.log("there is an error on login");
    res.json({
      err: "failed to login user",
    });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const result = verifyToken(token);
    console.log(result);
    res.json({ token: token });
  } catch (error) {
    res.json({ err: false });
  }
};
export { getUser, signin, login, authenticate };
