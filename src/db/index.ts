import { Sequelize } from "sequelize";
export const sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  username: "baeldung",
  password: "baeldung",
  database: "test",
  dialect: "postgres",
  logging: false,
});
