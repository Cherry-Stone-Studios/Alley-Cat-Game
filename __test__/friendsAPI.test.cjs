const request = require("supertest");
const { server } = require("../server.cjs");
const { addFriend } = require("../db/friends.cjs");

// passed: Jest
describe("GET /api/users/friends/:id", () => {
  it("Add two friends and return the results", async () => {
    const friendRequest1 = {
      id: 11,
      friendid: 12,
    };

    const friendRequest2 = {
      id: 11,
      friendid: 13,
    };

    await addFriend(friendRequest1);
    await addFriend(friendRequest2);

    const response = await request(server)
      .get("/api/users/friends/11")
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body).toMatchObject({
      friends: [
        {
          friendsId: 11,
          friendsOfId: 12,
        },
        {
          friendsId: 11,
          friendsOfId: 13,
        },
      ],
    });
  });
});

// passed: Jest
describe("GET /api/users/friends/:id", () => {
  it("Return a friends' information to a user", async () => {
    const friendRequest1 = {
      id: 11,
      friendid: 12,
    };

    const frienddata = await addFriend(friendRequest1);

    const response = await request(server)
      .get("/api/users/friends/11")
      .set("Accept", "application/json")
      .send(frienddata)
      .expect(200);

    expect(response.body).toMatchObject({
      friends: [
        {
          friendsOf: {
            scores: [{ value: 1000 }, { value: 2000 }, { value: 3000 }],
            username: "nakaylisamazing",
          },
        },
      ],
    });
  });
});

// passed: Jest
describe("POST /api/users/friends/", () => {
  const friendRequest1 = {
    id: 11,
    friendid: 12,
  };

  test("Create a new friend between two registered users", async () => {
    const response = await request(server)
      .post("/api/users/friends/")
      .set("Accept", "application/json")
      .send(friendRequest1)
      .expect(200);

    expect(response.body).toMatchObject({
      friends: [
        {
          friendsId: 11,
          friendsOfId: 12,
        },
      ],
    });
  });
});

// passed: Jest
describe("DELETE /api/users/friends/", () => {
  test("Delete a friend between two registered users", async () => {
    const friendRequest1 = {
      id: 11,
      friendid: 12,
    };

    const friendRequest2 = {
      id: 11,
      friendid: 13,
    };

    const deletefriend = {
      id: 11,
      friendid: 12,
    };

    await addFriend(friendRequest1);
    await addFriend(friendRequest2);

    const response = await request(server)
      .delete("/api/users/friends/")
      .set("Accept", "application/json")
      .send(deletefriend)
      .expect(200);

    expect(response.body).toMatchObject({
      remainingFriends: {
        friends: [
          {
            friendsOf: {
              scores: [{ value: 1000 }],
              username: "valentinocoolcat",
            },
          },
        ],
      },
    });
  });
});
