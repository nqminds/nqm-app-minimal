module.exports = (function(config) {
  const authParser = require("auth-header");
  const _ = require("lodash");
  const log = require("debug")("nqm-app:auth-middleware");
  const TDXApi = require("@nqminds/nqm-api-tdx");
  const {validateUserSession} = require("../routes/route-helpers");

  function authenticateMiddleware(req, res, next) {
    // Get the "Authorization" header.
    let authHeader;
    try {
      authHeader = req.headers.authorization && authParser.parse(req.headers.authorization);
      log("auth header is %j", authHeader);
    } catch (err) {
      log("failure parsing header '%s' [%s]", req.headers.authorization, err.message);
    }

    if (!authHeader || authHeader.scheme !== "Bearer" || !authHeader.token) {
      // Invalid or missing authorization header.
      res.status(401).json({code: "Unauthorized", message: "invalid credentials"});
    } else {
      // Create api instance bound to the application token.
      const tdxApi = new TDXApi(_.extend(
        {},
        config.public.tdxConfig,
        {accessToken: config.getToken()}
      ));
      // Validate authorization token and decode.
      validateUserSession(tdxApi, authHeader.token, req)
        .then((decoded) => {
          if (decoded) {
            // Have a valid session => save authentication details and continue.
            res.locals.authData = decoded;
            res.locals.token = authHeader.token;
            next();
          } else {
            // Problem decoding token.
            res.status(401).json({code: "Unauthorized", message: "invalid credentials"});
          }
        })
        .catch((err) => {
          log("failure in api router [%s]", err.message);
          res.status(500).json({code: "InternalServer", message: err.message});
        });
    }
  }

  return authenticateMiddleware;
});
