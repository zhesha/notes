import { noteListActionType } from '../reducers/noteList.reducer';
import axios from 'axios';

const noteListActions = {
  loadNotes: () => dispatch => {
    dispatch({ type: noteListActionType.NOTE_LOAD_REQUEST });
    axios
      .get('/')
      .then(res => {
        dispatch({
          type: noteListActionType.NOTE_LOAD_SUCCESS,
          data: res.data.notes
        });
      })
      .catch(error => {
        dispatch({ type: noteListActionType.NOTE_LOAD_FAILURE, error });
      });
  },
  addNote: data => dispatch => {
    dispatch({ type: noteListActionType.NOTE_ADD_REQUEST });
    axios
      .post('/', data.asJSON())
      .then(res => {
        dispatch({
          type: noteListActionType.NOTE_LOAD_SUCCESS,
          data: res.data.notes
        });
      })
      .catch(error => {
        dispatch({ type: noteListActionType.NOTE_LOAD_FAILURE, error });
      });
  }
};
export default noteListActions;
