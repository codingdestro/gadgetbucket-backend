import { Request, Response } from "express";
import Products from "../models/_products";
import { addImage, deleteAllProductImages } from "./images";
import { ProgramUpdateLevel } from "typescript";
interface productType {
  name: string;
  price: number;
  quantity: number;
  category: string;
  sub_category: string;
}
interface ProductWithImages extends productType {
  urls: string;
}

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product: ProductWithImages = req.body;
    if (!product) {
      res.json({ err: "product not found!" });
      return;
    }
    //creating new Product
    const addedProduct = (
      await Products.create({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        sub_category: product.sub_category,
      })
    ).toJSON();

    //adding images according to product id
    if (addedProduct.id && addedProduct.urls) {
      await addImage(addedProduct.id, product.urls);
    }

    res.json({
      msg: "your product added",
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId: number = req.body.productId;
    if (!productId) {
      res.json({ err: "product id not found!" });
      return;
    }
    const result = await Products.destroy({
      where: {
        id: productId,
      },
    });

    await deleteAllProductImages(productId);
    res.json({
      msg: "product has been deleted!",
    });
  } catch (error) {
    throw error;
  }
};

export const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.findAll();
    res.json({
      msg: "fetched all products",
      products,
    });
  } catch (error) {
    throw error;
  }
};

export const fetchProduct = async (req: Request, res: Response) => {
  try {
    const productId: string = req.query?.productId?.toString() || "";
    if (!productId) {
      res.json({
        msg: "productId not found!",
      });
      return;
    }
    const product = await Products.findOne({
      where: {
        id: productId,
      },
    });
    res.json({
      msg: "fetched a product",
      product,
    });
  } catch (error) {
    throw error;
  }
};

export const fetchProductWithOffset = async (req: Request, res: Response) => {
  try {
    const { offset, limit } = req.query;
    if (!offset || !limit) {
      res.json({
        msg: "offset or limit not found!",
      });
      return;
    }
    const products = await Products.findAll({
      offset: Number(offset),
      limit: Number(limit),
    });
    res.json({
      msg: "fetched products",
      products,
    });
  } catch (error) {
    throw error;
  }
};
