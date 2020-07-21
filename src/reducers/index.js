import { combineReducers } from 'redux'
import user from './UserReducer'
import signIn from './SignInFormReducer'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'

export default (history) => combineReducers({
  user,
  signIn,
  form: formReducer,
  router: connectRouter(history),
});

