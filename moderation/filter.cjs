// // import the profanity filter packages
const {
  preprocessWordLists,
  doesContainBadWords,
} = require("deep-profanity-filter");

// create a blacklist for swear words

const fs = require("fs");
const path = require("path");
let swears = fs.readFileSync(path.resolve(__dirname, "./swears.txt"), "utf8");
let badwords = swears.split("\n");

// create a whitelist for exceptions

let whitelist = ["kitty", "cat*"];

let wordFilter = preprocessWordLists(badwords, whitelist);

module.exports = { wordFilter };
