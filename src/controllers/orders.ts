import Orders from "../models/_orders";

const makeOrder = async (userId: string, productId: string) => {
  try {
    const order = await Orders.create({
      user_id: userId,
      product_id: productId,
    });
    console.log(order);
    console.log(order.toJSON());
    return order;
  } catch (error) {
    throw error;
  }
};

const makeOrdersFromCarts = async (userId: string) => {
  try {
  } catch (error) {
    throw error;
  }
};

const cancelOrder = async (orderId: string) => {
  try {
    const res = await Orders.update(
      { status: "canceled" },
      { where: { id: orderId } },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export { makeOrder, makeOrdersFromCarts, cancelOrder };
