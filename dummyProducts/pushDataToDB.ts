import fs from "node:fs";
// import { sequelize } from "../src/db";
import Products from "../src/models/_products";

const readCsvData = (path: string, category: string, subCategory: string) => {
  fs.readFile(path, (_, data: Buffer) => {
    data
      .toString()
      .split("\n")
      .map((ele: string) => {
        const product = ele.split("!");
        if (product.length >= 2) {
          const pd = {
            img: product[0],
            title: product[1],
            price: parseFloat(product[2].slice(1).split(",").join("")),
            textPrice: product[2],
            category,
            subCategory,
          };
          Products.create(pd);
        }
      });
  });
};

readCsvData(process.argv[2], process.argv[3], process.argv[4]);
