import { 
  GET_ALL_NOTES,
  GET_USER_NOTES,
  DELETE_NOTE,
  NOTES_ERROR,
  NOTES_LOADING } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case NOTES_LOADING:
      return { ...state, loading: true }
      break;      
    case NOTES_ERROR:
      return { ...state, loading: false }
      break;    
    case GET_ALL_NOTES:
      return { ...state, notes: action.payload, loading: false }
      break;
    case GET_USER_NOTES:
      return { ...state, notes: action.payload, loading: false }
      break;       
    case DELETE_NOTE:
      return { ...state, notes: state.notes.filter(n => n._id !== action.payload) } 
      break;    
    default: 
      return { ...state };
  }
}
