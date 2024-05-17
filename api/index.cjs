const { requireAdmin, requireUser } = require("../utils.cjs");
const express = require("express");
const router = express.Router();

///api

router.use("/users", require("./users.cjs"));

// accessing all admin routes (only accessible as ADMIN)
// TEST AGAIN AFTER LOG IN AND REGISTER ARE COMPLETE
router.use("/admin", require("./admin.cjs"));

//accessing all scores routes
// router.use('/scores', require('./scores.cjs'));

module.exports = router;
