import process from "node:process";
const config = {
  db_url: process.env.DB_URL,
  db_authtoken: process.env.DB_AUTH_TOKEN,
  server_host: process.env.SERVER_HOST,
  server_port: process.env.SERVER_PORT,
  migrate: process.env.MIRGRATE || true,
  get(key) {
    let val = this[key];
    if (val) return val;
    else {
      console.log(key, val);
      throw "undefined value of key pair in .env";
    }
  },
};

export default config;
