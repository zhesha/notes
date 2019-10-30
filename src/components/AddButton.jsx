import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './AddButton.css';
import { connect } from 'react-redux';
import formVisibleAction from '../actions/formVisible.actions';
import colors from '../config/colors.config';

function AddButton({ showForm }) {
  return (
    <button
      type="button"
      onClick={showForm}
      className="addButton"
      style={{ background: `#${colors.newNote}` }}
    >
      <div className="addIconWrapper">
        <FaPlus size={50} color={colors.newContrast} />
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
