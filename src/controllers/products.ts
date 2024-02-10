import Products from "../models/_products.ts";

interface productType {
  name: string;
  price: number;
  quantity: number;
  category: string;
  sub_category: string;
}

const creatProduct = async (product: productType) => {
  try {
    const result = await Products.create({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      sub_category: product.sub_category,
    });
    return result;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (id: number) => {
  try {
    const result = await Products.destroy({
      where: {
        id: id,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export { deleteProduct, creatProduct };
