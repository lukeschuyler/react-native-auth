import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
});

/*
 * This module is where we DEFINE our different application states
 * This module then goes through the appReducer as "nav"
 * It is then imported into App.js to be hooked up to redux
 */

export default createSwitchNavigator({
  Auth: AuthStack,
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'AuthLoading'
});
