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

const createScore = async ({ value, created_on, username, name }) => {
  try {
    const badName = doesContainBadWords(name, wordFilter);
    const date = getDate(created_on);

    const isUser = await prisma.user
      .count({
        where: {
          username: name,
        },
      })
      .then(Boolean);

    if (badName === true) {
      throw Error(`Your name is too naughty!`);
    } else if (name.length > 25) {
      throw Error(`Your high score nickname is too long!`);
    } else if (isUser === true) {
      throw Error(
        `Your high score name belongs to a user. Register your own account to claim your very own name!`
      );
    } else if (username.length > 0) {
      const userNewScore = await prisma.scores.create({
        data: {
          value,
          created_on: date,
          name: username,
        },
      });
      return userNewScore;
    } else {
      const unregisteredNewScore = await prisma.scores.create({
        data: {
          value,
          created_on: date,
          name,
        },
      });
      return unregisteredNewScore;
      return unregisteredNewScore;
    }
  } catch (err) {
    throw err;
  }
};

// Read/GET

const getAllScores = async () => {
  try {
    const rows = await prisma.scores.findMany();

    return rows;
  } catch (err) {
    throw err;
  }
};

const getScoresByUsername = async (username) => {
  try {
    const userByUsername = await prisma.scores.findMany({
      where: {
        username,
      },
    });
    console.log("GO GET MY USER SCORES BY USERNAME", userByUsername);
    return userByUsername;
  } catch (err) {
    throw err;
  }
};

// Update/PATCH
const adminUpdateScore = async (value, created_on, username, name) => {
  try {
    const updatedScore = await prisma.scores.update({
      where: {
        is_admin: true,
      },
      data: {
        value,
        created_on,
        username,
        name,
      },
    });

    return updatedScore;
  } catch (err) {
    throw err;
  }
};

// Delete

const deleteScore = async (id) => {
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
