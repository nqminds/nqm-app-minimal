/* eslint-disable global-require */

/**
 * Front-end middleware
 */
module.exports = (function() {
  function frontEndMiddleware(app, options, production) {
    const isProd = process.env.NODE_ENV === "production" || production;

    if (isProd) {
      const addProdMiddlewares = require("./add-prod-middlewares");
      addProdMiddlewares(app, options);
    } else {
      const webpackConfig = require("../../webpack/webpack.dev.babel");
      const addDevMiddlewares = require("./add-dev-middlewares");
      addDevMiddlewares(app, webpackConfig);
    }

    return app;
  }
  return frontEndMiddleware;
}());
