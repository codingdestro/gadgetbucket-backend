import { Router } from "express";
import * as cartsRoute from "../../controllers/carts";

const route = Router();

route.post("/add", cartsRoute.addProductToCart);
route.post("/get", cartsRoute.fetchUserCart);
route.delete("/remove", cartsRoute.removeProductFromCart);

export default route;
