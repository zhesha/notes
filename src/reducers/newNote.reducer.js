const newNoteActionType = {
  UPDATE_DATA: 'UPDATE_DATA',
  CLEAN: 'CLEAN'
};

const initialState = {
  gravatar: '',
  name: '',
  color: '',
  text: ''
};

const newNote = (state = initialState, action) => {
  switch (action.type) {
    case newNoteActionType.UPDATE_DATA: {
      return {
        ...state,
        ...action.data
      };
    }
    case newNoteActionType.CLEAN: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default newNote;
export { newNoteActionType };
