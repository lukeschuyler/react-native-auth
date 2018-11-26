import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { MonoText } from '../components/StyledText.js';
import Button from '../components/common/Button';

const Note = ({ email, note, time, isUserNote, handleDelete }) => {
  const deleteButton =  isUserNote ? 
                        <Button styles={styles.buttonStyles} onPress={handleDelete}>Delete</Button>
                        : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MonoText>{email ? email : '(No Email)'}</MonoText>
        <MonoText>{time}</MonoText>
      </View>      
      <View style={styles.content}>
        <MonoText>{note}</MonoText>
      </View>
      
      {deleteButton}
    </View>
  )
} 

export default Note;

const styles = {
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignSelf: 'stretch',
    padding: 10,
    borderColor: 'rgb(211,211,211)',
    borderWidth: 1,
    flex: 1,
  },
  content: {
    padding: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonStyles: {
    buttonStyle: {
      alignSelf: 'flex-end',
    },
    textStyle: {
      color: 'red'
    }
  },
}
