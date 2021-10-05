var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const rateLimit = require("express-rate-limit");

// Read .env file
require('dotenv').config()

var contactRouter = require('./routes/contact');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  message: "Too many request! Please try again later" // send error message when max requests were sent
});

//  apply to all requests
app.use(limiter);

// check for .env file to be completed
app.use((req, res, next) => {
  if(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_SERVICE) {
    next();
  } else {
    res.status(500).json({
      error: {
        code: "INTERNAL ERROR",
        message: process.env.STAGE != "pro" ? "Error happened internally, please contact the admin" : ""
      }
    })
  }
});

app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    error: {
      code: "NotFound",
      message: "This path does not exist"
    }
  });
});

module.exports = app;
