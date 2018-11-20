import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import * as actions from '../actions/auth';

import { MonoText } from '../components/StyledText.js';
import { TextInput, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import TestComponent from '../components/TestComponent';
import { FormInput } from '../components/FormElements';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
    
  handleLogin = formProps => {
    this.props.handleLogin(formProps, () => {
      this.props.navigation.navigate('Main');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MonoText style={styles.header}>Login Screen</MonoText>
        <View>
          <Field
            component={FormInput}
            name='email'
            keyboardType="email-address" 
            autoCapitalize="none" 
            autoCorrect={false} 
            style={styles.inputs} 
            placeholder="email"  
          />
          <Field
            component={FormInput}
            name='password'
            autoCapitalize="none" 
            secureTextEntry={true} 
            style={styles.inputs} 
            placeholder="password" 
          />
          <Text style={styles.message}>{this.props.message}</Text>
        </View>
        <TouchableHighlight 
            style={styles.button} 
            onPress={this.props.handleSubmit(this.handleLogin)} 
        >
        <MonoText style={styles.buttonText}>Login</MonoText>
        </TouchableHighlight>
      </View>
    )
  }

}

function mapStateToProps({ auth }) {
  return { message: auth.message }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(LoginScreen);

const styles = {
  inputs: {
    height: 40,
    width: 300,
    fontSize: 20,
    margin: 10,
    backgroundColor:'#fff',
    padding: 10,
    borderRadius: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'goldenrod',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    fontSize: 30
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 15
  },  
  buttonText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  button: {
    height: 60,
    width: 250,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10
  }
}
