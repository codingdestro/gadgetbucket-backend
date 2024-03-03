import { userType } from "../controllers/users";
import { createToken } from "../service/token";
import Users from "../models/_users";
import { Request, Response, NextFunction } from "express";

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

const userAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUser(req.body.contact);
    if (!user) {
      next();
    } else {
      const token = createToken((user?.toJSON()).id);
      res.json({
        msg: "user has already an account",
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "" });
  }
};

export default userAlreadyExists;
