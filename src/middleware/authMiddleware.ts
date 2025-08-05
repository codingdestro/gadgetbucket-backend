import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../service/token";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = verifyToken(token);
  if (!userId) {
    return res.status(401).json({ error: "Invalid token" });
  }
  res.locals.userId = userId; // Attach userId to response locals for later use
  res.locals.token = token; // Attach token to response locals for later use

  next();
}
