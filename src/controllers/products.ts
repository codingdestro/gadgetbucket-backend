import { Request, Response } from "express";
import { products } from "../schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const fetchAllProducts = async (req: Request, res: Response) => {
  const productList = await db?.query.products.findMany();
  if (!productList) {
    res.json({
      msg: "there no products!",
    });
    return;
  }
  res.json({
    msg: "fetched all products",
    productList,
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

  const productItem = await db?.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!productItem) {
    res.json({
      msg: "no product found!",
    });
    return;
  }

  res.json({
    msg: "fetched a product",
    productItem,
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
  // const products = await Products.findAll({
  //   offset: Number(offset),
  //   limit: Number(limit),
  // });
  res.json({
    msg: "fetched products",
    // products,
  });
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { img, title, price, category, subCategory } = req.body;
    const pd = {
      img,
      title,
      price: parseFloat(price.slice(1).split(",").join("")),
      textPrice: price,
      category,
      subCategory,
    };

    await db?.insert(products).values(pd);
    // await Products.create(pd);
    res.json({ msg: "product added" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "failed to add product" });
  }
};
