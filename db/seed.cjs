const { createUser } = require("./users.cjs");
const prisma = require("../client.cjs");
const bcrypt = require("bcrypt");
require('dotenv').config();
const log = console.log;

const user = [];
const restart = async () => { await prisma.user.deleteMany({}) };
log('db restarted');

const seedUsers = async () => {
	log('seed begun ...')
	// hardcoded admins for testing
	const admin1 = {
		name: "Hannah",
		username: "Serendipity",
		email: "hannah@hannah.com",
		password: "Serendipity",
		date_of_birth: "1996-12-17T00:00:00",
		is_admin: true
	};

	const admin2 = {
		name: "Nakayla",
		username: "SevenNoms00",
		email: "Nakayla@Nakayla.com",
		password: "SevenNoms00",
		date_of_birth: "1996-12-17T00:00:00",
		is_admin: true
	};

	const admin3 = {
		name: "Chris",
		username: "artauds",
		email: "Chris@Chris.com",
		password: "artauds",
		date_of_birth: "1996-12-17T00:00:00",
		is_admin: true
	};

	log('adding seed user...')
	// Hardcoded user for testing
	const user1 = {
		name: "Valentino",
		username: "HiImPaul",
		email: "valentino@valentino.com",
		password: "HiImPaul",
		date_of_birth: "1996-12-17T00:00:00",
	};

	const user2 = {
		name: "Charles",
		username: "CharlesBorat",
		email: "Charles@Charles.com",
		password: "CharlesBorat",
		date_of_birth: "1996-12-17T00:00:00",
	};

	const user3 = {
		name: "Luisa",
		username: "LovelyLuisa",
		email: "Luisa@Luisa.com",
		password: "LovelyLuisa",
		date_of_birth: "1996-12-17T00:00:00",
	};
	log("seed finished...HOORAY")

	// Push created users into "user" array
	user.push(await createUser(admin1))
	user.push(await createUser(admin2))
	user.push(await createUser(admin3))
	user.push(await createUser(user1))
	user.push(await createUser(user2))
	user.push(await createUser(user3))
};

const seed = async () => {
	await restart();
	await seedUsers();
};

seed()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	});