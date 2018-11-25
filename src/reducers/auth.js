import { 
  AUTH_LOADING, 
  AUTH_USER, 
  AUTH_ERROR, 
  AUTH_LOGOUT, 
  AUTH_LOGOUT_ERROR, 
  AUTH_CHECK_TOKEN, 
  AUTH_TOKEN_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_LOADING:
      return { ...state, loading: true }
      break;    
    case AUTH_USER:
      return { ...state, token: action.payload, message: '', loading: false }
      break;
    case AUTH_ERROR:
      return { ...state, message: action.payload, loading: false }
      break;    
    case AUTH_LOGOUT:
      return { ...state, message: '' }
      break;    
    case AUTH_LOGOUT_ERROR:
      return { ...state, message: action.payload }
      break;    
    case AUTH_CHECK_TOKEN:
      return { ...state, token: action.payload, message: '' }
      break;    
    case AUTH_TOKEN_ERROR:
      return { ...state, message: '' }
      break;
    default: 
      return { ...state };
  }
}
