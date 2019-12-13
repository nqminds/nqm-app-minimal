import {compose, merge, reduxFactory, useDeps} from "@nqminds/nqm-tdx-client";
import Component from "./system-notification-component";

export const depsMapper = ({store}, actions) => {
  return {
    setFeedback: actions.core.setFeedback,
    hideFeedback: actions.core.hideFeedback,
    store,
  };
};

export const reduxMapper = (state) => {
  return {
    feedback: state.core.feedback,
    isFeedbackOpen: state.core.isFeedbackOpen,
  };
};

const Container = merge(
  compose(reduxFactory(reduxMapper)),
  useDeps(depsMapper)
)(Component);

export default Container;
