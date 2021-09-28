var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Read .env file
require('dotenv').config()

var contactRouter = require('./routes/contact');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(8080, () => {
  console.log("ContactServer is now running on port 8080")
});

module.exports = app;
