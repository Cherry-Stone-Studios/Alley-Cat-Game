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
    res.status(200).send({
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
  try {
    const userScores = await getScoresByUsername(username);

    res.status(200).send(userScores);
  } catch (err) {
    throw err;
  }
});

//UPDATE/PUT
// PUT to /api/scores/:id
router.put("/:id", async (req, res, next) => {
  // grab the id from params -> this is the score we want to update
  const id = parseInt(req.params.id);
  const { value, created_on, username, guestname } = req.body;

  try {
    const updatedScore = await adminUpdateScore({
      id,
      value,
      created_on,
      username,
      guestname,
    });
    res.send({ message: `Score updated successfully!`, ...updatedScore });
  } catch (err) {
    throw err;
  }
});

//DELETE
// DELETE to /api/scores/:id
router.delete("/:id", async (req, res) => {
  // grab the id from params -> this is the score we want to delete
  const id = parseInt(req.params.id);

  try {
    await deleteScore(id);
    res.send({
      message: `The score has been deleted from the database.`,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
