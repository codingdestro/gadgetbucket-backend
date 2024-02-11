import { Router } from "express";
import cartsRoute from "./route";

const route = Router();

route.post("/add", cartsRoute.addToCart);
route.post("/get", cartsRoute.getCart);
route.delete("/remove", cartsRoute.removeCartItem);

export default route;
