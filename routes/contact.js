var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// Read .env file
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Set mailOptions 
var mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TO,
  subject: 'Kontaktformular',
  html: ''
};

/**
 * validate body of the POST Request. Has to include "name", "email" and "text"
 * otherwise send status 400
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function validContactPostBody(req, res, next) {
    if(req.body.name != null && req.body.email != null && req.body.text != null) {
        next();
    } else {
        res.status(400).json({
            error: {
                code: "BAD REQUEST",
                message: ""
            }
        });
    }
}

/* POST contact. */
router.post('/', validContactPostBody, function(req, res, next) {
    // Set the content of the mail
    mailOptions.html = "<h3>From: " + req.body.name + "</h3><br /> <h3>E-Mail: " + req.body.email + "</h3><br /> <p>Text: " + req.body.text + "</p>";

    // send mail
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {

            // Log and send complete error when in dev or tst stage
            if(process.env.STAGE = "pro") {
                console.error("ERROR: Sending email failed");
                res.status(500).json({
                    error: {
                        code: "INTERNAL ERROR",
                        message: ""
                    }
                });
            } else {
                console.error(error);
                res.status(500).json({
                    error: {
                        code: "INTERNAL ERROR",
                        message: "Error when sending email",
                        error: error
                    }
                });
            }
        } else {

            // send 200 status
            res.status(200).json({
                message: "Successfully sent email"
            });
        }
    });
});

module.exports = router;
