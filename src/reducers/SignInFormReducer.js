import * as types from '../actions/ActionTypes';

export default function signIn(state = false, action) {
  switch (action.type) {
    case types.SHOW_SIGNIN:
      return action.payload;
    case types.HIDE_SIGNIN:
      return false;
    case types.RESET_STORE:
      return false;
    default:
      return state;
  }
}
