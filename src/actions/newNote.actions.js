import { newNoteActionType } from '../reducers/newNote.reducer';

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
  drag: position => ({ type: newNoteActionType.DRAG, position })
};
export default newNoteActions;
