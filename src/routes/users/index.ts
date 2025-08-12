import { Router } from "express";
import UserController from "../../controllers/users.ts";
import { authMiddleware } from "../../middleware/authMiddleware.ts"

const route = Router();

route
  .post("/login", UserController.login)
  .post("/register", UserController.register)
  .get("/logout", UserController.logout)
  .post("/auth", authMiddleware, UserController.auth);

export default route;
