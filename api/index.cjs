
const { requireAdmin, requireUser } = require('../utils.cjs');

const express = require('express');
const router = express.Router();

// /api

router.use('/api/users', requireUser, require('./users.cjs'));

//accessing all scores routes
router.use('/api/scores', require('./scores.cjs'));

// accessing all admin routes
router.use('/api/admin', requireAdmin, require('./admin.cjs'));

module.exports = router;