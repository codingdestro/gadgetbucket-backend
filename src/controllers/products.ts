import { Request, Response } from "express";
import Products from "../models/_products";

export const fetchAllProducts = async (req: Request, res: Response) => {
  const products = await Products.findAll();
  res.json({
    msg: "fetched all products",
    products,
  });
};

export const fetchProduct = async (req: Request, res: Response) => {
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
};

export const fetchProductWithOffset = async (req: Request, res: Response) => {
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
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { img, title, price, category, subCategory } = req.body;
    console.log(req.body);
    const pd = {
      img,
      title,
      price: parseFloat(price.slice(1).split(",").join("")),
      textPrice: price,
      category,
      subCategory,
    };
    await Products.create(pd);
    res.send(200).json({ msg: "product added" });
  } catch (error) {
    console.log(error);
    res.send(300).json({ msg: "failed to add product" });
  }
};
