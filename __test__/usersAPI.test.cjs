const request = require("supertest");
const { server } = require("../server.cjs");

// TO-DO: test the createUser function
// to see if it correctly posts
// new user information to the db

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

// TO-DO: test the UTILS on getting users
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can access our user db

// TO-DO: test the adminUpdatesUser function
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can update users in our db

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
