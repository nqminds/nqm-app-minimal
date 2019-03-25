/*
 * This is the app entry-point for databot deployment.
 */
module.exports = (function() {
  "use strict";

  const databotUtils = require("@nqminds/nqm-databot-utils");

  const databot = function(input, output, context) {
    // Load settings from input or packageParams.
    const settings = input.settings || context.packageParams.settings;

    // Override the application port with that assigned by the databot host.
    settings.appPort = context.instancePort;

    const main = require("./server/main");
    main(settings)
      .then(() => {
        output.debug("app started");
      })
      .catch((err) => {
        output.abort("app failed to start [%s]", err.message);
      });
  };

  databotUtils.input.pipe(databot);
}());
