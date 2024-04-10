import fs from "node:fs";
// import { sequelize } from "../src/db";
import axios from "axios";
// import Products from "../src/models/_products";

const readCsvData = async (
  path: string,
  category: string,
  subCategory: string,
) => {
  fs.readFile(path, (_, data: Buffer) => {
    data
      .toString()
      .split("\n")
      .map(async (ele: string) => {
        const product = ele.split("!");
        const res = await axios.post("http://localhost:5555/products/add", {
          img: product[0],
          title: product[1],
          price: product[2],
          textPrice: product[2],
          category,
          subCategory,
        });
        console.log(res.status, res.data);
      });
  });
};

readCsvData(process.argv[2], process.argv[3], process.argv[4]);
