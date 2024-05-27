require("dotenv").config;
const jwt = require("jsonwebtoken");

// if user is register -> grant access
const requireUser = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// if user is admin -> grant access
const requireAdmin = async (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    res.status(401).send({
      message: `This alley is just for dogs! You do not have permission to access this area.`,
    });
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
