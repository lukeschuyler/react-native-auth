import { combineReducers } from 'redux';
import auth from './auth';
import nav from './nav';
import note from './note';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  nav,
  note,
  form: formReducer
});
