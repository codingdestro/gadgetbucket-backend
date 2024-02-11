import { Sequelize } from "sequelize";
import Carts from "../models/_carts";
import Products from "../models/_products";

const addProductToCart = async (
  userId: string,
  productId: string,
  quantity: number = 0,
) => {
  try {
    const res = await Carts.create({
      user_id: userId,
      product_id: productId,
      quantity: quantity,
    });
  } catch (error) {
    throw error;
  }
};

const fetchUserCart = async (userId: string) => {
  try {
    const carts = await Carts.findAll({
      include: {
        model: Products,
        where: {
          id: Sequelize.col("Carts.product_id"),
        },
      },
      where: {
        user_id: userId,
      },
    });
    return carts;
  } catch (error) {
    throw error;
  }
};

const removeProductFromCart = async (cartId: string) => {
  try {
    const res = await Carts.destroy({ where: { id: cartId } });
    return res;
  } catch (error) {
    throw error;
  }
};

export { addProductToCart, fetchUserCart, removeProductFromCart };
