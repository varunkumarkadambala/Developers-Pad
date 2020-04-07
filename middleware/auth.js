const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from request
    const token = req.header('x-auth-token');

    // Check if token is passed
    if (!token) {
        return res.status(401).json({msg: "Authorization Denied.No taken passed."})
    }
    // Validate the token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }  catch (err) {
        return res.status(401).json({msg: "Authorization Denied. Invalid token"});
    }
};