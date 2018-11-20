import React from 'react';
import { View, Text, Button } from 'react-native';
import { MonoText } from '../components/StyledText.js';

const TestComponent = ({ message, onButtonPressOkay, onButtonPressCancel }) => (
  <View style={styles.mainContainer}>
    <MonoText onPress={() => console.log('on Press for MonoText??')}>{message}</MonoText>
    <View style={styles.container}>
      <Button title="Cancel" onPress={onButtonPressCancel} />
      <Button title="Okay" onPress={onButtonPressOkay} />
    </View>
  </View>
)

export default TestComponent;

const styles = {
  container: {
    // flex: 1,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContainer: {
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}
