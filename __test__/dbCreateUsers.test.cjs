const { createUser } = require("../db/users.cjs");
const { prismaMock } = require("../singleton.cjs");

test("Should create a valid new user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user1);
  const userResult1 = await createUser(user1);
  expect(userResult1).toEqual({
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01T00:00:00",
  });
});

test("Creating a user with a name too long throws an error", async () => {
  const user2 = {
    id: 2,
    name: "Nakaylisthemostamazingandbesteverwoooooothisissolonghorray Amazingandbesteverwoooooothisissolonghorray",
    username: "nakaylisamazing",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "rabbitrabbit",
    date_of_birth: "2000-01-01T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user2);

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
    date_of_birth: "2000-01-01T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user3);

  await expect(createUser(user3)).rejects.toThrow(`Your username is too long!`);
});

test("Creating a user with a naughty username throws an error", async () => {
  const user7 = {
    id: 7,
    name: "Diablo the Naughty",
    username: "fuck",
    email: "diablo@cherrystonestudios.com",
    password: "naughtyboi",
    date_of_birth: "2000-01-01T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user7);

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
    date_of_birth: "2000-01-01T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user4);

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
    date_of_birth: "2000-01-01T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user5);

  await expect(createUser(user5)).rejects.toThrow(`Your password is too long!`);
});

test("Creating an underage user throws an error", async () => {
  const user6 = {
    id: 6,
    name: "Duke the Kid",
    username: "duke",
    email: "notoldenough@doubledukes.com",
    password: "cats",
    date_of_birth: "2013-01-01T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user6);

  await expect(createUser(user6)).rejects.toThrow(
    `Thanks for your interest in registering! Please ask your guardian to help you register an account.`
  );
});
