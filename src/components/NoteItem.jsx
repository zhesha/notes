import React from 'react';
import './NoteItem.css';
import { FaUserSecret } from 'react-icons/all';

function NoteItem({ data }) {
  return (
    <div className="note" style={{ background: `#${data.color}` }}>
      <div className="noteHead">
        {data.avatar ? (
          <img
            src={`https://www.gravatar.com/avatar/${data.avatar}?s=26`}
            alt="avatar"
          />
        ) : (
          <FaUserSecret size={26} color="444" />
        )}
        <div className="name">{data.name}</div>
      </div>
      <pre className="text">{data.text}</pre>
      <div className="date">{data.date}</div>
    </div>
  );
}

export default NoteItem;
