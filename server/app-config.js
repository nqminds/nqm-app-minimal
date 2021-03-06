/**
 * Exports an object for storing details about the app state
 */
module.exports = (function(settings) {
  "use strict";
  const _ = require("lodash");

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
});
