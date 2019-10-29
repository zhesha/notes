import React, { Component } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import NewNoteForm from './components/NewNoteForm';
import NoteItem from './components/NoteItem';
import Note from './models/Note';

class App extends Component {
  state = {
    showForm: true,
    notes: []
  };

  addNote = () => {
    this.setState({ showForm: true });
  };

  closeForm = () => {
    this.setState({ showForm: false });
  };

  createNote = (avatar, name, color, text) => {
    this.setState({
      showForm: false,
      notes: [
        new Note(avatar, name, color, text, new Date()),
        ...this.state.notes
      ]
    });
  };

  render() {
    return (
      <div className="board">
        {this.state.showForm && (
          <NewNoteForm onCancel={this.closeForm} onCreate={this.createNote} />
        )}
        {this.state.notes.map((note, i) => (
          <NoteItem data={note} key={i} />
        ))}
        <AddButton onAdd={this.addNote} />
      </div>
    );
  }
}

export default App;
