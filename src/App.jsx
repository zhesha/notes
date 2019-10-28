import React, { Component } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import NewNoteForm from './components/NewNoteForm';
import Note from './components/Note';

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

  createNote = title => {
    this.setState({
      showForm: false,
      notes: [title, ...this.state.notes]
    });
  };

  render() {
    return (
      <div className="board">
        {this.state.showForm && (
          <NewNoteForm onCancel={this.closeForm} onCreate={this.createNote} />
        )}
        {this.state.notes.map((note, i) => (
          <Note title={note} key={i} />
        ))}
        <AddButton onAdd={this.addNote} />
      </div>
    );
  }
}

export default App;
