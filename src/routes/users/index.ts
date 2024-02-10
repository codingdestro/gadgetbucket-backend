import { Router, Request, Response } from "express";
import users from "./users";

const route = Router();

route.post("/signin", users.signin);
route.post("/login", users.login);

export default route;
