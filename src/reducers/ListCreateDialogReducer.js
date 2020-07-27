import * as types from '../actions/ActionTypes';

export default function listCreateDialog(state = false, action) {
  switch (action.type) {
    case types.SHOW_LIST_DIALOG:
      return action.payload;
    case types.HIDE_LIST_DIALOG:
      return false;
    case types.RESET_STORE:
      return false;
    default:
      return state;
  }
}
