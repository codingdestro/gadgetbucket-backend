import { Router } from "express";
import productsRoute from "./products";
import usersRoute from "./users";
const route = Router();

route.use("/products", productsRoute);
route.use("/account", usersRoute);

export default route;
