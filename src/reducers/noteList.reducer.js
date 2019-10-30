const noteListActionType = {
  NOTE_LOAD_REQUEST: 'NOTE_LOAD_REQUEST',
  NOTE_LOAD_FAILURE: 'NOTE_LOAD_FAILURE',
  NOTE_LOAD_SUCCESS: 'NOTE_LOAD_SUCCESS',
  NOTE_ADD_REQUEST: 'NOTE_ADD_REQUEST'
};

const initialState = {
  adding: false,
  loading: false,
  data: []
};

const noteList = (state = initialState, action) => {
  switch (action.type) {
    case noteListActionType.NOTE_ADD_REQUEST: {
      return {
        ...state,
        adding: true
      };
    }
    case noteListActionType.NOTE_LOAD_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case noteListActionType.NOTE_LOAD_FAILURE: {
      return {
        loading: false,
        adding: false,
        error: action.error,
        data: []
      };
    }
    case noteListActionType.NOTE_LOAD_SUCCESS: {
      return {
        loading: false,
        adding: false,
        error: null,
        data: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default noteList;
export { noteListActionType };
