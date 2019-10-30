import React, { Component } from 'react';
import './ColorSelector.css';
import { FaPalette } from 'react-icons/fa';
import colors from '../../config/colors.config';

class ColorSelector extends Component {
  state = {
    isEditMode: false
  };

  onSelect = color => {
    const { onChange } = this.props;
    onChange(color);
    this.setState({ isEditMode: false });
  };

  render() {
    const { value } = this.props;
    const colorsList = colors.list;
    const current = value || colors.default;
    if (this.state.isEditMode) {
      return (
        <div
          className="colorWrapper"
          style={{ background: `#${colors.variantContrast}` }}
        >
          {colorsList.map((color, i) => (
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
