import { Request, Response } from "express";
import { carts, Users, products, orders } from "../../prisma";
import { db } from "../db";
import { eq } from "drizzle-orm";

//add product to cart
export const addToCartHandler = async (cartItem: {
  userId: string;
  productId: string;
  cartToken: string;
}) => {
  const cart = await db?.insert(carts).values({
    ...cartItem,
    pdId: cartItem.productId,
  });
  return cart;
};

export const makeOrderHandler = async (orderItem: {
  cartToken: string;
  payment: string;
  userId: string;
  address: string;
  contact: string;
}) => {
  const order = await db?.insert(orders).values({
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

const getProductsFromCart = async (cartToken: string) => {
  const cart = await db
    ?.select({ id: carts.id, products })
    .from(carts)
    .innerJoin(products, eq(carts.pdId, products.id))
    .where(eq(carts.cartToken, cartToken));

  let payment = 0;
  if (!cart) return { cart: null, payment: null };
  for (let i = 0; i < cart.length; i++) {
    payment += cart[i].products!.price;
  }
  return { cart, payment };
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

    const { cart, payment } = await getProductsFromCart(cartToken)!;

    if (!cart || !payment) {
      res.json({
        msg: "not found cart and product",
      });
      return;
    }

    res.json({
      msg: "successfully fetched cart",
      cart: [...cart],
      payment: payment,
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
    const done = await db?.delete(carts).where(eq(carts.id, cartId));
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
    if (!cartToken || !userId) {
      res.json({ msg: "cartId or userId not found!" });
      return;
    }
    const { payment } = await getProductsFromCart(cartToken);
    const done = await makeOrderHandler({ ...req.body, payment });

    await db
      ?.update(Users)
      .set({
        cartToken: "",
      })
      .where(eq(Users.id, userId));

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
