const {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  adminUpdatesUser,
  userUpdatesUser,
  deleteUser,
} = require("../db/users.cjs");
const { createScore } = require("../db/scores.cjs");
const { addFriend } = require("../db/friends.cjs");

test("Should create a valid new user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  const userResult1 = await createUser(user1);
  expect(userResult1).toMatchObject({
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    date_of_birth: "2000-01-01T00:00:00.000Z",
  });
});

test("Creating a user with a name too long throws an error", async () => {
  const user2 = {
    id: 2,
    name: "Nakaylisthemostamazingandbesteverwoooooothisissolonghorray Amazingandbesteverwoooooothisissolonghorray",
    username: "nakaylisamazing",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "rabbitrabbit",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user2)).rejects.toThrow(
    `We don't have enough room for your name!`
  );
});

test("Creating a user with a username too long throws an error", async () => {
  const user3 = {
    id: 3,
    name: "Chris the Incredible",
    username: "chrisisthemostiandbesteverwoooooothisissolonghorray",
    email: "chrisincredible@cherrystonestudios.com",
    password: "pandasrawk",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user3)).rejects.toThrow(`Your username is too long!`);
});

test("Creating a user with a naughty username throws an error", async () => {
  const user7 = {
    id: 7,
    name: "Diablo the Naughty",
    username: "fuck",
    email: "diablo@cherrystonestudios.com",
    password: "naughtyboi",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user7)).rejects.toThrow(
    `Your username is too naughty!`
  );
});

test("Creating a user with a email too long throws an error", async () => {
  const user4 = {
    id: 4,
    name: "Valentino S. Cool",
    username: "valentinocoolcat",
    email:
      "valentinocoolcathasthecoolestcatsinallofcatdom.noforrealcheckoutthosecoolcats@cherrystonestudios.com",
    password: "catsaredope",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user4)).rejects.toThrow(`Your email is too long!`);
});

test("Creating a user with a password too long throws an error", async () => {
  const user5 = {
    id: 5,
    name: "Char and Miles",
    username: "char&miles",
    email: "miles4life@charmelions.com",
    password:
      "charmanderforprezandmilesforvicepresidentforeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverr",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user5)).rejects.toThrow(`Your password is too long!`);
});

test("Creating an underage user throws an error", async () => {
  const user6 = {
    id: 6,
    name: "Duke the Kid",
    username: "duke",
    email: "notoldenough@doubledukes.com",
    password: "cats",
    date_of_birth: "2013-01-01",
  };

  await expect(createUser(user6)).rejects.toThrow(
    `Thanks for your interest in registering! Please ask your guardian to help you register an account.`
  );
});

test("Get information on all users", async () => {
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

  const user3 = {
    id: 3,
    name: "Valentino S. Cool",
    username: "valentinocoolcat",
    email: "valentinocoolcat@cherrystonestudios.com",
    password: "catsaredope",
    date_of_birth: "2000-01-01",
  };

  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    guestname: "",
  };

  const scores2 = {
    id: 2,
    value: 2000,
    created_on: "2000-01-01",
    username: "nooshydelightful",
    guestname: "",
  };

  const scores3 = {
    id: 3,
    value: 3000,
    created_on: "2000-01-01",
    username: "valentinocoolcat",
    guestname: "",
  };

  await createUser(user1);
  await createUser(user2);
  await createUser(user3);
  await createScore(scores1);
  await createScore(scores2);
  await createScore(scores3);

  const allUsers = await getAllUsers();

  expect(allUsers).toMatchObject([
    {
      id: 1,
      name: "Anusha S. Delightful",
      username: "nooshydelightful",
      email: "nooshydelightful@charmelions.com",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Nakayla Amazing",
      username: "nakaylisamazing",
      email: "nakaylamazing@cherrystonestudios.com",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
    {
      id: 3,
      name: "Valentino S. Cool",
      username: "valentinocoolcat",
      email: "valentinocoolcat@cherrystonestudios.com",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
  ]);
});

test("Get info by username for a single registered user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  await createUser(user1);

  const user = {
    username: "nooshydelightful",
  };

  const userByUsername = await getUserByUsername(user);

  expect(userByUsername).toMatchObject({
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    date_of_birth: "2000-01-01T00:00:00.000Z",
  });
});

test("Get info by ID for a single registered user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  await createUser(user1);

  const user = {
    id: 1,
  };

  const userByID = await getUserById(user);

  expect(userByID).toMatchObject({
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    date_of_birth: "2000-01-01T00:00:00.000Z",
  });
});

test("A quoteAdminquote updates the user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
    is_admin: false,
    nyan_unlocked: false,
  };

  await createUser(user1);

  const adminUpdatedField = {
    id: 1,
    name: "Anusha Wonderful",
    username: "wonderful.nooshy",
    email: "nooshydelightful02@charmelions.com",
    password: "charmingAgain",
    date_of_birth: "2000-02-28",
    is_admin: true,
    nyan_unlocked: true,
  };

  const updatedUser = await adminUpdatesUser(adminUpdatedField);

  expect(updatedUser).toMatchObject({
    id: 1,
    name: "Anusha Wonderful",
    username: "wonderful.nooshy",
    email: "nooshydelightful02@charmelions.com",
    date_of_birth: "2000-02-28T00:00:00.000Z",
    is_admin: true,
    nyan_unlocked: true,
  });
});

test("A user updates the user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
    is_admin: false,
    nyan_unlocked: false,
  };

  await createUser(user1);

  const userUpdatedField = {
    id: 1,
    name: "Anusha Wonderful",
    username: "wonderful.nooshy",
    email: "nooshydelightful02@charmelions.com",
    password: "charmingAgain",
  };

  const updatedUser = await userUpdatesUser(userUpdatedField);

  expect(updatedUser).toMatchObject({
    id: 1,
    name: "Anusha Wonderful",
    username: "wonderful.nooshy",
    email: "nooshydelightful02@charmelions.com",
  });
});

test("A user gets deleted", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
    is_admin: false,
    nyan_unlocked: false,
  };

  const user2 = {
    id: 2,
    name: "Nakayla Amazing",
    username: "nakaylisamazing",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "rabbitrabbit",
    date_of_birth: "2000-01-01",
  };

  const user3 = {
    id: 3,
    name: "Valentino S. Cool",
    username: "valentinocoolcat",
    email: "valentinocoolcat@cherrystonestudios.com",
    password: "catsaredope",
    date_of_birth: "2000-01-01",
  };

  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "nooshydelightful",
    guestname: "",
  };

  const scores2 = {
    id: 2,
    value: 2000,
    created_on: "2000-01-01",
    username: "nooshydelightful",
    guestname: "",
  };

  const scores3 = {
    id: 3,
    value: 3000,
    created_on: "2000-01-01",
    username: "nooshydelightful",
    guestname: "",
  };

  const friendRequest1 = {
    id: 1,
    friendid: 2,
  };

  const friendRequest2 = {
    id: 1,
    friendid: 3,
  };

  await createUser(user1);
  await createUser(user2);
  await createUser(user3);
  await createScore(scores1);
  await createScore(scores2);
  await createScore(scores3);
  await addFriend(friendRequest1);
  await addFriend(friendRequest2);

  const userId = {
    id: 1,
  };

  await expect(deleteUser(userId)).toMatchObject({});
});
