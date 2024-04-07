import Carts from "../models/_carts";
import { Request, Response } from "express";
import Orders from "../models/_orders";
import Products from "../models/_products.ts";
import Users from "../models/_users.ts";

//add product to cart

export const addToCartHandler = async (cartItem: {
  userId: string;
  productId: string;
  cartToken: string;
}) => {
  const cart = await Carts.create({ ...cartItem, pdId: cartItem.productId });
  return cart;
};

export const makeOrderHandler = async (orderItem: {
  cartToken: string;
  payment: string;
  userId: string;
  address: string;
  contact: string;
}) => {
  const order = await Orders.create({
    ...orderItem,
  });
  return order;
};

const addProductToCart = async (req: Request, res: Response) => {
  try {
    // const { cartToken, userId, productId } = req.body;
    console.log(req.body);

    await addToCartHandler({ ...req.body });

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

const getProductsFromCart = async (cartToken: string) => {
  const carts: Carts[] = await Carts.findAll({
    attributes: ["id"],
    include: {
      model: Products,
      foreignKey: "carts.pdId",
    },
    where: {
      cartToken,
    },
  });
  let payment = 0;
  for (let i = 0; i < carts.length; i++) {
    payment += carts[i].toJSON().product.price;
  }
  return { carts, payment };
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

    const { carts, payment } = await getProductsFromCart(cartToken);

    res.json({
      msg: "successfully fetched cart",
      carts,
      payment,
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
    const { cartToken, userId } = req.body;
    if (!cartToken && !userId) {
      res.json({ msg: "cartId or userId not found!" });
      return;
    }
    const { payment } = await getProductsFromCart(cartToken);
    const done = await makeOrderHandler({ ...req.body, payment });

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

    res.json({ msg: "successfully confirm order", done });
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
