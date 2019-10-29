import React, { Component } from 'react';
import './NewNoteForm.css';
import GravatarInput from './form/GravatarInput';
import ColorSelector from './form/ColorSelector';

class NewNoteForm extends Component {
  state = {
    gravatar: '',
    name: '',
    color: '',
    text: ''
  };

  onFinish = e => {
    e.preventDefault();
    const { onCancel, onCreate } = this.props;
    const { gravatar, name, color, text } = this.state;
    const trimedText = text.trim();
    if (trimedText) {
      onCreate(gravatar, name, color, trimedText);
    } else {
      onCancel();
    }
  };

  render() {
    const { onCancel } = this.props;
    return (
      <div className="newNote">
        <form onSubmit={this.onFinish}>
          <div className="formHead">
            <GravatarInput
              value={this.state.gravatar}
              onChange={value => this.setState({ gravatar: value })}
            />
            <input
              className="nameField"
              value={this.state.name}
              placeholder={'Anonymous'}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <ColorSelector
              value={this.state.color}
              onChange={value => this.setState({ color: value })}
            />
          </div>
          <textarea
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <div className="formFooter">
            <input type="button" value="CANCEL" onClick={onCancel} />
            <input type="submit" value="OK" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewNoteForm;
