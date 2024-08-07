import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../service/token";
// import Users from "../models/_users";
import { Users } from "../schema";
import { db } from "../db";
import { v4 as uuid4 } from "uuid";
import { eq } from "drizzle-orm";

const generateCartToken = async (userId: string) => {
  const cartToken = uuid4();
  await db
    ?.update(Users)
    .set({
      cartToken: cartToken,
    })
    .where(eq(Users.id, userId));

  return cartToken;
};

export const getUserInfoFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = verifyToken(req.body.token);
    const user = await db?.query.Users.findFirst({
      where: eq(Users.id, userId),
    });

    if (!user) {
      res.json({
        msg: "user not found",
      });
      return;
    }

    if (user) {
      req.body.userId = user.id;
      req.body.cartToken = user.cartToken || (await generateCartToken(user.id));
      next();
    } else {
      res.json({
        err: "user not found or invalid user id",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      err: "invalid token!",
    });
  }
};
