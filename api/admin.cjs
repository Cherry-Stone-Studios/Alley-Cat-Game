const express = require("express");
const router = express.Router();
const { requireAdmin } = require("./utils.cjs");
const { adminUpdateScore, deleteScore } = require("../db/scores.cjs");
const { adminUpdatesUser, deleteUser } = require("../db/users.cjs");

// Update a user by id
// PUT to /api/admin/users/:id
router.put("/users/:id", requireAdmin, async (req, res, next) => {
  // grab the id from the body -> this is the user we want to update
  const {
    id,
    name,
    username,
    email,
    password,
    date_of_birth,
    is_admin,
    nyan_unlocked,
  } = req.body;

  try {
    const updatedUser = await adminUpdatesUser({
      id,
      name,
      username,
      email,
      password,
      date_of_birth,
      is_admin,
      nyan_unlocked,
    });
    res
      .status(200)
      .send({ message: `User updated successfully!`, ...updatedUser });
  } catch (err) {
    throw err;
  }
});

// Update a score by the score ID
// PUT to /api/admin/scores/:id
router.put("/scores/:id", requireAdmin, async (req, res, next) => {
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
    res
      .status(200)
      .send({ message: `Score updated successfully!`, ...updatedScore });
  } catch (err) {
    throw err;
  }
});

// Delete a user's profile
// DELETE /api/admin/users/:id
router.delete("/users/:id", requireAdmin, async (req, res) => {
  // grab the id from params -> this is the user we want to delete
  const id = parseInt(req.params.id);

  try {
    const deletedUser = await deleteUser(id);
    console.log("THIS IS THE ADMIN DELETED USER", deletedUser);
    res.status(200).send({
      message: `You have successfully deleted the user's account.`,
    });
  } catch (err) {
    throw err;
  }
});

// Delete a score from the DB
// DELETE /api/admin/scores/:id
router.delete("/scores/:id", requireAdmin, async (req, res) => {
  // grab the id from params -> this is the score we want to delete
  const id = parseInt(req.params.id);

  try {
    await deleteScore(id);
    res.status(200).send({
      message: `The score has been deleted from the database.`,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
