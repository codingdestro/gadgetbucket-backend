import { Sequelize } from "sequelize";
import Carts from "../models/_carts";
import Products from "../models/_products";
import { Request, Response } from "express";
import Orders from "../models/_orders";
import Users from "../models/_users";
import sequelize from "sequelize";

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
const makeOrderFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, userId, quantity } = req.body;
    if (!cartId && !userId) {
      res.json({ msg: "cartId or userId not found!" });
      return;
    }
    const cart = (
      await Carts.findOne({
        attributes: ["Product.price"],
        include: {
          model: Products,
          where: { id: sequelize.col("Carts.product_id") },
        },
        where: {
          id: cartId,
        },
      })
    )?.toJSON();
    console.log(cart);
    const user = (await Users.findOne({ where: { id: userId } }))?.toJSON();
    if (!cart && !user) {
      console.error("user or cart is empty!");
      res.sendStatus(404);
      return;
    }
    const done = await Orders.create({
      cartId: cartId,
      price: cart.Product.price,
      quantity: quantity,
      address: user.address,
      contact: user.contact,
    });
    const order = done.toJSON();
    //adding order id to cart
    const result = await Carts.update(
      {
        order_id: order.id,
      },
      {
        where: { id: cartId },
      },
    );
    console.log(result);
    res.json({ done });
  } catch (error) {
    console.log(error);
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
