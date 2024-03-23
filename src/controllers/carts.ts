import { Sequelize } from "sequelize";
import Carts from "../models/_carts";
import Products from "../models/_products";
import { Request, Response } from "express";
import Orders from "../models/_orders";
import Users from "../models/_users";

//add product to cart
const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { cartToken, userId, productId } = req.body;

    await Carts.create({
      userId: userId,
      productId: productId,
      cartToken: cartToken,
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

//fetch all products of user according to current cartToken
const fetchUserCart = async (req: Request, res: Response) => {
  try {
    const { cartToken } = req.body;
    if (!cartToken) {
      res.json({
        err: "empty user id",
      });
      return;
    }

    const carts = await Carts.findAll({
      include: {
        model: Products,
        where: {
          id: Sequelize.col("Carts.productId"),
        },
      },
      where: {
        cartToken: cartToken,
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

//remove a single cart item from cart
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
const makeOrderFromCart = async (req: Request, res: Response) => {
  try {
    const { cartToken, userId, payment, address, contact } = req.body;
    if (!cartToken && !userId) {
      res.json({ msg: "cartId or userId not found!" });
      return;
    }

    const done = await Orders.create({
      cartToken: cartToken,
      payment: payment,
      userId: userId,
      address: address,
      contact: contact,
    });

    await Users.update(
      {
        cartToken: "",
      },
      {
        where: {
          id: userId,
        },
      },
    );

    res.json({ done });
  } catch (error) {
    res
      .json({
        msg: "faild to make order!",
      })
      .sendStatus(404);
  }
};

export {
  addProductToCart,
  fetchUserCart,
  removeProductFromCart,
  makeOrderFromCart,
};
