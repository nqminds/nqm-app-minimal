/* eslint-disable no-underscore-dangle */
import {createStore} from "redux";
import constants from "./constants";
import nqmUtils from "nqm-core-utils";
import settings from "./client-settings";
import {TDXConnections} from "nqm-ddp-tdx";
import {initialiseUser} from "./boot";

// Create and return the application context
export default function({reducers}) {
  const tdxConnections = new TDXConnections(settings.tdxConfig);
  const context = {
    constants,
    // TODO - MOVE THESE TO REDUX
    clearAccessToken: () => (
      __applicationConfig.clearAccessToken()        // eslint-disable-line no-undef
    ),
    getAccessToken: () => (
      __applicationConfig.getAccessToken()          // eslint-disable-line no-undef
    ),
    getDataFolderId: () => (
      __applicationConfig.getUserDataFolderId()     // eslint-disable-line no-undef
    ),
    getServerDataFolderId: () => (
      __applicationConfig.getServerDataFolderId()   // eslint-disable-line no-undef
    ),
    history,
    settings,
    store: createStore(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
    tdxConnections,
    utils: nqmUtils,
    user: () => tdxConnections.getDefault().user(),
  };

  tdxConnections.on("user", () => {
    initialiseUser(context);
  });

  return context;
}
