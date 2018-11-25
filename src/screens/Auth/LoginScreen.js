import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import * as actions from '../../actions/auth';

import { MonoText } from '../../components/StyledText.js';
import { TextInput, StyleSheet, View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
    
  handleLogin = formProps => {
    this.props.handleLogin(formProps, () => {
      this.props.navigation.navigate('Main');
    });
  }

  render() {
    const { loading } = this.props;
    const loader = loading ? <ActivityIndicator color='red' style={styles.loading} size='large'/> : null;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
            returnKeyType='search'
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
        <Button styles={styles.loginButtonStyles} onPress={this.props.handleSubmit(this.handleLogin)} >
          Login
        </Button>        
        <Button styles={ { textStyle: { color: 'rgb(100,100,100)' } } } onPress={() => this.props.navigation.navigate('Signup')} >
          Sign up!
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
  reduxForm({ form: 'signin' })
)(LoginScreen);


const buttonStyles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    padding: 10
  },
  buttonStyle: {
    height: 60,
    width: 250,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10
  }
}

const styles = {
  inputs: {
    height: 45,
    width: 350,
    fontSize: 16,
    margin: 10,
    backgroundColor:'rgba(211,211,211, .3)',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    borderColor: 'rgb(211,211,211)',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'goldenrod',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },  
  inputContainer: {
    flex: 1,
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
      // backgroundColor: 'blue',
      // alignItems: 'flex-start',
      // justifyContent: 'flex-start'
    },
  },
  signupButtonStyles: {
    textStyle: {
      ...buttonStyles.textStyle,
    },    
    buttonStyle: {
      ...buttonStyles.buttonStyle,
      backgroundColor: 'rgb(100,100,100)',
      flex: 3
    },
  }
}
