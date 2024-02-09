import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";

class Products extends Model {}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    sub_category: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { sequelize, modelName: "Products" },
);

export default Products;
