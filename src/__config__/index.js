import process from "process";
const config = {
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_database: process.env.DB_DATABASE,
  server_host: process.env.SERVER_HOST,
  server_port: process.env.SERVER_PORT,
  get(key) {
    let val = this[key];
    if (val) return val;
    else throw "undefined value of key pair in .env";
  },
};

export default config;
