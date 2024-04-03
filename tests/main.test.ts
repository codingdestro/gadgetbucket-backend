import { describe, test, expect } from "bun:test";
import request from "supertest";
import { app } from "../src/main";

const user = {
  name: "mohdanas",
  email: "anas@gmail.com",
  password: "secretpwd",
};
let userToken = "";
//
// describe("start the server and sync the database", () => {
//   test("sync the database GET /", async () => {
//     const res = await request(app).get("/sync").expect(200);
//     expect(res.body).toEqual({ msg: "sync the database" });
//   });
// });
//
describe("handling the users", () => {
  const agent = request.agent(app);
  test("singin with validated request body", async () => {
    const res = await agent
      .post("/account/signin")
      .send({ ...user })
      .expect(200);
    expect(res.body).toContainKey("msg");
  });

  test("login in with correct email and password", async () => {
    const res = await agent
      .post("/account/login")
      .send({ email: user.email, password: user.password })
      .expect(200);

    expect(res.body).toContainKey("msg");
    expect(res.body.msg).toEqual("logged in");
    userToken = res.body.token;
  });

  test("authenticate user token", async () => {
    const res = await agent
      .post("/account/authenticate")
      .send({ token: userToken })
      .expect(200);
  });
});

describe("handling products", () => {
  const agent = request.agent(app);
  test("fetching all products", async () => {
    const res = await agent.get("/products/get").expect(200);
    expect(res.body).toContainKey("msg");
    expect(res.body).toContainKey("products");
    expect(res.body.products).toBeArray();
  });

  test("fetching products with offset 1 and limit 10", async () => {
    const { body } = await agent
      .get("/products/get/products?offset=1&limit=10")
      .expect(200);
    expect(body).toContainKey("msg");
    expect(body).toContainKey("products");
    expect(body.products).toBeArray();
    expect(body.products).toBeArrayOfSize(10);
  });
});
