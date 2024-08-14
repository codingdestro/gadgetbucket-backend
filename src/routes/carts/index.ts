import { Router } from "express";
import * as cartsRoute from "../../controllers/carts";
import { getUserInfoFromToken } from "../../middleware/getUserInfo";

const route = Router();

route
  .post("/add", getUserInfoFromToken, cartsRoute.addProductToCart)
  .post("/get", getUserInfoFromToken, cartsRoute.fetchUserCart)
  .post("/checkout", getUserInfoFromToken, cartsRoute.makeOrderFromCart)
  .delete("/remove", cartsRoute.removeProductFromCart);

export default route;
