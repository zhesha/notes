const formVisibleActionType = {
  SHOW: 'SHOW',
  HIDE: 'HIDE'
};

const initialState = false;

const formVisible = (state = initialState, action) => {
  switch (action.type) {
    case formVisibleActionType.SHOW: {
      return true;
    }
    case formVisibleActionType.HIDE: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default formVisible;
export { formVisibleActionType };
