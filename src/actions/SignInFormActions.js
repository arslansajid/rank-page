import * as types from './ActionTypes';

export function showSignIn(value) {
  return {type: types.SHOW_SIGNIN, payload: true};
}

export function hideSignIn() {
  return {type: types.HIDE_SIGNIN, payload: false};
}
