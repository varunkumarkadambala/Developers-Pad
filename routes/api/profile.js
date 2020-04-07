const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const auth = require('../../middleware/auth');

// @route  /api/profile/me
// @desc   Get the profile of the current user
// @access  PRIVATE
router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user : req.user.id}).populate(
            'user',
            ['name','avatar']
        )
        if(!profile){
            return res.status(400).json({errors : [{msg : 'Profile does not exist'}]});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;