import React, { Component } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import NewNoteForm from './components/NewNoteForm';
import NoteItem from './components/NoteItem';
import { connect } from 'react-redux';
import noteListActions from './actions/noteList.actions';
import Note from './models/Note';
import { PulseLoader } from 'react-spinners';

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
          <PulseLoader size={50} color={'lightgreen'} />
        </div>
      );
    } else if (noteList.error) {
      content = <div className="error">Error occurred, try again later</div>;
    } else {
      content = (
        <div className="board">
          {formVisible && <NewNoteForm />}
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
