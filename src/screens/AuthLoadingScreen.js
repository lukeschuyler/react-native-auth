import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import { StyleSheet, View, AsyncStorage, ActivityIndicator, StatusBar, Text } from 'react-native';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      return this.props.navigation.navigate('Auth');
    }

    this.props.checkToken(token, () => {
        this.props.navigation.navigate('Main');
      },
      () => {
        this.props.navigation.navigate('Auth');
      }
    );
  } 

  componentDidMount() {
    this.checkToken();
  }
  

  render () {
    const { message } = this.props;
    const content = message ? <Text>{message}</Text> 
                            : (<View><ActivityIndicator size='large'/><StatusBar /></View>)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {content}
      </View>
    )
  }
}

function mapStateToProps({ auth }) {
  return { message: auth.message }
}

export default connect(mapStateToProps, actions)(AuthLoadingScreen);
