import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import Database from "./db";
import productRouter from "./routes/products";

config();

const PORT = process.env.SERVER_PORT || "3000";
const HOST = process.env.SERVER_HOST || "localhost";

export const app = express();
app
  .use(
    cors({
      origin: "*",
    })
  )
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

  .use("/api/v1/products", productRouter)

  .get("/health", async (req, res) => {
    res.status(200).json({ message: "Server is running" });
  });

const server = app.listen(parseInt(PORT), HOST, () => {
  console.log(`\x1b[0;32m running server on \x1b[0;35m${HOST}:${PORT} \x1b[0m`);
});

const shutdown = () => {
  Database.getInstance().disconnect();
  server.close(() => console.log("closing the server first"));
  console.log("system is shuting down! ...");
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGQUIT", shutdown);
