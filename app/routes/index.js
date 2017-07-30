var  userController = require("../controllers/user");
var problemController = require("../controllers/problem");
var ideaController = require("../controllers/idea");
var util = require("util");

    module.exports =  function (app,passport) {
    //user apis
    app.get('/api/user', userController.getUserById);
    app.put('/api/user',userController.updateUser);
    app.put('/api/passwordupdate',userController.updatePassword);


    app.post('/api/signup',passport.authenticate('local-signup',{
            successRedirect : '/signupprofile',
            failureRedirect : '/signupsignup',
            failureFlash : true
        }));
    app.get('/signupprofile',userController.signUpSuccess);
    app.get('/signupsignup',userController.signUpFailure);
    app.post('/api/login',passport.authenticate('local-signin',{
        successRedirect : '/signinprofile',
        failureRedirect : '/signinsignup',
        failureFlash : true
    }));
    app.get('/signinprofile',userController.logInSuccess);
    app.get('/signinsignup',userController.logInFailure);
    app.get('/api/status',userController.checkUser);

    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/#!/main',
            failureRedirect : '/'
        }));
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.json({message:"logging out"})
        /*res.redirect('/');*/
    });
    app.get('/auth/user',userController.sendUser);




        app.get('/api/forgetpassword',userController.findIdByEmail);

    //problem apis
        app.post('/api/problem',problemController.createProblem);
        app.get('/api/problemAll',problemController.getAllProblems);


        app.post('/api/idea',ideaController.createIdea);
        app.post('/api/subcat',problemController.getSubCatList);

        app.post('/api/getUserInfo',userController.getUserInfo);
        app.post('/api/problist',problemController.getProbList);
        app.post('/api/getUserIdeas',ideaController.getUserIdeas);

        app.post('/api/subcatlist',problemController.getsubcategorieslist);


};

function isLoggedIn(req, res, next) {
    console.log("checking if user is logged in>>>")
        // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log("returning true>>>>>>>>>>>>");
        return next();
    }
    console.log("returning false>>>>>>>>>>>>");
    // if they aren't redirect them to the home page
    res.redirect('/');
}