import * as types from '../actions/ActionTypes';
import { combineReducers } from 'redux';

export function postId(state = null, action) {
  switch (action.type) {
    case types.SET_POST_ID:
      return action.payload;
    case types.RESET_STORE:
      return null;
    default:
      return state;
  }
}

export function listOrder(state = null, action) {
  switch (action.type) {
    case types.SET_POST_ORDER:
      return action.payload;
    case types.RESET_STORE:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  postId,
  listOrder
})

