import {createStore} from "redux";
import constants from "./constants";
import {utils, TDXConnections} from "@nqminds/nqm-tdx-client";
import {initialiseUser} from "./boot";
import debug from "debug";

const log = debug("nqm-app:context");

// Create and return the application context
export default function({initialState, reducers, settings}) {
  const tdxConnections = new TDXConnections(settings.public.tdxConfig);

  const context = {
    constants,
    getDatasetId: (dataset) => `${initialState.core.serverDataFolderId}-${dataset}`,
    history,
    settings,
    store: createStore(
      reducers,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
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
