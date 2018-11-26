import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
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
    return <Note note={note.content} 
                 email={note.email} 
                 time={note.timestamp} 
                 isUserNote={this.props.userId === note._user_id} 
                 handleDelete={() => this.props.deleteNote(note._id)} 
            />;
  }

  render() {
    const { notes, loading } = this.props;
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.notes}
          renderItem={note => this.renderNote(note.item)}
          keyExtractor={item => item._id}
          onRefresh={this.props.getAllNotes}
          refreshing={loading ? true : false}
        />
      </View>
    );
  }
}

function mapStateToProps({ note, auth }) {
  return { notes: note.notes, loading: note.loading, userId: auth.userId }
}

export default connect(mapStateToProps, actions)(NoteList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  }
});
