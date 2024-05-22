const request = require("supertest");
const { server } = require("../server.cjs");

// TO-DO: test the createUser function
// to see if it correctly posts
// new user information to the db
describe("POST /api/users/register", () => {
  it("should register a new user in our db", function () {
    request(server)
      .post("/api/users/register")
      .send({
        name: "john",
        username: "johnnyboy",
        email: "john@john.com",
        password: "jonjon",
        date_of_birth: "2000-12-12",
      })
      .set("Accept", "application/json")
      .expect((res) => {
        (res.body.id = "some fixed id"),
          (res.body.name = "john"),
          (res.body.username = "johnnyboy"),
          (res.body.email = "john@john.com"),
          (res.body.password = "johnjohn"),
          (res.body.date_of_birth = "2000-12-12");
      })
      .expect(201);
  });
});

describe("POST /api/users/login", () => {
  it("should login a registered user if they exist in our db", function () {
    request(server)
      .post("/api/users/login")
      .send({
        name: "Hannah",
        username: "Serendipity",
      })
      .set("Accept", "application/json")
      .expect((res) => {
        console.log("THIS IS MY SUCCESSFULL LOGIN");
        res.send({ message: `${user.username} Sucessfully Logged In!` });
      });
  });
});

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

describe("GET /api/user/:username", () => {
  it("should return a response it got one user", async () => {
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
