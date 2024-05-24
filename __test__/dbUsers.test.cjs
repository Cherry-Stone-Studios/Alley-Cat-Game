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

// passed: Jest, GitHub
test("Should create a valid new user", async () => {
  const user1 = {
    name: "PuppyFace",
    username: "PuppyFace",
    email: "PuppyFace@cherrystone.com",
    password: "PuppyFace",
    date_of_birth: "2000-01-01",
  };

  const userResult1 = await createUser(user1);
  expect(userResult1).toMatchObject({
    name: "PuppyFace",
    username: "PuppyFace",
    email: "PuppyFace@cherrystone.com",
    date_of_birth: "2000-01-01T00:00:00.000Z",
  });
});

// passed: Jest, GitHub
test("Creating a user with a name too long throws an error", async () => {
  const user2 = {
    id: 20,
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

// passed: Jest, GitHub
test("Creating a user with a username too long throws an error", async () => {
  const user3 = {
    id: 30,
    name: "Chris the Incredible",
    username: "chrisisthemostiandbesteverwoooooothisissolonghorray",
    email: "chrisincredible@cherrystonestudios.com",
    password: "pandasrawk",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user3)).rejects.toThrow(`Your username is too long!`);
});

// passed: Jest, GitHub
test("Creating a user with a naughty username throws an error", async () => {
  const user7 = {
    id: 70,
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

// passed: Jest, GitHub
test("Creating a user with a email too long throws an error", async () => {
  const user4 = {
    id: 40,
    name: "Valentino S. Cool",
    username: "valentinocoolcat",
    email:
      "valentinocoolcathasthecoolestcatsinallofcatdom.noforrealcheckoutthosecoolcats@cherrystonestudios.com",
    password: "catsaredope",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user4)).rejects.toThrow(`Your email is too long!`);
});

// passed: Jest, GitHub
test("Creating a user with a password too long throws an error", async () => {
  const user5 = {
    id: 50,
    name: "Char and Miles",
    username: "char&miles",
    email: "miles4life@charmelions.com",
    password:
      "charmanderforprezandmilesforvicepresidentforeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverandeverr",
    date_of_birth: "2000-01-01",
  };

  await expect(createUser(user5)).rejects.toThrow(`Your password is too long!`);
});

// passed: Jest, GitHub
test("Creating an underage user throws an error", async () => {
  const user6 = {
    id: 60,
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

// passed: Jest, GitHub
test("Get information on all users", async () => {
  const allUsers = await getAllUsers();

  expect(allUsers).toMatchObject([
    {
      id: 11,
      name: "Anusha Delightful",
      username: "nooshydelightful",
      email: "nooshydelightful@charmelions.com",
      password: "charming",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
    {
      id: 12,
      name: "Nakayla Amazing",
      username: "nakaylisamazing",
      email: "nakaylamazing@cherrystonestudios.com",
      password: "rabbitrabbit",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
    {
      id: 13,
      name: "Valentino S. Cool",
      username: "valentinocoolcat",
      email: "valentinocoolcat@cherrystonestudios.com",
      password: "catsaredope",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
    {
      id: 14,
      name: "Chris Rocks",
      username: "kimmybones",
      email: "kimmybones@cherrystonestudios.com",
      password: "kimmybones",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
    {
      id: 15,
      name: "Hannah Wins",
      username: "hannah",
      email: "hannah@cherrystonestudios.com",
      password: "prismaprincess",
      date_of_birth: "2000-01-01T00:00:00.000Z",
    },
  ]);
});

// passed: Jest, GitHub
test("Get info by username for a single registered user", async () => {
  const user = {
    username: "nooshydelightful",
  };

  const userByUsername = await getUserByUsername(user);

  expect(userByUsername).toMatchObject({
    id: 11,
    name: "Anusha Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    date_of_birth: "2000-01-01T00:00:00.000Z",
  });
});

// passed: Jest, GitHub
test("Get info by ID for a single registered user", async () => {
  const user = {
    id: 11,
  };

  const userByID = await getUserById(user);

  expect(userByID).toMatchObject({
    id: 11,
    name: "Anusha Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    date_of_birth: "2000-01-01T00:00:00.000Z",
  });
});

// passed: Jest, GitHub
test("An admin updates the user", async () => {
  const user1 = {
    name: "PuppyFace",
    username: "PuppyFace",
    email: "PuppyFace@cherrystonestudios.com",
    password: "PuppyFace",
    date_of_birth: "2000-01-01",
    is_admin: false,
    nyan_unlocked: false,
  };

  const createduser = await createUser(user1);

  const adminUpdatedField = {
    id: createduser.id,
    name: "Superfly",
    username: "Superfly",
    email: "Superfly@cherrystonestudios.com",
    password: "Superfly",
    date_of_birth: "2000-02-28T00:00:00.000Z",
    is_admin: true,
    nyan_unlocked: true,
  };

  const updatedUser = await adminUpdatesUser(adminUpdatedField);

  expect(updatedUser).toMatchObject({
    id: createduser.id,
    name: "Superfly",
    username: "Superfly",
    email: "Superfly@cherrystonestudios.com",
    date_of_birth: "2000-02-28T00:00:00.000Z",
    is_admin: true,
    nyan_unlocked: true,
  });
});

// passed: Jest, GitHub
test("A user updates the user", async () => {
  const user1 = {
    id: 30,
    name: "PuppyFace",
    username: "PuppyFace",
    email: "PuppyFace@cherrystonestudios.com",
    password: "PuppyFace",
    date_of_birth: "2000-01-01",
  };

  const createduser = await createUser(user1);

  const userUpdatedField = {
    id: createduser.id,
    name: "Superfly",
    username: "Superfly",
    email: "Superfly@cherrystonestudios.com",
    password: "Superfly",
  };

  const updatedUser = await userUpdatesUser(userUpdatedField);

  expect(updatedUser).toMatchObject({
    id: createduser.id,
    name: "Superfly",
    username: "Superfly",
    email: "Superfly@cherrystonestudios.com",
  });
});

// passed: nope
test("A user gets deleted", async () => {
  const user1 = {
    name: "PuppyFace",
    username: "PuppyFace",
    email: "PuppyFace@cherrystonestudios.com",
    password: "PuppyFace",
    date_of_birth: "2000-01-01",
  };

  const user2 = {
    id: 20,
    name: "Kimmy",
    username: "Kimmy",
    email: "Kimmy@cherrystonestudios.com",
    password: "Kimmy",
    date_of_birth: "2000-01-01",
  };

  const user3 = {
    id: 30,
    name: "Superfly",
    username: "Superfly",
    email: "Superfly@cherrystonestudios.com",
    password: "Superfly",
    date_of_birth: "2000-01-01",
  };

  const createduser1 = await createUser(user1);
  const createduser2 = await createUser(user2);
  const createduser3 = await createUser(user3);

  const scores1 = {
    id: 11,
    value: 1000,
    created_on: "2000-01-01",
    username: "PuppyFace",
    guestname: "",
  };

  const scores2 = {
    id: 12,
    value: 2000,
    created_on: "2000-01-01",
    username: "PuppyFace",
    guestname: "",
  };

  const scores3 = {
    id: 13,
    value: 3000,
    created_on: "2000-01-01",
    username: "PuppyFace",
    guestname: "",
  };

  await createScore(scores1);
  await createScore(scores2);
  await createScore(scores3);

  const friendRequest1 = {
    id: createduser1.id,
    friendid: createduser2.id,
  };

  const friendRequest2 = {
    id: createduser1.id,
    friendid: createduser3.id,
  };

  await addFriend(friendRequest1);
  await addFriend(friendRequest2);

  const userId = {
    id: createduser1.id,
  };

  await expect(deleteUser(userId)).toMatchObject({});
});
