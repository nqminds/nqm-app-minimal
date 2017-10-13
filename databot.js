module.exports = (function() {
  "use strict";

  const databotUtils = require("@nqminds/nqm-databot-utils");

  const databot = function(input, output, context) {
    const settings = input.settings || context.packageParams.settings;
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
