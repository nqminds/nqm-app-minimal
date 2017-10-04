module.exports = (function() {
  "use strict";
  let settings;
  const _ = require("lodash");
  const minimist = require("minimist");
  const log = require("debug")("nqm-app:app-config");

  const argv = minimist(process.argv.slice(2));
  try {
    settings = require(argv.config);
  } catch (err) {
    log("failed to load settings file '%s'", argv.config);
    process.exit(1);
  }

  let token;
  let serverDataFolderId;
  const serverResourceCache = {};

  const getResourceId = function(name) {
    return serverResourceCache[name];
  };

  const setResourceId = function(name, value) {
    return serverResourceCache[name] = value;
  };

  const getToken = function() {
    return token;
  };

  const setToken = function(tok) {
    token = tok;
  };

  const getServerDataFolderId = function() {
    return serverDataFolderId;
  };

  const setServerDataFolderId = function(id) {
    serverDataFolderId = id;
  };

  return _.extend(
    {
      getResourceId,
      setResourceId,
      getToken: getToken,
      setToken: setToken,
      getServerDataFolderId: getServerDataFolderId,
      setServerDataFolderId: setServerDataFolderId,
    },
    settings
  );
}());

