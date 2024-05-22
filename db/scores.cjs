/* eslint-disable no-useless-catch */
const prisma = require("../client.cjs");
const { doesContainBadWords } = require("deep-profanity-filter");
const { wordFilter } = require("../moderation/filter.cjs");

const getDate = (created_on) => {
  let date = new Date(created_on);
  let dateISO = date.toISOString();
  return dateISO;
};

// Create/POST

const createScore = async ({ value, created_on, username, guestname }) => {
  try {
    const badName = doesContainBadWords(guestname, wordFilter);
    const date = getDate(created_on);

    const isUser = await prisma.user
      .count({
        where: {
          username: guestname,
        },
      })
      .then(Boolean);

    const ifUserExists = await prisma.user
      .count({
        where: {
          username,
        },
      })
      .then(Boolean);

    if (badName === true) {
      throw Error(`Your name is too naughty!`);
    } else if (guestname.length > 25) {
      throw Error(`Your high score nickname is too long!`);
    } else if (isUser === true) {
      throw Error(
        `Your high score name belongs to a user. Register your own account to claim your very own name!`
      );
    } else if (ifUserExists && username.length > 0) {
      const userNewScore = await prisma.scores.create({
        data: {
          value,
          created_on: date,
          name: username,
        },
      });
      console.log("USER SCORES", userNewScore);
      return userNewScore;
    } else if (guestname.length > 0) {
      const unregisteredNewScore = await prisma.scores.create({
        data: {
          value,
          created_on: date,
          guestname: guestname,
        },
      });
      console.log("GUEST SCORES", unregisteredNewScore);

      return unregisteredNewScore;
    } else if (!ifUserExists === true) {
      const oopsieHighScore = await prisma.scores.create({
        data: {
          value,
          created_on: date,
          guestname: username,
        },
      });
      console.log("OOPSIE SCORES", oopsieHighScore);

      return oopsieHighScore;
    }
  } catch (err) {
    throw err;
  }
};

// Read/GET

const getAllScores = async () => {
  try {
    const allScores = await prisma.scores.findMany();

    return allScores;
  } catch (err) {
    throw err;
  }
};

const getScoresByUsername = async (username) => {
  try {
    const userByUsername = await prisma.scores.findMany({
      where: { name: username },
    });
    return userByUsername;
  } catch (err) {
    throw err;
  }
};

// Update/PATCH
const adminUpdateScore = async ({ value, created_on, username, guestname }) => {
  try {
    const date = getDate(created_on);

    const updatedScore = await prisma.scores.update({
      data: {
        value,
        created_on: date,
        name: username,
        guestname,
      },
    });
    return updatedScore;
  } catch (err) {
    throw err;
  }
};

// Delete

const deleteScore = async ({ id }) => {
  try {
    await prisma.scores.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createScore,
  getAllScores,
  getScoresByUsername,
  adminUpdateScore,
  deleteScore,
};
