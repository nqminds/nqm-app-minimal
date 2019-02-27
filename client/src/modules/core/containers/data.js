/**
 * An example of a container for loading data from the TDX, these work
 * exactly the same as they used to but there is an additional factory
 * type available for your mappers that is designed for returning promises,
 * called promiseFactory
 */
import {compose, merge, trackerFactory, reduxFactory, useDeps} from "@nqminds/nqm-tdx-client";
import Data from "../components/data";

const dataMapper = (props, onData) => {
  onData(null, {data: []});
};

const reduxMapper = (state) => {
  return {
    candidatesFilterId: state.core.candidatesFilterId,
    profile: state.core.profile,
  };
};

const depsManager = ({store, tdxConnections}) => ({
  connectionManager: tdxConnections.defaultTDX,
  store,
  tdxConnections,
});

export default merge(
  compose(trackerFactory(dataMapper)),
  compose(reduxFactory(reduxMapper)),
  useDeps(depsManager)
)(Data);
