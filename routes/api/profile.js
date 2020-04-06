const express = require('express');
const router = express.Router();

// @route  /api/profile/
// @desc   Test API
// @access  PUBLIC
router.get('/', (req,res) => res.send('Profile Route'));

module.exports = router;