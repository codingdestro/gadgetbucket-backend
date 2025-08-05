import { Router } from "express";
import { carts, products } from "../../../prisma";
import { db } from "../../db";
import { eq } from "drizzle-orm";

const route = Router();

route
  .post("/cart/id", async (req, res) => {
    try {
      const cart = await db?.query.carts.findFirst({
        where: eq(carts.id, req.body.id),
      });

      if (!cart) {
        res.json({ msg: "no cart found!" });
      }

      res.json({ msg: "cart found", cart });
    } catch (error) {
      res.json({ err: "failed to validate the cart id" });
    }
  })

  .post("/product/id", async (req, res) => {
    try {
      const product = await db?.query.products.findFirst({
        where: eq(products.id, req.body.id),
      });

      if (!product) {
        res.json({ msg: "no product found!" });
      }

      res.json({ msg: "product found", product });
    } catch (error) {
      res.json({ err: "failed to validate the product id" });
    }
  });

export default route;
