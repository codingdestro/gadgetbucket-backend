import { Router } from "express";
import productsRoute from "./products";
import usersRoute from "./users";
import cartsRoute from "./carts";
import orderRoute from "./orders";
import validateRoute from "./validate";

const route = Router();
route
  .use("/products", productsRoute)
  .use("/account", usersRoute)
  .use("/carts", cartsRoute)
  .use("/orders", orderRoute)
  .use("/validate", validateRoute);

export default route;
