import { AUTH_USER, AUTH_ERROR, AUTH_LOGOUT, AUTH_LOGOUT_ERROR, AUTH_CHECK_TOKEN } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, token: action.payload, message: '' }
      break;
    case AUTH_ERROR:
      return { ...state, message: action.payload }
      break;    
    case AUTH_LOGOUT:
      return { ...state }
      break;    
    case AUTH_LOGOUT_ERROR:
      return { ...state, message: action.payload }
      break;    
    case AUTH_CHECK_TOKEN:
      return { ...state, message: action.payload }
      break;
    default: 
      return { ...state };
  }
}
