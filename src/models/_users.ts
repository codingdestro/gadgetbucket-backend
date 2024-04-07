import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

class Users extends Model {}
Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    cartToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "users", timestamps: false },
);

export default Users;
