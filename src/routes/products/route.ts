import { Request, Response } from "express";
import {
  productType,
  createProduct,
  deleteProduct,
  getAProduct,
  getAllProducts,
  getProductsWithOffset,
} from "../../controllers/products";
import { addImage, deleteAllProductImages } from "../../controllers/images";
import { ProgramUpdateLevel } from "typescript";

interface ProductWithImages extends productType {
  urls: string[];
}

const route = {
  async addProduct(req: Request, res: Response) {
    try {
      const product: ProductWithImages = req.body;
      if (!product) {
        res.json({ err: "product not found!" });
        return;
      }
      //creating new Product
      const result = (await createProduct(product))?.toJSON();
      //adding images according to product id
      if (result.id && product.urls) {
        await addImage(result.id, product.urls);
      }

      res.json({
        msg: "your product added",
      });
    } catch (error) {
      throw error;
    }
  },
  async deleteProduct(req: Request, res: Response) {
    try {
      const productId: number = req.body.productId;
      if (!productId) {
        res.json({ err: "product id not found!" });
        return;
      }
      const result = await deleteProduct(productId);
      await deleteAllProductImages(productId);
      res.json({
        msg: "product has been deleted!",
      });
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  },
};

export default route;
