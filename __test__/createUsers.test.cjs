const { createUser } = require("../db/users.cjs");
const { prismaMock } = require("../singleton.cjs");

test("Should create a valid new user", async () => {
  const user1 = {
    userId: 1,
    name: "Anusha Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "1995-12-17T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user1);
  const userResult1 = await createUser(user1);
  expect(userResult1).toEqual({
    userId: 1,
    name: "Anusha Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "1995-12-17T00:00:00",
  });
});

test("Creating a user with a username too long throws an error", async () => {
  const user2 = {
    userId: 2,
    name: "Nakayla Amazing",
    username: "nakaylisthemostamazingandbesteverwoooooothisissolonghorray",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "whaaat1",
    date_of_birth: "1996-12-17T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user2);

  await expect(createUser(user2)).rejects.toThrow(`Your username is too long!`);
});

test("Creating a user with a username too long throws an error", async () => {
  const user2 = {
    userId: 2,
    name: "Nakayla Amazing",
    username: "nakaylisthemostamazingandbesteverwoooooothisissolonghorray",
    email: "nakaylamazing@cherrystonestudios.com",
    password: "whaaat1",
    date_of_birth: "1996-12-17T00:00:00",
  };

  prismaMock.user.create.mockReturnValue(user2);

  await expect(createUser(user2)).rejects.toThrow(`Your username is too long!`);
});
