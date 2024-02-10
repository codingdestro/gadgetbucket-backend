import { Router } from "express";
import productsRoute from "./products";
const route = Router();

route.use("/products", productsRoute);

export default route;
