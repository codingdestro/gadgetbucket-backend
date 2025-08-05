import { Router } from "express";
import OrderController from "../../controllers/orders";
import { authMiddleware } from "../../middleware/authMiddleware";

const route = Router();

route
  .get("/", authMiddleware, OrderController.fetchOrders)
  .post("/checkout", authMiddleware, OrderController.checkoutCart)
  .post("/make", authMiddleware, OrderController.makeOrder);

export default route;
