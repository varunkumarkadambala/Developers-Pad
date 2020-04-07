const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User')

// @route  POST /api/users/
// @desc   Register a new user
// @access  PUBLIC
router.post('/', [
        check('name', 'Name is required!').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password','Enter a password with minimum 8 characters').isLength({min : 8})
    ],
     async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const { name, email, password} = req.body;

        try{
            // Check if user already exists
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({errors : [{msg : 'User already exists'}]})
            }
            // Get User's gravatar
            const avatar = gravatar.url(email, {
                size : '200',
                default : 'robohash',
                rating: 'pg'
            });
            // Create a new User instance
            user = new User({
                name,
                email,
                avatar,
                password
            });
            // Encrypt the password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save()
            // Return jwt
            const payload = {
                user : {
                    id : user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn : 360000},
                (err, token) => {
                    if(err) throw err;
                    res.json({token})
                }
                );

         } catch(err){
            console.ererr.message);
            res.status(500).send('Server Error')
         }
    }
);

module.exports = router;