import { Sequelize } from "sequelize";
import conf from "../__config__";

export const sequelize = new Sequelize({
  host: conf.get("db_host"),
  port: conf.get("db_port"),
  username: conf.get("db_user"),
  password: conf.get("db_password"),
  database: conf.get("db_database"),
  dialect: "postgres",
  logging: false,
});

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected");
    await sequelize.sync();
  } catch (error) {
    console.error("failed to connect database!");
  }
};
