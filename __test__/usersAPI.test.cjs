const request = require("supertest");
const { server } = require("../server.cjs");

describe("GET /api/users/", () => {
  it("respond with json", async () => {
    const response = await request(server).get("/api/users/").expect(200);
  });
});

describe("GET /api/user/:id", () => {
  it("should return one user", async () => {
    const res = await request(server).get(`/users/:id`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });
});

// describe("GET /users/:username", () => {
//   it("respond with json", async () => {
//     const response = await request(server)
//       .get("/api/users/:username")
//       .expect(200);
//   });
// });
