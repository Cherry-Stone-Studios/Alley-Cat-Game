const request = require("supertest");
const { server } = require("../server.cjs");

describe("GET /api/users/", () => {
  it("respond with json", async () => {
    const response = await request(server).get("/api/users/").expect(200);
  });
});

describe("GET /api/user/:id", () => {
  it("should return one user", async () => {
    const response1 = await request(server).get("/api/users/:id").expect(200);
    const response2 = await request(server)
      .get("/api/users/:id")
      .expect(res.body)
      .toHaveProperty("id");
  });
});

// describe("GET /users/:username", () => {
//   it("respond with json", async () => {
//     const response = await request(server)
//       .get("/api/users/:username")
//       .expect(200);
//   });
// });
