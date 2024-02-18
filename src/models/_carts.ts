import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";
import Products from "./_products";
import Orders from "./_orders";

class Carts extends Model {}

Carts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "Carts",
    timestamps: false,
  },
);

Carts.belongsTo(Products, { foreignKey: "product_id" });
Carts.belongsTo(Orders, { foreignKey: "order_id" });
export default Carts;
