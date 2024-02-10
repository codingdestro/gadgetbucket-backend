import jwt from "jsonwebtoken";
import { Error } from "sequelize";
const secret = process.env.SECRET || "secret";
const createToken = (userId: object | string) => {
  const token = jwt.sign(userId, secret);
  return token;
};

const verifyToken = (token: string) => {
  const data = jwt.verify(token, secret);
  return data;
};

export { createToken, verifyToken };
