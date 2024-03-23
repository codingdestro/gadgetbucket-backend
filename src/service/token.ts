import jwt from "jsonwebtoken";
const secret = process.env.SECRET || "secret";
const createToken = (userId: string) => {
  const token = jwt.sign({ userId: userId }, secret);
  return token;
};

const verifyToken = (token: string) => {
  const data = jwt.verify(token, secret);
  return typeof data == "object" && data?.userId;
};

export { createToken, verifyToken };
