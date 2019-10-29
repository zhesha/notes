import React from 'react';
import './App.css';
import AddButton from './components/AddButton';
import NewNoteForm from './components/NewNoteForm';
import NoteItem from './components/NoteItem';
import {connect} from "react-redux";

function App({formVisible, noteList}) {
  return (
    <div className="board">
      {formVisible && (
        <NewNoteForm />
      )}
      {noteList.map((note, i) => (
        <NoteItem data={note} key={i}/>
      ))}
      <AddButton />
    </div>
  );
}

const mapStateToProps = state => {
  const { formVisible, noteList } = state;
  return { formVisible, noteList };
};

export default connect(mapStateToProps)(App);
