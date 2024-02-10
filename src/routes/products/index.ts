import { ProgramUpdateLevel } from "typescript";
import route from "./products.ts";
import { Router } from "express";

const productRouter = Router();
productRouter.post("/add", route.addProduct);

export default productRouter;
