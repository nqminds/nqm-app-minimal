import {compose, merge, reduxFactory, useDeps} from "nqm-app/configs/data-loaders";
import ApplicationFrame from "../components/application-frame";

export const connectedMapper = ({authenticated, getAccessToken, setAuthToken}, onData) => {
  if (!authenticated) {
    const accessToken = getAccessToken();
    if (accessToken) {
      setAuthToken(accessToken);
    }
  }
  onData(null, {});
};

export const reduxMapper = (state) => {
  return {
    appInitialiseProgress: state.core.appInitialiseProgress,
    appInitialised: state.core.appInitialised,
    authenticated: state.core.authenticated,
    authenticating: state.core.authenticating,
    authenticationError: state.core.authenticationError,
    darkTheme: state.core.darkTheme,
  };
};

export const depsMapper = ({getAccessToken, store}, actions) => {
  return {
    getAccessToken,
    signIn: actions.core.signIn,
    store,
    setAuthToken: actions.core.authenticated,
  };
};

const Container = merge(
  compose(connectedMapper),
  compose(reduxFactory(reduxMapper)),
  useDeps(depsMapper)
)(ApplicationFrame);

export default Container;
