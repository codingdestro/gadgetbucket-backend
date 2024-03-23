import { sequelize } from "../db";
import { DataTypes, Model } from "sequelize";
import Products from "./_products";

class Carts extends Model {}

Carts.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    cartToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Carts",
    timestamps: false,
  },
);

Carts.belongsTo(Products);

export default Carts;
