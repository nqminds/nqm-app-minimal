import * as reduxActions from "../modules/core/actions/redux-actions";
import debug from "debug";
import _ from "lodash";

const log = debug("nqm-app:boot");

const checkAndCreate = function(context, name, schemaId) {
  //
  // Check that a resource exists with the given name and schema in the user data folder.
  // Create the resource if it doesn't exist.
  //
  const {store, tdxConnections} = context;

  // Feedback the current operation to the UI.
  store.dispatch(reduxActions.initialiseProgress(`${name} resource`));

  // Get the tdx connection manager.
  const connectionManager = tdxConnections.getDefault();

  // Create the lookup to check if the resource already exists.
  const lookup = {
    name,
    parents: store.getState().core.userDataFolderId,
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
          parentId: store.getState().core.userDataFolderId,
        };
        // Add resource and wait for index to be built.
        return connectionManager.tdxApi.addResource(resourcePayload, true)
          .then((result) => {
            return result.response.id;
          });
      } else {
        // A resource exists.
        if (resources.length > 1) {
          log("unexpected multiple %s resources [%d]", name, resources.length);
        } else {
          log("%s resource OK", name);
        }
        return new Promise((resolve) => {
          // Delay to allow the UI feedback to be readable (could remove this delay).
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
  //
  // Check that a filter exists with the given name and schema in the user data folder.
  // Create the filter if it doesn't exist.
  //
  const {store, tdxConnections} = context;

  // Feedback the current operation to the UI.
  store.dispatch(reduxActions.initialiseProgress(`${name} resource filter`));

  // Get the tdx connection manager.
  const connectionManager = tdxConnections.getDefault();

  // Look for a resource with the given derived source.
  const lookup = {
    name,
    "derived.source": derivedFromId,
    parents: store.getState().core.userDataFolderId,
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
          parentId: store.getState().core.userDataFolderId,
          shareMode,
        };
        // Add resource and wait for index to be built.
        return connectionManager.tdxApi.addResource(resourcePayload, true)
          .then((result) => {
            return result.response.id;
          });
      } else {
        // The resource already exists.
        if (resources.length > 1) {
          log("unexpected multiple %s resource filters [%d]", name, resources.length);
        } else {
          log("%s resource filter OK", name);
        }
        return new Promise((resolve) => {
          // Delay to allow the UI feedback to be readable (could remove this delay).
          setTimeout(() => {
            resolve(_.first(resources).id);
          }, 250);
        });
      }
    });
};

const checkUserProfile = function(context) {
  // Create a profile dataset (n.b. you should use a different schema than "dataset").
  return checkAndCreate(context, "profile", "dataset")
    .then((resourceId) => {
      context.store.dispatch(reduxActions.setProfileId(resourceId));
    });
};

const initialiseUser = function(context) {
  // Do any user initialisation here.
  // For example, make sure a profile dataset exists for the current user.
  return checkUserProfile(context)
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
