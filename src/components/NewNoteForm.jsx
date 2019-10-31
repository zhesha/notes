import React from 'react';
import './NewNoteForm.css';
import GravatarInput from './form/GravatarInput';
import ColorSelector from './form/ColorSelector';
import Note from '../models/Note';
import { connect } from 'react-redux';
import newNoteActions from '../actions/newNote.actions';
import formVisibleAction from '../actions/formVisible.actions';
import noteListAction from '../actions/noteList.actions';
import { PulseLoader } from 'react-spinners';
import colors from '../config/colors.config';
import messages from '../config/messages.config';
import { FaArrowsAlt, FaCheck, FaTimes } from 'react-icons/fa';

function NewNoteForm({
  newNote,
  hideForm,
  updateNewNote,
  addNote,
  cleanNewNote,
  waiting,
  startDrag
}) {
  if (waiting) {
    return (
      <div className="newNote" style={{ background: `#${colors.newNote}` }}>
        <div className="loader">
          <PulseLoader size={15} color={colors.noteContrast} />
        </div>
      </div>
    );
  }
  return (
    <div
      className="newNote"
      style={{
        background: `#${colors.newNote}`,
        left: newNote.x,
        top: newNote.y
      }}
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          const { gravatar, name, color, text, x, y } = newNote;
          const trimedText = text.trim();
          if (trimedText) {
            addNote(
              new Note(gravatar, name, color, trimedText, new Date(), x, y)
            );
            cleanNewNote();
          }
          hideForm();
        }}
      >
        <div className="formHead">
          <GravatarInput
            value={newNote.gravatar}
            onChange={value => updateNewNote({ gravatar: value })}
          />
          <input
            className="nameField"
            value={newNote.name}
            placeholder={messages.default.name}
            onChange={e => updateNewNote({ name: e.target.value })}
          />
          <ColorSelector
            value={newNote.color}
            onChange={value => updateNewNote({ color: value })}
          />
        </div>
        <textarea
          value={newNote.text}
          onChange={e => updateNewNote({ text: e.target.value })}
        />
        <div className="formFooter">
          <button type="submit" value={messages.okBtn}>
            <FaCheck size={26} color={colors.newContrast} />
          </button>
          <button type="button" onClick={hideForm}>
            <FaTimes size={26} color={colors.newContrast} />
          </button>
          <button type="button" onMouseDown={startDrag}>
            <FaArrowsAlt size={26} color={colors.newContrast} />
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  const { newNote, noteList } = state;
  return {
    newNote,
    waiting: noteList.adding
  };
};

export default connect(
  mapStateToProps,
  {
    hideForm: formVisibleAction.hideForm,
    updateNewNote: newNoteActions.updateNewNote,
    cleanNewNote: newNoteActions.cleanNewNote,
    addNote: noteListAction.addNote,
    startDrag: newNoteActions.startDrag
  }
)(NewNoteForm);
