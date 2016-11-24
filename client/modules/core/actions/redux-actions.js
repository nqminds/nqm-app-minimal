import * as actionTypes from "./action-types";

export const setActive = function(active) {
  return {type: actionTypes.SET_ACTIVE, active};
};
