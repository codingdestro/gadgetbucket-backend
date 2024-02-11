import { Sequelize } from "sequelize";
import Carts from "../models/_carts";
import Products from "../models/_products";
import { Request, Response } from "express";

const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const result = await Carts.create({
      user_id: userId,
      product_id: productId,
      quantity: quantity,
    });

    res.json({
      msg: "successfully added your product to cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      err: "fail to add product into cart",
    });
  }
};

const fetchUserCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.json({
        err: "empty user id",
      });
      return;
    }

    const carts = await Carts.findAll({
      include: {
        model: Products,
        where: {
          id: Sequelize.col("Carts.product_id"),
        },
      },
      where: {
        user_id: userId,
      },
    });
    res.json({
      msg: "successfully fetched cart",
      carts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      err: "failed to fetch carts",
    });
  }
};

const removeProductFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      res.json({ err: "empty cart id" });
      return;
    }
    const done = await Carts.destroy({ where: { id: cartId } });
    res.json(
      done
        ? { msg: "successfully removed item from your cart" }
        : { msg: "not item to remove" },
    );
  } catch (error) {
    res.json({
      msg: "faild to remove cart item",
    });
  }
};

export { addProductToCart, fetchUserCart, removeProductFromCart };
