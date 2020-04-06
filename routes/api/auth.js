const express = require('express');
const router = express.Router();

// @route  /api/auth/
// @desc   Test API
// @access  PUBLIC
router.get('/', (req,res) => res.send('Auth Route'));

module.exports = router;