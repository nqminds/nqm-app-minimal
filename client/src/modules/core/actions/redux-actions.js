import * as actionTypes from "./action-types";

/*
 * AUTH
 *
 */
export const authenticating = function() {
  return {type: actionTypes.CORE_AUTH_AUTHENTICATING};
};

export const setAuthToken = function(token) {
  return {type: actionTypes.CORE_AUTH_SET_TOKEN, token};
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
export const setInitialised = function() {
  return {type: actionTypes.CORE_APP_INITIALISED};
};

export const initialiseProgress = function(progress) {
  return {type: actionTypes.CORE_APP_INITIALISE_PROGRESS, progress};
};

export const toggleTheme = function() {
  return {type: actionTypes.CORE_APP_TOGGLE_THEME};
};

export const setProfileId = function(profileId) {
  return {type: actionTypes.CORE_APP_SET_PROFILE_ID, profileId};
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

