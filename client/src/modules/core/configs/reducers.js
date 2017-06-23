import {
  CORE_APP_INITIALISED,
  CORE_APP_INITIALISE_PROGRESS,
  CORE_APP_SET_PROFILE_ID,
  CORE_AUTH_AUTHENTICATING,
  CORE_AUTH_SET_TOKEN,
  CORE_AUTH_ERROR,
  CORE_AUTH_SIGN_OUT,
  CORE_APP_TOGGLE_THEME,
  CORE_SERVER_PENDING,
  CORE_SERVER_ERROR,
  CORE_SERVER_IDLE,
} from "../actions/action-types";

export const defaultCoreState = {
  appInitialised: false,
  appInitialiseProgress: "",
  authenticating: false,
  accessToken: "",
  darkTheme: true,
  profileId: "",
  serverPending: "",
  serverError: null,
  userDataFolderId: "",
};

export function core(state = defaultCoreState, action) {
  switch (action.type) {
    case CORE_APP_INITIALISED:
      return {...state, appInitialised: true};
    case CORE_APP_INITIALISE_PROGRESS:
      return {...state, appInitialiseProgress: action.progress};
    case CORE_APP_TOGGLE_THEME:
      return {...state, darkTheme: !state.darkTheme};
    case CORE_APP_SET_PROFILE_ID:
      return {...state, profileId: action.profileId};
    case CORE_AUTH_AUTHENTICATING:
      return {...state, authenticating: true};
    case CORE_AUTH_SET_TOKEN:
      return {...state, authenticating: false, accessToken: action.token};
    case CORE_AUTH_ERROR:
      return {...state, authenticating: false, accessToken: "", authenticationError: action.error};
    case CORE_AUTH_SIGN_OUT:
      return {...state, authenticating: false, accessToken: "", authenticationError: null};
    case CORE_SERVER_PENDING:
      return {...state, serverPending: action.description};
    case CORE_SERVER_ERROR:
      return {
        ...state,
        serverError: {
          ...action.error,
          failure: JSON.parse(action.error.failure),
        },
      };
    case CORE_SERVER_IDLE:
      return {...state, serverPending: "", serverError: null};
    default:
      return state;
  }
}
