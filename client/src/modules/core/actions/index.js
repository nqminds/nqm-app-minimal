import * as reduxActions from "./redux-actions";

export default {
  core: {
    signIn() {
      // Redirect to server route to begin authentication process.
      // The auth server will call back with an access token.
      const callback = window.location.href;
      window.location = `/auth/?rurl=${callback}`;
    },
    setAuthToken({tdxConnections, store}, token) {
      store.dispatch(reduxActions.authenticating());
      return tdxConnections.useToken(token)
        .then(() => {
          store.dispatch(reduxActions.setAuthToken(token));
        })
        .catch((err) => {
          store.dispatch(reduxActions.authenticationError(err));
        });
    },
    serverIdle({store}) {
      store.dispatch(reduxActions.serverIdle());
    },
    signOut({tdxConnections, store}) {
      tdxConnections.logout();
      store.dispatch(reduxActions.signOut());
    },
    toggleTheme({store}) {
      store.dispatch(reduxActions.toggleTheme());
    },
  },
};
