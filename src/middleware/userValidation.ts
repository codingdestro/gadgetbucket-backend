import { NextFunction, Request, Response } from "express";
import validate from "../service/validateUser";
import { userType } from "../controllers/users";

const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.body;
  if (validateUser(user)) {
    next();
  } else {
    res.json({ err: "invalid user credential" });
  }
};

const validateUser = ({ name, contact, password }: userType): boolean => {
  const { Password, Contact, Name } = validate;
  return Password(password) && Contact(contact) && Name(name);
};

export default userValidation;
