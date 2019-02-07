const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try {
        let user = await db.User.findOne({
            username: req.body.username
        });
        let {id, username, profileImageUrl, isAdmin, createdAt} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id, 
                username, 
                profileImageUrl, 
                isAdmin,
                createdAt
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                isAdmin,
                createdAt,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid Username/Password'
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: 'Invalid Username/Password'
        });
    }
};

exports.signup = async function (req, res, next){
    try {
        let user = await db.User.create({...req.body, isAdmin: false});
        let {id, username, profileImageUrl, isAdmin, createdAt} = user;
        let token = jwt.sign({
            id, 
            username, 
            profileImageUrl,
            isAdmin,
            createdAt
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            isAdmin,
            createdAt,
            token
        });
    } catch (err) {
        //if validation fails
        if(err.code === 11000){
            err.message = 'Sorry, that username is already taken'
        }
        return next({
            status: 400,
            message: err.message
        })
    }
};