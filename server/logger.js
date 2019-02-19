/* eslint-disable no-console */

module.exports = (function(namespace) {
  const chalk = require("chalk");
  const ip = require("ip");
  const log = require("debug")(namespace);

  const divider = chalk.gray("\n-----------------------------------");

  return {
    info: log,

    error: (err, ...args) => {
      if (err instanceof Error) {
        console.error(chalk.red(err.stack));
      } else if (args.length === 1 && args[0] instanceof Error) {
        console.error(chalk.red(err));
        console.error(chalk.red(args[0].stack));
      } else {
        console.error(chalk.red(err), ...args);
      }
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (port) => {
      log(`Server started ! ${chalk.green("✓")}`);

      log(`
    ${chalk.bold("Access URLs:")}${divider}
    Localhost: ${chalk.magenta(`http://localhost:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
          ${chalk.blue(`Press ${chalk.italic("CTRL-C")} to stop`)}
    `);
    },
  };
});
