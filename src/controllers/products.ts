import { Request, Response } from "express";
import Database from "../db";
const prisma = Database.getInstance().prisma;

class ProductsController {
  static async fetchProducts(req: Request, res: Response) {
    try {
      const { page = 1, limit = 1 } = req.query;
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const products = await prisma.product.findMany({
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        where: { isDeleted: false },
        orderBy: {
          dateCreated: "desc",
        },
        select: {
          id: true,
          name: true,
          description: true,
          offerPrice: true,
          price: true,
          image: true,
          stockQuantity: true,
        },
      });

      res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async fetchProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          message: "Product ID is required",
        });
      }

      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product fetched successfully",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export default ProductsController;
