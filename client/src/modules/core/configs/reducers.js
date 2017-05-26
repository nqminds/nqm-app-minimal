import {
  CORE_APP_INITIALISED,
  CORE_APP_INITIALISE_PROGRESS,
  CORE_AUTH_SIGN_IN,
  CORE_AUTH_OK,
  CORE_AUTH_ERROR,
  CORE_AUTH_SIGN_OUT,
  CORE_APP_TOGGLE_THEME,
  CORE_SERVER_PENDING,
  CORE_SERVER_ERROR,
  CORE_SERVER_IDLE,
} from "../actions/action-types";

const defaultTDXState = {
  appInitialised: false,
  appInitialiseProgress: "",
  authenticating: false,
  authenticated: false,
  authReturnUrl: "",
  authToken: "",
  darkTheme: true,
  serverPending: "",
  serverError: null,
};

export function core(state = defaultTDXState, action) {
  switch (action.type) {
    case CORE_APP_INITIALISED:
      return {...state, appInitialised: true};
    case CORE_APP_INITIALISE_PROGRESS:
      return {...state, appInitialiseProgress: action.progress};
    case CORE_APP_TOGGLE_THEME:
      return {...state, darkTheme: !state.darkTheme};
    case CORE_AUTH_SIGN_IN:
      return {...state, authenticating: true, authReturnUrl: action.returnUrl};
    case CORE_AUTH_OK:
      return {...state, authenticating: false, authenticated: true, authToken: action.token};
    case CORE_AUTH_ERROR:
      return {...state, authenticating: false, authenticated: false, authToken: "", authenticationError: action.error};
    case CORE_AUTH_SIGN_OUT:
      return {...state, authenticating: false, authenticated: false, authToken: "", authenticationError: null};
    case CORE_SERVER_PENDING:
      return {...state, serverPending: action.description};
    case CORE_SERVER_ERROR:
      return {...state, serverError: action.error};
    case CORE_SERVER_IDLE:
      return {...state, serverPending: "", serverError: null};
    default:
      return state;
  }
}
