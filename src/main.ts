import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import conf from "./__config__";
import route from "./routes";

config();

const PORT = conf.get("server_port");
const HOST = conf.get("server_host") || "localhost";

export const app = express();
app.use(
  cors({
    origin: "*",
  }),
);

const shutdown = () => {
  server.close(() => console.log("closing the server first"));
  console.log("system is shuting down! ...");
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGQUIT", shutdown);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route);

const server = app.listen(PORT, HOST, () => {
  console.log(`\x1b[0;32m running server on \x1b[0;35m${HOST}:${PORT} \x1b[0m`);
});
