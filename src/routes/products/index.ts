import { Router } from "express";
import * as productRoutes from "../../controllers/products.ts";

const productRouter = Router();
productRouter.post("/get", productRoutes.fetchAllProducts);
productRouter.post("/get/product", productRoutes.fetchProduct);
productRouter.post("/get/products", productRoutes.fetchProductWithOffset);
productRouter.post("/add", productRoutes.addProduct);

export default productRouter;
