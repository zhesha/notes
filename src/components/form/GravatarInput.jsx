import React, { Component } from 'react';
import './GravatarInput.css';
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa';
import md5 from 'md5';
import messages from '../../config/messages.config';
import colors from '../../config/colors.config';
import config from '../../config';

class GravatarInput extends Component {
  state = {
    email: '',
    isEditMode: false
  };

  onApply = () => {
    const { onChange } = this.props;
    const email = this.state.email.trim();
    let hash;
    if (email) {
      hash = md5(email.toLocaleLowerCase());
    }
    onChange(hash);
    this.setState({ isEditMode: !this.state.isEditMode });
  };

  render() {
    const { value } = this.props;
    if (this.state.isEditMode) {
      return (
        <div className="avatarWrapper">
          <input
            className="avatarEmailField"
            type="email"
            value={this.state.email}
            placeholder={messages.emailTitle}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <button
            type="button"
            className="avatarButton"
            onClick={() => this.onApply()}
          >
            <FaCheckCircle size={26} color={colors.gravatarContrast} />
          </button>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          className="avatarButton"
          onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}
        >
          {value ? (
            <img src={config.avatarPath(value)} alt="avatar" />
          ) : (
            <FaUserCircle size={26} color={colors.newContrast} />
          )}
        </button>
      );
    }
  }
}

export default GravatarInput;
