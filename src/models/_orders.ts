import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["ordered", "pending", "cancled", "delivered"],
      defaultValue: "pending",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Orders",
  },
);

export default Orders;
