import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const PORT = 5555;

const app = express();

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
