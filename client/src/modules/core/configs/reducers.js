import {
  TDX_SERVER_PENDING,
  TDX_SERVER_ERROR,
  TDX_SERVER_IDLE,
} from "../actions/action-types";

const defaultTDXState = {
  serverPending: "",
  serverError: null,
};

export function tdx(state = defaultTDXState, action) {
  switch (action.type) {
    case TDX_SERVER_PENDING:
      return {...state, serverPending: action.description};
    case TDX_SERVER_ERROR:
      return {...state, serverError: action.error};
    case TDX_SERVER_IDLE:
      return {...state, serverPending: "", serverError: null};
    default:
      return state;
  }
}
