import {dataLoader} from "nqm-app-framework";
import AppMenu from "../components/app-menu";

export const stateMapper = (state) => ({
  activeItem: state.navigation.active,
});

export const depsMapper = (context, actions) => ({
  store: context.store,
  connectionManager: context.connectionManager,
  FlowRouter: context.FlowRouter,
  go: actions.navigation.go,
});

export default dataLoader.merge(
  dataLoader.compose(dataLoader.reduxFactory(stateMapper)),
  dataLoader.useDeps(depsMapper)
)(AppMenu);
