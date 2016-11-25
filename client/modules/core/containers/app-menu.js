import {dataLoader} from "nqm-app-framework";
import AppMenu from "../components/app-menu";

export const depsMapper = (context, actions) => ({
});

export default dataLoader.merge(
  dataLoader.useDeps(depsMapper)
)(AppMenu);
