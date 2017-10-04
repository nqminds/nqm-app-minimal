module.exports = (function() {
  "use strict";

  const log = require("debug")("nqm:route-index");
  const express = require("express");
  const router = express.Router();
  const config = require("../app-config");
  const jwt = require("jsonwebtoken");
  const nqmUtils = require("nqm-core-utils");
  const request = require("request");
  const requestIP = require("request-ip");

  const setUserSession = function(req, res, redirectTo) {
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
        res.redirect(redirectTo);
      } else {
        log("setUserSession: missing or invalid token received from auth server [%s]", req.query.access_token);
        res.redirect("/");
      }
    }
  };

  router.get("/auth", function(req, res) {
    // Clear any existing session data.
    req.session.destroy(() => {
      // Encode the client return url.
      const rurlClient = encodeURIComponent(req.query.rurl || "/");

      // Encode the auth callback return url (which also includes the client return url!).
      const rurlAuth = encodeURIComponent(
        `${config.appProtocol || "https"}://${req.get("host")}/auth/callback?rurl=${rurlClient}`
      );

      // Redirect to auth server, sending the application token.
      res.redirect(
        `${config.public.tdxConfig.tdxServer}/auth?rurl=${rurlAuth}&a=${config.getToken()}`
      );
    });
  });

  router.get("/auth/callback", function(req, res) {
    setUserSession(req, res, req.query.rurl);
  });

  router.get("/dashboard", function(req, res) {
    // Redirect to the auth server.
    const authServerRedirect = `${config.public.tdxConfig.tdxServer}`;
    res.redirect(authServerRedirect);
  });

  router.get("/sign-out", function(req, res) {
    req.session.destroy(() => {
      // Redirect to the auth server.
      // const authServerRedirect = `https://${config.public.tdxConfig.tdxServer}/sign-out`;
      res.redirect("/");
    });
  });

  router.get("*", function(req, res) {
    // Check for access token on query string.
    if (req.query.access_token) {
      // Set access token in session and remove from URL.
      setUserSession(req, res, req.path);
    } else {
      // Render the client.
      // Pass configuration data to the client app, including the id of the current users' application data folder.
      let userDataFolderId = "";
      if (req.session && req.session.authData) {
        // The user application data folder is a combination of the application id and the user TDX id.
        userDataFolderId = nqmUtils.shortHash(`${config.applicationId}-${req.session.authData.sub}`);
      }

      const doRender = (token) => {
        // Now render the client app.
        res.render("index", {
          accessToken: token || "",
          config,
          settings: {public: config.public},
          title: config.public.applicationTitle,
          userDataFolderId,
        });
      };

      if (!req.session || !req.session.token) {
        //
        // There is no session, which implies the user has not logged in yet. If your app supports a 'public' mode,
        // ask the auth server for a token binding the **application** identity to the clients IP address. This
        // enables the client code to make TDX requests using the application identity, i.e. it will have access
        // to any resources shared with the application.
        //
        // n.b. this will be a read-only token, all writes will be denied
        const options = {
          uri: `${config.authServerURL}/app-token?a=${config.getToken()}`,
          rejectUnauthorized: false,
          json: {
            ip: requestIP.getClientIp(req),
          },
        };
        request.post(options, (error, response, body) => {
          if (error || body.error) {
            log("failed to get application token [%s]", error || body.error);
          }
          doRender(body.token || "");
        });
      } else {
        doRender(req.session.token);
      }
    }
  });

  return router;
}());
