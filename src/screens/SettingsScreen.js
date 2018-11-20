import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/auth';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  logout = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.handleLogout(token, () => {
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return <View style={styles.container}>
            <Button onPress={this.logout} title='Logout' />
            <Text>{this.props.message}</Text>
           </View>
  }
}

// Don't need anything yet, just redirecting on logout
function mapStateToProps({ message }) {
  return { message }
}

export default connect(mapStateToProps, actions)(SettingsScreen);


const styles = {
  container: {
    'flex': 1,
    'justifyContent': 'flex-end',
    'alignItems': 'center'
  }
}
