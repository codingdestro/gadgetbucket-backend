import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { sequelize } from "./db";
config();
import route from "./routes";

const PORT = Number(process.env.PORT || 5555);

const app = express();
sequelize.sync({ force: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route);

app.listen(PORT, () => {
  console.log("running server on port ", PORT);
});
