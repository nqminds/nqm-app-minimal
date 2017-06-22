/* eslint-disable no-underscore-dangle */
import {createStore} from "redux";
import constants from "./constants";
import nqmUtils from "nqm-core-utils";
import {TDXConnections} from "nqm-ddp-tdx";
import {initialiseUser} from "./boot";

// Create and return the application context
export default function({initialState, reducers, settings}) {
  const tdxConnections = new TDXConnections(settings.public.tdxConfig);
  const context = {
    constants,
    history,
    settings,
    store: createStore(
      reducers,
      initialState,
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
