module.exports = (function(appConfig) {
  "use strict";

  const log = require("./logger")("nqm-app:boot");
  const TDXApi = require("@nqminds/nqm-api-tdx");
  const nqmUtils = require("@nqminds/nqm-core-utils");
  const constants = nqmUtils.constants;

  const addServerResource = function(api, id, name, schema) {
    log.info("creating %s dataset", name);
    return api.addResource(
      {
        id: `${appConfig.getServerDataFolderId()}-${id}`,
        name: name,
        schema: schema,
        parentId: appConfig.getServerDataFolderId(),
      },
      true
    ).then((result) => {
      return result.response;
    });
  };

  const addServerFilter = function(api, id, name, derived, shareMode) {
    log.info("creating %s dataset", name);
    const resourceId = `${appConfig.getServerDataFolderId()}-${id}`;
    const filterId = `${appConfig.getServerDataFolderId()}-${id}Filter`;

    return api.addResource(
      {
        id: filterId,
        name: `${name} filter`,
        derived: {
          source: resourceId,
          filter: JSON.stringify(derived.filter),
          projection: JSON.stringify(derived.projection),
          writeFilter: JSON.stringify(derived.writeFilter),
          writeProjection: JSON.stringify(derived.writeProjection),
        },
        parentId: appConfig.getServerDataFolderId(),
        shareMode: shareMode,
      },
      true
    ).then((result) => {
      return result.response;
    });
  };

  const checkServerResourceExists = function(api, resourceId) {
    return api.getResource(resourceId)
      .catch((err) => {
        if (err.name === "TDXApiError") {
          const errInfo = JSON.parse(err.message);
          if (errInfo.code === 404) {
            return null;
          } else {
            return Promise.reject(err);
          }
        } else {
          return Promise.reject(err);
        }
      });
  };

  const bootServerResource = async function(api, id, name, filter = false) {
    const resourceId = `${appConfig.getServerDataFolderId()}-${id}`;
    const filterId = `${appConfig.getServerDataFolderId()}-${id}Filter`;

    try {
      // Check the resource exists.
      let resource = checkServerResourceExists(api, resourceId);
      if (!resource) {
        // Create the resource.
        resource = await addServerResource(api, id, name, appConfig.schemas[id]);
        if (!resource) {
          return Promise.reject(`resource ${id} not found"`);
        }
      } else {
        log.info("got resource %s", resource.id);
      }

      appConfig.setResourceId(id, resource.id);
      if (filter) {
        let filterResource = checkServerResourceExists(api, filterId);
        if (!filterResource) {
          // Create the filter resource.
          filterResource = addServerFilter(api, id, name, appConfig.derived[id], nqmUtils.constants.publicRWShareMode);
          if (!filterResource) {
            return Promise.reject(`${id} filter resource not found`);
          }
        } else {
          log.info("got filter resource %s", filterResource.id);
        }

        appConfig.setResourceId(`${id}Filter`, filterResource.id);
      }
    } catch (err) {
      log.error("error booting server resources", err);
      throw err;
    }
  };

  return async function() {
    // Configure TDX comms.
    const api = new TDXApi(appConfig.public.tdxConfig);

    try {
      const token = await api.authenticate(appConfig.applicationId, appConfig.applicationSecret);
      log.info("TDX authenticated OK");
      appConfig.setToken(token);
      const dataFolderId = nqmUtils.shortHash(constants.applicationServerDataFolderPrefix + appConfig.applicationId);
      const resource = await checkServerResourceExists(api, dataFolderId);
      if (!resource) {
        return Promise.reject(new Error("server data folder not found"));
      }

      log.info("got server data folder [%s]", resource.id);

      // Cache the folder id.
      appConfig.setServerDataFolderId(resource.id);

      // Create any resources needed here e.g.
      // await bootServerResource(api, "owner", "owners");
    } catch (err) {
      log.error("server boot failed [%s]", err.message);
      return Promise.reject(err);
    }
  };
});
