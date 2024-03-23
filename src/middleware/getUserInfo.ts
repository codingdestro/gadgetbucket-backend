import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../service/token";
import Users from "../models/_users";
import { v4 as uuid4 } from "uuid";

const generateCartToken = (userId: string) => {
  const cartToken = uuid4();
  Users.update(
    { cartToken: cartToken },
    {
      where: { id: userId },
    },
  );
  return cartToken;
};

export const getUserInfoFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = verifyToken(req.body.token);
    const user = (await Users.findOne({ where: { id: userId } }))?.toJSON();
    if (user) {
      req.body.userId = user.id;
      req.body.cartToken = user.cartToken || generateCartToken(user.id);
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
