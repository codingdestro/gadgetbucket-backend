import { Router } from "express";
import UserController from "../../controllers/users.ts";

const route = Router();

route
  .post("/login", UserController.login)
  .post("/register", UserController.register)
  .get("/logout", UserController.logout);

export default route;
