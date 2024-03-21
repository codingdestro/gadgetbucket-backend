import jwt from "jsonwebtoken";
const secret = process.env.SECRET || "secret";
const createToken = (userId: string) => {
  const token = jwt.sign({ user_id: userId }, secret);
  return token;
};

const verifyToken = (token: string) => {
  const data = jwt.verify(token, secret);
  return data;
};

export { createToken, verifyToken };
