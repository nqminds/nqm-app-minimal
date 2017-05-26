module.exports = (function() {
  "use strict";
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

  return {
    appTitle: "minimal",
    applicationId: "SJg2iqKde-",                    // This is the application account id.
    applicationSecret: "secret",                // Application account secret.
    authServerURL: "https://localhost:4443",
    getServerDataFolderId: getServerDataFolderId,
    setServerDataFolderId: setServerDataFolderId,
    getToken: getToken,
    setToken: setToken,
    tdxApiConfig: {
      commandHost: "http://localhost:3103",
      queryHost: "http://localhost:3104",
      accessTokenTTL: 31622400,                     // 1 year in seconds.
    },
  };
}());
