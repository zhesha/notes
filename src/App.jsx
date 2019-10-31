import React, { Component } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import NewNoteForm from './components/NewNoteForm';
import NoteItem from './components/NoteItem';
import { connect } from 'react-redux';
import noteListActions from './actions/noteList.actions';
import Note from './models/Note';
import { PulseLoader } from 'react-spinners';
import colors from './config/colors.config';
import messages from './config/messages.config';
import DragZone from './components/DragZone';

class App extends Component {
  componentDidMount() {
    let { loadNotes } = this.props;
    loadNotes();
  }

  render() {
    const { formVisible, noteList } = this.props;
    let content;
    if (noteList.loading) {
      content = (
        <div className="loader">
          <PulseLoader size={50} color={colors.newNote} />
        </div>
      );
    } else if (noteList.error) {
      content = <div className="error">{messages.loadError}</div>;
    } else {
      content = (
        <div className="board">
          <DragZone>{formVisible && <NewNoteForm />}</DragZone>
          {noteList.data.map((note, i) => (
            <NoteItem data={Note.fromJSON(note)} key={i} />
          ))}
        </div>
      );
    }

    return (
      <div>
        {content}
        <AddButton />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { formVisible, noteList } = state;
  return {
    formVisible,
    noteList
  };
};

export default connect(
  mapStateToProps,
  {
    loadNotes: noteListActions.loadNotes
  }
)(App);
