import { newNoteActionType } from '../reducers/newNote.reducer';
import noteListAction from './noteList.actions';
import Note from '../models/Note';
import formVisibleAction from './formVisible.actions';

const newNoteActions = {
  updateNewNote: data => ({ type: newNoteActionType.UPDATE_DATA, data }),
  cleanNewNote: data => ({ type: newNoteActionType.CLEAN, data }),
  startDrag: () => ({
    type: newNoteActionType.UPDATE_DATA,
    data: { isDragging: true }
  }),
  stopDrag: () => ({
    type: newNoteActionType.UPDATE_DATA,
    data: { isDragging: false }
  }),
  drag: position => ({ type: newNoteActionType.DRAG, position }),
  submit: note => dispatch => {
    const trimedText = note.text.trim();
    if (trimedText) {
      dispatch(noteListAction.addNote(Note.fromState(note)));
      dispatch(newNoteActions.cleanNewNote());
    }
    dispatch(formVisibleAction.hideForm());
  }
};
export default newNoteActions;
