const express = require('express');
const router = express.Router();

// @route  /api/users/
// @desc   Test API
// @access  PUBLIC
router.get('/', (req,res) => res.send('User Route'));

module.exports = router;