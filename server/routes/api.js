module.exports = (function(config) {
  "use strict";
  const express = require("express");
  const router = express.Router();

  const authenticateMiddleware = require("../middlewares/authenticated-middleware")(config);
  const {getAPI, handleError, logRequest} = require("./route-helpers");

  //
  // Authenticate all API access.
  //
  router.use(authenticateMiddleware);

  async function handleRequest(req, res) {
    logRequest(req, res);
    const api = await getAPI(req, res, config);
    return {
      accountId: res.locals.authData.sub,
      api,
    };
  }

  router.get("/super-api", async function(req, res) {
    try {
      // eslint-disable-next-line no-unused-vars
      const {accountId, api} = await handleRequest(req, res);
      const result = {amazing: "Api result"};
      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  });

  return router;
});
