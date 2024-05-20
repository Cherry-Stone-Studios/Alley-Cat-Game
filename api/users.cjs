const express = require("express");
const router = express.Router();
const { jwt } = require("jsonwebtoken");
// const { requireAdmin } = require("./utils.cjs");
// const { bcrypt } = require("bcrypt");

const {
  createUser,
  getAllUsers,
  getUserById,
  adminUpdatesUser,
  userUpdatesUser,
  deleteUser,
  getUserByUsername,
} = require("../db/users.cjs");

// USING JWT TO SIGN USER WITH TOKEN THAT LASTS 2 WEEKS
const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "2w",
  });
  return token;
};

// CREATE/POST

router.post("/register", async (req, res) => {
  // given username and password on body
  const { name, username, email, password, date_of_birth } = req.body;
  try {
    // register user with createUser function
    singleUser = await createUser(
      name,
      username,
      email,
      password,
      date_of_birth
    );
    console.log(singleUser);
    // sign token with user info
    const token = signToken(singleUser.username, singleUser.id);
    // Send back the token w/ message
    res
      .send({
        message: `Thank you for registering, wonderful to meet you ${singleUser.name}.`,
      })
      .send(201);
  } catch (err) {
    throw err;
  }
});

// READ/GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    throw err;
  }
});

// GET USER BY id
router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id); //convert req.params.id to INT
    const singleUser = await getUserById(userId);
    res.status(200).send(singleUser);
  } catch (err) {
    throw err;
  }
});

// READ/GET ALL USERS BY USERNAME

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  try {
    singleUser = await getUserByUsername(username);
    res.status(200).send(singleUser);
  } catch (err) {
    throw err;
  }
});

//UPDATE USER BY USERNAME
router.put("/:username", async (req, res) => {
  const username = req.params.username;
  try {
    singleUser = await userUpdatesUser(username);
  } catch (err) {
    throw err;
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    singleUser = await deleteUser(userId);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
