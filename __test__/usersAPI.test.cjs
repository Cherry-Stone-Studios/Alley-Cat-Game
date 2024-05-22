const request = require("supertest");
const server = require("../server.cjs");
const { createUser } = require("../db/users.cjs");
const { signToken } = require("../api/utils.cjs");

// TO-DO: test the createUser function
// to see if it correctly posts
// new user information to the db
// describe("POST /api/users/register", () => {
//   it("should register a new user in our db", function () {
//     request(server)
//       .post("/api/users/register")
//       .send({
//         name: "john",
//         username: "johnnyboy",
//         email: "john@john.com",
//         password: "jonjon",
//         date_of_birth: "2000-12-12",
//       })
//       .set("Accept", "application/json")
//       .expect((res) => {
//         (res.body.id = "some fixed id"),
//           (res.body.name = "john"),
//           (res.body.username = "johnnyboy"),
//           (res.body.email = "john@john.com"),
//           (res.body.password = "johnjohn"),
//           (res.body.date_of_birth = "2000-12-12");
//         res.send(200);
//       });
//   });
// });

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

// describe("POST /api/users/login", () => {
//   it("should login a registered user if they exist in our db", async () => {
//     const response = await request(server).get("/api/users/login");
//     expect(response.body).toMatchObject({
//       username: "3eyePaul",
//       password: "3eyePaul",
//     });
//     expect(
//       response.send({
//         message: `${username} Sucessfully Logged In!`,
//         token,
//       })
//     );
//   });
// });

// describe("POST /api/users/login", () => {
//   it("should login a registered user if they exist in our db", async () => {
//     const response = await request(server).get("/api/users/login")
//       .send({
//         name: "Hannah",
//         username: "Serendipity",
//       })
//       .set("Accept", "application/json")
//       .expect((res) => {
//         console.log("THIS IS MY SUCCESSFULL LOGIN");
//         res.send({ message: `${user.username} Sucessfully Logged In!` });
//       });
//   });
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
