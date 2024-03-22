import { Router } from "express";
import * as userRoutes from "../../controllers/users.ts";
import userAlreadyExists from "../../middleware/userExists.ts";
import userValidation from "../../middleware/userValidation.ts";

const route = Router();

route.post("/signin", userValidation, userAlreadyExists, userRoutes.signin);
route.post("/login", userRoutes.login);
route.post("/authenticate", userRoutes.authenticate);

export default route;
