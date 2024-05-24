const express = require("express");
const router = express.Router();
require("dotenv").config;

const {
  addFriend,
  getUsersFriends,
  removeFriend,
} = require("../db/friends.cjs");

// CREATE/POST

// POST to /api/users/friends

router.post("/", async (req, res) => {
  // given a user and friend ID on the body
  const { id, friendid } = req.body;

  try {
    // create a new high score with the createScore function
    const newFriend = await addFriend({
      id,
      friendid,
    });
    // send a confirmation message and a spread of the new friend just added
    res.status(200).send({
      ...newFriend,
    });
    // }
  } catch (err) {
    throw err;
  }
});

// GET to /api/users/friends/:id
// where id is the user's ID

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.body.id);

    const friends = await getUsersFriends(id);
    res.status(200).send(friends);
  } catch (err) {
    throw err;
  }
});

//DELETE
// DELETE to /api/users/friends

router.delete("/", async (req, res) => {
  // given a user and friend ID on the body
  const id = parseInt(req.body.id);
  const friendid = parseInt(req.body.friendid);

  try {
    const remainingFriends = await removeFriend(id, friendid);

    res.status(200).send({
      message: `Friend removed successfully. We hope you find some new friends soon!`,
      remainingFriends,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
