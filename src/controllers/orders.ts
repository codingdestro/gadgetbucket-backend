import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Database from "../db";

const prisma = Database.getInstance().prisma;
/**
 * Controller to handle order-related operations.
 */
class OrderController {
  static async fetchOrders(req: Request, res: Response) {
    try {
      const userId = res.locals["userId"];
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          cart: {
            include: {
              cartItems: {
                include: {
                  product: true, // Include product details in cart items
                },
              },
            },
          },
        },
      });

      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: "No orders found" });
      }

      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async checkoutCart(req: Request, res: Response) {
    try {
      const userId = res.locals["userId"];
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          shoppingCarts: {
            include: {
              cartItems: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!user.shoppingCarts || user.shoppingCarts.length === 0) {
        return res.status(400).json({ error: "No items in the cart" });
      }

      //create an order
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          cartId: user.cartSessionId!,
          totalAmount: user.shoppingCarts.reduce(
            (total, cart) =>
              total +
              cart.cartItems.reduce(
                (itemTotal, item) =>
                  itemTotal +
                  parseFloat(item.priceAtTime.toString()) * item.quantity,
                0
              ),
            0
          ),
        },
      });
      await prisma.user.update({
        where: { id: user.id },
        data: {
          cartSessionId: uuidv4(), // add new cart session after checkout
        },
      });

      res.status(201).json({
        message: "Order created successfully",
        order,
        cartId: user.cartSessionId,
        totalAmount: order.totalAmount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async makeOrder(req: Request, res: Response) {
    try {
      const userId = res.locals["userId"];
      const { productId, quantity } = req.body;

      if (!productId || !quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Product ID or quantity is missing" });
      }

      const order = await prisma.$transaction(async (tx) => {
        const product = await tx.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        const cartSessionId = uuidv4(); // Generate a new cart session ID

        //create an cart item

        const cart = await tx.shoppingCart.create({
          data: {
            sessionId: cartSessionId,
            userId: userId,
          },
        });

        if (!cart) {
          return res.status(500).json({ error: "Failed to create cart" });
        }
        await tx.cartItem.create({
          data: {
            productId: product.id,
            quantity, // Default quantity for order
            priceAtTime: product.price, // Store the price at the time of order
            cartId: cart.sessionId, // Associate cart item with the cart
          },
        });

        // Create an order
        const order = await tx.order.create({
          data: {
            userId: userId,
            cartId: cartSessionId,
            totalAmount: product.price.toNumber() * quantity, // Set total amount to product price
          },
        });
        return order;
      });
      res.status(201).json({
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
export default OrderController;
