import * as reduxActions from "../modules/core/actions/redux-actions";
import debug from "debug";
import _ from "lodash";

const log = debug("nqm-app:boot");

const checkAndCreate = function(context, name, schemaId) {
  const {getDataFolderId, store, tdxConnections} = context;

  store.dispatch(reduxActions.initialiseProgress(`${name} resource`));
  const connectionManager = tdxConnections.getDefault();

  const lookup = {
    name,
    parents: getDataFolderId(),
    "schemaDefinition.parent": schemaId,
  };

  log("checking %s resource", name);
  return connectionManager.tdxApi.getResources(lookup)
    .then((resources) => {
      if (resources.length === 0) {
        // Create the resource.
        log("creating %s resource", name);
        const resourcePayload = {
          name,
          basedOnSchema: schemaId,
          parentId: getDataFolderId(),
        };
        // Add resource and wait for index to be built.
        return connectionManager.tdxApi.addResource(resourcePayload, true)
          .then((result) => {
            return result.response.id;
          });
      } else {
        if (resources.length > 1) {
          log("unexpected multiple %s resources [%d]", name, resources.length);
        } else {
          log("%s resource OK", name);
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(_.first(resources).id);
          }, 250);
        });
      }
    });
};

const checkAndCreateFilter = function(
  context,
  name,
  schemaId,
  derivedFromId,
  shareMode,
  readConstraint,
  writeConstraint,
  readProjection,
  writableProperties,
  ) {
  const {getDataFolderId, store, tdxConnections} = context;

  store.dispatch(reduxActions.initialiseProgress(`${name} resource filter`));
  const connectionManager = tdxConnections.getDefault();

  // Look for a resource with the given derived source.
  const lookup = {
    name,
    "derived.source": derivedFromId,
    parents: getDataFolderId(),
  };

  log("checking %s resource", name);
  return connectionManager.tdxApi.getResources(lookup)
    .then((resources) => {
      if (resources.length === 0) {
        // Create the resource filter
        log("creating %s resource filter", name);
        const resourcePayload = {
          name,
          basedOnSchema: schemaId,
          derived: {
            source: derivedFromId,
            filter: JSON.stringify(readConstraint || {}),
            writeFilter: JSON.stringify(writeConstraint || {}),
            projection: JSON.stringify(readProjection || {}),
            writeProjection: JSON.stringify(writableProperties || {}),
          },
          parentId: getDataFolderId(),
          shareMode,
        };
        // Add resource and wait for index to be built.
        return connectionManager.tdxApi.addResource(resourcePayload, true)
          .then((result) => {
            return result.response.id;
          });
      } else {
        if (resources.length > 1) {
          log("unexpected multiple %s resource filters [%d]", name, resources.length);
        } else {
          log("%s resource filter OK", name);
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(_.first(resources).id);
          }, 250);
        });
      }
    });
};

const initialiseUser = function(context) {
  return Promise.resolve(context)
    .then(() => {
      context.store.dispatch(reduxActions.setInitialised());
    })
    .catch((err) => {
      log("FAILED TO INITIALISE USER: [%s]", err.message);
      context.store.dispatch(reduxActions.initialiseProgress(`app initialisation error: ${err.message}`));
    });
};

export {
  initialiseUser,
};
