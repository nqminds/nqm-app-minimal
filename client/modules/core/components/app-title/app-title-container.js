import {compose, merge, reduxFactory, useDeps} from "@nqminds/nqm-tdx-client";
import {withRouter} from "react-router-dom";
import AppTitle from "./app-title-component";

export const depsMapper = ({settings, store, tdxConnections}, actions) => {
  return {
    appTitle: settings.public.applicationTitle,
    goToDashboard: actions.core.dashboard,
    signIn: actions.core.signIn,
    signOut: actions.core.signOut,
    store,
    toggleTheme: actions.core.toggleTheme,
    user: tdxConnections.defaultTDX.user,
  };
};

export const reduxMapper = (state) => {
  return {
    darkTheme: state.core.darkTheme,
    profile: state.core.profile,
    userInitialised: state.core.userInitialised,
  };
};

const Container = merge(
  compose(reduxFactory(reduxMapper)),
  useDeps(depsMapper)
)(AppTitle);

export default withRouter(Container);
