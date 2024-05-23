const express = require("express");
const router = express.Router();
const { adminUpdatesUser, getAllUsers } = require("./users.cjs");

// Admin accessed endpoints
// TODO : IMPORT "requireAdmin" function to routes that only admin will reach
// GET ALL USERS FOR ADMIN
router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(201).send(users);
  } catch (err) {
    throw err;
  }
});

// UPDATE USER BY USER ID FOR ADMIN
router.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    singleUser = await adminUpdatesUser(userId);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
