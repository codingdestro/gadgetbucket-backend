import Orders from "../models/_orders";
import { Op } from "sequelize";
import { Request, Response } from "express";
import { addToCartHandler, makeOrderHandler } from "./carts";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "../service/token";

// const makeOrder = async (userId: string, productId: string) => {
export const makeOrder = async (req: Request, res: Response) => {
  try {
    const userId = verifyToken(req.body.token);
    const cartToken = uuidv4();
    await addToCartHandler({ ...req.body, cartToken, userId });
    await makeOrderHandler({ ...req.body, cartToken, userId });
    res.json({
      msg: "order completed",
    });
  } catch (error) {
    res.json({ err: "failed to make an order" });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.body.orderId;
    await Orders.update({ status: "canceled" }, { where: { id: orderId } });
    res.json({
      msg: "order cancelled",
    });
  } catch (error) {
    res.json({ err: "failed to cancel the order" });
  }
};

export const fetchOrders = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const userId = verifyToken(token);
    const orders = await Orders.findAll({
      where: {
        userId: userId,
        status: {
          [Op.not]: "delivered",
        },
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
