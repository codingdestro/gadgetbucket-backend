import { db } from "../db";
import { orders, products } from "../schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { addToCartHandler, makeOrderHandler } from "./carts";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "../service/token";

// const makeOrder = async (userId: string, productId: string) => {
const getPaymentFromProduct = async (productId: string) => {
  const product = await db?.query.products.findFirst({
    where: eq(products.id, productId),
  });
  return product?.price;
};
export const makeOrder = async (req: Request, res: Response) => {
  try {
    const userId = verifyToken(req.body.token);
    const cartToken = uuidv4();
    const payment = await getPaymentFromProduct(req.body.productId);
    console.log(payment);
    await addToCartHandler({ ...req.body, cartToken, userId });
    await makeOrderHandler({ ...req.body, cartToken, userId, payment });
    res.json({
      msg: "order completed",
    });
  } catch (error) {
    console.log(error);
    res.json({ err: "failed to make an order" });
  }
};

export const updateStatusOfOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    await db
      ?.update(orders)
      .set({
        status: status,
      })
      .where(eq(orders.id, orderId));

    res.json({
      msg: "status updated",
    });
  } catch (error) {
    res.json({ err: "failed to update status of  the order" });
  }
};

export const fetchOrders = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const userId = verifyToken(token);
    const orderList = await db?.query.orders.findMany({
      where: eq(orders.userId, userId),
    });
    res.json({
      msg: "fetched orders",
      orderList,
    });
  } catch (error) {
    res.json({
      err: "failed to fetch orders",
    });
  }
};
