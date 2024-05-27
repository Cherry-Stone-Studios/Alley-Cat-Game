const request = require("supertest");
const { server } = require("../server.cjs");
const { signToken, requireUser, requireAdmin } = require("../api/utils.cjs");

// Test that scores can be updated
// passed: Jest, Postman, GitHub
// describe("PUT /api/admin/scores/11", () => {
//   test("Try to update info of a score", async () => {
//     const score = {
//       id: 11,
//       value: 10000,
//       created_on: "2000-01-01",
//       username: "nakaylisamazing",
//       guestname: "",
//     };

//     const response = await request(server)
//       .put("/api/scores/11")
//       .send(score)
//       .expect(200);

//     expect(response.body).toMatchObject({
//       id: 11,
//       value: 10000,
//       created_on: "2000-01-01T00:00:00.000Z",
//       name: "nakaylisamazing",
//       guestname: "",
//     });
//   });
// });

// Test deleting a score
// passed: Jest, Postman, GitHub
// describe("DELETE /api/admin/scores/:id", () => {
//   test("Delete a score", async () => {
//     const deleteMe = {
//       id: 77,
//       value: 1000000,
//       created_on: "2000-01-01",
//       username: "Superfly",
//       guestname: "",
//     };

//     const deletedScore = await createScore(deleteMe);

//     const response = await request(server)
//       .delete(`/api/admin/scores/${deletedScore.id}`)
//       .expect(200);

//     expect(response.body).toMatchObject({
//       message: "The score has been deleted from the database.",
//     });
//   });
// });
