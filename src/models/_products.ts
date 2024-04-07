import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

class Products extends Model {}

Products.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    textPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { sequelize, modelName: "products", timestamps: false },
);

export default Products;
