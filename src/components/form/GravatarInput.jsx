import React, { Component } from 'react';
import './GravatarInput.css';
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa';
import md5 from 'md5';

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
            placeholder={'Gravatar Email'}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <button
            type="button"
            className="avatarButton"
            onClick={() => this.onApply()}
          >
            <FaCheckCircle size={26} color="fff" />
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
            <img
              src={`https://www.gravatar.com/avatar/${value}?s=26`}
              alt="avatar"
            />
          ) : (
            <FaUserCircle size={26} color="444" />
          )}
        </button>
      );
    }
  }
}

export default GravatarInput;
