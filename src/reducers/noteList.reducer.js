const noteListActionType = {
  ADD: 'ADD',
};

const initialState = [];

const noteList = (state = initialState, action) => {
  switch (action.type) {
    case noteListActionType.ADD: {
      return [
        action.data,
        ...state,
      ]
    }
    default: {
      return state;
    }
  }
};

export default noteList;
export {noteListActionType};