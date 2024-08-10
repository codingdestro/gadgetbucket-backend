import { eq } from "drizzle-orm";
import { Users } from "../schema";
import { db } from "../db";
import { createToken, verifyToken } from "../service/token";
import { Request, Response } from "express";
import { UserType } from "../utils/types";
import { encPassword, validatePassword } from "../utils/hashPassword";

const getUser = async (email: string) => {
  if (!email) return null;
  const user = await db?.query.Users.findFirst({
    where: eq(Users.email, email),
  });
  return user;
};

export const deleteUser = async (userId: string) => {
  const result = await db?.query.Users.findFirst({
    where: eq(Users.id, userId),
  });
  return result;
};

const signin = async (req: Request, res: Response) => {
  try {
    const user: UserType = req.body;

    const userHashedPassword = await encPassword(user.password);
    if (!userHashedPassword || !user) {
      res.json({
        msg: "null values of user!",
      });
      return;
    }

    const newUser = await db
      ?.insert(Users)
      .values({
        name: user.name,
        email: user.email,
        password: userHashedPassword,
      })
      .returning({ insertedId: Users.id });

    if (!newUser) {
      res.json({
        msg: "failed to insert the user!",
      });
      return;
    }

    res.json({
      msg: "new user created",
      token: createToken(newUser[0].insertedId),
    });
  } catch (error) {
    res.json({
      msg: "user could't create or found",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({
        err: "username or password not found!",
      });
      return;
    }

    const user = await getUser(email);

    if (user === null || user === undefined) {
      res.json({
        err: "user does not exits create an account first!",
      });
      return;
    }

    //verify the user password

    if (!(await validatePassword(password, user.password))) {
      res.json({
        err: "invalid password",
      });
    }
    res.json({
      msg: "logged in",
      token: createToken(user.id),
    });
  } catch (error) {
    res.json({
      err: "failed to login user",
    });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const userId = verifyToken(token);
    // const user = await Users.findByPk(userId);
    const user = await db?.query.Users.findFirst({
      where: eq(Users.id, userId),
    });
    if (!user) {
      res.json({ err: false });
      return;
    }
    res.json(user.id === userId ? { token: token } : { err: false });
  } catch (error) {
    res.json({ err: false });
  }
};
export { getUser, signin, login, authenticate };
