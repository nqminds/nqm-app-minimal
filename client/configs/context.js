import {createStore} from "redux";
import constants from "./constants";
import {utils, TDXConnections} from "@nqminds/nqm-tdx-client";
import {initialiseUser} from "./boot";
import debug from "debug";

const log = debug("nqm-app:context");

// Create and return the application context
export default function({initialState, reducers, settings}) {
  const tdxConnections = new TDXConnections(settings.public.tdxConfig);

  const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const getDatasetId = buildDatasetMapper(store);

  const context = {
    constants,
    getDatasetId,
    history,
    settings,
    store,
    tdxConnections,
    utils: utils,
    user: () => tdxConnections.defaultTDX.user,
  };

  tdxConnections.on("user", (connection) => {
    log("connected to tdx at %s", connection.tdx.tdxServer);
    initialiseUser(context, connection.user);
  });

  return context;
}

/**
 * This function allows getting a dataset inside the app's server data folder
 * or optionally overriding the dataset that is returned based on permission
 * levels of users
 */
function buildDatasetMapper(store) {
  return (dataset) => {
    const state = store.getState();
    switch (dataset) {
      case "example-dataset": // Include a case statement if a different id should be returned based on permission
        if (state.core.permissions.includes("admin")) {
          return `${state.core.serverDataFolderId}-${dataset}AdminView`;
        }
      default: // eslint-disable-line no-fallthrough
        return `${state.core.serverDataFolderId}-${dataset}`;
    }
  };
}
