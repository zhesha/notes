import colors from '../config/colors.config';
import dragService from '../services/drag.service';

const newNoteActionType = {
  UPDATE_DATA: 'UPDATE_DATA',
  CLEAN: 'CLEAN',
  DRAG: 'DRAG'
};

const initialState = function() {
  return {
    gravatar: '',
    name: '',
    color: colors.default,
    text: '',
    isDragging: false,
    isPreview: false,
    x: dragService.center().x,
    y: dragService.center().y
  };
};

const newNote = (state = initialState(), action) => {
  switch (action.type) {
    case newNoteActionType.UPDATE_DATA: {
      return {
        ...state,
        ...action.data
      };
    }
    case newNoteActionType.CLEAN: {
      return initialState();
    }
    case newNoteActionType.DRAG: {
      const { x, y } = dragService.calculatePosition(
        action.position,
        state.x,
        state.y
      );
      return {
        ...state,
        x: x,
        y: y
      };
    }
    default: {
      return state;
    }
  }
};

export default newNote;
export { newNoteActionType };
