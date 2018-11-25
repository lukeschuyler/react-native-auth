import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import * as actions from '../../actions/auth';

import { MonoText } from '../../components/StyledText.js';
import { TextInput, StyleSheet, View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
    
  handleSignup = formProps => {
    this.props.handleSignup(formProps, () => {
      this.props.navigation.navigate('Main');
    });
  }

  render() {
    const { loading, message } = this.props;
    const loader = loading ? <ActivityIndicator color='red' style={styles.loading} size='large'/> : null;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <MonoText style={styles.header}></MonoText>
        <MonoText style={styles.header}>Sign up</MonoText>
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
          <Field
            component={FormInput}
            name='confirmPassword'
            autoCapitalize="none" 
            secureTextEntry={true} 
            style={styles.inputs} 
            placeholder="confirm password" 
          />
          <Field
            component={FormInput}
            name='firstName'
            style={styles.inputs} 
            placeholder="First Name" 
          />          
          <Field
            component={FormInput}
            name='lastName'
            autoCorrect={false} 
            style={styles.inputs} 
            placeholder="Last Name"  
          />
          <Text style={styles.message}>{message}</Text>
        </View>
        <Button styles={styles.loginButtonStyles} onPress={this.props.handleSubmit(this.handleSignup)} >
          Sign up
        </Button>        
        <Button styles={{ color: 'white' }} onPress={() => this.props.navigation.navigate('Login')} >
          Back to Login
        </Button>
        {loader}
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps({ auth }) {
  return { message: auth.message, loading: auth.loading }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(SignupScreen);


const buttonStyles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: 10
  },
  buttonStyle: {
    borderRadius: 5,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5
  }
}

const styles = {
  inputs: {
    height: 38,
    width: 350,
    fontSize: 16,
    margin: 10,
    backgroundColor:'#fff',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    borderColor: 'rgb(211,211,211)',
    borderWidth: 1,
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1
  },
  header: {
    fontSize: 20
  },
  message: {
    textAlign: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, .3)',
  },
  loginButtonStyles: {
    textStyle: {
      ...buttonStyles.textStyle,
    },    
    buttonStyle: {
      ...buttonStyles.buttonStyle,
      backgroundColor: 'blue',
    },
  },
  signupButtonStyles: {
    textStyle: {
      ...buttonStyles.textStyle,
    },    
    buttonStyle: {
      ...buttonStyles.buttonStyle,
      backgroundColor: 'red',
    },
  }
}
