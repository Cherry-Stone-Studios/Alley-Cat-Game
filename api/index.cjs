const { requireAdmin, requireUser } = require("../utils.cjs");
const express = require("express");
const router = express.Router();

///api

router.use("/users", require("./users.cjs"));

//accessing all scores routes
// router.use('/scores', require('./scores.cjs'));

// accessing all admin routes (only accessible as ADMIN)
// router.use('/admin', requireAdmin, require('./admin.cjs'));

module.exports = router;
