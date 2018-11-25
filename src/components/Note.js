import React from 'react';
import { View, Text, Button } from 'react-native';
import { MonoText } from '../components/StyledText.js';

const Note = ({ note }) => (
  <View style={styles.container}>
    <MonoText>{note}</MonoText>
  </View>
)

export default Note;

const styles = {
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}
