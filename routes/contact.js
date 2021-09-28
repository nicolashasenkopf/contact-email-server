var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// Read .env file
require('dotenv').config()

var transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TO,
  subject: 'Kontaktformular',
  html: ''
};

function validContactPostBody(req, res, next) {
    if(req.body.name && req.body.email && req.body.text) {
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

/* GET contact path. */
router.post('/', validContactPostBody, function(req, res, next) {
    mailOptions.html = "<h3>Von: " + req.body.name + "</h3><br /> <h3>E-Mail: " + req.body.email + "</h3><br /> <p>Text: " + req.body.text + "</p>";
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
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
          res.status(200).json({
              message: "Successfully sent email"
          });
        }
    });
});

module.exports = router;
