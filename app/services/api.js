import apisauce from "apisauce";

const create = (baseURL = window.location.origin) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
    },
    timeout: 15000,
  });

  let tdxConnections;

  const setTdxApi = (tdx) => tdxConnections = tdx;
  const getTdxApi = () => tdxConnections;
  const setAuthToken = (userAuth) => api.setHeader("Authorization", `Bearer ${userAuth}`);
  const removeAuthToken = () => api.deleteHeader("Authorization");

  const getNqmSetupData = () => api.get("nqm-setup-data");

  return {
    setTdxApi,
    getNqmSetupData,
    setAuthToken,
    getTdxApi,
    removeAuthToken,
  };
};

const api = create();
export default api;
