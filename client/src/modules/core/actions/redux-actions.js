import * as actionTypes from "./action-types";

/*
 * TDX
 *
 */
export const serverPending = function(description) {
  return {type: actionTypes.TDX_SERVER_PENDING, description};
};

export const serverError = function(error) {
  return {type: actionTypes.TDX_SERVER_ERROR, error};
};

export const serverIdle = function() {
  return {type: actionTypes.TDX_SERVER_IDLE};
};

