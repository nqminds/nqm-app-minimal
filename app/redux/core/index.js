import {createActions, createReducer} from "reduxsauce";

export const INITIAL_CORE_STATE = {
  accessToken: null,
  fetchingInitialState: true,
  userDataFolderId: null,
  appInitialised: false,
  userInitialised: false,
  authenticated: false,
  authenticationError: null,
  darkTheme: false,
  serverPending: "",
  serverError: null,
};

const {Types, Creators} = createActions({
  fetchInitialState: null,
  fetchInitialStateSuccess: ["accessToken", "userDataFolderId", "settings"],
  appInitialised: ["initialised"],
  appUserInitialised: ["initialised"],
  resetApp: null,
  toggleTheme: null,
  authenticated: ["authenticated"],
  authenticationError: ["error"],
  serverPending: ["description"],
  serverError: ["error"],
  serverIdle: null,
}, {prefix: "CORE_"});

const fetchInitialStateSuccess = (state = INITIAL_CORE_STATE, action) => ({
  ...state,
  fetchingInitialState: false,
  accessToken: action.accessToken,
  userDataFolderId: action.userDataFolderId,
  settings: action.settings,
});

const resetApp = (state = INITIAL_CORE_STATE) => (
  {...state, appInitialised: false, userInitialised: false}
);

const appInitialised = (state = INITIAL_CORE_STATE, action) => (
  {...state, appInitialised: action.initialised}
);

const appUserInitialised = (state = INITIAL_CORE_STATE, action) => (
  {...state, userInitialised: action.initialised}
);

const toggleTheme = (state = INITIAL_CORE_STATE) => (
  {...state, darkTheme: !state.darkTheme}
);

const authError = (state = INITIAL_CORE_STATE, action) => (
  {...state, accessToken: "", authenticationError: action.error}
);

const authenticated = (state = INITIAL_CORE_STATE, action) => (
  {...state, authenticated: action.authenticated, authenticationError: null}
);

const serverPending = (state = INITIAL_CORE_STATE, action) => (
  {...state, serverPending: action.description}
);

const serverError = (state = INITIAL_CORE_STATE, action) => (
  {...state, serverError: {...action.error, failure: JSON.parse(action.error.failure)}}
);

const serverIdle = (state = INITIAL_CORE_STATE) => (
  {...state, serverPending: "", serverError: null}
);

const HANDLERS = {
  [Types.FETCH_INITIAL_STATE_SUCCESS]: fetchInitialStateSuccess,
  [Types.RESET_APP]: resetApp,
  [Types.APP_INITIALISED]: appInitialised,
  [Types.APP_USER_INITIALISED]: appUserInitialised,
  [Types.TOGGLE_THEME]: toggleTheme,
  [Types.AUTHENTICATED]: authenticated,
  [Types.AUTHENTICATION_ERROR]: authError,
  [Types.SERVER_PENDING]: serverPending,
  [Types.SERVER_ERROR]: serverError,
  [Types.SERVER_IDLE]: serverIdle,
};

export const reducer = createReducer(INITIAL_CORE_STATE, HANDLERS);
export const CoreTypes = Types;
export default Creators;
