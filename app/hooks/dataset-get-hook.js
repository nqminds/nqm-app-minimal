import React from "react";

import api from "../services/api";

const useGetData = (datasetId, filter = {}, projection = {}, options = {}) => {
  const [data, setData] = React.useState([]);
  const tdxApi = api.getTdxApi().defaultTDX.tdxApi;
  React.useEffect(
    () => {
      tdxApi.getData(datasetId, filter, projection, options)
        .then((response) => {
          setData(response.data);
        })
        .catch(() => {
          // Handle error case here?
        });
    },
    [datasetId, filter, projection, options]
  );
  return data;
};

export default useGetData;
