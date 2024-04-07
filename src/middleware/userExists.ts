import { Request, Response, NextFunction } from "express";
import { getUser } from "../controllers/users";

const userAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUser(req.body.email);
    if (!user) {
      next();
    } else {
      res.json({
        err: "user has already an account",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "" });
  }
};

export default userAlreadyExists;
