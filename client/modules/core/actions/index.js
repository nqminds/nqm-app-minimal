import * as reduxActions from "./redux-actions";

export default {
  navigation: {
    setActive({store, FlowRouter}, active) {
      store.dispatch(reduxActions.setActive(active));
      FlowRouter.go(active);
    },
  },
};
