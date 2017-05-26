module.exports = (function() {
  "use strict";

  const log = require("debug")("nqm-app:boot");
  const TDXApi = require("nqm-api-tdx");
  const nqmUtils = require("nqm-core-utils");
  const settings = require("./server-settings");
  const constants = nqmUtils.constants;
  const _ = require("lodash");

  const bootstrap = function() {
    // Configure TDX comms.
    const api = new TDXApi(settings.tdxApiConfig);

    return api.authenticate(settings.applicationId, settings.applicationSecret)
      .then((token) => {
        log("TDX authenticated OK");
        settings.setToken(token);

        // Determine the id of the application server data folder.
        const dataFolderId = nqmUtils.shortHash(constants.applicationServerDataFolderPrefix + settings.applicationId);
        return api.getResource(dataFolderId);
      })
      .then((resource) => {
        if (!resource) {
          // TODO - review - Should be created by account-saga, but could attempt to re-create it here?
          return Promise.reject(new Error("server data folder not found"));
        }

        log("got server data folder [%s]", resource.id);

        // Cache the folder id.
        settings.setServerDataFolderId(resource.id);
        return resource.id;
      })
      .catch((err) => {
        log("TDX authentication failed [%s]", err.message);
        return Promise.reject(err);
      });
  };

  return bootstrap;
}());
