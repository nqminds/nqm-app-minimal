module.exports = (function(appConfig) {
  "use strict";

  const log = require("debug")("nqm-app:boot");
  const TDXApi = require("@nqminds/nqm-api-tdx");
  const nqmUtils = require("@nqminds/nqm-core-utils");
  const constants = nqmUtils.constants;
  const {checkServerResourceExists} = require("./boot-utils")(appConfig);

  const bootstrap = async function() {
    // Configure TDX comms.
    const api = new TDXApi(appConfig.public.tdxConfig);
    try {
      const token = await api.authenticate(appConfig.applicationId, appConfig.applicationSecret);
      log("TDX authenticated OK");
      appConfig.setToken(token);

      // Determine the id of the application server data folder.
      const dataFolderId = nqmUtils.shortHash(constants.applicationServerDataFolderPrefix + appConfig.applicationId);
      const resource = await checkServerResourceExists(api, dataFolderId);

      if (!resource) {
        throw new Error("server data folder not found"); // Should be created by account-saga
      }

      log("got server data folder [%s]", resource.id);

      // Cache the folder id.
      appConfig.setServerDataFolderId(resource.id);
      // Create any resources needed here e.g.
    } catch (err) {
      log("server boot failed [%s]", err.message);
      return Promise.reject(err);
    }
  };

  return bootstrap;
});
