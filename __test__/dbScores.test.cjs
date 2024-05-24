const {
  createScore,
  getScoresByUsername,
  getAllScores,
  adminUpdateScore,
  deleteScore,
} = require("../db/scores.cjs");

// passed: Jest, GitHub
test("Create a new score for a registered user", async () => {
  const testscore1 = {
    id: 21,
    value: 10000,
    created_on: "2000-01-01",
    username: "nakaylisamazing",
    guestname: "",
  };

  const scoresResult1 = await createScore(testscore1);
  expect(scoresResult1).toMatchObject({
    id: 21,
    value: 10000,
    created_on: "2000-01-01T00:00:00.000Z",
    name: "nakaylisamazing",
  });
});

// passed: Jest, GitHub
test("Create a new score for an unregistered user", async () => {
  const testscore2 = {
    id: 21,
    value: 10000,
    created_on: "2000-01-01",
    username: "",
    guestname: "newuser",
  };

  const scoresResult2 = await createScore(testscore2);
  expect(scoresResult2).toMatchObject({
    id: 21,
    value: 10000,
    created_on: "2000-01-01T00:00:00.000Z",
    guestname: "newuser",
  });
});

// passed: Jest, GitHub
test("Create a new score for an unregistered user using the username field", async () => {
  const testscore3 = {
    id: 21,
    value: 10000,
    created_on: "2000-01-01",
    username: "cappyisthehappy",
    guestname: "",
  };

  const scoresResult3 = await createScore(testscore3);
  expect(scoresResult3).toMatchObject({
    id: 21,
    value: 10000,
    created_on: "2000-01-01T00:00:00.000Z",
    guestname: "cappyisthehappy",
  });
});

// passed: Jest, GitHub
test("Creating a score with a naughty name throws an error", async () => {
  const testscore4 = {
    id: 77,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "fuck this game",
  };

  await expect(createScore(testscore4)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

// passed: Jest, GitHub
test("Creating a score with a naughty name throws an error", async () => {
  const testscore5 = {
    id: 77,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "this game is the shit",
  };

  await expect(createScore(testscore5)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

// passed: Jest, GitHub
test("Creating a score with a naughty name throws an error", async () => {
  const testscore6 = {
    id: 77,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "cunty mc cunterson",
  };

  await expect(createScore(testscore6)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

// passed: Jest, GitHub
test("Creating a score with a naughty name throws an error", async () => {
  const testscore7 = {
    id: 77,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "fuckcuntpisshit",
  };

  await expect(createScore(testscore7)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

// passed: Jest, GitHub
test("Creating a score with a long name throws an error", async () => {
  const testscore8 = {
    id: 77,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "chrisisthemostiandbesteverwoooooothisissolonghorray",
  };

  await expect(createScore(testscore8)).rejects.toThrow(
    `Your high score nickname is too long!`
  );
});

// passed: Jest, GitHub
test("Creating a score with a name that belongs to a user throws an error", async () => {
  const testscore9 = {
    id: 21,
    value: 1000,
    created_on: "2000-01-01",
    username: "",
    guestname: "nooshydelightful",
  };

  await expect(createScore(testscore9)).rejects.toThrow(
    `Your high score name belongs to a user. Register your own account to claim your very own name!`
  );
});

// passed: Jest, GitHub
test("Get scores for a registered user", async () => {
  const user = {
    username: "nooshydelightful",
  };

  let usernameScores = await getScoresByUsername(user.username);

  expect(usernameScores).toMatchObject([
    {
      value: 1000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nooshydelightful",
      id: 11,
    },
    {
      value: 2000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nooshydelightful",
      id: 19,
    },

    {
      value: 3000,
      created_on: "2000-01-01T00:00:00.000Z",
      name: "nooshydelightful",
      id: 20,
    },
  ]);
});

// passed: Jest, GitHub
test("An admin updates the score", async () => {
  const adminUpdatedField = {
    id: 11,
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
    id: 11,
  });
});

// passed: Jest, GitHub
test("A score gets deleted", async () => {
  const deleteme = {
    id: 21,
    value: 1000,
    created_on: "2000-01-01",
    username: "nooshydelightful",
    guestname: "",
  };

  await createScore(deleteme);

  const scoreID = {
    id: 21,
  };

  await expect(deleteScore(scoreID)).toMatchObject({});
});

// passed: Jest, GitHub
test("Get all scores for high scores", async () => {
  const allScores = await getAllScores();

  expect(allScores).toMatchObject([
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
