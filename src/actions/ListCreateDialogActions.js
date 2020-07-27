import * as types from './ActionTypes';

export function showListDialog(value) {
  return {type: types.SHOW_LIST_DIALOG, payload: true};
}

export function hideListDialog() {
  return {type: types.HIDE_LIST_DIALOG, payload: false};
}
