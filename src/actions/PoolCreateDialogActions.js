import * as types from './ActionTypes';

export function showPoolDialog(value) {
  return {type: types.SHOW_POOL_DIALOG, payload: true};
}

export function hidePoolDialog() {
  return {type: types.HIDE_POOL_DIALOG, payload: false};
}
