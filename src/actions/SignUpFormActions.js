import * as types from './ActionTypes';

export function showSignUp() {
  return {type: types.SHOW_SIGNUP, payload: true};
}

export function hideSignUp() {
  return {type: types.HIDE_SIGNUP, payload: false};
}
