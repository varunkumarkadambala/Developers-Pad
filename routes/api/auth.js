const express = require('express');
const router = express.Router();

// @route  /api/auth/
// @desc   Test API
// @access  PUBLIC
router.post('/', (req,res) => {
    console.log(req.body)
    res.send('Auth Route')
});

module.exports = router;