import { describe, test, expect } from "bun:test";
import request from "supertest";
import { app } from "../src/main";

let token = "";
const user = {
  email: "anas@gmail.com",
  password: "secretpwd",
};
describe("handling the user cart", () => {
  let productId = "";
  let cartId = "";
  const agent = request.agent(app);
  test("login the user with test credentials", async () => {
    const res = await agent.post("/account/login").send(user).expect(200);
    expect(res.body).toContainKey("token");
    token = res.body.token;
  });

  test("getting a product", async () => {
    const { body } = await agent
      .get("/products/get/products?offset=1&limit=1")
      .expect(200);
    expect(body).toContainKey("products");
    expect(body.products).toBeArray();
    expect(body.products).toBeArrayOfSize(1);
    productId = body.products[0].id;
  });

  test("adding a products to the cart of the user", async () => {
    const { body } = await agent
      .post("/carts/add")
      .send({ token, productId })
      .expect(200);
    expect(body).toContainKey("msg");
    expect(body.msg).toEqual("successfully added your product to cart");
  });

  test("fetching all user cart products", async () => {
    const { body } = await agent.post("/carts/get").send({ token }).expect(200);
    expect(body).toContainKey("msg");
    expect(body).toContainKey("carts");
    expect(body.carts).toBeArray();
    expect(body.carts).not.toBeArrayOfSize(0);
    cartId = body.carts[0].id;
  });

  test("removing a product from the user cart", async () => {
    const { body } = await agent
      .delete("/carts/remove")
      .send({ token, cartId })
      .expect(200);
    expect(body).toContainKey("msg");
    expect(body.msg).toEqual("successfully removed item from your cart");
  });
});
