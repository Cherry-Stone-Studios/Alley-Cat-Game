const { createUser } = require("../db/users.cjs");
const { createScore } = require("../db/scores.cjs");
const {
  addFriend,
  getUsersFriends,
  removeFriend,
} = require("../db/friends.cjs");

test("Should create 2 users and send a request from user1 to user2", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  const user2 = {
    id: 2,
    name: "Nakayla Amazing",
    username: "nakaylisamazing",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "rabbitrabbit",
    date_of_birth: "2000-01-01",
  };

  const friendRequest1 = {
    id: 1,
    friendid: 2,
  };

  await createUser(user1);
  await createUser(user2);
  const friendResult1 = await addFriend(friendRequest1);
  expect(friendResult1).toMatchObject({
    friends: [
      {
        friendsId: 1,
        friendsOfId: 2,
      },
    ],
  });
});

test("Should get information for a user's friend", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  const user2 = {
    id: 2,
    name: "Nakayla Amazing",
    username: "nakaylisamazing",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "rabbitrabbit",
    date_of_birth: "2000-01-01",
  };

  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    name: "",
  };

  const scores2 = {
    id: 2,
    value: 2000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    name: "",
  };

  const scores3 = {
    id: 3,
    value: 3000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    name: "",
  };

  const friendRequest1 = {
    id: 1,
    friendid: 2,
  };

  await createUser(user1);
  await createUser(user2);
  await createScore(scores1);
  await createScore(scores2);
  await createScore(scores3);

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

test("Should create, request, and remove a friend from a user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  const user2 = {
    id: 2,
    name: "Nakayla Amazing",
    username: "nakaylisamazing",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "rabbitrabbit",
    date_of_birth: "2000-01-01",
  };

  const friendRequest1 = {
    id: 1,
    friendid: 2,
  };

  const removalRequest = {
    id: 1,
    friendid: 2,
  };

  await createUser(user1);
  await createUser(user2);
  await addFriend(friendRequest1);
  const removedFriend = await removeFriend(removalRequest);

  expect(removedFriend).toMatchObject({
    friends: [],
  });
});
