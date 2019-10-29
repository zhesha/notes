import React from 'react';
import './App.css';
import AddButton from './components/AddButton';
import NewNoteForm from './components/NewNoteForm';
import NoteItem from './components/NoteItem';
import Note from './models/Note';
import {connect} from "react-redux";
import formVisibleAction from "./actions/formVisible.actions";
import noteListAction from "./actions/noteList.action";

function App(props) {
  const {formVisible, noteList, showForm, hideForm, addNote} = props;
  return (
    <div className="board">
      {formVisible && (
        <NewNoteForm onCancel={hideForm} onCreate={(avatar, name, color, text) => {
          hideForm();
          addNote(new Note(avatar, name, color, text, new Date()));
        }}/>
      )}
      {noteList.map((note, i) => (
        <NoteItem data={note} key={i}/>
      ))}
      <AddButton onAdd={showForm}/>
    </div>
  );
}

const mapStateToProps = state => {
  const { formVisible, noteList } = state;
  return { formVisible, noteList };
};

export default connect(mapStateToProps, {
  showForm: formVisibleAction.showForm,
  hideForm: formVisibleAction.hideForm,
  addNote: noteListAction.addNote,
})(App);
