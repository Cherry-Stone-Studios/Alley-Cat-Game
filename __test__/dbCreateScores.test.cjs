const { createScore } = require("../db/scores.cjs");
const { prismaMock } = require("../singleton.cjs");

test("Should create a valid new score for a user", async () => {
  const scores1 = {
    id: 1,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "nakaylisamazing",
    name: "nakaylisamazing",
  };

  prismaMock.scores.create.mockReturnValue(scores1);
  const scoresResult1 = await createScore(scores1);
  expect(scoresResult1).toEqual({
    id: 1,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: "nakaylisamazing",
    name: "nakaylisamazing",
  });
});

test("Should create a valid new score for an unregistered user", async () => {
  const scores2 = {
    id: 2,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: null,
    name: "nooshydelightful",
  };

  prismaMock.scores.create.mockReturnValue(scores2);
  const scoresResult2 = await createScore(scores2);
  expect(scoresResult2).toEqual({
    id: 2,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: null,
    name: "nooshydelightful",
  });
});

test("Creating a score with a naughty name throws an error", async () => {
  const user7 = {
    id: 7,
    value: 1000,
    created_on: "2000-01-01T00:00:00",
    username: null,
    name: "fuck this game",
  };

  prismaMock.user.create.mockReturnValue(user7);

  await expect(createScore(user7)).rejects.toThrow(`Your name is too naughty!`);
});
