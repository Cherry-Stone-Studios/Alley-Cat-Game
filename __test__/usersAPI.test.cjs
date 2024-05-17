const request = require("supertest");
const { server } = require("../server.cjs");
const { response } = require("express");

// describe("GET /api/users/", () => {
//   it("return a response it got all users", async () => {
//     await request(server).get("/api/users").expect(200);
//   });
// });

describe("GET /api/user/:id", () => {
  it("should return a response it got one user", async () => {
    await request(server).get("/api/users/:id").expect(200);
  });
});

// describe("GET /api/users/:id", () => {
//   it("should return one user", async () => {
//     const response = await request(server)
//       .get("/api/users/${user.id}")
//       .expect(200)
//       .expect()
//       .toHaveProperty("id");
//   });
// });

// describe("GET /users/:username", () => {
//   it("respond with json", async () => {
//     const response = await request(server)
//       .get("/api/users/:username")
//       .expect(200);
//   });
// });
