const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route  POST /api/users/
// @desc   Register a new user
// @access  PUBLIC
router.post('/', [
        check('name', 'Name is required!').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password','Enter a password with minimum 8 characters').isLength({min : 8})
    ],
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        console.log(req.body)
        res.send('Auth Route')
    }
);

module.exports = router;