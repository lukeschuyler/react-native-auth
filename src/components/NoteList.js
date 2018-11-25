import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import * as actions from '../actions/notes';

import Note from './Note';

class NoteList extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };
  
  componentDidMount() {
    this.props.getAllNotes();
  }

  renderNote(note) {
    console.log(note)
    return <Note note={note.content} />;
  }

  render() {
    const { notes } = this.props;
    // console.log(notes);
    return (
      <View>
        <FlatList 
          data={this.props.notes}
          renderItem={note => this.renderNote(note.item)}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

function mapStateToProps({ note }) {
  return { notes: note.notes }
}

export default connect(mapStateToProps, actions)(NoteList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
