import { NextFunction, Request, Response } from "express";
import validate from "../service/validateUser";
import { UserType } from "../utils/types";

const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: UserType = req.body;
  console.log(user);
  if (validateUser(user)) {
    next();
  } else {
    res.json({ err: "invalid user credential" });
  }
};

const validateUser = ({ name, email, password }: UserType): boolean => {
  const { Password, Email, Name } = validate;
  return Password(password) && Email(email) && Name(name);
};

export default userValidation;
