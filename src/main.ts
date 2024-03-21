import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
// import { sequelize } from "./db";
import cors from "cors";
config();
import route from "./routes";

const PORT = Number(process.env.PORT || 5555);
// sequelize.sync({ force: true });

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route);

app.listen(PORT, () => {
  console.log("running server on port ", PORT);
});
