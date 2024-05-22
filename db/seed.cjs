const { createUser } = require("./users.cjs");
const { createScore } = require("./scores.cjs");
const prisma = require("../client.cjs");
require("dotenv").config();
const log = console.log;

const user = [];
const scores = [];
const restart = async () => {
  await prisma.user.deleteMany({});
};
log("db restarted");

const seedUsers = async () => {
  log("Adding seeded admins ...");
  // hardcoded admins for testing
  const admin1 = {
    name: "Hannah",
    username: "Serendipity",
    email: "hannah@hannah.com",
    password: "Serendipity",
    date_of_birth: "1996-12-17",
    is_admin: true,
  };

  const admin2 = {
    name: "Nakayla",
    username: "SevenNoms00",
    email: "Nakayla@Nakayla.com",
    password: "SevenNoms00",
    date_of_birth: "1996-12-17",
    is_admin: true,
  };

  const admin3 = {
    name: "Chris",
    username: "artauds",
    email: "Chris@Chris.com",
    password: "artauds",
    date_of_birth: "1996-12-17",
    is_admin: true,
  };

  log("Adding seeded users...");
  // Hardcoded user for testing
  const user1 = {
    name: "Valentino",
    username: "HiImPaul",
    email: "valentino@valentino.com",
    password: "HiImPaul",
    date_of_birth: "1996-12-17",
  };

  const user2 = {
    name: "Charles",
    username: "CharlesBorat",
    email: "Charles@Charles.com",
    password: "CharlesBorat",
    date_of_birth: "1996-12-17",
  };

  const user3 = {
    name: "Luisa",
    username: "LovelyLuisa",
    email: "Luisa@Luisa.com",
    password: "LovelyLuisa",
    date_of_birth: "1996-12-17",
  };
  log("User creation complete...");

  // Push created users into "user" array
  user.push(await createUser(admin1));
  user.push(await createUser(admin2));
  user.push(await createUser(admin3));
  user.push(await createUser(user1));
  user.push(await createUser(user2));
  user.push(await createUser(user3));
  log("Users pushed into user table...");
};

const seedScores = async () => {
  log("Adding seeded scores...");
  // hardcoded scores for testing
  const scores1 = {
    value: 1000,
    created_on: "2000-01-01",
    username: "HiImPaul",
    guestname: "",
  };

  const scores2 = {
    value: 2000,
    created_on: "2000-01-01",
    username: "artauds",
    guestname: "",
  };

  const scores3 = {
    value: 3000,
    created_on: "2000-01-01",
    username: "",
    guestname: "atotallynewuser",
  };

  const scores4 = {
    value: 4000,
    created_on: "2000-01-01",
    username: "LovelyLuisa",
    guestname: "",
  };

  const scores5 = {
    value: 5000,
    created_on: "2000-01-01",
    username: "",
    guestname: "andDavid2",
  };

  const scores6 = {
    value: 5000,
    created_on: "2000-01-01",
    username: "andDavid3",
    guestname: "",
  };

  const scores7 = {
    value: 2000,
    created_on: "2000-01-01",
    username: "artauds",
    guestname: "",
  };

  log("Score creation complete...");

  // Push created scores into "scores" array
  scores.push(await createScore(scores1));
  scores.push(await createScore(scores2));
  scores.push(await createScore(scores3));
  scores.push(await createScore(scores4));
  scores.push(await createScore(scores5));
  scores.push(await createScore(scores6));
  scores.push(await createScore(scores7));
};

const seed = async () => {
  await restart();
  await seedUsers();
  await seedScores();
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
