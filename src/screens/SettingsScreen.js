import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/common/Button';
import { connect } from 'react-redux';

import * as actions from '../actions/auth';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  logout = async () => {
    this.props.handleLogout(() => {
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button styles={buttonStyles} onPress={this.logout}>
          Logout
        </Button>
      </View>
    );
  }
}

// Don't need anything yet, just redirecting on logout
function mapStateToProps({ auth }) {
  return { message: auth.message }
}

export default connect(mapStateToProps, actions)(SettingsScreen);


const styles = {
  container: {
    'flex': 1,
    'justifyContent': 'flex-end',
    'alignItems': 'center',
    backgroundColor: '#fff',
  },
}

const buttonStyles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: 10
  },
  buttonStyle: {
    backgroundColor: 'red',
    borderRadius: 10,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5
  }
}
