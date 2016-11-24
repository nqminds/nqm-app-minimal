import * as actionTypes from "../actions/action-types";

export function navigation(state = {active: ""}, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE:
      return {...state, active: action.active || ""};
    default:
      return state;
  }
}
