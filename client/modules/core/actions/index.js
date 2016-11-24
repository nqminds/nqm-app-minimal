import * as reduxActions from "./redux-actions";

export default {
  navigation: {
    go({store, FlowRouter}, active) {
      store.dispatch(reduxActions.setActive(active));
      FlowRouter.go(active);
    },
    goBack({store, FlowRouter}) {
      const route = FlowRouter.current();
      if (route.oldRoute) {
        store.dispatch(reduxActions.setActive(route.oldRoute.name));
        window.history.back();
      } else {
        store.dispatch(reduxActions.setActive("root"));
        FlowRouter.go("root");
      }
    },
  },
};
