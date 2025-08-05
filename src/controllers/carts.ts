import { Request, Response } from "express";
import { v4 as uuiv4 } from "uuid";
import Database from "../db";

const prisma = Database.getInstance().prisma;

class CartController {
  static async fetchCart(req: Request, res: Response) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: res.locals["userId"] },
      });

      if (!user) {
        res.status(404).json({ message: "user not found!" });
        return;
      }
      if (!user.cartSessionId) {
        res.status(404).json({ message: "cart not found!" });
        return;
      }

      const carts = await prisma.shoppingCart.findMany({
        where: {
          sessionId: user.cartSessionId,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });
      res.status(200).json({
        message: "fetched all cart items",
        cart: carts,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async removeCart(req: Request, res: Response) {
    try {
      const { cartId } = req.body;
      if (!cartId) {
        res.status(403).json({ message: "parameter error" });
        return;
      }

      await prisma.cartItem.delete({
        where: { id: cartId },
      });

      res.status(200).json({ message: "cart item removed successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async addToCartProduct(req: Request, res: Response) {
    try {
      const { cartToken, productId, quantity } = req.body;
      if (!cartToken || !productId || !quantity) {
        res.status(403).json({ message: "paramerter error" });
        return;
      }

      const product = await prisma.product.findFirst({
        where: { id: productId },
      });
      if (!product) {
        res.status(403).json({ message: "invalid product found!" });
        return;
      }

      const user = await prisma.user.findFirst({
        where: { id: res.locals["userId"] },
      });
      if (!user) {
        res.status(404).json({ message: "user not found!" });
        return;
      }

      const userId = res.locals["userId"];

      //shopping cart
      if (!user.cartSessionId) {
        const shoppingCart = await prisma.shoppingCart.create({
          data: { userId, sessionId: uuiv4() },
        });
        if (!shoppingCart) {
          res.status(404).json({ message: "shopping cart not found!" });
          return;
        }
        await prisma.user.update({
          where: { id: userId },
          data: { cartSessionId: shoppingCart.sessionId },
        });
      }
      //create a new cart item
      const cart = await prisma.cartItem.create({
        data: {
          productId,
          priceAtTime: product.price,
          quantity,
          cartId: user.cartSessionId!,
        },
      });

      res.status(201).json({
        message: "added to cart",
        cart,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default CartController;
