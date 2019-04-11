const Config = require("../config/application.config");
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const UserModel = require('./../models/user.model.js');

router.post('/', login);

function login(req, res) {
    if (req.body == null) return res.status(401).json({
        success: false,
        message: "request is empty"
    });
    const {email, password} = req.body;
    UserModel.findOne({email: email, password: password}, (error, user) => {
        if (error) return res.status(401).json({
            message: error
        }).end();
        if (user) { // User credentials matched (are valid)
            let token = jwt.sign({
                id: user._id,
                email: email,
                password: password,
                fullName: user.fullName,
                address:user.address,
                phoneNumber: user.phoneNumber
            }, Config.JWT_SECRET, {expiresIn: 360});
            res.status(200).json({
                success: true,
                token: token
            });
        } else {
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    });
};


module.exports = router;
