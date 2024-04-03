import Carts from "../models/_carts";
import { Request, Response } from "express";
import Orders from "../models/_orders";
import Users from "../models/_users";
import { sequelize } from "../db/index.ts";
import sq from "sequelize";

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

    const rewQuery = `select Carts.id,title,price,textPrice,category,subCategory,img  from Carts join 
Products on Products.id = Carts.pdId where Carts.cartToken = '${cartToken}'`;

    const carts = await sequelize.query(rewQuery, {
      type: sq.QueryTypes.SELECT,
    });

    // const carts = await Carts.findAll({
    //   attributes: ["id"],
    //   include: {
    //     model: Products,
    //     required: true,
    //     where: {
    //       id: Sequelize.col("Carts.pdId"),
    //     },
    //   },
    //   where: {
    //     cartToken: cartToken,
    //   },
    // });

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
    const { cartToken, userId } = req.body;
    if (!cartToken && !userId) {
      res.json({ msg: "cartId or userId not found!" });
      return;
    }
    const done = await makeOrderHandler(req.body);

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
