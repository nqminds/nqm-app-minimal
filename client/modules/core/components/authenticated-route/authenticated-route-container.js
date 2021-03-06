/**
 * Container for the authenticated rout HoC which can be used to redirect to sign
 * in page if a user visits a page where they need to be logged in
 */
import {compose, merge, reduxFactory, useDeps} from "@nqminds/nqm-tdx-client";
import AuthenticatedRoute from "./authenticated-route-component";

export const depsMapper = ({store, tdxConnections, utils}, actions) => {
  return {
    signIn: actions.core.signIn,
    store,
    user: tdxConnections.defaultTDX.user,
    utils,
  };
};

export const reduxMapper = (state) => {
  return {
    userInitialised: state.core.userInitialised,
  };
};

export const authMapper = ({userInitialised, user, utils}, onData) => {
  // Must have a valid **user** for components that require authentication. Check that there
  // is an initialised user, and verify that it is a user account, (i.e. not an application account).
  if (!userInitialised || !user || user.accountType !== utils.constants.userAccountType) {
    // Not a valid user account.
    onData(null, {authenticated: false});
  } else {
    // We have a valid user account.
    onData(null, {authenticated: true});
  }
};

export default merge(
  compose(authMapper),
  compose(reduxFactory(reduxMapper)),
  useDeps(depsMapper),
)(AuthenticatedRoute);
