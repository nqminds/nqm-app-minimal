module.exports = (function() {
  "use strict";
  const settings = require("./settings");
  const _ = require("lodash");

  let token;
  let serverDataFolderId;

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
      getToken: getToken,
      setToken: setToken,
      getServerDataFolderId: getServerDataFolderId,
      setServerDataFolderId: setServerDataFolderId,
    },
    settings
  );
}());

