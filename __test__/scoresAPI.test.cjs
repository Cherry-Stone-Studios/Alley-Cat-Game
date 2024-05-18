const request = require("supertest");
const { server } = require("../server.cjs");

// TO-DO: test the createScore function
// to see if it correctly posts
// new scores for a logged in user to the scores db

// TO-DO: test the createScore function
// to see if it correctly posts
// new scores for an unregistered user to the scores db

// describe("GET /api/scores/", () => {
//     it("return a response it got all scores", async () => {
//       await request(server).get("/api/users").expect(200);
//     });
//   });

//   describe("GET /api/scores/:id", () => {
//     it("should return a response it got one user's scores", async () => {
//       await request(server).get("/api/scores/36").expect(200);
//     });
//   });

// TO-DO: test the UTILS on getting users
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can get our scores db

// TO-DO: test the adminUpdateScore function
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that only admins can update scores in our db

// TO-DO: test the deleteScore function
// to see if it correctly checks
// if the body has sent an is_admin signature
// so that admins can easily delete scores in our db
