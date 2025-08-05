import { createToken } from "../service/token";
import { Request, Response } from "express";
import { encryptPassword, validatePassword } from "../utils/hashPassword";
import Database from "../db";

const prisma = Database.getInstance().prisma;
class UserController {
  static async register(req: Request, res: Response) {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await encryptPassword(password);
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        passwordHash: hashedPassword,
      },
    });
    if (!newUser) {
      return res.status(500).json({ error: "User registration failed" });
    }

    return res
      .status(201)
      .json({ status: "success", message: "User registered successfully" });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValidPassword = await validatePassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = createToken(user.id);
    return res.status(200).json({ token });
  }

  static async logout(req: Request, res: Response) {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Set cookie expiration to the past
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax", // Prevent CSRF attacks
      })
      .json({
        status: "success",
        message: "User logged out successfully",
      });
  }
}

export default UserController;
