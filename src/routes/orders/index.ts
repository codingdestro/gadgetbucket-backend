import { Router } from "express";
import {
  fetchOrders,
  updateStatusOfOrder,
  makeOrder,
} from "../../controllers/orders";
import { fetchUserCart } from "../../controllers/carts";
("../../controllers/carts.ts");

const route = Router();

route.post("/make", makeOrder);
route.post("/status", updateStatusOfOrder);
route.post("/get", fetchOrders);
route.post("/fetch", fetchUserCart);

export default route;
