import * as types from '../actions/ActionTypes';

export default function signUp(state = false, action) {
  switch (action.type) {
    case types.SHOW_SIGNUP:
      return action.payload;
    case types.HIDE_SIGNUP:
      return false;
    case types.RESET_STORE:
      return false;
    default:
      return state;
  }
}
