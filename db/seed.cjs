const {createUser } = require("./users.cjs");
const prisma = require("../client.cjs");
const bcrypt = require("bcrypt");
require('dotenv').config()
const log = console.log


const restart = async () => {await prisma.user.deleteMany({})}

const seed = async () => {
	try{
		log("seeding database...");
		
		log("adding seed admin...");

		// hardcoded admins for testing
		const admin1 = await createUser({
			name : "Hannah",
			username: "Serendipity",
			email: "hannah@hannah.com",
			password: "Serendipity",
			date_of_birth: "1996-12-17T00:00:00",
			is_admin: true
		});

		const admin2 = await createUser({
			name : "Nakayla",
			username: "SevenNoms00",
			email: "Nakayla@Nakayla.com",
			password: "SevenNoms00",
			date_of_birth: "1996-12-17T00:00:00",
			is_admin: true
		});

		const admin3 = await createUser({
			name : "Chris",
			username: "artauds",
			email: "Chris@Chris.com",
			password: "artauds",
			date_of_birth: "1996-12-17T00:00:00",
			is_admin: true		
		});

		log('adding seed user...')

		const user1 = await createUser({
			name : "Valentino",
			username: "HiImPaul",
			email: "valentino@valentino.com",
			password: "HiImPaul",
			date_of_birth: "1996-12-17T00:00:00",
		});
	}catch (err){
	}
};

seed()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		log(e);
		await prisma.$disconnect();
		process.exit(1);
	});