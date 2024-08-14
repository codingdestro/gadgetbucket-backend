import { Router } from "express";
import {
  fetchOrders,
  updateStatusOfOrder,
  makeOrder,
} from "../../controllers/orders";
import { fetchUserCart } from "../../controllers/carts";
("../../controllers/carts.ts");

const route = Router();

route
  .post("/make", makeOrder)
  .post("/status", updateStatusOfOrder)
  .post("/get", fetchOrders)
  .post("/fetch", fetchUserCart);

export default route;
