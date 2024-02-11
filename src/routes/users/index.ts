import { Router, Request, Response } from "express";
import * as userRoutes from "../../controllers/users.ts";

const route = Router();

route.post("/signin", userRoutes.signin);
route.post("/login", userRoutes.login);

export default route;
