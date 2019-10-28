import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './AddButton.css';

function AddButton() {
    return (
        <div className="addButton">
            <div className="addIconWrapper">
                <FaPlus size={50} color="888"/>
            </div>
        </div>
    );
}

export default AddButton;
