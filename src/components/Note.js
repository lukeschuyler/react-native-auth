import React from 'react';
import { View, Text, Button } from 'react-native';
import { MonoText } from '../components/StyledText.js';

const Note = (props) => {
  // console.log(props)
  return (
    <View style={styles.container}>
      <MonoText>{props.note}</MonoText>
    </View>
  )
} 
export default Note;

const styles = {
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}
