const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models')
const bcrypt = require('bcrypt')

const user_signup = () => {
    router.post('/signup', (req, res, next) => {
        User.find({username: req.body.username}).exec().then(user => {
            if (user.length >= 1){
                res.status(400).json({
                    error: "Bad request",
                    message: "User with this username already exists"
                })
            } else{
                bcrypt.hash(req.body.password, 10, (err, hashed_pwd) => {
                    if (err){
                        res.status(500).json({
                            error: err
                        })
                    } else{
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hashed_pwd
                        })
                        user.save().then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: "New user created successfully"
                            })
                        }).catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })
    })
}

user_signup()
module.exports = router