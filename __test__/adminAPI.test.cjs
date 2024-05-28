const request = require("supertest");
const { server } = require("../server.cjs");
const { signToken } = require("../api/utils.cjs");
const { createScore } = require("../db/scores.cjs");

const getToken = async ({ id }) => {
  const tokenData = await signToken({
    id: id,
  });
  return tokenData;
};

// passed: Jest,
describe("PUT /api/admin/users/:id", () => {
  test("Try to update admin info of a user as a user", async () => {
    // this is the ID of the user attempting to login
    const token = await getToken({
      id: 6,
    });

    const response = await request(server)
      .put("/api/admin/users/11")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    expect(response.body).toMatchObject({
      message: `This alley is just for dogs! You do not have permission to access this area.`,
    });
  });
});

// passed: Jest,
describe("PUT /api/admin/users/:id", () => {
  test("Update a users info as an admin", async () => {
    // send a token for user 15, admin Hannah
    const token = await getToken({
      id: 15,
    });

    const update = {
      id: 11,
      name: "Anusha Delightful",
      username: "nooshyisamazing",
      email: "nooshydeli@charmelions.com",
      password: "spectacular",
      date_of_birth: "2000-01-01",
      is_admin: true,
      nyan_unlocked: false,
    };

    const response = await request(server)
      .put(`/api/admin/users/11`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(update)
      .expect(200);

    expect(response.body).toMatchObject({
      id: 11,
      name: "Anusha Delightful",
      username: "nooshyisamazing",
      email: "nooshydeli@charmelions.com",
      date_of_birth: "2000-01-01T00:00:00.000Z",
      is_admin: true,
      nyan_unlocked: false,
      message: "User updated successfully!",
    });
  });
});

// passed: Jest,
describe("PUT /api/admin/scores/:id", () => {
  test("Try to update admin info of a score as a user", async () => {
    // this is the ID of the user attempting to login
    const token = await getToken({
      id: 6,
    });

    const response = await request(server)
      .put("/api/admin/scores/11")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    expect(response.body).toMatchObject({
      message: `This alley is just for dogs! You do not have permission to access this area.`,
    });
  });
});

// passed: Jest,
describe("PUT /api/admin/scores/:id", () => {
  test("Update a score as an admin", async () => {
    // create a score to update
    const ogScore = {
      value: 10000,
      created_on: "2000-01-01T00:00:00.000Z",
      username: "kimmybones",
      guestname: "",
    };

    const newScore = await createScore(ogScore);

    // send a token for user 15, admin Hannah
    const token = await getToken({
      id: 15,
    });

    const updatedScore = {
      id: newScore.id,
      value: 1000000,
      created_on: "2000-01-10T00:00:00.000Z",
      username: "hannah",
      guestname: "",
    };

    const response = await request(server)
      .put(`/api/admin/scores/${newScore.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(updatedScore)
      .expect(200);

    expect(response.body).toMatchObject({
      value: 1000000,
      created_on: "2000-01-10T00:00:00.000Z",
      name: "hannah",
      guestname: null,
      message: `Score updated successfully!`,
    });
  });
});

// passed: Jest,
describe("DELETE /api/admin/users/:id", () => {
  test("Try to delete a user at the admin level as a user", async () => {
    // this is the ID of the user attempting to login
    const token = await getToken({
      id: 6,
    });

    const response = await request(server)
      .delete("/api/admin/users/11")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    expect(response.body).toMatchObject({
      message: `This alley is just for dogs! You do not have permission to access this area.`,
    });
  });
});

// passed: Jest,
describe("DELETE /api/admin/users/:id", () => {
  test("Delete a user as an admin", async () => {
    // send a token for user 15, admin Hannah
    const token = await getToken({
      id: 15,
    });

    const response = await request(server)
      .delete(`/api/admin/users/11`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toMatchObject({
      message: "You have successfully deleted the user's account.",
    });
  });
});

// passed: Jest,
describe("DELETE /api/admin/scores/:id", () => {
  test("Try to delete a score at the admin level as a user", async () => {
    // this is the ID of the user attempting to login
    const token = await getToken({
      id: 6,
    });

    const response = await request(server)
      .put("/api/admin/scores/11")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    expect(response.body).toMatchObject({
      message: `This alley is just for dogs! You do not have permission to access this area.`,
    });
  });
});

// passed: Jest,
describe("DELETE /api/admin/users/:id", () => {
  test("Delete a score as an admin", async () => {
    // send a token for user 15, admin Hannah
    const token = await getToken({
      id: 15,
    });

    const response = await request(server)
      .delete(`/api/admin/scores/11`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toMatchObject({
      message: "The score has been deleted from the database.",
    });
  });
});
