const {
  addFriend,
  getUsersFriends,
  removeFriend,
} = require("../db/friends.cjs");

// passed: Jest, GitHub
test("Should create 2 users and send a request from user1 to user2", async () => {
  const friendRequest1 = {
    id: 11,
    friendid: 12,
  };

  const friendResult1 = await addFriend(friendRequest1);
  expect(friendResult1).toMatchObject({
    friends: [
      {
        friendsId: 11,
        friendsOfId: 12,
      },
    ],
  });
});

// passed: Jest, GitHub
test("Should get information for a user's friend", async () => {
  const friendRequest1 = {
    id: 11,
    friendid: 12,
  };

  const friendConnection = await addFriend(friendRequest1);
  const friendData = await getUsersFriends(friendConnection);

  expect(friendData).toMatchObject({
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

// passed: Jest, GitHub
test("Should create, request, and remove a friend from a user", async () => {
  const friendRequest1 = {
    id: 11,
    friendid: 12,
  };

  const friendRequest2 = {
    id: 11,
    friendid: 13,
  };

  const friendRequest3 = {
    id: 11,
    friendid: 14,
  };

  const friends1 = await addFriend(friendRequest1);
  const friends2 = await addFriend(friendRequest2);
  const friends3 = await addFriend(friendRequest3);

  const removalRequest = {
    id: 11,
    friendid: 12,
  };

  console.log("THIS IS THE REMOVAL REQUEST INFO", removalRequest);

  const removedFriend = await removeFriend(removalRequest);

  console.log("THIS IS THE REMOVAL REQUEST RESULTS", removedFriend);

  expect(removedFriend).toMatchObject({
    friends: [
      {
        friendsId: 11,
        friendsOf: { scores: [{ value: 1000 }], username: "valentinocoolcat" },
        friendsOfId: 13,
      },
      {
        friendsId: 11,
        friendsOf: { scores: [{ value: 1000 }], username: "kimmybones" },
        friendsOfId: 14,
      },
    ],
  });
});
