import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import * as actions from '../actions/notes';

import { MonoText } from './StyledText.js';
import { TextInput, StyleSheet, View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import Button from './common/Button';
import { FormInput } from './common/FormInput';

class NoteForm extends React.Component {
  static navigationOptions = {
    header: 'Add Note',
  };
    
  handleAddNote = formProps => {
    console.log(this.props)
    this.props.addNote(formProps, () => {
      this.props.navigatHome();
    });
  }

  render() {
    const { loading, message } = this.props;
    const loader = loading ? <ActivityIndicator color='black' style={styles.loading} size='large'/> : null;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <Field
            component={FormInput}
            name='content'
            multiline={true}
            numberOfLines={5}
            autoCorrect={false} 
            style={styles.inputs} 
            placeholder="Add a note!"  
          />
          <Text style={styles.message}>{message}</Text>
        </View>
        <Button styles={styles.loginButtonStyles} onPress={this.props.handleSubmit(this.handleAddNote)} >
          Create
        </Button>        
        {loader}
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps({ note }) {
  return { message: note.message, loading: note.loading }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'newNote' })
)(NoteForm);

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
    height: 150,
    width: 350,
    fontSize: 16,
    // margin: 10,
    backgroundColor:'rgb(211,211,211)',
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
    backgroundColor: 'rgba(255,255,255, .5)',
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
