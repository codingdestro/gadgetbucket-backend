import { Router } from "express";
import productsRoute from "./products";
import usersRoute from "./users";
import cartsRoute from "./carts";
import orderRoute from "./orders";

const route = Router();
route
  .use("/products", productsRoute)
  .use("/auth", usersRoute)
  .use("/carts", cartsRoute)
  .use("/orders", orderRoute);

export default route;
