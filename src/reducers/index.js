import { combineReducers } from 'redux'
import user from './UserReducer'
import signIn from './SignInFormReducer'
import signUp from './SignUpFormReducer'
import reloadData from './ReloadDataReducer'
import selectedPost from './SelectedPostReducer'
import listCreateDialog from "./ListCreateDialogReducer"
import poolCreateDialog from "./PoolCreateDialogReducer"
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'

export default (history) => combineReducers({
  user,
  signIn,
  signUp,
  reloadData,
  selectedPost,
  listCreateDialog,
  poolCreateDialog,
  form: formReducer,
  router: connectRouter(history),
});

