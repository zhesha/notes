import React from 'react';
import './NewNoteForm.css';
import GravatarInput from './form/GravatarInput';
import ColorSelector from './form/ColorSelector';
import Note from '../models/Note';
import { connect } from 'react-redux';
import newNoteActions from '../actions/newNote.actions';
import formVisibleAction from '../actions/formVisible.actions';
import { PulseLoader } from 'react-spinners';
import colors from '../config/colors.config';
import messages from '../config/messages.config';
import {
  FaArrowsAlt,
  FaCheck,
  FaTimes,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import NoteItem from './NoteItem';

function Waiting() {
  return (
    <div className="newNote" style={{ background: `#${colors.newNote}` }}>
      <div className="loader">
        <PulseLoader size={15} color={colors.noteContrast} />
      </div>
    </div>
  );
}

function Preview({ newNote, submit, updateNewNote }) {
  return (
    <div
      className={'preview'}
      style={{
        left: newNote.x,
        top: newNote.y
      }}
    >
      <NoteItem data={Note.fromState(newNote)} preview={true} />
      <div className="previewFooter">
        <button type="submit" onClick={() => submit(newNote)}>
          <FaCheck size={26} color={colors.newContrast} />
        </button>
        <button
          type="button"
          data-testid="closeButton"
          onClick={() => updateNewNote({ isPreview: false })}
        >
          <FaEyeSlash size={26} color={colors.newContrast} />
        </button>
      </div>
    </div>
  );
}

function NewNoteForm({
  newNote,
  hideForm,
  updateNewNote,
  waiting,
  startDrag,
  submit
}) {
  if (waiting) {
    return <Waiting />;
  }

  if (newNote.isPreview) {
    return (
      <Preview
        newNote={newNote}
        submit={submit}
        updateNewNote={updateNewNote}
      />
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
          submit(newNote);
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
          autoFocus
          value={newNote.text}
          onChange={e => updateNewNote({ text: e.target.value })}
        />
        <div className="formFooter">
          <button type="submit">
            <FaCheck size={26} color={colors.newContrast} />
          </button>
          <button type="button" onClick={hideForm}>
            <FaTimes size={26} color={colors.newContrast} />
          </button>
          <button
            data-testid="previewButton"
            type="button"
            onClick={() => updateNewNote({ isPreview: true })}
          >
            <FaEye size={26} color={colors.newContrast} />
          </button>
          <button
            data-testid="dragButton"
            type="button"
            onMouseDown={startDrag}
          >
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
    startDrag: newNoteActions.startDrag,
    submit: newNoteActions.submit
  }
)(NewNoteForm);
