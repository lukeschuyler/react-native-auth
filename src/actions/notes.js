import client from '../services/axios';
import { AsyncStorage } from 'react-native';

import {
  GET_ALL_NOTES,
  GET_USER_NOTES,
  DELETE_NOTE,
  ADD_NOTE,
  NOTES_LOADING,
  NOTES_ERROR,
} from './types';


export const getAllNotes = () => async dispatch => {
  // start loader
  dispatch({ type: NOTES_LOADING, payload: true });
  
  try {
    const response = await client.get('/notes');
    const notes = response.data && response.data.notes;

    if (notes) {
      dispatch({ type: GET_ALL_NOTES, payload: notes });
    } else {
      dispatch({ type: NOTES_ERROR, payload: 'Something went wrong.  Please try again later.' });
    }
  } 
  catch (err) {
    console.log("ERR", err);
    dispatch({ type: NOTES_ERROR, payload: 'Something went wrong.  Please try again later.' });
  }
}

export const deleteNote = id => async dispatch => {
  try {
    const response = await client.post(`/notes/delete/${id}`);
    console.log(response)
    dispatch({ type: DELETE_NOTE, payload: id });
  } catch (e) {
    console.log(e)
    dispatch({ type: NOTES_ERROR, payload: 'Could Not Delete Note.' })
  }
}

export const addNote = (formProps, cb) => async dispatch => {
  const { content } = formProps;
  try {
    const response = await client.post(`/notes/add/`, { content });
    const newNote = response.data && response.data.note;
    dispatch({ type: ADD_NOTE, payload: newNote });
    cb();
  } catch (e) {
    console.log(e)
    dispatch({ type: NOTES_ERROR, payload: 'Could Not Delete Note.' })
  }
}
