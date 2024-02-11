import { Router } from "express";
import * as productRoutes from "../../controllers/products.ts";

const productRouter = Router();
productRouter.post("/add", productRoutes.addProduct);
productRouter.get("/get", productRoutes.fetchAllProducts);
productRouter.get("/get/product", productRoutes.fetchProduct);
productRouter.get("/get/products", productRoutes.fetchProductWithOffset);
productRouter.delete("/delete/product", productRoutes.deleteProduct);

export default productRouter;
