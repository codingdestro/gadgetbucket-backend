import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

class Users extends Model {}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      defaultValue: 1000,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { sequelize, modelName: "Users", timestamps: false },
);

export default Users;
