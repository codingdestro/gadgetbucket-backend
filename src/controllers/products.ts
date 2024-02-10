import Products from "../models/_products.ts";

interface productType {
  name: string;
  price: number;
  quantity: number;
  category: string;
  sub_category: string;
}

const createProduct = async (product: productType) => {
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
    console.log(error);
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

const getAProduct = async (id: string) => {
  try {
    const product = await Products.findOne({
      where: {
        id: id,
      },
    });

    return product;
  } catch (error) {
    console.log(error);
  }
};

const getProductsWithOffset = async (offset: number, limit: number) => {
  try {
    const products = await Products.findAll({
      offset: offset,
      limit: limit,
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async () => {
  try {
    const result = await Products.findAll();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {
  deleteProduct,
  createProduct,
  productType,
  getAllProducts,
  getProductsWithOffset,
  getAProduct,
};
