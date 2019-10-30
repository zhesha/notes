import React from 'react';
import './NoteItem.css';
import { FaUserSecret } from 'react-icons/fa';
import config from '../config';
import colors from '../config/colors.config';

function NoteItem({ data }) {
  return (
    <div
      className="note"
      style={{ background: `#${data.color}`, color: `#${colors.noteContrast}` }}
    >
      <div className="noteHead">
        {data.avatar ? (
          <img src={config.avatarPath(data.avatar)} alt="avatar" />
        ) : (
          <FaUserSecret size={26} color={colors.noteContrast} />
        )}
        <div className="name">{data.name}</div>
      </div>
      <pre className="text">{data.text}</pre>
      <div className="date">{data.date}</div>
    </div>
  );
}

export default NoteItem;
