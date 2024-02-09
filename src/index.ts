import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { sequelize } from "./db";
config();

const PORT = Number(process.env.PORT || 5555);

const app = express();
sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("running server on port ", PORT);
});
