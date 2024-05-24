const request = require("supertest");
const { server } = require("../server.cjs");
const { createScore } = require("../db/scores.cjs");

// test to get all scores from DB
// passed: Jest, GitHub
describe("GET /api/scores/", () => {
  it("Return a response it got all scores", async () => {
    const response = await request(server).get("/api/scores").expect(200);

    expect(response.body).toMatchObject([
      {
        id: 11,
        value: 1000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nooshydelightful",
        guestname: "",
      },
      {
        id: 12,
        value: 1000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nakaylisamazing",
        guestname: "",
      },
      {
        id: 13,
        value: 1000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "valentinocoolcat",
        guestname: "",
      },
      {
        id: 14,
        value: 1000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "kimmybones",
        guestname: "",
      },
      {
        id: 15,
        value: 1000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "hannah",
        guestname: "",
      },
      {
        id: 16,
        value: 1000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "",
        guestname: "justlikedavid",
      },
      {
        id: 17,
        value: 2000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nakaylisamazing",
        guestname: "",
      },
      {
        id: 18,
        value: 3000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nakaylisamazing",
        guestname: "",
      },
      {
        id: 19,
        value: 2000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nooshydelightful",
        guestname: "",
      },
      {
        id: 20,
        value: 3000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nooshydelightful",
        guestname: "",
      },
    ]);
  });
});

// passed: Jest, GitHub
describe("GET /api/scores/:username", () => {
  it("Return the scores of the user", async () => {
    await request(server).get("/api/scores/Serendipity").expect(200);
  });
});

describe("GET /api/scores/:username", () => {
  it("Return a response it got one users scores via their username", async () => {
    const response = await request(server)
      .get("/api/scores/nooshydelightful")
      .expect(200);

    expect(response.body).toMatchObject([
      {
        id: 11,
        value: 1000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nooshydelightful",
        guestname: "",
      },
      {
        id: 19,
        value: 2000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nooshydelightful",
        guestname: "",
      },
      {
        id: 20,
        value: 3000,
        created_on: "2000-01-01T00:00:00.000Z",
        name: "nooshydelightful",
        guestname: "",
      },
    ]);
  });
});

// Create a user and test if their scores will write to their username
// passed: Jest, GitHub
describe("POST /api/scores/", () => {
  const score1 = {
    id: 21,
    value: 1000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    guestname: "",
  };

  test("Create a new score for a registered user", async () => {
    const response = await request(server)
      .post("/api/scores/")
      .set("Accept", "application/json")
      .send(score1)
      .expect(200);

    expect(response.body).toMatchObject({
      id: 21,
      value: 1000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nakaylisamazing",
      message: "Do you want to play again?",
    });
  });
});

// Test that scores can be updated
// passed: Jest, GitHub
describe("PUT /api/scores/11", () => {
  test("Try to update info of a score", async () => {
    const score = {
      id: 11,
      value: 10000,
      created_on: "2000-01-01",
      username: "nakaylisamazing",
      guestname: "",
    };

    const response = await request(server)
      .put("/api/scores/11")
      .send(score)
      .expect(200);

    expect(response.body).toMatchObject({
      id: 11,
      value: 10000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nakaylisamazing",
      guestname: "",
    });
  });
});

// Test deleting a score
// passed: Jest, GitHub
describe("DELETE /api/scores/:id", () => {
  test("Delete a score", async () => {
    const deleteMe = {
      id: 77,
      value: 1000000,
      created_on: "2000-01-01",
      username: "Superfly",
      guestname: "",
    };

    const deletedScore = await createScore(deleteMe);

    const response = await request(server)
      .delete(`/api/scores/${deletedScore.id}`)
      .expect(200);

    expect(response.body).toMatchObject({
      message: "The score has been deleted from the database.",
    });
  });
});
