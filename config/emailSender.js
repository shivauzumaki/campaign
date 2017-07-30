'use strict';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testing.nsy@gmail.com',
        pass: 'Test@123'
    }
});

module.exports = {

    welcomeEmail: function(email,name){
        console.log("welcome email content>>", email,name)
        console.log("print passing email>>",email)
        var mailOptions = {
            from: 'IdeaDeck Team <testing.nsy@gmail.com>',
            to: email, // list of receivers
            subject: 'IdeaDeck Registration', // Subject line
            text: '', // plaintext body
            html: '<p>Hi '+name+',</p>' +
            '<p>Thank you for registering.</p>'+
            '<p>IdeaDeck Team</p>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.messageId,info.response);
            }
            ;
        });
    },

    forgotPassword: function(email,url){
        var mailOptions = {
            from: 'IdeaDeck Team <testing.nsy@gmail.com>',
            to: email, // list of receivers
            subject: 'Reset Password', // Subject line
            text: 'radom text', // plaintext body
            html: '<p>Hi there,</p>'+
            '<p> Link to reset Password: '+ url +'</p>' +
            '<p>If you did not request, please ignore this email.</p>'+
            '<p>IdeaDeck Team</p>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.messageId,info.response);
            }
            ;
        });
    },

    inviteFriend: function(email,name,place,tripid){
        var tripURL = "http://www.packdat.com/#!/invite/"+tripid;
        var mailOptions = {
            from: 'PackDat <packdat.notification@gmail.com>', // sender address
            to: email, // list of receivers
            subject: name+ ' Invited You To '+ place +' Trip!', // Subject line
            text: 'radom text', // plaintext body
            html:
            '<p>Hi there,</p>'+
            name +'<p> has invited you, along with 2 others to plan a trip together on Packdat to '+place+'!</p>'+
            '<p>'+tripURL+ ' Join this trip right here.</p>'+
            '<p>Happy discovering live moments from people travelling!</p>'+
            '<p>P.S. This email grants you access to this trip. Only forward to people you want to travel with.</p>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.messageId,info.response);
            }
            ;
        });
    }

}
