import React from "react";
import {compose, merge, promiseFactory, trackerFactory, useDeps} from "@nqminds/nqm-tdx-client";

import Component from "./data-demo-component";
import {CircularProgress} from "@material-ui/core";

const exampleDatasetId = "SJx1xcJ-RB";

export const depsMapper = (context, actions) => { // The depsMapper is passed the context and redux actions
  const {store, tdxConnections} = context;
  return {
    connectionManager: tdxConnections.defaultTDX, // This is an instance of tdxClient
    setFeedback: actions.core.setFeedback,
    store,
  };
};

// Subscribing to a dataset provides a reactive data source
export const settingsMapper = ({connectionManager}, onData) => {
  if (connectionManager.subscribe("datasetData", [exampleDatasetId]).ready()) {
    const data = connectionManager.cache.data.find({
      _d: exampleDatasetId,
    }).fetch();
    onData(null, {count: data.length, data});
  }
};

// If non-reactive calls are needed use the promise factory
export const dataMapper = async({
  connectionManager,
  count,
}) => {
  const api = connectionManager.tdxApi;
  const {count: total} = await api.getDataCount(exampleDatasetId);
  return {api, exampleDatasetId, percentage: (count / total) * 100};
};

// Compose pattern runs functions in reverse order that they are passed, the results of each stage being passed
// to the next
export default merge(
  compose(
    promiseFactory(dataMapper),
    {
      propsToWatch: ["count"], // This will re-run every time count changes
      loadingHandler: () => <CircularProgress color="secondary" />, // eslint-disable-line react/display-name
    }
  ),
  compose(trackerFactory(settingsMapper), {
    loadingHandler: () => <CircularProgress color="secondary" />, // eslint-disable-line react/display-name
  }),
  useDeps(depsMapper),
)(Component);
