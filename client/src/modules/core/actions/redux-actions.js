import * as actionTypes from "./action-types";

/*
 * AUTH
 *
 */
export const authenticating = function() {
  return {type: actionTypes.CORE_AUTH_AUTHENTICATING};
};

export const authenticated = function(authenticated) {
  return {type: actionTypes.CORE_AUTH_AUTHENTICATED, authenticated};
};

export const authenticationError = function(err) {
  return {type: actionTypes.CORE_AUTH_ERROR, error: err.message};
};

export const signOut = function() {
  return {type: actionTypes.CORE_AUTH_SIGN_OUT};
};

/*
 * APP
 *
 */
export const reset = function() {
  return {type: actionTypes.CORE_APP_RESET};
};

export const setAppInitialised = function(initialised) {
  return {type: actionTypes.CORE_APP_INITIALISED, initialised};
};

export const setUserInitialised = function(initialised) {
  return {type: actionTypes.CORE_APP_USER_INITIALISED, initialised};
};

export const initialiseProgress = function(progress) {
  return {type: actionTypes.CORE_APP_INITIALISE_PROGRESS, progress};
};

export const toggleTheme = function() {
  return {type: actionTypes.CORE_APP_TOGGLE_THEME};
};

/*
 * TDX
 *
 */
export const serverPending = function(description) {
  return {type: actionTypes.CORE_SERVER_PENDING, description};
};

export const serverError = function(error) {
  return {type: actionTypes.CORE_SERVER_ERROR, error};
};

export const serverIdle = function() {
  return {type: actionTypes.CORE_SERVER_IDLE};
};

