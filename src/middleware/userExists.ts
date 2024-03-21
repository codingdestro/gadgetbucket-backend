import { createToken } from "../service/token";
import { Request, Response, NextFunction } from "express";
import { getUser } from "../controllers/users";

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
      const token = createToken(user.toJSON().id);
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
