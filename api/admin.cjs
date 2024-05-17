const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  adminUpdatesUser,
  getUserById,
} = require("../db/users.cjs");

// ADMIN ACCESSED ENDPOINTS
//UPDATE USER BY USERNAME

// GET ALL USERS FOR ADMIN
router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    throw err;
  }
});

//  USER BY id FOR ADMIN
router.put("/users/:id", async (req, res) => {
  try {
    const singleUser = await getUserById(parseInt(req.params.id));
    res.send(200).send(singleUser);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
