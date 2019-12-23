import {merge, useDeps} from "@nqminds/nqm-tdx-client";
import Component from "./state-demo-component";

export const depsMapper = (context, actions) => {
  return {
    setFeedback: actions.core.setFeedback,
  };
};

const Container = merge(
  useDeps(depsMapper)
)(Component);

export default Container;
