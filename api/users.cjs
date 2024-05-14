const express = require('express')
const router = express.Router()
const {createUser, getAllUsers, getUserById, adminUpdatesUser, userUpdatesUser, deleteUser, getUserByUsername} = require('../db/users.cjs')


// USER ACCESSED ENDPOINTS 
// GET ALL USERS
router.get("/api/users", async (req, res) => {
	try {
		const users = await getAllUsers();
		res.status(200).send(users)
	} catch (err){
		throw err; 
	}
});

// GET USER BY USERID
router.get("/api/users/:userId", async (req, res) => {
	const id = req.params.userId
	try{
		singleUser = await getUserById(id) 
		res.sendStatus(200).send(singleUser)
	} catch (err){
		throw err;
	}
});

//GET ALL USERS BY USERNAME 
router.get("/api/users/:username", async (req, res) => {
	const username = req.params.username
	try{
		singleUser = await getUserByUsername(username)
		res.sendStatus(200).send(singleUser)
	} catch (err){
		throw err;
	}
});

//CREATE USER
router.post("/api/users", async (req, res) => {
	const data = {name,username,email,password,date_of_birth,}
	try{
		singleUser = await userUpdatesUser(data)
		res.sendStatus(201).send(data)
	} catch (err){
		throw err;
	}
});

//UPDATE USER BY USERNAME
router.put("/api/users/:username", async (req, res) => {
	const username = req.params.username
	try{
		singleUser = await userUpdatesUser(username)
	} catch (err){
		throw err;
	}
});

//DELETE USER
router.delete("/api/users/:userId", async (req, res) => {
	const username = req.params.userId
	try{
		singleUser = await deleteUser(userId)
	} catch (err){
		throw err;
	}
});


// Admin accessed endpoints	
	// TODO : IMPORT "requireAdmin" function to routes that only admin will reach 
// GET ALL USERS FOR ADMIN 
	router.get("/api/users/admin", async (req, res) => {
	try{
		const users = await getAllUsers()
		res.status(201).send(users)
	} catch (err){
		throw err;
	}
});

//  USER BY USERID FOR ADMIN
router.put("/api/users/admin/:userId", async (req, res) => {
	const username = req.params.username
	try{
		singleUser = await adminUpdatesUser(username)
	} catch (err){
		throw err;
	}
});



module.exports = router