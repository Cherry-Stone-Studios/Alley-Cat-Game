const express = require("express");
const router = express.Router();
// const { requireAdmin } = require("./utils.cjs");
require("dotenv").config;
// const { checkUsername } = require("./utils.cjs");

const {
  createScore,
  getAllScores,
  getScoresByUsername,
  adminUpdateScore,
  deleteScore,
} = require("../db/scores.cjs");

// CREATE/POST

// POST to /api/scores/

router.post("/", async (req, res) => {
  // given a value, created_on date, username, and guestname on body
  const { value, created_on, username, guestname } = req.body;

  try {
    // create a new high score with the createScore function
    const highscore = await createScore({
      value,
      created_on,
      username,
      guestname,
    });
    // send a message upon creation of a high score, `Do you want to play again?`
    // along with the value of the score and name where name
    res.send({
      message: `Do you want to play again?`,
      ...highscore,
    });
    // }
  } catch (err) {
    throw err;
  }
});

// GET to /api/scores/

router.get("/", async (req, res) => {
  try {
    const scores = await getAllScores();
    res.status(200).send(scores);
  } catch (err) {
    throw err;
  }
});

// GET to /api/scores/:username

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  console.log("SCORES USERNAME BY USERNAME", username);
  try {
    const userScores = await getScoresByUsername(username);
    console.log(
      "THIS IS MY USER SCORES FUNCTION THERE ARE MANY LIKE IT BUT THIS ONE IS MINE",
      userScores
    );
    res.status(200).send(userScores);
  } catch (err) {
    throw err;
  }
});

// PUT to /api/scores/:id

// DELETE to /api/scores/:id

module.exports = router;
