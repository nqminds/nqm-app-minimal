process.env.DEBUG = "nqm-app-minimal*";
var log = require("debug")("nqm-app-minimal");
var express = require('express');
var app = express();
var util = require("util");
var config = require("./config.json");
var session = require('express-session');

app.use(session({ secret: 'blahblahblah', resave: true, saveUninitialized: true })); 
app.set('view engine', 'pug');

// Default route - check if have a valid token for this session.
app.get('/', function(req, res) {
  if (req.session && req.session.token) {
    res.render("home", { token: req.session.token });    
  } else {
    // No token => render login UI.
    res.render("login");
  }
});

// Redirect to the TDX auth server with a return URL to our /authCB route.
app.get("/login", function(req, res) {
  var tdxURL = util.format("%s/auth?rurl=%s/authCB", config.authServer, config.hostURL);
  res.redirect(tdxURL);
});

// TDX auth server will callback here after authentication.
app.get("/authCB", function(req, res) {
  if (req.query.access_token) {
    // Store the access token with the session.
    log("token is %s",req.query.access_token);
    req.session.token = req.query.access_token;
  } else {
    log("failed to get access token");
  }
  // Redirect to home page.
  res.redirect("/");
});

app.get("/logout", function(req,res) {
  // Clear session
  req.session.destroy();
  res.redirect("/");
});

app.listen(8084);