import { Request, Response } from "express";
import {
  productType,
  createProduct,
  deleteProduct,
  getAProduct,
  getAllProducts,
  getProductsWithOffset,
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
      res.json({
        msg: "your product added",
      });
    } catch {}
  },
  async deleteProduct(req: Request, res: Response) {
    try {
      const productId: number = req.body.productId;
      if (!productId) {
        res.json({ err: "product id not found!" });
        return;
      }
      const result = await deleteProduct(productId);
      res.json({
        msg: "product has been deleted!",
      });
    } catch {
      console.log("error here!");
    }
  },

  async fetchAllProducts(req: Request, res: Response) {
    try {
      const products = await getAllProducts();
      res.json({
        msg: "fetched all products",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async fetchProduct(req: Request, res: Response) {
    try {
      const productId: string = req.query?.productId?.toString() || "";
      if (!productId) {
        res.json({
          msg: "productId not found!",
        });
        return;
      }
      const product = await getAProduct(productId);
      res.json({
        msg: "fetched a product",
        product,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async fetchProductWithOffset(req: Request, res: Response) {
    try {
      const { offset, limit } = req.query;
      if (!offset || !limit) {
        res.json({
          msg: "offset or limit not found!",
        });
        return;
      }
      const products = await getProductsWithOffset(
        Number(offset),
        Number(limit),
      );
      res.json({
        msg: "fetched products",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default route;
