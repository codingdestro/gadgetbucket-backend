import { Router } from "express";
import Carts from "../../models/_carts";
import Products from "../../models/_products";

const route = Router();

route.post("/cart/id", async (req, res) => {
  try {
    const cart = (
      await Carts.findOne({
        where: {
          id: req.body.id,
        },
      })
    )?.toJSON();
    if (!cart) {
      res.json({ msg: "no cart found!" });
    }
    res.json({ msg: "cart found", cart });
  } catch (error) {
    res.json({ err: "failed to validate the cart id" });
  }
});
route.post("/product/id", async (req, res) => {
  try {
    const product = (
      await Products.findOne({
        where: {
          id: req.body.id,
        },
      })
    )?.toJSON();
    if (!product) {
      res.json({ msg: "no product found!" });
    }
    res.json({ msg: "product found", product });
  } catch (error) {
    res.json({ err: "failed to validate the product id" });
  }
});
export default route;
