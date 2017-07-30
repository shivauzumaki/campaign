var models = require('../app/models');
var bCrypt = require('bcrypt-nodejs');
var emailSend = require('./emailSender.js');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    console.log("signup email id already exist");
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {

                    var userPassword = generateHash(password);
                    var data =
                        {
                            firstname:req.body.firstname,
                            lastname:req.body.lastname,
                            organisation:req.body.organisation,
                            teamname:req.body.teamname,
                            email: email,
                            password: userPassword,
                            name: req.body.name,
                            last_login:new Date(),
                            prev_last_login: new Date()

                        };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            console.log("no new user");
                            return done(null, false);
                        }
                        if (newUser) {
                            emailSend.welcomeEmail(email,req.body.firstname);
                            for (var i=0;i<req.body.members.length;i++){
                                console.log("i value>>>",1)
                                models.teammember.create(req.body.members[i])
                            }
                            console.log("Newuser created")
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    //serialize
    passport.serializeUser(function (user, done) {
        console.log("serializing user");
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(function (id, done) {
        console.log("de centralizing user");
        User.findById(id).then(function (user) {
            if (user) {
                console.log("de central user found");
                done(null, user.get());
            } else {
                console.log("decentral user not found");
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {
                    console.log("email id does not exist");
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    console.log("incorrect password");
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                var old_loginTime = user.last_login;
                User.update({
                    prev_last_login : old_loginTime,
                    last_login : new Date()
                },{
                        where:{
                            id : user.id
                        }
                    }
                )
                    .then(function (updatedUser) {
                        console.log("user logging in");
                        var userinfo = user.get();
                        userinfo.message = "Successful";
                        return done(null, userinfo);
                    })


            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));

}

