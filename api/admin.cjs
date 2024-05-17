const express = require("express");
const router = express.Router();
const { getAllUsers, adminUpdatesUser } = require("../db/users.cjs");

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

// //  USER BY id FOR ADMIN
// router.put("/api/admin/users/:id", async (req, res) => {
// 	const username = req.params.username
// 	try{
// singleUser = await adminUpdatesUser(username)
// 	} catch (err){
// 		throw err;
// 	}
// });

module.exports = router;
