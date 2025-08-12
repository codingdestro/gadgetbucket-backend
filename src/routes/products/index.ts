import { Router } from "express";
import ProductsController from "../../controllers/products";

const productRouter = Router();
productRouter
  .get("/:id", ProductsController.fetchProductById)
  .get("/:page/:limit", ProductsController.fetchProducts)
  .get("/", ProductsController.fetchProducts)

export default productRouter;
