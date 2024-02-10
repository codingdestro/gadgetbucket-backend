import { ProgramUpdateLevel } from "typescript";
import route from "./products.ts";
import { Router } from "express";

const productRouter = Router();
productRouter.post("/add", route.addProduct);
productRouter.get("/get", route.fetchAllProducts);
productRouter.get("/get/product", route.fetchProduct);
productRouter.get("/get/products", route.fetchProductWithOffset);
productRouter.delete("/delete/product", route.deleteProduct);

export default productRouter;
