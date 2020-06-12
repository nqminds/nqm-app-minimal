module.exports = (function(appConfig) {
  "use strict";

  const log = require("debug")("nqm-app:routes-index");
  const express = require("express");
  const router = express.Router();
  const nqmUtils = require("@nqminds/nqm-core-utils");
  const requestIP = require("request-ip");
  const TDXApi = require("@nqminds/nqm-api-tdx");
  const jwt = require("jsonwebtoken");
  const setup = require("../middlewares/front-end-middlewares");
  const {resolve} = require("path");

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
        `${appConfig.appProtocol || "https"}://${req.get("host")}/auth/callback?rurl=${rurlClient}`
      );

      // Redirect to auth server, sending the application token.
      res.redirect(
        `${appConfig.public.tdxConfig.tdxServer}/auth?rurl=${rurlAuth}&a=${appConfig.getToken()}`
      );
    });
  });

  router.get("/auth/callback", function(req, res) {
    setUserSession(req, res, req.query.rurl);
  });

  router.get("/dashboard", function(req, res) {
    // Redirect to the auth server.
    const authServerRedirect = `${appConfig.public.tdxConfig.tdxServer}`;
    res.redirect(authServerRedirect);
  });

  router.get("/sign-out", function(req, res) {
    req.session.destroy(() => {
      // Redirect to the auth server.
      // const authServerRedirect = `https://${appConfig.public.tdxConfig.tdxServer}/sign-out`;
      res.redirect("/");
    });
  });

  router.get("/nqm-setup-data", async function(req, res) {
    let userDataFolderId = "";
    if (req.session && req.session.authData) {
      // The user application data folder is a combination of the application id and the user TDX id.
      userDataFolderId = nqmUtils.shortHash(`${appConfig.applicationId}-${req.session.authData.sub}`);
    }

    let token;

    if ((!req.session || !req.session.token) && appConfig.publicShareKeyId && appConfig.publicShareKeySecret) {
      //
      // There is no session, which implies a user has not logged in yet. If your app supports a 'public' mode,
      // in which you'd like to be able to provide the browser client with data from resources that are not in
      // public share mode the recommended approach is to create a share key and share the resources with it.
      // You can then ask the auth server for a token binding the share key to the clients IP address. This
      // enables the client code to make TDX requests using the share key identity, i.e. it will have access
      // to any resources shared with that key.
      //
      const tdxApi = new TDXApi(appConfig.public.tdxConfig);
      try {
        token = await tdxApi.authenticate(
          appConfig.publicShareKeyId,
          appConfig.publicShareKeySecret,
          null,
          requestIP.getClientIp(req)
        );
      } catch (err) {
        log("failed to get public share key token", err);
      }
    } else {
      token = (req.session && req.session.token) || "";
    }

    res.status(200).json({
      nqmApplicationState: {
        core: {
          accessToken: token,
          serverDataFolderId: appConfig.getServerDataFolderId(),
          userDataFolderId,
        },
      },
      nqmApplicationSettings: {
        public: appConfig.public,
      },
    });
  });

  router.get("*", function(req, res, next) {
    // Check for access token on query string.
    if (req.query.access_token) {
      // Set access token in session and remove from URL.
      setUserSession(req, res, req.path);
    } else {
      // Render the client.
      next();
    }
  });
  setup(router, {
    outputPath: resolve(process.cwd(), "dist"),
    publicPath: "/",
  }, appConfig.production);
  // Serve a gzipped bundle
  router.get("*.js", (req, res, next) => {
    req.url = `${req.url}.gz`;
    res.set("Content-Encoding", "gzip");
    next();
  });

  return router;
});
