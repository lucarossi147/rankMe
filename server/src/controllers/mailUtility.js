const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rankmeweb@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});

exports.sendMail = function (to, subject, text) {
    const mailOptions = {
        from: 'rankmeweb@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    console.log(process.env.GMAIL_PASSWORD)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

