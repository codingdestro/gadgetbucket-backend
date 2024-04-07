import { Router } from "express";
import {
  fetchOrders,
  updateStatusOfOrder,
  makeOrder,
} from "../../controllers/orders";

const route = Router();

route.post("/make", makeOrder);
route.post("/status", updateStatusOfOrder);
route.post("/get", fetchOrders);

export default route;
