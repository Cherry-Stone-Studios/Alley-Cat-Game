const express = require("express");
const router = express.Router();
const { jwt } = require("jsonwebtoken");
const { requireAdmin } = require("./utils.cjs");
const { bcrypt } = require("bcrypt");

const {
  createUser,
  getAllUsers,
  getUserById,
  adminUpdatesUser,
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

// CREATE/POST

// router.post("/register", async (req, res) => {
//   // given username and password on body
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
//     const token = signToken(singleUser.username, singleUser.id);
//     // Send back the token w/ message
//     res
//       .send({
//         message: `Thank you for registering, wonderful to meet you ${singleUser.name}.`,
//       })
//       .send(201);
//   } catch (err) {
//     throw err;
//   }
// });

//CREATE USER
// router.post("/register", async (req, res) => {
// 	// given username and password on body
// 	const { name, username, email, password, date_of_birth } = req.body;
// 	try {
// 		// register user with createUser function
// 		singleUser = await createUser(name, username, email, password, date_of_birth)
// 		// sign token with user info
// 		const token = signToken(user.username, user.id);
// 		// Send back the token w/ message
// 		res.send({message: `Thank you for registering, wonderful to meet you ${user.name}`}).send(201)
// 	} catch (err){
// 		throw err;
// 	}
// });

// USER ACCESSED ENDPOINTS
// READ/GET ALL USERS
router.get("/api/users", async (req, res) => {
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
    singleUser = await getUserById(parseInt(req.params.id)); //convert req.params.id to INT
    res.status(200).send(singleUser);
  } catch (err) {
    throw err;
  }
});

// READ/GET ALL USERS BY USERNAME

router.get("/username/:username", async (req, res) => {
  const username = req.params.username;
  try {
    singleUser = await getUserByUsername(username);
    res.status(200).send(singleUser);
  } catch (err) {
    throw err;
  }
});

// router.get("/:username", async (req, res) => {
// 	const username = req.params.username
// 	try{
// 		singleUser = await getUserByUsername(username)
// 		res.status(200).send(singleUser)
// 	} catch (err){
// 		throw err;
// 	}
// });

//UPDATE USER BY USERNAME
router.put("/api/users/:username", async (req, res) => {
  const username = req.params.username;
  try {
    singleUser = await userUpdatesUser(username);
  } catch (err) {
    throw err;
  }
});


//DELETE USER
router.delete("/api/users/:userId", async (req, res) => {
  const username = req.params.userId;
  try {
    singleUser = await deleteUser(userId);
  } catch (err) {
    throw err;
  }
});

// //DELETE USER
// router.delete("/users/:id", async (req, res) => {
// 	const username = req.params.id
// 	try{
// 		singleUser = await deleteUser(id)
// 	} catch (err){
// 		throw err;
// 	}
// });

// Admin accessed endpoints
// TODO : IMPORT "requireAdmin" function to routes that only admin will reach
// GET ALL USERS FOR ADMIN
router.get("/api/users/admin", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(201).send(users);
  } catch (err) {
    throw err;
  }
});

//  USER BY USERID FOR ADMIN
router.put("/api/users/admin/:userId", async (req, res) => {
  const username = req.params.username;
  try {
    singleUser = await adminUpdatesUser(username);
  } catch (err) {
    throw err;
  }
});


// ADMIN ACCESSED ENDPOINTS
//UPDATE USER BY USERNAME ADMIN
// router.put("/api/users/:id", async (req, res,) => {
// 	const saltRounds = 10;
// 	const hashedPassword = await bcrypt.has(password, saltRounds)
// 	const { name,
// 		username,
// 		email,
// 		password,
// 		date_of_birth,
// 		is_admin,
// 		nyan_unlocked } = req.body
// 	try{
// 		updatedUser = await userUpdatesUser(
// 			name,
// 			username,
// 			email,
// 			hashedPassword,
// 			date_of_birth,
// 			is_admin,
// 			nyan_unlocked)
// 		res.send(updatedUser);
// 	} catch (err){
// 		throw err;
// 	}
// });

// // GET ALL USERS FOR ADMIN
// router.get("/api/admin/users", async (req, res) => {
// 	try{
// 		const users = await getAllUsers()
// 		res.status(201).send(users)
// 	} catch (err){
// 		throw err;
// 	}
// });

// //  USER BY id FOR ADMIN
// router.put("/api/admin/users/:id", async (req, res) => {
// 	const username = req.params.username
// 	try{
// 		singleUser = await adminUpdatesUser(username)
// 	} catch (err){
// 		throw err;
// 	}
// });

module.exports = router;
