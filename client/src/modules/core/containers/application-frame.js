import {compose, merge, reduxFactory, useDeps} from "nqm-app/configs/data-loaders";
import ApplicationFrame from "../components/application-frame";

export const reduxMapper = (state) => {
  return {
    accessToken: state.core.accessToken,
    appInitialiseProgress: state.core.appInitialiseProgress,
    appInitialised: state.core.appInitialised,
    authenticating: state.core.authenticating,
    authenticationError: state.core.authenticationError,
    darkTheme: state.core.darkTheme,
  };
};

export const depsMapper = ({store}, actions) => {
  return {
    signIn: actions.core.signIn,
    store,
    setAuthToken: actions.core.setAuthToken,
  };
};

const Container = merge(
  compose(reduxFactory(reduxMapper)),
  useDeps(depsMapper)
)(ApplicationFrame);

export default Container;
