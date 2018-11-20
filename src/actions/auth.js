import axios from '../services/axios';
import { AsyncStorage } from 'react-native';

import {
  AUTH_USER,
  AUTH_LOGOUT,
  AUTH_LOGOUT_ERROR,
  AUTH_ERROR,
  AUTH_CHECK_TOKEN,
} from './types';

export const handleLogin = (formProps, cb) => async dispatch => {
  const { email, password } = formProps;

  // simple validation
  if (!(email && password)) {
    return dispatch({ type: AUTH_ERROR, payload: 'Email and password required.' });
  }
  
  try {
    const response = await axios.post('/mobilelogin', { email, password });
    console.log(response.data);
    if (response.data.token) {
      dispatch({ type: AUTH_USER, payload: response.data.token });
      await AsyncStorage.setItem('token', response.data.token);
      cb();
    } else if (response.data.msg) {
      dispatch({ type: AUTH_ERROR, payload: response.data.msg });
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Something went wrong.  Please try again later.' });
    }
  } 
  catch (err) {
    console.log("ERR", err)
    dispatch({ type: AUTH_ERROR, payload: 'Something went wrong.  Please try again later.' });
  }
}

export const handleLogout = (token, cb) => async dispatch => {
  try {
    const response = await axios.post('/mobilelogout', { token });
    console.log(response.data)
    if (response.data && response.data.success) {
      dispatch({ type: AUTH_LOGOUT, payload: response.data.success });
      await AsyncStorage.removeItem('token');
      cb();
    } else if (response.data.msg) {
      return dispatch({ type: AUTH_LOGOUT_ERROR, payload: 'Something went wrong, please try again later.' });
    }
  } catch(e) {
    console.log(e)
    dispatch({ type: AUTH_LOGOUT_ERROR, payload: 'Something went wrong, please try again later.' });
  }
}

export const checkToken = (token, cb) => async dispatch => {
  try {
    const response = await axios.post('/check-token', { token });
    console.log(response.data)
    if (response.data && response.data.success) {
      dispatch({ type: AUTH_LOGOUT, payload: response.data.success });
      cb();
    } else if (response.data.msg) {
      return dispatch({ type: AUTH_LOGOUT_ERROR, payload: 'Something went wrong, please try again later.' });
    }
  } catch(e) {
    console.log(e)
    dispatch({ type: AUTH_LOGOUT_ERROR, payload: 'Something went wrong, please try again later.' });
  }
}
