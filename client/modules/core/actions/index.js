import * as reduxActions from "./redux-actions";

export default {
  core: {
    dashboard({tdxConnections}) {
      tdxConnections.logout();
      window.location = "/dashboard";
    },
    signIn() {
      // Redirect to server route to begin authentication process.
      const callback = window.location.href;
      window.location = `/auth/?rurl=${callback}`;
    },
    signUp() {
      // Redirect to server route to begin authentication process, and redirect to the register page.
      const callback = "/profile";
      window.location = `/auth/?rurl=${callback}`;
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
    signOut({tdxConnections, store}) {
      tdxConnections.logout();
      store.dispatch(reduxActions.signOut());
    },
    toggleTheme({store}) {
      store.dispatch(reduxActions.toggleTheme());
    },
    setFeedback({store}, feedback) {
      store.dispatch(reduxActions.setFeedback(feedback));
    },
    hideFeedback({store}) {
      store.dispatch(reduxActions.hideFeedback());
    },
  },
};
