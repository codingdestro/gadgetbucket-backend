import pino from "pino";
import fs from "fs";

const logFileStream = fs.createWriteStream("/tmp/server.log", { flags: "a" });

export const logger = pino(logFileStream);
