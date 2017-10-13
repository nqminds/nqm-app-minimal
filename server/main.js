module.exports = (function(settings) {
  "use strict";

  const appConfig = require("./app-config")(settings);
  const bootstrap = require("./boot")(appConfig);
  const server = require("./server")(appConfig);
  const log = require("debug")("nqm-app:main");
  const http = require("http");

  return bootstrap()
    .then(() => {
      // Get port from environment and store in Express.
      const port = normalizePort(settings.appPort || process.env.PORT || "8082");
      server.set("port", port);

      // Create HTTP server.
      const httpServer = http.createServer(server);

      // Listen on provided port, on all network interfaces.
      httpServer.listen(port, "127.0.0.1");
      httpServer.on("error", onError);
      httpServer.on("listening", onListening);

      // Normalize a port into a number, string, or false.
      function normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
          // named pipe
          return val;
        }

        if (port >= 0) {
          // port number
          return port;
        }

        return false;
      }

      // Event listener for HTTP server "error" event.
      function onError(error) {
        if (error.syscall !== "listen") {
          throw error;
        }

        const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
          case "EACCES":
            log(`ABORTING - ${bind} requires elevated privileges`);
            process.exit(1);
            break;
          case "EADDRINUSE":
            log(`ABORTING - ${bind} is already in use`);
            process.exit(1);
            break;
          default:
            throw error;
        }
      }

      // Event listener for HTTP server "listening" event.
      function onListening() {
        const addr = httpServer.address();
        const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
        log(`Listening on ${bind}`);
      }
    })
    .catch((err) => {
      log("failed to boot [%s]", err.message);
      throw err;
    });
});
