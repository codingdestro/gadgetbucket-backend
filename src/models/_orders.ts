import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["ordered", "pending", "cancelled", "delivered"],
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    payment: {
      type: DataTypes.NUMBER,
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
