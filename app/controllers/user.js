'use strict';
var emailSend = require("../../config/emailSender");
var models = require('../models');
var bCrypt = require('bcrypt-nodejs');



module.exports = {
    getUserById(req,res){
        models.user.findOne({
            where:{
                id: req.session.passport.user
            }})
            .then(function(user){
                res.status(200).json(user);
            })
            .catch(function (error) {
            res.status(500).json(error);
        });
    },

    sendUser(req,res){
        res.status(200).json({user:req.user});
    },

    updateUser(req,res){
        models.user.update({
            name:req.body.name,
            email:req.body.email},{
            where:{
                    id: req.body.id
            }
        })
        .then(function(user){
            res.status(200).json(user);
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
    },

    getUserInfo(req,res){
        models.user.findOne({
            attributes: ['id','firstname','lastname','organisation','teamname','email']},{
            where:{
                id: req.body.id
            }
        })
            .then(function(user){
                res.status(200).json(user);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    updatePassword(req,res){
       models.user.update({
            password: bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null)},{
            where:{
                id: req.body.id
            }})
           .then(function(resp){
               res.status(200).json(resp);
           })
           .catch(function (error) {
               res.status(500).json(error);
           });
    },
    /*resetPass(req,res){
        models.user.find( {where: {
            email: req.query.id
        }})
            .then(function(user){
                emailSend.forgotPassword(user.email,user.id)
                res.status(200).json(user);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });

    },*/
    signUpSuccess(req,res){
        console.log("response signUpSuccess>>>");
        res.status(200).json({flag:true,user:{id:req.user.id, name:req.user.firstname,email: req.user.email}, message:req.flash('error')});
    },
    signUpFailure(req,res){
        console.log("response signUpFailure >>>");
        res.status(200).json({flag:false, message:req.flash('error')});
    },
    logInSuccess(req,res){
        console.log("response logInSuccess>>>");
        res.status(200).json({flag:true, user:{id:req.user.id, name:req.user.firstname,email: req.user.email}, message:req.flash('error')});
    },
    logInFailure(req,res){
        console.log("req logInFailure>>>");
        res.status(200).json({flag:false, message:req.flash('error')});
    },

    checkUser(req,res){
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true
        });

    },
    findIdByEmail(req,res){

        models.user.findOne({where :{email:req.query.id}})
            .then(function (user) {
                console.log("pringing user data in reset password>>", user)
                var genURL = "http://localhost:8085/#!/resetPassword/"+user.dataValues.id;
                console.log("url>>>",genURL)
                emailSend.forgotPassword(user.dataValues.email,genURL);
                res.status(200).json(user);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    }
};