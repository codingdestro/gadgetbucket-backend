import { Router } from "express";
import * as productRoutes from "../../controllers/products.ts";

const productRouter = Router();
productRouter
  .post("/get", productRoutes.fetchAllProducts)
  .post("/get/product", productRoutes.fetchProduct)
  .post("/get/products", productRoutes.fetchProductWithOffset)
  .post("/add", productRoutes.addProduct);

export default productRouter;
