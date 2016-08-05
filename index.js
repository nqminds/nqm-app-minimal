process.env.DEBUG = "nqm-app-minimal*";
var log = require("debug")("nqm-app-minimal");
var express = require('express');
var app = express();
var util = require("util");
var config = require("./config.json");
var session = require('express-session');

app.use(session({ secret: 'blahblahblah', resave: true, saveUninitialized: true })); 
app.set('view engine', 'pug');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  if (req.session && req.session.token) {
    res.render("home", { token: req.session.token });    
  } else {
    res.render("login");
  }
});

app.get("/login", function(req, res) {
  var tdxURL = util.format("%s/auth?rurl=%s/authCB", config.authServer, config.hostURL);
  res.redirect(tdxURL);
});

app.get("/authCB", function(req, res) {
  if (req.query.access_token) {
    log("token is %s",req.query.access_token);
    req.session.token = req.query.access_token;
  } else {
    log("failed to get access token");
  }
  res.redirect("/");
});

app.get("/logout", function(req,res) {
  req.session.destroy();
  res.redirect("/");
});

app.listen(8084);