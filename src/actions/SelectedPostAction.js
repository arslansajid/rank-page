import * as types from './ActionTypes';

export function setPostId(value) {
  return {type: types.SET_POST_ID, payload: value};
}

export function setPostOrder(value) {
  return {type: types.SET_POST_ORDER, payload: value};
}
