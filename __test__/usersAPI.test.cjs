const request = require("supertest");
const { server } = require("../server.cjs");
// const { response } = require("express");

describe("GET /api/users/", () => {
  it("return a response it got all users", async () => {
    await request(server).get("/api/users").expect(200);
  });
});

describe("GET /api/user/:id", () => {
  it("should return a response it got one user", async () => {
    await request(server).get("/api/users/36").expect(200);
  });
});
