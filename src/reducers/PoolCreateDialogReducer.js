import * as types from '../actions/ActionTypes';

export default function poolCreateDialog(state = false, action) {
  switch (action.type) {
    case types.SHOW_POOL_DIALOG:
      return action.payload;
    case types.HIDE_POOL_DIALOG:
      return false;
    case types.RESET_STORE:
      return false;
    default:
      return state;
  }
}
