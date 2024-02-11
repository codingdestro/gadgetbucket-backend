import { Request, Response } from "express";
import {
  addProductToCart,
  fetchUserCart,
  removeProductFromCart,
} from "../../controllers/carts";

const cartsRoute = {
  async addToCart(req: Request, res: Response) {
    try {
      const { userId, productId } = req.body;
      await addProductToCart(userId, productId);
      res.json({
        msg: "successfully added your product to cart",
      });
    } catch (error) {
      console.log(error);
      res.json({
        err: "fail to add product into cart",
      });
    }
  },
  async getCart(req: Request, res: Response) {
    try {
      const { UserId } = req.body;
      if (!UserId) {
        res.json({
          err: "empty user id",
        });
        return;
      }
      const cart = await fetchUserCart(UserId);
      res.json({
        msg: "successfully fetched cart",
        cart,
      });
    } catch (error) {
      console.log(error);
      res.json({
        err: "failed to fetch carts",
      });
    }
  },
  async removeCartItem(req: Request, res: Response) {
    try {
      const { cartId } = req.body;
      if (!cartId) {
        res.json({ err: "empty cart id" });
        return;
      }
      const done = await removeProductFromCart(cartId);
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
  },
};
export default cartsRoute;
