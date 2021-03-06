import {
  CORE_APP_RESET,
  CORE_APP_INITIALISED,
  CORE_APP_USER_INITIALISED,
  CORE_APP_INITIALISE_PROGRESS,
  CORE_AUTH_AUTHENTICATING,
  CORE_AUTH_AUTHENTICATED,
  CORE_AUTH_ERROR,
  CORE_AUTH_SIGN_OUT,
  CORE_APP_TOGGLE_THEME,
  CORE_APP_HIDE_FEEDBACK,
  CORE_APP_SET_FEEDBACK,
  CORE_APP_SET_PERMISSIONS,
} from "../actions/action-types";

export const defaultCoreState = {
  appInitialised: false,
  userInitialised: false,
  appInitialiseProgress: "",
  authenticated: false,
  authenticating: false,
  accessToken: "",
  darkTheme: true,
  userDataFolderId: "",
  feedback: {},
  isFeedbackOpen: false,
  permissions: [],
};

export function core(state = defaultCoreState, action) {
  switch (action.type) {
    case CORE_APP_RESET:
      return {...state, appInitialised: false, userInitialised: false};
    case CORE_APP_INITIALISED:
      return {...state, appInitialised: action.initialised};
    case CORE_APP_USER_INITIALISED:
      return {...state, userInitialised: action.initialised};
    case CORE_APP_INITIALISE_PROGRESS:
      return {...state, appInitialiseProgress: action.progress};
    case CORE_APP_TOGGLE_THEME:
      return {...state, darkTheme: !state.darkTheme};
    case CORE_AUTH_AUTHENTICATING:
      return {...state, authenticating: true};
    case CORE_AUTH_AUTHENTICATED:
      return {...state, authenticating: false, authenticated: action.authenticated};
    case CORE_AUTH_ERROR:
      return {...state, authenticating: false, accessToken: "", authenticationError: action.error};
    case CORE_AUTH_SIGN_OUT:
      return {...state, authenticating: false, accessToken: "", authenticationError: null, userInitialised: false};
    case CORE_APP_SET_FEEDBACK:
      return {...state, feedback: action.feedback, isFeedbackOpen: true};
    case CORE_APP_HIDE_FEEDBACK:
      return {...state, isFeedbackOpen: false};
    case CORE_APP_SET_PERMISSIONS:
      return {...state, permissions: action.permissions};
    default:
      return state;
  }
}
