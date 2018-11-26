import React from 'react';
import { View, StyleSheet } from 'react-native';

import NoteForm from '../components/NoteForm';

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Note',
  };

  render() {
    return (
      <View style={styles.container}>
        <NoteForm navigatHome={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
