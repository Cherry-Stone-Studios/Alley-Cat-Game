const request = require("supertest");
const { server } = require("../server.cjs");
const { createUser } = require("../db/users.cjs");
const { signToken } = require("../api/utils.cjs");
require("supertest");

// TO-DO: test the createUser function
// to see if it correctly posts
// new user information to the db
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
  test("should login in a user", async () => {
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

// test("Successfully Login user", async () => {
//   const user = {
//     id: 1,
//     name: "Anusha Delightful",
//     username: "nooshydeli",
//     email: "nooshydeli@charmelions.com",
//     password: "charming",
//     date_of_birth: "2000-01-01",
//   };

//   await createUser(user);

//   const token = await signToken({ id: user.id, username: user.username });

//   try {
//     await request(server).post("/api/users/login").send(user);
//     expect(server.response.send).toMatchObject({
//       message: `${user.username} Sucessfully Logged In!`,
//       token,
//     });
//   } catch (err) {
//     throw err;
//   }
// });
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
