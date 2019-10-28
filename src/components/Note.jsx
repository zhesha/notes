import React from 'react';
import './Note.css';

function Note({ title }) {
  return <div className="note">{title}</div>;
}

export default Note;
