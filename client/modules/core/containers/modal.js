import {dataLoader} from "nqm-app-framework";
import Modal from "../components/modal";

export const depsMapper = (context, actions) => ({
  goBack: actions.navigation.goBack,
});

export default dataLoader.merge(
  dataLoader.useDeps(depsMapper)
)(Modal);
