import { Router } from "express";
import * as cartsRoute from "../../controllers/carts";
import { getUserInfoFromToken } from "../../middleware/getUserInfo";

const route = Router();

route.post("/add", getUserInfoFromToken, cartsRoute.addProductToCart);
route.post("/get", getUserInfoFromToken, cartsRoute.fetchUserCart);
route.post("/checkout", getUserInfoFromToken, cartsRoute.makeOrderFromCart);
route.delete("/remove", cartsRoute.removeProductFromCart);

export default route;
