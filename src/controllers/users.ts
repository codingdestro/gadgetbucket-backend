import Users from "../models/_users";
import { isUserExists } from "../service/userExists";
import { createToken, verifyToken } from "../service/token";
import { Request, Response } from "express";
import validate from "../service/validateUser";
import { connect } from "bun";
export type userType = {
  id?: number;
  name: string;
  contact: string;
  password: string;
  address: string;
  balance: number;
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

const signin = async (req: Request, res: Response) => {
  try {
    const user: userType = req.body;

    const newUser = await Users.create(user);

    res.json({
      msg: "new user created",
      token: createToken((newUser?.toJSON()).id),
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
    res.json({ token: result });
  } catch (error) {
    res.json({ err: false });
  }
};
export { getUser, signin, login, authenticate };
