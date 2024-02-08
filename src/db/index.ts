import { createConnection } from "mysql";

const conn = createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "e_com",
});

export function init() {
  conn.connect((err) => {
    if (err) throw err;
    console.log("connected to mysql database");
  });
  return conn;
}
