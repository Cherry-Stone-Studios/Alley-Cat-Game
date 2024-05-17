const express = require("express");
const router = express.Router();
const { jwt } = require("jsonwebtoken");
const { bcrypt } = require("bcrypt");
const bodyParser = require("body-parser");

const {
  createUser,
  getAllUsers,
  getUserById,
  userUpdatesUser,
  deleteUser,
  getUserByUsername,
} = require("../db/users.cjs");

const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "2w",
  });
  return token;
};

// USER ACCESSED ENDPOINTS
// GET ALL USERS
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
  const id = req.params.id;
  try {
    singleUser = await getUserById(id);
    res.status(200).send(singleUser);
  } catch (err) {
    throw err;
  }
});

// GET ALL USERS BY USERNAME
// router.get("/:username", async (req, res) => {
// 	const username = req.params.username
// 	try{
// 		singleUser = await getUserByUsername(username)
// 		res.status(200).send(singleUser)
// 	} catch (err){
// 		throw err;
// 	}
// });

//CREATE USER
// router.post("/register", async (req, res) => {
//   // given username and password on body
//   console.log(req.body);
//   const { name, username, email, password, date_of_birth } = req.body;
//   try {
//     // register user with createUser function
//     singleUser = await createUser(
//       name,
//       username,
//       email,
//       password,
//       date_of_birth
//     );
//     // sign token with user info
//     const token = signToken(user.username, user.id);
//     // Send back the token w/ message
//     res
//       .send({
//         message: `Thank you for registering, wonderful to meet you ${user.name}`,
//       })
//       .send(201);
//   } catch (err) {
//     throw err;
//   }
// });

//DELETE USER
// router.delete("/users/:id", async (req, res) => {
//   const username = req.params.id;
//   try {
//     singleUser = await deleteUser(id);
//   } catch (err) {
//     throw err;
//   }
// });

module.exports = router;
