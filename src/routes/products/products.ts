import { Request, Response } from "express";
import {
  productType,
  createProduct,
  deleteProduct,
} from "../../controllers/products";

const route = {
  async addProduct(req: Request, res: Response) {
    try {
      const product: productType = req.body;
      if (!product) {
        res.json({ err: "product not found!" });
        return;
      }
      const result = await createProduct(product);
      console.log(result?.toJSON());
      res.json({
        msg: "your product added",
      });
    } catch {}
  },
  async deleteProduct(req: Request, res: Response) {
    try {
      const productId: string = req.body.productId;
      if (!productId) {
        res.json({ err: "product id not found!" });
        return;
      }
    } catch {
      console.log("error here!");
    }
  },
};

export default route;
