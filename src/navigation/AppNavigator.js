import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: LoginScreen,
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'AuthLoading'
});
