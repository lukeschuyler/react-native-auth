import { combineReducers } from 'redux';
import auth from './auth';
import nav from './nav';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  nav,
  form: formReducer
});
