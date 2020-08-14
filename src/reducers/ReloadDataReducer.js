import * as types from '../actions/ActionTypes';

export default function reloadData(state = 0, action) {
  switch (action.type) {
    case types.RELOAD_DATA:
      let tempState = state + 1;
      return tempState;
    case types.RESET_STORE:
      return 0;
    default:
      return state;
  }
}
