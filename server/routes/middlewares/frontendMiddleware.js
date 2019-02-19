/**
 * Front-end middleware
 */
module.exports = (router, options) => {
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    const addProdMiddlewares = require("./addProdMiddlewares");
    addProdMiddlewares(router, options);
  } else {
    const webpackConfig = require("../../../internals/webpack/webpack.dev.babel");
    const addDevMiddlewares = require("./addDevMiddlewares");
    addDevMiddlewares(router, webpackConfig);
  }

  return router;
};
