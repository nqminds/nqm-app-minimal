module.exports = (function(appConfig) {
  "use strict";

  const express = require("express");
  const routes = require("./routes")(appConfig);
  const cookieParser = require("cookie-parser");
  const session = require("express-session");
  const bodyParser = require("body-parser");

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

  //
  // n.b. - make sure you set a unique name for the session to avoid confusion esp. when debugging on localhost.
  //
  app.use(session({resave: false, secret: "boogaloo", name: "nqm-app-minimal", saveUninitialized: false}));

  app.use("/", routes);

  return app;
});
