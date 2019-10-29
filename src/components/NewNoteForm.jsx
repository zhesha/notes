import React from 'react';
import './NewNoteForm.css';
import GravatarInput from './form/GravatarInput';
import ColorSelector from './form/ColorSelector';
import Note from "../models/Note";
import {connect} from "react-redux";
import newNoteActions from "../actions/newNote.actions";
import formVisibleAction from "../actions/formVisible.actions";
import noteListAction from "../actions/noteList.actions";

function NewNoteForm({newNote, hideForm, updateNewNote, addNote, cleanNewNote}) {
  return (
    <div className="newNote">
      <form onSubmit={e => {
        e.preventDefault();
        const {gravatar, name, color, text} = newNote;
        const trimedText = text.trim();
        if (trimedText) {
          addNote(new Note(gravatar, name, color, trimedText, new Date()));
          cleanNewNote();
        }
        hideForm();
      }}>
        <div className="formHead">
          <GravatarInput
            value={newNote.gravatar}
            onChange={value => updateNewNote({gravatar: value})}
          />
          <input
            className="nameField"
            value={newNote.name}
            placeholder={'Anonymous'}
            onChange={e => updateNewNote({name: e.target.value})}
          />
          <ColorSelector
            value={newNote.color}
            onChange={value => updateNewNote({color: value})}
          />
        </div>
        <textarea
          value={newNote.text}
          onChange={e => updateNewNote({text: e.target.value})}
        />
        <div className="formFooter">
          <input type="button" value="CANCEL" onClick={hideForm}/>
          <input type="submit" value="OK"/>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  const { newNote } = state;
  return { newNote };
};

export default connect(mapStateToProps, {
  hideForm: formVisibleAction.hideForm,
  updateNewNote: newNoteActions.updateNewNote,
  cleanNewNote: newNoteActions.cleanNewNote,
  addNote: noteListAction.addNote,
})(NewNoteForm);
