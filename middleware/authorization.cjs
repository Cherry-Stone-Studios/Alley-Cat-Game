//install dotenv on server
require("dotenv").config;

// install and use Express
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users.cjs");

// create a function that checks for the correct auths
const authCheck = async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  }

  // else if auth header contains Bearer**
  // create a token for the user
  else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      const id = verifiedToken.id;

      if (id) {
        const user = await getUserById(id);
        req.user = user;
      }
    } catch (error) {
      console.error("JWT verification error:", error);
    }
    next();
  } else {
    next();
  }
};

module.exports = { authCheck };
