module.exports = (function() {
  const log = require("debug")("nqm-app:route-helpers");
  const ipaddr = require("ipaddr.js");
  const requestIP = require("request-ip");
  const TDXApi = require("@nqminds/nqm-api-tdx");
  const _ = require("lodash");

  /**
   * Returns an instance of TDX Api for requesting user bound to app token
   * @param {*} req
   * @param {*} res
   * @param {*} config
   */
  function getAPI(req, res, config) {
    const applicationApi = new TDXApi(_.extend(
      {},
      config.public.tdxConfig,
      {accessToken: config.getToken()}
    ));
    return applicationApi.exchangeTDXToken(res.locals.token)
      .then((exchanged) => {
        const clientApi = new TDXApi(_.extend(
          {},
          config.public.tdxConfig,
          {accessToken: exchanged.token}
        ));
        return clientApi;
      });
  }

  const handleError = function(err, response) {
    try {
      const parsedError = JSON.parse(err.message);
      log(`ERROR: ${parsedError.message}`);
      response.status(parsedError.status).json({message: parsedError.message});
    } catch (parsingError) {
      log(`ERROR: ${err.message}`);
      response.status(500).json({message: "Internal server error"});
    }
  };

  const logRequest = function(req, res) {
    const data = req.method === "GET" ? req.params : req.body;
    log(
      "%s %s by %s from %s [%j]",
      req.method,
      req.path,
      res.locals.authData ? res.locals.authData.sub : "no auth",
      requestIP.getClientIp(req),
      data
    );
  };

  const validateUserSession = async function(tdxApi, token, req) {
    log("validateUserSession - checking %s for %s", token, req.path);
    // Validate the token IP when in production mode.
    let reqIP;
    if (process.env.NODE_ENV === "production") {
      reqIP = ipaddr.process(requestIP.getClientIp(req));
    }
    try {
      return tdxApi.validateTDXToken(token, reqIP);
    } catch (err) {
      log("validateUserSession - failed to validate token [%s]", err.message);
      return Promise.reject(err);
    }
  };
  return {
    getAPI,
    handleError,
    logRequest,
    validateUserSession,
  };
}());
