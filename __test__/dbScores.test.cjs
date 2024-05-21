const {
  createScore,
  getScoresByUsername,
  getAllScores,
  adminUpdateScore,
  deleteScore,
} = require("../db/scores.cjs");
const { createUser } = require("../db/users.cjs");

test("Create a new score for a registered user", async () => {
  const user1 = {
    id: 1,
    name: "Nakayla S. Delightful",
    username: "nakaylisamazing",
    email: "cherry@stonestudios.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  await createUser(user1);

  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    guestname: "",
  };

  const scoresResult1 = await createScore(scores1);
  expect(scoresResult1).toMatchObject({
    created_on: "2000-01-01T00:00:00.000Z",
    id: 1,
    name: "nakaylisamazing",
    value: 1000,
  });
});

test("Create a new score for an unregistered user", async () => {
  const scores2 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "newuser",
  };

  const scoresResult2 = await createScore(scores2);
  expect(scoresResult2).toMatchObject({
    id: 1,
    value: 1000,
    created_on: "2000-01-01T00:00:00.000Z",
    guestname: "newuser",
  });
});

test("Create a new score for an unregistered user using the username field", async () => {
  const scores03 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "cappyisthehappy",
    guestname: "",
  };

  const scoresResult03 = await createScore(scores03);
  expect(scoresResult03).toMatchObject({
    id: 1,
    value: 1000,
    created_on: "2000-01-01T00:00:00.000Z",
    guestname: "cappyisthehappy",
  });
});

test("Creating a score with a naughty name throws an error", async () => {
  const scores3 = {
    id: 3,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "fuck this game",
  };

  await expect(createScore(scores3)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a naughty name throws an error", async () => {
  const scores4 = {
    id: 4,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "this game is the shit",
  };

  await expect(createScore(scores4)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a naughty name throws an error", async () => {
  const scores5 = {
    id: 5,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "cunty mc cunterson",
  };

  await expect(createScore(scores5)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a naughty name throws an error", async () => {
  const scores6 = {
    id: 6,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "fuckcuntpisshit",
  };

  await expect(createScore(scores6)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a long name throws an error", async () => {
  const score7 = {
    id: 7,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "chrisisthemostiandbesteverwoooooothisissolonghorray",
  };

  await expect(createScore(score7)).rejects.toThrow(
    `Your high score nickname is too long!`
  );
});

test("Creating a score with a name that belongs to a user throws an error", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  const score8 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "nooshydelightful",
  };

  await createUser(user1);
  await expect(createScore(score8)).rejects.toThrow(
    `Your high score name belongs to a user. Register your own account to claim your very own name!`
  );
});

test("Get scores for a registered user", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  await createUser(user1);

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

  const user = {
    username: "nooshydelightful",
  };

  await createScore(scores1);
  await createScore(scores2);
  await createScore(scores3);
  const usernameScores = await getScoresByUsername(user);

  expect(usernameScores).toMatchObject([
    {
      value: 1000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nooshydelightful",
      id: 1,
    },
    {
      value: 2000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nooshydelightful",
      id: 2,
    },

    {
      value: 3000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nooshydelightful",
      id: 3,
    },
  ]);
});

test("Get all scores for high scores", async () => {
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

  const allScores = await getAllScores();

  expect(allScores).toMatchObject([
    {
      value: 1000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nakaylisamazing",
      id: 1,
    },
    {
      value: 2000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nooshydelightful",
      id: 2,
    },

    {
      value: 3000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "valentinocoolcat",
      id: 3,
    },
  ]);
});

test("A quoteAdminquote updates the score", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "nooshydelightful",
    guestname: "",
  };

  await createUser(user1);
  await createScore(scores1);

  const adminUpdatedField = {
    value: 10000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    guestname: "",
  };

  const updatedScore = await adminUpdateScore(adminUpdatedField);

  expect(updatedScore).toMatchObject({
    value: 10000,
    created_on: "2000-01-01T00:00:00.000Z",
    name: "nakaylisamazing",
    id: 1,
  });
});

test("A score gets deleted", async () => {
  const user1 = {
    id: 1,
    name: "Anusha S. Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "2000-01-01",
  };

  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01",
    username: "nooshydelightful",
    guestname: "",
  };

  await createUser(user1);
  await createScore(scores1);

  const scoreID = {
    id: 1,
  };

  await expect(deleteScore(scoreID)).toMatchObject({});
});
