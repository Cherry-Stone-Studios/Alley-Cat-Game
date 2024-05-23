const request = require("supertest");
const { server } = require("../server.cjs");
const { signToken } = require("../api/utils.cjs");
const { response } = require("express");
const { createUser } = require("../db/users.cjs");

// Create a user and test if their scores will write to their username
describe("POST /api/scores/", () => {
  const score1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    guestname: "",
  };

  test("should create a new score for a registered user", async () => {
    const user1 = {
      id: 1,
      name: "Nakayla S. Delightful",
      username: "nakaylisamazing",
      email: "cherry@stonestudios.com",
      password: "charming",
      date_of_birth: "2000-01-01",
    };

    const createdUser = await createUser(user1);

    console.log("THIS IS THE CREATED USER", createdUser);

    const response = await request(server)
      .post("/api/scores/")
      .set("Accept", "application/json")
      .send(score1)
      .expect(200);

    expect(response.body).toMatchObject({
      id: 1,
      value: 1000,
      created_on: "2000-01-01T00:00:00.000Z",
      username: "nakaylisamazing",
      message: "Do you want to play again?",
    });
  });
});

describe("GET /api/scores/", () => {
  it("return a response it got all users", async () => {
    await request(server).get("/api/users").expect(200);
  });
});

describe("GET /api/scores/:username", () => {
  it("Should return the scores of the user", async () => {
    await request(server).get("/api/users/Serendipity").expect(200);
  });
});

// TO-DO: test the userUpdatesUser function
// to see if it correctly checks
// if the user requesting the changes
// IS the user to which the changes are being applied
// so that users can be logged in and update their information in our db

// TO-DO: test the deleteUser function
// to see if it correctly checks
// if the user requesting the changes
// IS the user to which the delete request is being made from
// OR if the body has sent an is_admin signature
// so that users can be logged in and update their information in our db

// TO-DO: MOVE TO adminAPI.test.cjs
// TO-DO: test the UTILS on getting users
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can get our user db

// TO-DO: test the adminUpdatesUser function
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can update users in our db
