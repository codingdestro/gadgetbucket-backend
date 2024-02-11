import Images from "../models/_images";

const addImage = async (productId: number | string, url: string) => {
  try {
    let urls = url.split(",");
    if (Array.isArray(urls)) {
      for (let i = 0; i < urls.length; i++) {
        await Images.create({
          product_id: productId,
          url: urls[i],
        });
      }
      return;
    }
    const result = await Images.create({
      product_id: productId,
      url: url,
    });
  } catch (error) {
    throw error;
  }
};

const deleteImage = async (imgId: number | string) => {
  try {
    const res = await Images.destroy({
      where: {
        id: imgId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteAllProductImages = async (productId: number | string) => {
  try {
    const res = await Images.destroy({
      where: {
        product_id: productId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export { addImage, deleteImage, deleteAllProductImages };
