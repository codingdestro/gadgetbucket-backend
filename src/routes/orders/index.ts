import { Router } from "express";
import { fetchOrders, makeOrder } from "../../controllers/orders";

const route = Router();

route.post("/make", makeOrder);
route.post("/get", fetchOrders);

export default route;
