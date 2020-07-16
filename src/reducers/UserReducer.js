import * as types from '../actions/ActionTypes';
// import { combineReducers } from 'redux'

export default function user(state = null, action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return action.payload;
    case types.USER_LOGOUT:
      return null;
    case types.RESET_STORE:
      return null;
    default:
      return state;
  }
}

// export default combineReducers({
//   user
// })

