import React, { Component } from 'react';
import './NewNoteForm.css';

class NewNoteForm extends Component {
  state = {
    text: ''
  };

  onFinish = e => {
    e.preventDefault();
    const { onCancel, onCreate } = this.props;
    const title = this.state.text.trim();
    if (title) {
      onCreate(title);
    } else {
      onCancel();
    }
  };

  render() {
    const { onCancel } = this.props;
    return (
      <div className="newNote">
        <form onSubmit={this.onFinish}>
          <textarea
            rows="3"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <input type="submit" />
          <input type="button" value="Cancel" onClick={onCancel} />
        </form>
      </div>
    );
  }
}

export default NewNoteForm;
