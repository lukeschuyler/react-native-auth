// REACT
import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';

// REDUX
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// REDUX-NAVIGATION
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// EXPO
import { AppLoading, Asset, Font, Icon, registerRootComponent } from 'expo';

// COMPUDHARMA
import appReducers from './reducers';
import AppNavigator from './navigation/AppNavigator';

// REDUX NAVIGATION
// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const ROOT = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(ROOT);


// REDUX STORE
const INITIAL_APP_STATE = {};
const store = createStore(
  appReducers,
  INITIAL_APP_STATE,
  applyMiddleware(reduxThunk, middleware)
);

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <AppWithNavigationState />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
      
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// Moved into App.js due to editing file tree to include src
Expo.registerRootComponent(App);
