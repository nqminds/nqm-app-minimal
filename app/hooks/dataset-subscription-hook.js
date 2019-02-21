import React from "react";

import api from "../services/api";

const useDataSubscription = (datasetId, selector, options) => {
  const [data, setData] = React.useState([]);
  const tdx = api.getTdxApi().defaultTDX;
  React.useEffect(
    () => {
      let subscription;
      let observer;
      if (tdx) {
        subscription = tdx.subscribe(
          "dataset-data",
          [
            datasetId,
            selector,
            options,
          ],
          () => {
            const clientSelector = {...selector, _d: datasetId};
            observer = tdx.cache.data.find(clientSelector).observe(
              () => setData(tdx.cache.data.find(clientSelector, options))
            );
          }
        );
      }

      return () => {
        if (observer) {
          observer.stop();
        }
        if (subscription) {
          tdx.unsubscribe(subscription);
        }
      };
    },
    []
  );

  return data;
};

export default useDataSubscription;
