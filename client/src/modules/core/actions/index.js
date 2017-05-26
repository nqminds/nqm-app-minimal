import * as reduxActions from "./redux-actions";

export default {
  core: {
    signIn({store}) {
      const callback = window.location.href;
      store.dispatch(reduxActions.signIn(callback));
      window.location = `/auth/?rurl=${callback}`;
    },
    authenticated({clearAccessToken, tdxConnections, store}, token) {
      store.dispatch(reduxActions.signIn());
      tdxConnections.useToken(token)
        .then(() => {
          store.dispatch(reduxActions.authenticated(token));
        })
        .catch((err) => {
          clearAccessToken();
          store.dispatch(reduxActions.authenticationError(err));
        });
    },
    serverIdle({store}) {
      store.dispatch(reduxActions.serverIdle());
    },
    signOut({clearAccessToken, tdxConnections, store}) {
      clearAccessToken();
      tdxConnections.logout();
      store.dispatch(reduxActions.signOut());
    },
    toggleTheme({store}) {
      store.dispatch(reduxActions.toggleTheme());
    },
  },
};
