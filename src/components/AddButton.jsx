import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './AddButton.css';
import { connect } from 'react-redux';
import formVisibleAction from '../actions/formVisible.actions';

function AddButton({ showForm }) {
  return (
    <button type="button" onClick={showForm} className="addButton">
      <div className="addIconWrapper">
        <FaPlus size={50} color="888" />
      </div>
    </button>
  );
}

export default connect(
  null,
  {
    showForm: formVisibleAction.showForm
  }
)(AddButton);
