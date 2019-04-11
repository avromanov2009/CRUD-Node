const jwt = require('jsonwebtoken');
const config = require('../config/application.config.js');

function check(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]); // Here i try to request my token in any way
    console.log(token);
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        console.log('Access Error');
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports = check;
