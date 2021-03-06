import {compose, merge, reduxFactory, trackerFactory, useDeps} from "@nqminds/nqm-tdx-client";
import {withRouter} from "react-router-dom";
import ApplicationRoot from "./application-component";
import {constants} from "@nqminds/nqm-core-utils";

export const depsMapper = ({store, tdxConnections}, actions) => {
  return {
    connectionManager: tdxConnections.defaultTDX,
    store,
    setAuthToken: actions.core.setAuthToken,
    setPermissions: actions.core.setPermissions,
  };
};

export const reduxMapper = (state) => {
  return {
    accessToken: state.core.accessToken,
    appInitialised: state.core.appInitialised,
    appInitialiseProgress: state.core.appInitialiseProgress,
    authenticated: state.core.authenticated,
    authenticating: state.core.authenticating,
    authenticationError: state.core.authenticationError,
    serverDataFolderId: state.core.serverDataFolderId,
    userInitialised: state.core.userInitialised,
  };
};

export const authMapper = ({
  accessToken,
  authenticated,
  authenticating,
  setAuthToken,
}, onData) => {
  // Determine if there is an accessToken we need to process.
  if (!authenticated && !authenticating && accessToken) {
    // There is an access token and we haven't started processing it yet.
    setAuthToken(accessToken)
      .then(() => {
        onData(null, {});
      });
  } else {
    // There is no access token, or there is an access token but we're already in the process
    // of initialising with it.
    onData(null, {});
  }
};

function permissionTracker({authenticated, connectionManager, serverDataFolderId, setPermissions}, onData) {
  if (authenticated) {
    const filter = {
      par: serverDataFolderId,
      typ: constants.accountSetBaseType,
      grp: "m",
    };
    if (connectionManager.subscribe("resourceAccess", [filter]).ready()) {
      const data = connectionManager.cache.resourceAccess.find(filter).fetch();
      const permissions = data.map(({rid}) => rid.split("-")[1]).filter((p) => p);
      setPermissions(permissions);
      onData(null, {});
    }
  } else {
    onData(null, {});
  }
}

const Container = merge(
  compose(trackerFactory(permissionTracker), {propsToWatch: ["authenticated"]}),
  compose(authMapper, {propsToWatch: ["accessToken", "authenticated", "authenticating"]}),
  compose(reduxFactory(reduxMapper)),
  useDeps(depsMapper)
)(ApplicationRoot);

export default withRouter(Container);
