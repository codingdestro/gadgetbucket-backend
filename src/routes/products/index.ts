import { Router } from "express";
import * as productRoutes from "../../controllers/products.ts";

const productRouter = Router();
productRouter.get("/get", productRoutes.fetchAllProducts);
productRouter.get("/get/product", productRoutes.fetchProduct);
productRouter.get("/get/products", productRoutes.fetchProductWithOffset);

export default productRouter;
