import { Router } from "express";
import CartController from "../../controllers/carts";
import { authMiddleware } from "../../middleware/authMiddleware";

const route = Router();

route
  .get("/", authMiddleware, CartController.fetchCart)
  .post("/add", authMiddleware, CartController.addToCartProduct)
  .delete("/remove", authMiddleware, CartController.removeCart);

export default route;
