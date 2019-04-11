const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/application.config.js');

let Users = require('./../models/user.model.js');

router.post('/', add);
router.post('/:id', edit);
router.delete('/:id', remove);
router.get("/:id", isExist);


function add(req, res) {
    let user = new Users({
        email: req.body.email || '',
        password: req.body.password || '',
        fullName: req.body.fullName || '',
        address: req.body.address || '',
        phoneNumber: req.body.phoneNumber || '',
        jwt: req.body.jwt || ''
    });

    user.save()
        .then(user => {
            let token = jwt.sign({
                email: req.body.email || '',
                password: req.body.password || '',
                fullName: req.body.fullName || '',
                address: req.body.address || '',
                phoneNumber: req.body.phoneNumber || '',
                jwt: req.body.jwt || ''
            }, config.JWT_SECRET, {expiresIn: 360}); // Sigining the token
            res.status(200).json({
                success: true,
                token
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err
            });
        });
}

function edit(req, res) {
    Users.findByIdAndUpdate(req.params.id, {
        password: req.body.password,
        fullName: req.body.fullName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    }, {new: true})
        .then(user => {
            if (!user) return res.status(404).json({
                message: "User not found with id " + req.params.userId
            });
            let token = jwt.sign({
                id:user._id,
                email: user.email || '',
                password: user.password || '',
                fullName: user.fullName || '',
                address: user.address || '',
                phoneNumber: user.phoneNumber || '',
                jwt: user.jwt || ''
            }, config.JWT_SECRET, {expiresIn: 360}); // Sigining the token
            res.status(200).json({
                success: true,
                token,
                user
            });
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.userId,
                error: error
            });
        });
}

function remove(req, res) {
    Users.findByIdAndDelete(req.params.id)
        .then(user => {
                if (!user) return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
                res.send(user);
            }
        )
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).json({
                message: "Error deleting user with id " + req.params.userId
            });
        });
}

async function isExist(req, res) {
    Users.findById(req.params.id)
        .then(
            (ok) => {
                res.status(200).json(ok);
            }
            , (no) => {
                res.status(401).json(no);
            }
        );
}

module.exports = router;
