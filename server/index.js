/*
 * This is the app entry-point for non-databot installations or development.
 * For databot deployment, see ../databot.js
 */
module.exports = (function() {
  "use strict";

  const log = require("debug")("nqm-app:index");
  const minimist = require("minimist");
  const main = require("./main");
  const argv = minimist(process.argv.slice(2));
  const settings = require("./settings")(argv.config);

  main(settings)
    .then(() => {
      log("app started");
    })
    .catch((err) => {
      log("app failed to start [%s]", err.message);
    });
}());
