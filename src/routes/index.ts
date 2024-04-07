import { Router } from "express";
import productsRoute from "./products";
import usersRoute from "./users";
import cartsRoute from "./carts";
import orderRoute from "./orders";
import validateRoute from "./validate";
const route = Router();
route.use("/products", productsRoute);
route.use("/account", usersRoute);
route.use("/carts", cartsRoute);
route.use("/orders", orderRoute);
route.use("/validate", validateRoute);

export default route;
