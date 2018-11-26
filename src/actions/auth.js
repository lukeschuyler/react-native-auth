import client from '../services/axios';
import { AsyncStorage } from 'react-native';

import {
  AUTH_USER,
  AUTH_LOGOUT,
  AUTH_LOGOUT_ERROR,
  AUTH_ERROR,
  AUTH_CHECK_TOKEN,
  AUTH_TOKEN_ERROR,
  AUTH_LOADING,
} from './types';



export const handleLogin = (formProps, cb) => async dispatch => {
  const { email, password } = formProps;

  // simple validation
  if (!(email && password)) {
    return dispatch({ type: AUTH_ERROR, payload: 'Email and password required.' });
  }
  
  // start loader
  dispatch({ type: AUTH_LOADING, payload: true });
  
  try {
    const response = await client.post('/mobile/signin', { email, password });
    console.log(response)
    const token = response.data && response.data.token;
    const userId = response.data && response.data.id;
    const message = response.data && response.data.msg;
    if (token) {
      dispatch({ type: AUTH_USER, payload: { token, userId } });
      await AsyncStorage.setItem('token', token);
      cb();
    } else if (message) {
      dispatch({ type: AUTH_ERROR, payload: message });
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Something went wrong.  Please try again later.' });
    }
  } 
  catch (err) {
    console.log("ERR", err);
    dispatch({ type: AUTH_ERROR, payload: 'Something went wrong.  Please try again later.' });
  }
}





export const handleSignup = (formProps, cb) => async dispatch => {
  const { email, password, confirmPassword, firstName, lastName } = formProps;

  // simple validation
  if (!(email && password && firstName && lastName)) {
    return dispatch({ type: AUTH_ERROR, payload: 'All fields required.' });
  }
    
  if (password !== confirmPassword) {
    return dispatch({ type: AUTH_ERROR, payload: 'Passwords do not match.' });
  }
  
  // start loader
  dispatch({ type: AUTH_LOADING, payload: true });
  
  try {
    const response = await client.post('/mobile/signup', formProps);
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
    console.log("sflkjblishb", err)
    dispatch({ type: AUTH_ERROR, payload: 'Something went wrong.  Please try again later.' });
  }
}

export const handleLogout = (cb) => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await client.post('/mobile/logout', { token });
    console.log(response.data)
    if (response.data && response.data.success) {
      dispatch({ type: AUTH_LOGOUT, payload: response.data.success });
      await AsyncStorage.removeItem('token');
      cb();
    } else if (response.data.msg) {
      return dispatch({ type: AUTH_LOGOUT_ERROR, payload: 'Something went wrong, please try again later.' });
    } else {
      return dispatch({ type: AUTH_LOGOUT_ERROR, payload: 'Something went wrong, please try again later.' });
    }
  } catch(e) {
    console.log(e)
    dispatch({ type: AUTH_LOGOUT_ERROR, payload: 'Something went wrong, please try again later.' });
  }
}

export const checkToken = (token, navigateMain, navigateAuth) => async dispatch => {
  try {
    const response = await client.post('/check-token', { token });
    if (response.data && response.data.success) {
      dispatch({ type: AUTH_CHECK_TOKEN, payload: response.data.success });
      navigateMain();
    } else if (response.data.msg) {
      return dispatch({ type: AUTH_TOKEN_ERROR, payload: 'Something went wrong, please try again later.' });
    }
  } catch(e) {
    dispatch({ type: AUTH_TOKEN_ERROR, payload: 'Something went wrong, please try again later.' });
    navigateAuth();
  }
}
