import React, {Component} from 'react';
import './ColorSelector.css';
import {FaPalette} from 'react-icons/fa';

class ColorSelector extends Component {
  state = {
    isEditMode: false
  };

  onSelect = color => {
    const {onChange} = this.props;
    onChange(color);
    this.setState({ isEditMode: false });
  };

  render() {
    const { value } = this.props;
    const colors = [
      '888888',
      'BE8F32',
      'BE3934',
      'BE2D85',
      'AE35BE',
      '6834BE',
      '3552BE',
      '3699BE'
    ];
    const current = value || colors[0];
    if (this.state.isEditMode) {
      return (
        <div className="colorWrapper">
          {colors.map((color, i) => (
            <button
              type="button"
              className={
                'colorVariant' + (color === current ? ' currentColor' : '')
              }
              style={{ background: `#${color}` }}
              onClick={() => this.onSelect(color)}
              key={i}
            />
          ))}
        </div>
      );
    } else {
      return (
        <button
          type="button"
          className="colorButton"
          onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}
        >
          <FaPalette size={26} color={`#${current}`} />
        </button>
      );
    }
  }
}

export default ColorSelector;
