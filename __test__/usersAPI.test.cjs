const request = require("supertest");
const { server } = require("../server.cjs");
const { createUser, getUserById } = require("../db/users.cjs");
const { signToken, requireUser } = require("../api/utils.cjs");
const { response } = require("express");
require("supertest");

const getToken = async ({ id, username }) => {
  const tokenData = await signToken({
    id: id,
    username: username,
  });
  return tokenData;
};

// test to get all users from DB
describe("GET /api/users/", () => {
  it("return a response it got all users", async () => {
    await request(server).get("/api/users").expect(200);
  });
});
// test to get specific user by id
describe("GET /api/user/:id", () => {
  it("should return a response it got one user", async () => {
    await request(server).get("/api/users/36").expect(200);
  });
});
// test to get specific user by username
describe("GET /api/user/:username", () => {
  it("should return a response it got one user", async () => {
    await request(server).get("/api/users/Serendipity").expect(200);
  });
});

//test the createUser function
describe("POST /api/users/register", () => {
  const regUser = {
    id: 10,
    name: "Sandy",
    username: "sandycheeks",
    email: "sandy@sandy.com",
    password: "Sandy",
    date_of_birth: "2000-01-01",
  };

  test("should register a new user", async () => {
    let token = await signToken({
      id: regUser.id,
      username: regUser.username,
    });
    return request(server)
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send(regUser)
      .expect(200)
      .then(({ body }) => {
        user = body.data;
        token = token;
        message = `Thank you for registering, wonderful to meet you ${regUser.name}.`;
      });
  });
});

describe("POST /api/users/login", () => {
  let user = {
    id: 1,
    name: "Anusha Delightful",
    username: "nooshydeli",
    email: "nooshydeli@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  test("should login in a user", async () => {
    let token = await signToken({
      id: user.id,
      username: user.username,
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

// Test that the User must be logged in to their account to update info
describe("PUT /api/users/2", () => {
  test("should update info of a user", async () => {
    let user = {
      id: 1,
      name: "Anusha Delightful",
      username: "nooshydeli",
      email: "nooshydeli@charmelions.com",
      password: "charming",
      date_of_birth: "2000-01-01",
    };

    let info = {
      username: "nooshydelightful",
      email: "nooshydelightful@charmelions.com",
    };

    const token = await getToken({
      id: user.username,
      username: info.username,
    });

    return request(server)
      .put("/api/users/2")
      .set("Authorization", `Bearer ${token}`)
      .send(info)
      .expect(401)
      .then(({ body }) => {
        info = body.data;
        message = `unathorized`;
      });
  });
});

// test for the User attempting to updated their own information

describe("PUT /api/users/1", () => {
  test("should update info of a user", async () => {
    let user = {
      id: 1,
      name: "Anusha Delightful",
      username: "nooshydeli",
      email: "nooshydeli@charmelions.com",
      password: "charming",
      date_of_birth: "2000-01-01",
    };

    let info = {
      username: "nooshydelightful",
      email: "nooshydelightful@charmelions.com",
    };

    const token = await getToken({ id: user.id, username: user.username });

    console.log(`THIS BE THE TOKEN`, token);
    return request(server)
      .put(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(info)
      .then(({ body }) => {
        info = body.data;
        message = `Login Successful`;
      });
  });
});

// TO-DO: test the deleteUser function
describe("DELETE /api/users/:id", () => {
  test("should delete a user", async () => {
    const user = {
      id: 1,
      name: "Anusha Delightful",
      username: "nooshydeli",
      email: "nooshydeli@charmelions.com",
      password: "charming",
      date_of_birth: "2000-01-01",
    };

    const { name, username, email, password, date_of_birth } = user;

    const DBuser = await createUser({
      name,
      username,
      email,
      password,
      date_of_birth,
    });

    const token = await getToken({
      id: DBuser.id,
      username: DBuser.username,
    });

    return request(server)
      .delete(`/api/users/1`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

// TO-DO: MOVE TO adminAPI.test.cjs
// TO-DO: test the UTILS on getting users
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can get our user db

// TO-DO: test the adminUpdatesUser function
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can update users in our db
