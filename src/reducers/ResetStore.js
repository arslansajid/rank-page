import * as types from '../actions/ActionTypes';

export function resetStore() {
  return {type: types.RESET_STORE};
}
