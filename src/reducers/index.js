import { combineReducers } from 'redux'
import user from './UserReducer'
import signIn from './SignInFormReducer'
import signUp from './SignUpFormReducer'
import selectedPost from './SelectedPostReducer'
import listCreateDialog from "./ListCreateDialogReducer"
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'

export default (history) => combineReducers({
  user,
  signIn,
  signUp,
  selectedPost,
  listCreateDialog,
  form: formReducer,
  router: connectRouter(history),
});

