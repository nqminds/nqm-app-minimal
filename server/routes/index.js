module.exports = (function() {
  "use strict";

  const log = require("debug")("nqm:route-index");
  const express = require("express");
  const router = express.Router();
  const config = require("../app-config");
  const jwt = require("jsonwebtoken");
  const nqmUtils = require("nqm-core-utils");

  router.get("/auth", function(req, res) {
    delete req.session.authData;
    delete req.session.token;

    // Encode the client return url.
    const rurlClient = encodeURIComponent(req.query.rurl);

    // Encode the auth callback return url (which also includes the client return url!).
    const rurlAuth = encodeURIComponent(`${req.protocol}://${req.get("host")}/auth/callback?rurl=${rurlClient}`);

    // Redirect to auth server, sending the application token.
    res.redirect(
      `https://${config.public.tdxConfig.tdxServer}/auth?rurl=${rurlAuth}&a=${config.getToken()}`
    );
  });

  router.get("/auth/callback", function(req, res) {
    if (req.query.access_token) {
      // Decode the JWT access token.
      const decoded = jwt.decode(req.query.access_token);
      if (decoded) {
        // n.b. we haven't *verified* the JWT signature, but this is OK if we trust the connection to the auth
        // server (which should be ssl).
        //
        // Save details to session and redirect to client return url.
        req.session.authData = decoded;
        req.session.token = req.query.access_token;
        res.redirect(req.query.rurl);
      }
    }

    if (!req.session.authData) {
      log("missing or invalid token received from auth server in auth/callback [%s]", req.query.access_token);
      res.redirect("/");
    }
  });

  router.get("*", function(req, res) {
    // Render the workbench client.
    // Pass configuration data to the client app, including the id of the current users' application data folder.
    let userDataFolderId = "";
    if (req.session && req.session.authData) {
      // The user application data folder is a combination of the application id and the user TDX id.
      userDataFolderId = nqmUtils.shortHash(`${config.applicationId}-${req.session.authData.sub}`);
    }

    // Now render the client app.
    res.render("index", {
      accessToken: req.session.token || "",
      config,
      settings: {public: config.public},
      title: "minimal",
      userDataFolderId,
    });
  });

  return router;
}());
