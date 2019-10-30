import { newNoteActionType } from '../reducers/newNote.reducer';

const newNoteActions = {
  updateNewNote: data => ({ type: newNoteActionType.UPDATE_DATA, data }),
  cleanNewNote: data => ({ type: newNoteActionType.CLEAN, data })
};
export default newNoteActions;
