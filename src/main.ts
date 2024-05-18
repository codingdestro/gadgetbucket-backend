import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { initDB } from "./db";
import cors from "cors";
import conf from "./__config__";
config();
import route from "./routes";

const PORT = conf.get("server_port");
const HOST = conf.get("server_host") || "localhost";

console.log("trying to connect with database ...");
setTimeout(async () => {
  await initDB();
}, 5000);

export const app = express();
app.use(
  cors({
    origin: "*",
  }),
);

const shutdown = () => {
  server.close(() => console.log('closing the server first'))
  console.log("system is shuting down! ...")
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
process.on('SIGQUIT', shutdown)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route);
app.get('/test', (_, res) => {
  res.json({ "msg": "test complete" })

})

var server = app.listen(PORT, HOST, () => {
  console.log(`\033[0;32m running server on \033[0;35m${HOST}:${PORT} \033[0m`);
});
