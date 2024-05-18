const { createScore } = require("../db/scores.cjs");
const { prismaMock } = require("../singleton.cjs");

test("Create a new score for a registered user", async () => {
  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "nakaylisamazing",
    name: "",
  };

  prismaMock.scores.create.mockReturnValue(scores1);
  const scoresResult1 = await createScore(scores1);
  expect(scoresResult1).toEqual({
    id: 1,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "nakaylisamazing",
    name: "",
  });
});

test("Create a new score for an unregistered user", async () => {
  const scores2 = {
    id: 2,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "",
    name: "newuser",
  };

  prismaMock.scores.create.mockReturnValue(scores2);
  const scoresResult2 = await createScore(scores2);
  expect(scoresResult2).toEqual({
    id: 2,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "",
    name: "newuser",
  });
});

test("Creating a score with a naughty name throws an error", async () => {
  const score3 = {
    id: 3,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "",
    name: "fuck this game",
  };

  prismaMock.scores.create.mockReturnValue(score3);

  await expect(createScore(score3)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a naughty name throws an error", async () => {
  const score4 = {
    id: 4,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "",
    name: "this game is the shit",
  };

  prismaMock.scores.create.mockReturnValue(score4);

  await expect(createScore(score4)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a naughty name throws an error", async () => {
  const score5 = {
    id: 5,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "",
    name: "cunty mc cunterson",
  };

  prismaMock.scores.create.mockReturnValue(score5);

  await expect(createScore(score5)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a naughty name throws an error", async () => {
  const score6 = {
    id: 6,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "",
    name: "fuckcuntpisshit",
  };

  prismaMock.scores.create.mockReturnValue(score6);

  await expect(createScore(score6)).rejects.toThrow(
    `Your name is too naughty!`
  );
});

test("Creating a score with a long name throws an error", async () => {
  const score3 = {
    id: 3,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "",
    name: "chrisisthemostiandbesteverwoooooothisissolonghorray",
  };

  prismaMock.scores.create.mockReturnValue(score3);

  await expect(createScore(score3)).rejects.toThrow(
    `Your high score nickname is too long!`
  );
});
