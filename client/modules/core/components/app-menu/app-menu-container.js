import {merge, useDeps} from "@nqminds/nqm-tdx-client";
import Component from "./app-menu-component";

function depsMapper({isPermitted}) {
  return {isPermitted};
}

export default merge(
  useDeps(depsMapper)
)(Component);
