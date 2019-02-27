import {compose, merge, reduxFactory, useDeps} from "@nqminds/nqm-tdx-client";
import ServerPendingModal from "../components/server-pending-modal";

const reduxMapper = (state) => {
  return {
    serverError: state.core.serverError,
    serverPending: state.core.serverPending,
  };
};

const depsManager = (context, actions) => ({
  store: context.store,
  setServerIdle: actions.core.serverIdle,
});

export default merge(
  compose(reduxFactory(reduxMapper)),
  useDeps(depsManager)
)(ServerPendingModal);
