const jwt = require("jsonwebtoken");
require("dotenv").config;

// if user is register -> grant access
const requireUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// if user is admin -> grant access
const requireAdmin = (req, res, next) => {
  if (req.body.is_admin === true) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// USING JWT TO SIGN USER WITH TOKEN THAT LASTS 2 WEEKS
const signToken = async ({ id, username }) => {
  const user = { id, username };
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "2w",
  });

  return token;
};
module.exports = {
  requireAdmin,
  requireUser,
  signToken,
};
