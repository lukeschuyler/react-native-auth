import client from '../services/axios';
import { AsyncStorage } from 'react-native';

import {
  GET_ALL_NOTES,
  GET_USER_NOTES,
  NOTES_LOADING,
  NOTES_ERROR,
} from './types';


export const getAllNotes = () => async dispatch => {
  // start loader
  dispatch({ type: NOTES_LOADING, payload: true });
  
  try {
    const response = await client.get('/notes');
    const notes = response.data && response.data.notes;
    // console.log(notes)
    if (notes) {
      dispatch({ type: GET_ALL_NOTES, payload: notes });
    } else {
      dispatch({ type: NOTES_ERROR, payload: 'Something went wrong.  Please try again later.' });
    }
  } 
  catch (err) {
    console.log("ERR", err);
    dispatch({ type: AUTH_ERROR, payload: 'Something went wrong.  Please try again later.' });
  }
}
