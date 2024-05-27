const request = require("supertest");
const { server } = require("../server.cjs");
const { signToken, requireUser, requireAdmin } = require("../api/utils.cjs");

// Test that a user must be an admin in order to update a user
// passed: Jest, Postman, GitHub
describe("PUT /api/users/11", () => {
  test("Try to update info of a user", async () => {
    const user = {
      id: 11,
      name: "Anusha Delightful",
      username: "nooshydeli",
      email: "nooshydeli@charmelions.com",
      password: "charming",
      date_of_birth: "2000-01-01",
    };

    const logininfo = {
      username: "nooshydelightful",
      email: "nooshydelightful@charmelions.com",
    };

    const token = await getToken({
      id: user.id,
    });

    return request(server)
      .put("/api/users/10")
      .set("Authorization", `Bearer ${token}`)
      .send(logininfo)
      .expect(401)
      .then(({ body }) => {
        info = body.data;
        message = `unathorized`;
      });
  });
});

// Test for a user attempting to update their own information
// passed: Jest, Postman, GitHub
describe("PUT /api/users/11", () => {
  test("Update a users own info", async () => {
    const user = {
      id: 11,
      name: "Anusha Delightful",
      username: "nooshyisamazing",
      email: "nooshydeli@charmelions.com",
      password: "spectacular",
    };

    const token = await getToken({
      id: user.id,
    });

    const response = await request(server)
      .put(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(user)
      .expect(200);

    expect(response.body).toMatchObject({
      id: 11,
      name: "Anusha Delightful",
      username: "nooshyisamazing",
      email: "nooshydeli@charmelions.com",
      message: "User updated successfully!",
    });
  });
});
