const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config;
const log = console.log;
const { requireUser, signToken } = require("./utils.cjs");

const {
  createUser,
  getAllUsers,
  getUserById,
  userUpdatesUser,
  deleteUser,
  getUserByUsername,
} = require("../db/users.cjs");

// CREATE/POST
// POST /api/users/register
router.post("/register", async (req, res, next) => {
  // given username and password on body
  const { name, username, email, password, date_of_birth } = req.body;
  try {
    // register user with createUser function
    singleUser = await createUser({
      name,
      username,
      email,
      password,
      date_of_birth,
    });
    // sign token with user info
    const token = await signToken({
      id: singleUser.id,
      username: singleUser.username,
    });
    // Send back the token w/ message
    res.status(200).send({
      message: `Thank you for registering, wonderful to meet you ${singleUser.name}.`,
      token,
      ...singleUser,
    });
  } catch (err) {
    next(err);
  }
});

// login to existing account with JWT
// POST api/users/login
router.post("/login", async (req, res, next) => {
  // We recieve a username and password on body
  const plainPassword = req.body.password;
  // has plainPassword for compare
  const username = req.body.username;
  //Does this user exist?
  try {
    const user = await getUserByUsername(username);

    // if the user is not in our DB -> next(err) that states "user does not exist"
    if (!user) {
      res.send({
        message: `User does not exist. Register today to keep track of the fun!`,
      });
      // else if the user is in the DB
    } else {
      // check password agaist the hash with bcrypt compare
      const validPassword = await bcrypt.compare(plainPassword, user.password);
      // if the password is not a match
      if (!validPassword) {
        // return a invalid credentials message to user
        res.send({
          message:
            "Sorry, you have provided invalid credendials for successful login. Try again.",
        });
        // if the password is a match
      } else {
        // this is a valid login --> sign token
        const token = await signToken({ id: user.id, username: user.username });
        res.status(200).send({
          message: `Welcome ${user.username}, you're logged in!`,
          token,
          ...user,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

// READ/GET ALL USERS
// GET /api/users/
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

// GET USER BY id
// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); //convert req.params.id to INT
    const singleUser = await getUserById(userId);
    res.status(200).send(singleUser);
  } catch (err) {
    log(err);
    res.sendStatus(500);
  }
});

// READ/GET ALL USERS BY USERNAME
// GET /api/users/username/:username
router.get("/username/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    user = await getUserByUsername(username);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

//UPDATE USER BY ID
// PUT /api/users/:id
router.put("/:id", requireUser, async (req, res, next) => {
  const { name, username, email, password } = req.body;

  // grab the id from params -> this is the user we want to delete
  // grab the id from body -> this is the user who is interacting with our app
  // check to see if the two usernames are a match
  const matchedId = parseInt(req.params.id) === req.user.id;

  // if they are a match, edit the user
  if (matchedId === true) {
    try {
      const singleUser = await userUpdatesUser({
        id,
        name,
        username,
        email,
        password,
      });
      res
        .status(200)
        .send({ message: `User updated successfully!`, ...singleUser });
    } catch (err) {
      next(err);
    }
    //else, they're not the right user
  } else {
    res.status(401).send({ message: `Unathorized access detected!` });
  }
});

//DELETE USER
// DELETE /api/users/:id
router.delete("/:id", requireUser, async (req, res, next) => {
  // grab the id from params -> this is the user we want to delete
  // grab the id from body -> this is the user who is interacting with our app
  // check to see if the two usernames are a match
  const matchedId = parseInt(req.params.id) === req.user.id;

  // if they are not a match, send back an unauthorized message
  if (matchedId === true) {
    // if they are a match, run deleteUser with the ID of current user
    try {
      const deletedUser = await deleteUser(id);
      res.status(200).send({
        message: `You have successfully deleted your account. An alley can be a dangerous place for a stay, stay safe!`,
      });
      console.log("Goodbye, we're gonna miss you!", deletedUser);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).send({ message: `Unathorized access detected!` });
  }
});

module.exports = router;
