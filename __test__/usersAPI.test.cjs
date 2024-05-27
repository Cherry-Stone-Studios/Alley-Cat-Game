require("supertest");
const request = require("supertest");
const { server } = require("../server.cjs");
const { createUser } = require("../db/users.cjs");
const { signToken, requireUser } = require("../api/utils.cjs");

const getToken = async ({ id }) => {
  const tokenData = await signToken({
    id: id,
  });
  return tokenData;
};

// test to get all users from DB
// passed: Jest, Postman, GitHub
describe("GET /api/users/", () => {
  it("Return a response it got all users", async () => {
    const response = await request(server).get("/api/users").expect(200);

    expect(response.body).toMatchObject([
      {
        date_of_birth: "2000-01-01T00:00:00.000Z",
        email: "nooshydelightful@charmelions.com",
        id: 11,
        name: "Anusha Delightful",
        password: "charming",
        username: "nooshydelightful",
      },
      {
        date_of_birth: "2000-01-01T00:00:00.000Z",
        email: "nakaylamazing@cherrystonestudios.com",
        id: 12,
        name: "Nakayla Amazing",
        password: "rabbitrabbit",
        username: "nakaylisamazing",
      },
      {
        date_of_birth: "2000-01-01T00:00:00.000Z",
        email: "valentinocoolcat@cherrystonestudios.com",
        id: 13,
        name: "Valentino S. Cool",
        password: "catsaredope",
        username: "valentinocoolcat",
      },
      {
        date_of_birth: "2000-01-01T00:00:00.000Z",
        email: "kimmybones@cherrystonestudios.com",
        id: 14,
        name: "Chris Rocks",
        password: "kimmybones",
        username: "kimmybones",
      },
      {
        date_of_birth: "2000-01-01T00:00:00.000Z",
        email: "hannah@cherrystonestudios.com",
        id: 15,
        name: "Hannah Wins",
        password: "prismaprincess",
        username: "hannah",
      },
    ]);
  });
});

// test to get specific user by id
// passed: Jest, Postman, GitHub
describe("GET /api/users/:id", () => {
  it("Return a response it got one user at ID", async () => {
    const response = await request(server).get("/api/users/11").expect(200);

    expect(response.body).toMatchObject({
      id: 11,
      name: "Anusha Delightful",
      username: "nooshydelightful",
      email: "nooshydelightful@charmelions.com",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    });
  });
});

// test to get specific user by username
// passed: Jest, Postman, GitHub
describe("GET /api/users/:username", () => {
  it("Return a response it got one user at username", async () => {
    const response = await request(server)
      .get("/api/users/username/nooshydelightful")
      .expect(200);

    expect(response.body).toMatchObject({
      id: 11,
      name: "Anusha Delightful",
      username: "nooshydelightful",
      email: "nooshydelightful@charmelions.com",
      password: "charming",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    });
  });
});

// test the createUser function
// passed: Jest, Postman, GitHub
describe("POST /api/users/register", () => {
  const user = {
    name: "Enyo",
    username: "Enyo",
    email: "Enyo@cherrystonestudios.com",
    password: "Enyo",
    date_of_birth: "2000-01-01",
  };

  test("Create a new user through Register", async () => {
    let token = await signToken({
      id: user.id,
    });
    const response = await request(server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(user)
      .expect(200);

    expect(response.body).toMatchObject({
      name: "Enyo",
      username: "Enyo",
      email: "Enyo@cherrystonestudios.com",
      date_of_birth: "2000-01-01T00:00:00.000Z",
      message: `Thank you for registering, wonderful to meet you ${user.name}.`,
    });
  });
});

// passed: Jest, Postman, GitHub
describe("POST /api/users/login", () => {
  let user = {
    id: 1,
    name: "Anusha Delightful",
    username: "nooshydeli",
    email: "nooshydeli@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  test("Login in a user to their account with a token", async () => {
    let token = await signToken({
      id: user.id,
    });
    return request(server)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send(user)
      .expect(200)
      .then(({ body }) => {
        user = body.data;
        token = token;
        message = `Successfully Logged in!`;
      });
  });
});

// Test that the User must be logged in to their own account to update info
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

// test the user deletes the user function
// passed: Jest, Postman, GitHub
describe("DELETE /api/users/:id", () => {
  test("Delete a user", async () => {
    const superfly = {
      name: "Superfly",
      username: "Superfly",
      email: "Superfly@Superfly.com",
      password: "Superfly",
      date_of_birth: "2000-01-01",
    };

    const createdUser = await createUser(superfly);

    const token = await getToken({
      id: createdUser.id,
    });

    const response = await request(server)
      .delete(`/api/users/${createdUser.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toMatchObject({
      message:
        "You have successfully deleted your account. An alley can be a dangerous place for a stay, stay safe!",
    });
  });
});
