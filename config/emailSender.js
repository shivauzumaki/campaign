'use strict';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'zoho',
    auth: {
        user: 'shiva@edgesociety.org',
        pass: 'T3chn0t270717!'
    }
});

module.exports = {

    welcomeEmail: function(email,name){
        var mailOptions = {
            from: 'EDGE HACK Team <shiva@edgesociety.org>',
            to: email, // list of receivers
            subject: 'IdeaDeck Registration', // Subject line
            text: '', // plaintext body
            html: '<p>Hi '+name+',</p>' +
            '<p>Thank you for registering.</p>'+
            '<p>EDGE HACK Team</p>'
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
            from: 'EDGE HACK Team <testing.nsy@gmail.com>',
            to: email, // list of receivers
            subject: 'Reset Password', // Subject line
            text: 'radom text', // plaintext body
            html: '<p>Hi there,</p>'+
            '<p> Link to reset Password: '+ url +'</p>' +
            '<p>If you did not request, please ignore this email.</p>'+
            '<p>EDGE HACK Team</p>'
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
