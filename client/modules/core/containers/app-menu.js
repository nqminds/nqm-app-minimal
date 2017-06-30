import {dataLoader} from "nqm-app-framework";
import AppMenu from "../components/app-menu";

export const depsMapper = (context, actions) => ({  // eslint-disable-line no-unused-vars
  setSidebarFloating: actions.sidebar.setFloating,
});

export default dataLoader.merge(
  dataLoader.useDeps(depsMapper)
)(AppMenu);
