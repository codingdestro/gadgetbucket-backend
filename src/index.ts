import express, { Request, Response } from "express";
import { Connection } from "mysql";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();

import { init } from "./db";

const PORT = Number(process.env.PORT || 5555);

const app = express();

export const db: Connection = init();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "this is from ts server",
  });
});

app.listen(PORT, () => {
  console.log("running server on port ", PORT);
});
