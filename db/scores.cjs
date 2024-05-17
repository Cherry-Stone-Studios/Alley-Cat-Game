/* eslint-disable no-useless-catch */
const prisma = require("../client.cjs");
const { doesContainBadWords } = require("deep-profanity-filter");
const { wordFilter } = require("../moderation/filter.cjs");

// Create/POST

const createScore = async ({ value, created_on, username, name }) => {
  try {
    const badName = doesContainBadWords(name, wordFilter);

    if (badName === true) {
      throw Error(`Your name is too naughty!`);
    } else {
      const newScore = await prisma.scores.create({
        data: {
          value,
          created_on,
          username,
          name,
        },
      });
      return newScore;
    }
  } catch (err) {
    console.log("Error creating score", err);
    throw err;
  }
};

// Read/GET

const getAllScores = async () => {
  try {
    const rows = await prisma.score.findMany();

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
    console.log("Oops! Try that again.", err);
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
