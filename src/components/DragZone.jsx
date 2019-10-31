import React from 'react';
import './DragZone.css';
import { connect } from 'react-redux';
import newNoteActions from '../actions/newNote.actions';

function DragZone({ isDragging, children, stopDrag, drag }) {
  const stop = () => {
    if (isDragging) {
      stopDrag();
    }
  };

  if (isDragging) {
    return (
      <div
        className="dragZone"
        onMouseUp={stop}
        onMouseLeave={stop}
        onMouseMove={e => {
          drag({ x: e.clientX, y: e.clientY });
        }}
      >
        {children}
      </div>
    );
  } else {
    return children;
  }
}

const mapStateToProps = state => {
  const { newNote } = state;
  return {
    isDragging: newNote.isDragging
  };
};

export default connect(
  mapStateToProps,
  {
    stopDrag: newNoteActions.stopDrag,
    drag: newNoteActions.drag
  }
)(DragZone);
