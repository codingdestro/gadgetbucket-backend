import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { sequelize } from "./db";
import cors from "cors";
config();
import route from "./routes";

const PORT = Number(process.env.PORT || 5555);
const HOST = process.env.HOST || "localhost";
//checking the mysql connection
sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
    console.error("failed to connect database!");
  });

export const app = express();
app.use(
  cors({
    origin: "*",
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route);
app.listen(PORT, HOST, () => {
  console.log(`running server on ${HOST}:${PORT}`);
});
