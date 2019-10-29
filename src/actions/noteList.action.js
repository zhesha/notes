import {noteListActionType} from "../reducers/noteList.reducer";

const noteListActions = {
  addNote: data => ({type: noteListActionType.ADD, data}),
};
export default noteListActions;