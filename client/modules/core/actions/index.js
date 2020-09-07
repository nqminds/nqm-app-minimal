import * as reduxActions from "./redux-actions";

export default {
  core: {
    dashboard({tdxConnections}) {
      tdxConnections.logout();
      window.location = "/dashboard";
    },
    hideFeedback({store}) {
      store.dispatch(reduxActions.hideFeedback());
    },
    setAuthToken({tdxConnections, store}, token) {
      // The below line causes issues with react/redux update leading to a warning
      // store.dispatch(reduxActions.authenticating());
      return tdxConnections.setToken(token)
        .then(() => {
          store.dispatch(reduxActions.authenticated(!!token));
        })
        .catch((err) => {
          store.dispatch(reduxActions.authenticationError(err));
        });
    },
    setFeedback({store}, feedback) {
      store.dispatch(reduxActions.setFeedback(feedback));
    },
    setPermissions({store}, permissions) {
      store.dispatch(reduxActions.setPermissions(permissions));
    },
    signIn() {
      // Redirect to server route to begin authentication process.
      const callback = window.location.href;
      window.location = `/auth/?rurl=${callback}`;
    },
    signOut({tdxConnections, store}) {
      tdxConnections.logout();
      store.dispatch(reduxActions.signOut());
    },
    signUp() {
      // Redirect to server route to begin authentication process, and redirect to the register page.
      const callback = "/profile";
      window.location = `/auth/?rurl=${callback}`;
    },
    toggleTheme({store}) {
      store.dispatch(reduxActions.toggleTheme());
    },
  },
};
