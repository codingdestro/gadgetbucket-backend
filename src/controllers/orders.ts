import Orders from "../models/_orders";
import { Request, Response } from "express";
import { addToCartHandler, makeOrderHandler } from "./carts";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "../service/token";
import Products from "../models/_products";

// const makeOrder = async (userId: string, productId: string) => {
const getPaymentFromProduct = async (productId: string) => {
  return (await Products.findOne({ where: { id: productId } }))?.toJSON()
    ?.price;
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
    await Orders.update({ status }, { where: { id: orderId } });
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
    const orders = await Orders.findAll({
      where: {
        userId: userId,
      },
    });
    res.json({
      msg: "fetched orders",
      orders,
    });
  } catch (error) {
    res.json({
      err: "failed to fetch orders",
    });
  }
};
