import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './AddButton.css';

function AddButton({ onAdd }) {
  return (
    <button type="button" onClick={onAdd} className="addButton">
      <div className="addIconWrapper">
        <FaPlus size={50} color="888" />
      </div>
    </button>
  );
}

export default AddButton;
